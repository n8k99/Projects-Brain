// State
let projects = [];
let currentFilter = {};

// DOM Elements
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const modal = document.getElementById('detail-modal');
const modalClose = document.querySelector('.modal-close');
const projectsList = document.getElementById('projects-list');
const timelineList = document.getElementById('timeline-list');
const timelineView = document.getElementById('timeline-view');
const createForm = document.getElementById('create-project-form');
const filterStatus = document.getElementById('filter-status');
const filterProposer = document.getElementById('filter-proposer');
const searchProjects = document.getElementById('search-projects');

// Tab Navigation
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabName = btn.dataset.tab;
    
    // Update active tab button
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update active content
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');

    // Load data when switching tabs
    if (tabName === 'dashboard') loadDashboard();
    if (tabName === 'projects') loadProjects();
    if (tabName === 'timeline') loadTimeline();
  });
});

// Modal
modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

// Filter Projects
filterStatus.addEventListener('change', filterAndRenderProjects);
filterProposer.addEventListener('change', filterAndRenderProjects);
searchProjects.addEventListener('input', filterAndRenderProjects);

// Create Project Form
createForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formMessage = document.getElementById('form-message');
  formMessage.className = 'form-message';
  
  try {
    const title = document.getElementById('form-title').value;
    const proposer = document.getElementById('form-proposer').value;
    const description = document.getElementById('form-description').value;
    const team = document.getElementById('form-team').value;
    const targetCompletion = document.getElementById('form-target').value;
    
    let proposalJson = {};
    if (document.getElementById('form-objectives').value) {
      try {
        proposalJson.objectives = JSON.parse(document.getElementById('form-objectives').value).objectives || [];
      } catch (e) {}
    }
    if (document.getElementById('form-budget').value) {
      try {
        proposalJson.budget = JSON.parse(document.getElementById('form-budget').value).budget || {};
      } catch (e) {}
    }

    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        proposer,
        description: description || null,
        proposal_json: Object.keys(proposalJson).length > 0 ? proposalJson : null,
        assigned_team: team || null,
        target_completion: targetCompletion || null
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create project');
    }

    const project = await response.json();
    formMessage.textContent = '✅ Project created successfully!';
    formMessage.classList.add('success');
    createForm.reset();
    setTimeout(() => {
      formMessage.className = 'form-message';
    }, 3000);

    // Reload projects
    await loadProjects();
  } catch (error) {
    console.error('Error creating project:', error);
    formMessage.textContent = '❌ ' + error.message;
    formMessage.classList.add('error');
  }
});

// Load and render functions
async function loadDashboard() {
  try {
    const response = await fetch('/api/dashboard');
    if (!response.ok) throw new Error('Failed to load dashboard');
    
    const data = await response.json();
    
    // Update stat cards
    document.getElementById('stat-proposed').textContent = data.counts.PROPOSED;
    document.getElementById('stat-active').textContent = data.counts.ACTIVE;
    document.getElementById('stat-in-progress').textContent = data.counts.IN_PROGRESS;
    document.getElementById('stat-complete').textContent = data.counts.COMPLETE;

    // Render timeline
    renderTimelineList(data.timeline);

    // Check Discord status
    checkDiscordStatus();
  } catch (error) {
    console.error('Error loading dashboard:', error);
    timelineList.innerHTML = '<p class="empty">Failed to load dashboard</p>';
  }
}

async function loadProjects() {
  try {
    const response = await fetch('/api/projects');
    if (!response.ok) throw new Error('Failed to load projects');
    
    projects = await response.json();
    filterAndRenderProjects();
  } catch (error) {
    console.error('Error loading projects:', error);
    projectsList.innerHTML = '<p class="empty">Failed to load projects</p>';
  }
}

async function loadTimeline() {
  try {
    const response = await fetch('/api/dashboard');
    if (!response.ok) throw new Error('Failed to load timeline');
    
    const data = await response.json();
    renderTimelineView(data.timeline);
  } catch (error) {
    console.error('Error loading timeline:', error);
    timelineView.innerHTML = '<p class="empty">Failed to load timeline</p>';
  }
}

function filterAndRenderProjects() {
  const status = filterStatus.value;
  const proposer = filterProposer.value;
  const search = searchProjects.value.toLowerCase();

  let filtered = projects.filter(p => {
    const matchStatus = !status || p.status === status;
    const matchProposer = !proposer || p.proposer === proposer;
    const matchSearch = !search || 
                       p.title.toLowerCase().includes(search) ||
                       p.description?.toLowerCase().includes(search) ||
                       p.proposer.toLowerCase().includes(search);
    
    return matchStatus && matchProposer && matchSearch;
  });

  renderProjectsList(filtered);
}

