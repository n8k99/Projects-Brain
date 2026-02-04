# 🤖 Orchestrator Integration Guide

## Overview

The Puppet Show system provides a standardized API for orchestrators to autonomously create project proposals based on their analysis and functional lens.

## Core Concept

**Orchestrators evaluate directives → Analyze through their functional lens → Generate autonomousProposal() → Project created in system**

## Integration Steps

### Step 1: Import the Module

```javascript
const { 
  autonomousProposal, 
  getPendingProposals,
  getProposalStatus,
  getOrchestratorStats 
} = require('./orchestrator/autonomousProposal');
```

### Step 2: Define Your Orchestrator

```javascript
const myOrchestrator = {
  id: 'my-unique-orchestrator-id',
  name: 'My Orchestrator Name',
  proposer: 'Vincent', // One of the 7 proposers
  
  async evaluateDirective(directive) {
    // Your logic here
    // Analyze the directive through your functional lens
    // Return autonomousProposal() call
  }
};
```

### Step 3: Implement Evaluation Logic

```javascript
async evaluateDirective(directive) {
  // Parse and analyze the directive
  const analysis = this.analyze(directive);
  
  // Check if this requires a proposal
  if (!analysis.shouldPropose) {
    return null; // No proposal needed
  }
  
  // Create the proposal
  try {
    const proposal = await autonomousProposal({
      title: analysis.title,
      proposer: this.proposer,
      description: analysis.description,
      orchestratorId: this.id,
      objectives: analysis.objectives,
      timeline: analysis.timeline,
      budget: analysis.budget,
      assigned_team: analysis.team,
      target_completion: analysis.deadline,
      reasoning: {
        source: directive,
        confidence: analysis.confidence,
        priority: analysis.priority,
        ...analysis.reasoning
      }
    });
    
    return proposal;
  } catch (error) {
    console.error('Error creating proposal:', error);
    throw error;
  }
}
```

## Example Orchestrators

### Analytical Orchestrator

**Purpose:** Data-driven proposal generation

```javascript
const analyticalOrchestrator = {
  id: 'analytical-mind',
  proposer: 'Vincent',
  
  async evaluateDirective(directive) {
    // Analyze metrics, usage patterns, performance data
    const metrics = await this.analyzeMetrics(directive);
    
    if (metrics.priority < 0.7) return null; // Skip low priority
    
    return await autonomousProposal({
      title: `${metrics.domain} Optimization Initiative`,
      proposer: this.proposer,
      description: metrics.description,
      orchestratorId: this.id,
      objectives: metrics.objectives,
      timeline: {
        phase1: `Analysis & Planning (${metrics.duration[0]} weeks)`,
        phase2: `Implementation (${metrics.duration[1]} weeks)`,
        phase3: `Measurement & Iteration (${metrics.duration[2]} weeks)`
      },
      budget: metrics.budget,
      target_completion: this.calculateDeadline(metrics.duration),
      reasoning: {
        confidence: metrics.confidence,
        priority: metrics.priority,
        metrics: metrics.data,
        potential_impact: metrics.impact
      }
    });
  }
};
```

### Creative Orchestrator

**Purpose:** Innovation and UX improvements

```javascript
const creativeOrchestrator = {
  id: 'creative-vision',
  proposer: 'Kathryn',
  
  async evaluateDirective(directive) {
    // Analyze user feedback, design opportunities, market trends
    const ideas = await this.brainstorm(directive);
    
    return await autonomousProposal({
      title: ideas.productName,
      proposer: this.proposer,
      description: ideas.vision,
      orchestratorId: this.id,
      objectives: ideas.designGoals,
      timeline: {
        discovery: `User Research (${ideas.phases.research} weeks)`,
        design: `Design & Prototyping (${ideas.phases.design} weeks)`,
        build: `Implementation (${ideas.phases.build} weeks)`,
        test: `Testing & Refinement (${ideas.phases.test} weeks)`
      },
      budget: ideas.budget,
      target_completion: ideas.launchDate,
      reasoning: {
        confidence: ideas.confidence,
        priority: 'high',
        userImpact: ideas.expectedImpact,
        competitiveAdvantage: ideas.differentiation
      }
    });
  }
};
```

