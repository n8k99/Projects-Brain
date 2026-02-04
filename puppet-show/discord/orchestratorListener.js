/**
 * Discord Orchestrator Listener
 * 
 * Listens for directives in the #executive channel and coordinates
 * with orchestrators to create autonomous proposals.
 * 
 * This module handles:
 * - Parsing orchestrator directives from Discord
 * - Triggering orchestrator evaluation
 * - Posting summaries and updates back to Discord
 * - Managing feedback loops
 */

const { EmbedBuilder } = require('discord.js');
const { autonomousProposal, getPendingProposals } = require('../orchestrator/autonomousProposal');

// Configuration
const EXECUTIVE_CHANNEL_ID = process.env.DISCORD_EXECUTIVE_CHANNEL;
const ORCHESTRATOR_PREFIX = '🤖'; // Prefix to trigger orchestrator proposals
const DAILY_SUMMARY_TIME = '09:00'; // 9 AM for daily summary

let client = null;
let discordReady = false;

/**
 * Initialize Discord orchestrator listener
 * @param {Discord.Client} discordClient - Initialized Discord.js client
 */
function initializeDiscordListener(discordClient) {
  client = discordClient;

  if (!EXECUTIVE_CHANNEL_ID) {
    console.warn('⚠️  DISCORD_EXECUTIVE_CHANNEL not configured. Orchestrator Discord integration disabled.');
    return;
  }

  client.on('messageCreate', handleMessage);
  console.log('✓ Discord orchestrator listener initialized');
}

/**
 * Handle incoming messages from Discord
 * @private
 */
async function handleMessage(message) {
  // Ignore bot messages
  if (message.author.bot) return;

  // Only process in executive channel
  if (message.channelId !== EXECUTIVE_CHANNEL_ID) return;

  try {
    // Check if message is a directive for orchestrators
    if (message.content.startsWith(ORCHESTRATOR_PREFIX)) {
      await handleOrchestratorDirective(message);
    }

    // Check for daily summary trigger (e.g., "!summary")
    if (message.content === '!summary') {
      await postDailySummary(message.channel);
    }

    // Check for status inquiry
    if (message.content === '!status') {
      await postProjectStatus(message.channel);
    }
  } catch (error) {
    console.error('Error handling message:', error);
  }
}

/**
 * Process orchestrator directive from Discord
 * @private
 */
async function handleOrchestratorDirective(message) {
  // Extract directive text (remove prefix)
  const directive = message.content.substring(ORCHESTRATOR_PREFIX.length).trim();

  if (!directive) return;

  try {
    // React with thinking emoji while processing
    await message.react('🤔');

    // Log the directive
    console.log(`🤖 Orchestrator directive received: ${directive}`);

    // In a real system, this would:
    // 1. Parse the directive
    // 2. Route to appropriate orchestrator
    // 3. Get back proposal data
    // 4. Create the proposal

    // For now, post confirmation that it was received
    const confirmEmbed = new EmbedBuilder()
      .setColor('#8b5cf6')
      .setTitle('🤖 Directive Received')
      .setDescription(`Orchestrators are evaluating:\n"${directive}"`)
      .setFooter({ text: 'Processing proposal generation...' });

    await message.channel.send({ embeds: [confirmEmbed] });
  } catch (error) {
    console.error('Error handling orchestrator directive:', error);
    await message.reply(`Error processing directive: ${error.message}`);
  }
}

/**
 * Post daily summary to Discord
 * Shows new proposals, pending feedback, completed projects, etc.
 * @private
 */
async function postDailySummary(channel) {
  try {
    // Get pending proposals
    const pending = await getPendingProposals();

    // Get other stats would go here
    // For now, just the pending proposals

    const embed = new EmbedBuilder()
      .setColor('#6366f1')
      .setTitle('📊 Daily Project Summary')
      .setTimestamp();

    if (pending.length === 0) {
      embed.addFields(
        { name: '🆕 New Proposals', value: 'None at this time', inline: false }
      );
    } else {
      const proposalsList = pending.map(p => `• **${p.title}** (${p.proposer})`).join('\n');
      embed.addFields(
        { name: '🆕 New Proposals', value: proposalsList, inline: false }
      );
    }

    // Add other sections (would fetch from database)
    embed.addFields(
      { name: '💬 Awaiting Feedback', value: `${pending.length} proposal(s)`, inline: true },
      { name: '✅ Completed Today', value: 'Use dashboard for details', inline: true }
    );

    embed.setFooter({ text: 'View full details at: http://localhost:3000' });

    await channel.send({ embeds: [embed] });
  } catch (error) {
    console.error('Error posting daily summary:', error);
    await channel.send(`Error generating summary: ${error.message}`);
  }
}