function renderProjectsList(projectList) {
  if (projectList.length === 0) {
    projectsList.innerHTML = '<p class="empty">No projects found</p>';
    return;
  }

  projectsList.innerHTML = projectList.map(project => `
    <div class="project-card" onclick="showProjectDetail(${project.id})">
      <div class="project-info">
        <h3>${project.title}</h3>
        <div class="project-meta">
          <span>👤 ${project.proposer}</span>
          <span>📅 ${new Date(project.created_at).toLocaleDateString()}</span>
          ${project.assigned_team ? `<span>👥 ${project.assigned_team}</span>` : ''}
          ${project.target_completion ? `<span>🎯 Due: ${project.target_completion}</span>` : ''}
        </div>
      </div>
      <span class="status-badge ${project.status.toLowerCase()}">${project.status}</span>
    </div>
  `).join('');
}

function renderTimelineList(timelineProjects) {
  if (!timelineProjects || timelineProjects.length === 0) {
    timelineList.innerHTML = '<p class="empty">No projects with target dates</p>';
    return;
  }

  timelineList.innerHTML = timelineProjects.map(project => `
    <div class="timeline-item" onclick="showProjectDetail(${project.id})">
      <div class="timeline-item-info">
        <h3>${project.title}</h3>
        <p>📋 ${project.proposer} • <span class="status-badge ${project.status.toLowerCase()}">${project.status}</span></p>
      </div>
      <div class="timeline-item-date">${project.target_completion || 'No date'}</div>
    </div>
  `).join('');
}

function renderTimelineView(timelineProjects) {
  if (!timelineProjects || timelineProjects.length === 0) {
    timelineView.innerHTML = '<p class="empty">No projects with target completion dates</p>';
    return;
  }

  timelineView.innerHTML = timelineProjects.map(project => `
    <div class="timeline-item" onclick="showProjectDetail(${project.id})">
      <div class="timeline-item-info">
        <h3>${project.title}</h3>
        <p>👤 Proposer: ${project.proposer}</p>
        <p><span class="status-badge ${project.status.toLowerCase()}">${project.status}</span></p>
      </div>
      <div class="timeline-item-date">
        <div style="font-size: 1.1rem">📅</div>
        <div>${project.target_completion}</div>
      </div>
    </div>
  `).join('');
}

// Project Detail Modal
async function showProjectDetail(projectId) {
  try {
    const response = await fetch(`/api/projects/${projectId}`);
    if (!response.ok) throw new Error('Failed to load project');
    
    const project = await response.json();
    renderProjectDetail(project);
    modal.classList.add('active');
  } catch (error) {
    console.error('Error loading project detail:', error);
    alert('Failed to load project details');
  }
}

function getGithubIssuesUrl(repository) {
  if (!repository) return null;
  if (repository.startsWith('https://github.com/')) {
    return repository + '/issues';
  }
  return null;
}