### Strategic Orchestrator

**Purpose:** Business growth and market positioning

```javascript
const strategicOrchestrator = {
  id: 'strategic-perspective',
  proposer: 'Morgan',
  
  async evaluateDirective(directive) {
    // Analyze market opportunity, business alignment, revenue impact
    const opportunity = await this.evaluateOpportunity(directive);
    
    if (opportunity.roiMultiplier < 2) return null; // Must be worth it
    
    return await autonomousProposal({
      title: opportunity.initiative,
      proposer: this.proposer,
      description: opportunity.businessCase,
      orchestratorId: this.id,
      objectives: opportunity.milestones,
      timeline: opportunity.phases,
      budget: {
        development: opportunity.investmentNeeded,
        marketing: opportunity.marketingBudget,
        salesEnablement: opportunity.salesBudget,
        total: opportunity.totalInvestment,
        currency: 'USD'
      },
      target_completion: opportunity.timeToRevenue,
      reasoning: {
        confidence: opportunity.confidence,
        priority: 'critical',
        marketSize: opportunity.tam,
        revenueImpact: opportunity.projectedRevenue,
        paybackPeriod: opportunity.payback,
        roiMultiplier: opportunity.roiMultiplier
      }
    });
  }
};
```

### Operations Orchestrator

**Purpose:** Efficiency and cost optimization

```javascript
const operationsOrchestrator = {
  id: 'operational-excellence',
  proposer: 'Eliana',
  
  async evaluateDirective(directive) {
    // Analyze cost savings, efficiency gains, process improvements
    const improvement = await this.findOptimizations(directive);
    
    return await autonomousProposal({
      title: `${improvement.area} Automation & Optimization`,
      proposer: this.proposer,
      description: improvement.solution,
      orchestratorId: this.id,
      objectives: improvement.improvements,
      timeline: improvement.schedule,
      budget: improvement.investment,
      target_completion: improvement.deadline,
      reasoning: {
        confidence: improvement.confidence,
        priority: 'high',
        currentCosts: improvement.currentCost,
        projectedSavings: improvement.annualSavings,
        paybackPeriod: improvement.paybackMonths,
        efficiencyGain: improvement.percentageImprovement
      }
    });
  }
};
```

## Integration with Discord

When a proposal is created, the system automatically posts to Discord:

```
🤖 New Proposal: [Title] (Orchestrator: my-orchestrator)
Proposer: [Name]
Budget: $[Amount]
Target: [Date]
```

### Responding to Discord Directives

Listen for orchestrator directives in Discord (prefixed with 🤖):

```javascript
async function handleOrchestratorDirective(messageContent) {
  const directive = messageContent.substring(2).trim();
  
  // Route to appropriate orchestrator(s)
  const proposals = [];
  
  proposals.push(await analyticalOrchestrator.evaluateDirective(directive));
  proposals.push(await creativeOrchestrator.evaluateDirective(directive));
  proposals.push(await strategicOrchestrator.evaluateDirective(directive));
  
  // Filter out null responses
  const createdProposals = proposals.filter(p => p !== null);
  
  console.log(`Created ${createdProposals.length} proposals from directive`);
}
```

## Advanced Features

### 1. React to Feedback

```javascript
async function respondToFeedback(projectId) {
  const project = await getProposalStatus(projectId);
  
  if (project.feedback) {
    // Analyze feedback and potentially create follow-up proposal
    const followUp = await analyzeAndRespond(project.feedback);
    
    if (followUp) {
      console.log('Creating follow-up proposal based on feedback');
      // Could modify proposal or create new one
    }
  }
}
```

### 2. Continuous Monitoring

```javascript
async function monitorProposals() {
  const pending = await getPendingProposals();
  
  pending.forEach(proposal => {
    // Check if feedback has been pending too long
    if (this.hasPendingFeedback(proposal, 7)) {
      // Send reminder or escalate
      console.warn(`Proposal ${proposal.id} pending review for 7+ days`);
    }
  });
}
```

### 3. Statistics and Reporting