/**
 * Post project status to Discord
 * @private
 */
async function postProjectStatus(channel) {
  try {
    // In a real system, fetch this from the API
    const pending = await getPendingProposals();

    const embed = new EmbedBuilder()
      .setColor('#10b981')
      .setTitle('📈 Project Status')
      .addFields(
        { name: '🆕 Proposed', value: pending.length.toString(), inline: true },
        { name: '🟢 Active', value: 'View dashboard', inline: true },
        { name: '⚙️  In Progress', value: 'View dashboard', inline: true }
      )
      .setFooter({ text: 'Full dashboard: http://localhost:3000' });

    await channel.send({ embeds: [embed] });
  } catch (error) {
    console.error('Error posting status:', error);
    await channel.send(`Error getting status: ${error.message}`);
  }
}

/**
 * Post notification when proposal is created
 * Called from the main server when a project is created
 * @param {Object} project - Project object
 * @param {string} source - Source of the proposal (e.g., "orchestrator", "manual", "autonomous")
 */
async function notifyProposalCreated(project, source = 'unknown') {
  if (!client || !EXECUTIVE_CHANNEL_ID) return;

  try {
    const channel = await client.channels.fetch(EXECUTIVE_CHANNEL_ID);
    if (!channel || !channel.isTextBased()) return;

    const sourceEmoji = {
      'orchestrator': '🤖',
      'manual': '✋',
      'autonomous': '⚙️',
      'unknown': '❓'
    }[source] || '📋';

    const embed = new EmbedBuilder()
      .setColor('#8b5cf6')
      .setTitle(`${sourceEmoji} New Project Proposal`)
      .addFields(
        { name: 'Title', value: project.title, inline: false },
        { name: 'Proposer', value: project.proposer, inline: true },
        { name: 'Status', value: project.status, inline: true },
        { name: 'Description', value: project.description || 'N/A', inline: false }
      );

    if (project.target_completion) {
      embed.addFields(
        { name: 'Target Completion', value: project.target_completion, inline: true }
      );
    }

    embed.setFooter({ text: `ID: ${project.id} | Created: ${new Date(project.created_at).toLocaleString()}` });

    await channel.send({ embeds: [embed] });
  } catch (error) {
    console.error('Error notifying proposal creation:', error);
  }
}

/**
 * Post notification when feedback is given
 * @param {Object} project - Project object
 * @param {string} feedbackText - The feedback text
 */
async function notifyFeedbackGiven(project, feedbackText) {
  if (!client || !EXECUTIVE_CHANNEL_ID) return;

  try {
    const channel = await client.channels.fetch(EXECUTIVE_CHANNEL_ID);
    if (!channel || !channel.isTextBased()) return;

    const embed = new EmbedBuilder()
      .setColor('#f59e0b')
      .setTitle('💬 Feedback Given')
      .addFields(
        { name: 'Project', value: project.title, inline: false },
        { name: 'Feedback', value: feedbackText, inline: false },
        { name: 'Status', value: project.status, inline: true }
      )
      .setFooter({ text: `ID: ${project.id}` });

    await channel.send({ embeds: [embed] });
  } catch (error) {
    console.error('Error notifying feedback:', error);
  }
}

/**
 * Post notification when project is approved
 * @param {Object} project - Project object
 */
async function notifyApproved(project) {
  if (!client || !EXECUTIVE_CHANNEL_ID) return;

  try {
    const channel = await client.channels.fetch(EXECUTIVE_CHANNEL_ID);
    if (!channel || !channel.isTextBased()) return;

    const embed = new EmbedBuilder()
      .setColor('#10b981')
      .setTitle('✅ Project Approved')
      .addFields(
        { name: 'Title', value: project.title, inline: false },
        { name: 'Proposer', value: project.proposer, inline: true },
        { name: 'New Status', value: 'ACTIVE', inline: true }
      )
      .setDescription('Project is now moving to active implementation phase.')
      .setFooter({ text: `ID: ${project.id} | Approved: ${new Date().toLocaleString()}` });

    await channel.send({ embeds: [embed] });
  } catch (error) {
    console.error('Error notifying approval:', error);
  }
}

module.exports = {
  initializeDiscordListener,
  notifyProposalCreated,
  notifyFeedbackGiven,
  notifyApproved
};