function renderProjectDetail(project) {
  const proposalJson = project.proposal_json || {};
  
  let feedbackHTML = '';
  if (project.feedbacks && project.feedbacks.length > 0) {
    feedbackHTML = '<h3>Feedback History</h3>';
    feedbackHTML += project.feedbacks.map(f => `
      <div class="feedback-item">
        <p><strong>Feedback:</strong> ${f.feedback_text}</p>
        <p class="feedback-date">📅 ${new Date(f.feedback_date).toLocaleDateString()} | Status: ${f.status_after}</p>
      </div>
    `).join('');
  }

  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
    <div class="project-detail">
      <h2>${project.title}</h2>
      
      <div class="detail-section">
        <h3>Project Information</h3>
        <div class="detail-meta">
          <div class="detail-meta-item">
            <label>Proposer</label>
            <p>${project.proposer}</p>
          </div>
          <div class="detail-meta-item">
            <label>Status</label>
            <p><span class="status-badge ${project.status.toLowerCase()}">${project.status}</span></p>
          </div>
          <div class="detail-meta-item">
            <label>Created</label>
            <p>${new Date(project.created_at).toLocaleDateString()}</p>
          </div>
          <div class="detail-meta-item">
            <label>Target Completion</label>
            <p>${project.target_completion || 'Not set'}</p>
          </div>
          ${project.assigned_team ? `
          <div class="detail-meta-item">
            <label>Assigned Team</label>
            <p>${project.assigned_team}</p>
          </div>
          ` : ''}
          ${project.approved_at ? `
          <div class="detail-meta-item">
            <label>Approved</label>
            <p>${new Date(project.approved_at).toLocaleDateString()}</p>
          </div>
          ` : ''}
        </div>
      </div>

      <div class="detail-section">
        <h3>Description</h3>
        <p>${project.description || 'No description provided'}</p>
      </div>

      ${project.repository ? `
      <div class="detail-section">
        <h3>📦 Repository & Links</h3>
        <div class="repo-links" style="display: flex; gap: 10px; flex-wrap: wrap;">
          <a href="${project.repository}" target="_blank" class="btn-secondary" style="text-decoration: none; display: inline-block;">
            🔗 View Repository
          </a>
          ${getGithubIssuesUrl(project.repository) ? `
          <a href="${getGithubIssuesUrl(project.repository)}" target="_blank" class="btn-secondary" style="text-decoration: none; display: inline-block;">
            🐛 GitHub Issues
          </a>
          ` : ''}
        </div>
        <p style="font-size: 0.9em; color: var(--text-secondary); margin-top: 8px;">${project.repository}</p>
      </div>
      ` : ''}

      ${proposalJson.objectives ? `
      <div class="detail-section">
        <h3>Objectives</h3>
        <ul style="padding-left: 20px;">
          ${proposalJson.objectives.map(obj => `<li>${obj}</li>`).join('')}
        </ul>
      </div>
      ` : ''}

      ${proposalJson.budget ? `
      <div class="detail-section">
        <h3>Budget</h3>
        <p>${JSON.stringify(proposalJson.budget)}</p>
      </div>
      ` : ''}

      ${project.feedback ? `
      <div class="detail-section">
        <h3>Latest Feedback</h3>
        <p style="padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid var(--primary);">${project.feedback}</p>
      </div>
      ` : ''}

      ${feedbackHTML ? `<div class="detail-section">${feedbackHTML}</div>` : ''}

      <div class="action-buttons">
        ${project.status === 'PROPOSED' ? `
          <button class="btn-primary" onclick="approveProject(${project.id})">✅ Approve Project</button>
        ` : ''}
        ${['PROPOSED', 'ACTIVE', 'IN_PROGRESS'].includes(project.status) ? `
          <button class="btn-secondary" onclick="showFeedbackForm(${project.id})">💬 Add Feedback</button>
        ` : ''}
      </div>
    </div>
  `;
}

async function approveProject(projectId) {
  if (!confirm('Approve this project and set status to ACTIVE?')) return;
  
  try {
    const response = await fetch(`/api/projects/${projectId}/approve`, {
      method: 'POST'
    });
    
    if (!response.ok) throw new Error('Failed to approve project');
    
    await loadProjects();
    await loadDashboard();
    modal.classList.remove('active');
  } catch (error) {
    console.error('Error approving project:', error);
    alert('Failed to approve project');
  }
}

function showFeedbackForm(projectId) {
  const modalBody = document.getElementById('modal-body');
  const feedbackForm = document.createElement('div');
  feedbackForm.className = 'feedback-form';
  feedbackForm.innerHTML = `
    <h3>Add Feedback</h3>
    <textarea id="feedback-text" placeholder="Enter your feedback..." rows="4"></textarea>
    <button class="btn-primary" onclick="submitFeedback(${projectId})">Submit Feedback</button>
  `;
  
  const actionButtons = modalBody.querySelector('.action-buttons');
  if (actionButtons) {
    actionButtons.after(feedbackForm);
  } else {
    modalBody.appendChild(feedbackForm);
  }
}

async function submitFeedback(projectId) {
  const feedbackText = document.getElementById('feedback-text').value;
  
  if (!feedbackText.trim()) {
    alert('Please enter feedback');
    return;
  }

  try {
    const response = await fetch(`/api/projects/${projectId}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feedback_text: feedbackText })
    });
    
    if (!response.ok) throw new Error('Failed to submit feedback');
    
    const project = await response.json();
    renderProjectDetail(project);
  } catch (error) {
    console.error('Error submitting feedback:', error);
    alert('Failed to submit feedback');
  }
}

async function checkDiscordStatus() {
  try {
    const response = await fetch('/api/health');
    const data = await response.json();
    const statusEl = document.getElementById('discord-status');
    
    if (data.discord) {
      statusEl.innerHTML = 'Discord: <span style="color: var(--success);">✓ Connected</span>';
    } else {
      statusEl.innerHTML = 'Discord: <span style="color: var(--warning);">⚠ Not configured</span>';
    }
  } catch (error) {
    console.error('Error checking Discord status:', error);
  }
}

// Initial load
window.addEventListener('load', () => {
  loadDashboard();
  checkDiscordStatus();
});