```javascript
async function generateReport() {
  const stats = await getOrchestratorStats();
  
  stats.forEach(orchestrator => {
    console.log(`
      Orchestrator: ${orchestrator.orchestrator}
      Total Proposals: ${orchestrator.total_proposals}
      Pending: ${orchestrator.pending}
      Active: ${orchestrator.active}
      Completed: ${orchestrator.completed}
    `);
  });
}
```

### 4. Chaining Multiple Orchestrators

```javascript
async function evaluateWithAllOrchestrators(directive) {
  const orchestrators = [
    analyticalOrchestrator,
    creativeOrchestrator,
    strategicOrchestrator,
    operationsOrchestrator
  ];
  
  const proposals = await Promise.all(
    orchestrators.map(o => o.evaluateDirective(directive))
  );
  
  return proposals.filter(p => p !== null);
}
```

## Best Practices

### 1. Confidence Scores

Always provide a confidence score (0-1):
```javascript
reasoning: {
  confidence: 0.85,  // 85% confident this proposal is correct
  // ...
}
```

### 2. Clear Objectives

Make objectives specific and measurable:
```javascript
objectives: [
  "Reduce page load time by 40%",
  "Increase user retention by 15%",
  "Achieve 99.9% uptime"
]
```

### 3. Realistic Timelines

Break down into phases with specific durations:
```javascript
timeline: {
  phase1: "Planning & Design (2 weeks)",
  phase2: "Development (6 weeks)",
  phase3: "Testing & Deployment (1 week)"
}
```

### 4. Detailed Reasoning

Include context for decision-making:
```javascript
reasoning: {
  source: "Customer support tickets analysis",
  confidence: 0.92,
  priority: "high",
  data: {
    tickets_per_month: 500,
    response_time_hours: 48,
    customer_satisfaction: 0.72
  }
}
```

### 5. Error Handling

Always catch and log errors:
```javascript
try {
  const proposal = await autonomousProposal({...});
  console.log('✓ Proposal created:', proposal.id);
} catch (error) {
  console.error('✗ Failed to create proposal:', error.message);
  // Notify monitoring system
}
```

## Field Reference

### Required Fields
- `title` (string) - Project title
- `proposer` (string) - One of: Sylvia, Vincent, Kathryn, Morgan, Eliana, Maxwell, Sarah

### Optional But Important
- `description` (string) - What and why
- `objectives` (array) - Specific measurable goals
- `timeline` (object) - Phases with durations
- `budget` (object) - Cost breakdown
- `target_completion` (string) - YYYY-MM-DD format
- `assigned_team` (string) - Team that will work on it
- `reasoning` (object) - Why this proposal matters

### Notes
- All dates should be in YYYY-MM-DD format
- Budget should include: amount breakdown and currency
- Timelines should show realistic durations
- Reasoning helps CEOs understand the proposal

## Testing Your Orchestrator

```javascript
// Test 1: Single directive
const proposal = await myOrchestrator.evaluateDirective(
  "We need better analytics"
);
console.log('✓ Created proposal:', proposal.id);

// Test 2: Multiple directives
const directives = [
  "Improve user retention",
  "Reduce operational costs",
  "Expand to new markets"
];

for (const directive of directives) {
  const p = await myOrchestrator.evaluateDirective(directive);
  if (p) console.log('✓', p.title);
}

// Test 3: Check pending proposals
const pending = await getPendingProposals();
console.log(`${pending.length} proposals awaiting feedback`);

// Test 4: Get stats
const stats = await getOrchestratorStats();
console.log('Orchestrator statistics:', stats);
```

## Deployment

When ready to deploy your orchestrator:

1. **Test thoroughly** with test directives
2. **Monitor feedback** from CEOs
3. **Adjust reasoning** based on accepted/rejected proposals
4. **Iterate** on your evaluation logic
5. **Scale up** gradually to increase autonomy

## Support & Examples

For complete working examples, see:
- `/orchestrator/examples.js` - Four fully implemented orchestrators
- `/QUICKSTART.md` - Quick reference
- `/README.md` - Full documentation

---

**Your orchestrator is now ready to autonomously propose projects! 🚀**
