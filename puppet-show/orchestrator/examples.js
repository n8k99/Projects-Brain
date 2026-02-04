/**
 * Example Orchestrator Implementations
 * 
 * This file demonstrates how different orchestrators might use
 * the autonomousProposal system to generate project proposals.
 * 
 * Each orchestrator has a distinct "personality" and focuses:
 * - Analytical Orchestrator: Data-driven, metrics-focused
 * - Creative Orchestrator: Innovation, design, user experience
 * - Strategic Orchestrator: Business alignment, growth
 * - Operations Orchestrator: Efficiency, process improvement
 */

const { autonomousProposal } = require('./autonomousProposal');

// ============================================================================
// ANALYTICAL ORCHESTRATOR
// ============================================================================
// Focuses on: Data, metrics, insights, optimization
// Proposes proposals based on: Analytics, usage patterns, performance

const analyticalOrchestrator = {
  id: 'analytical-orchestrator',
  name: 'Analytical Mind',
  proposer: 'Vincent',
  
  async evaluateDirective(directive) {
    // Example: "We need better user analytics"
    // -> Generates proposal for analytics dashboard
    
    const proposal = await autonomousProposal({
      title: "Comprehensive User Analytics Platform",
      proposer: 'Vincent',
      description: "Build a real-time analytics system to track user behavior, engagement metrics, and provide actionable insights for product improvements.",
      orchestratorId: this.id,
      
      objectives: [
        "Implement real-time event tracking across all user interactions",
        "Build analytics dashboard with key metrics and trends",
        "Create automated reporting system for stakeholders",
        "Establish data quality standards and validation",
        "Enable A/B testing framework for experiments"
      ],
      
      timeline: {
        phase1: "Data infrastructure setup (3 weeks)",
        phase2: "Dashboard development (4 weeks)",
        phase3: "Reporting and automation (2 weeks)",
        phase4: "Testing and optimization (1 week)"
      },
      
      budget: {
        development: 60000,
        data_infrastructure: 15000,
        tools_licenses: 5000,
        total: 80000,
        currency: "USD"
      },
      
      assigned_team: "Data Analytics & Engineering",
      target_completion: "2024-12-15",
      
      reasoning: {
        source: "Usage pattern analysis detected growth in user base",
        confidence: 0.92,
        priority: "high",
        metrics: {
          current_users: 50000,
          monthly_growth: "15%",
          tracking_gap: "30% of user interactions not tracked"
        }
      }
    });
    
    return proposal;
  }
};

// ============================================================================
// CREATIVE ORCHESTRATOR  
// ============================================================================
// Focuses on: Innovation, design, user experience, new features

const creativeOrchestrator = {
  id: 'creative-orchestrator',
  name: 'Creative Vision',
  proposer: 'Kathryn',
  
  async evaluateDirective(directive) {
    // Example: "Users want more customization"
    // -> Generates proposal for personalization system
    
    const proposal = await autonomousProposal({
      title: "Advanced User Personalization Engine",
      proposer: 'Kathryn',
      description: "Design and implement a sophisticated personalization system that adapts the user experience based on preferences, behavior, and context.",
      orchestratorId: this.id,
      
      objectives: [
        "Create preference management system with 50+ customization options",
        "Develop AI-powered content recommendation engine",
        "Design adaptive UI that responds to user preferences",
        "Implement theme and layout customization",
        "Build user feedback loop for continuous improvement"
      ],
      
      timeline: {
        discovery: "User research and design (2 weeks)",
        phase1: "UI/UX design and prototyping (3 weeks)",
        phase2: "Backend personalization engine (4 weeks)",
        phase3: "Frontend implementation (3 weeks)",
        phase4: "User testing and refinement (2 weeks)"
      },
      
      budget: {
        design: 25000,
        development_frontend: 40000,
        development_backend: 35000,
        testing: 10000,
        total: 110000,
        currency: "USD"
      },
      
      assigned_team: "Product Design & Engineering",
      target_completion: "2024-12-30",
      
      reasoning: {
        source: "User feedback and feature requests analysis",
        confidence: 0.88,
        priority: "high",
        user_impact: "Would address top 5 feature requests",
        competitive_advantage: "Similar to enterprise competitors"
      }
    });
    
    return proposal;
  }
};

// ============================================================================
// STRATEGIC ORCHESTRATOR
// ============================================================================
// Focuses on: Business alignment, growth, market positioning

const strategicOrchestrator = {
  id: 'strategic-orchestrator',
  name: 'Strategic Perspective',
  proposer: 'Morgan',
  
  async evaluateDirective(directive) {
    // Example: "Expand into enterprise market"
    // -> Generates proposal for enterprise features
    
    const proposal = await autonomousProposal({
      title: "Enterprise Edition Platform Launch",
      proposer: 'Morgan',
      description: "Develop and launch an enterprise-grade edition of our platform targeting large organizations with advanced security, compliance, and administration features.",
      orchestratorId: this.id,
      
      objectives: [
        "Implement SSO/SAML authentication for enterprise",
        "Build advanced user and permission management",
        "Add compliance reporting (SOC2, GDPR, HIPAA)",
        "Create enterprise support and SLA system",
        "Develop white-label capabilities",
        "Establish enterprise sales and onboarding process"
      ],
      
      timeline: {
        planning: "Enterprise requirements gathering (2 weeks)",
        phase1: "Security and authentication (4 weeks)",
        phase2: "Compliance and audit systems (3 weeks)",
        phase3: "Admin and management tools (3 weeks)",
        phase4: "Sales enablement (2 weeks)"
      },
      
      budget: {
        development: 150000,
        compliance_audit: 25000,
        security_testing: 15000,
        marketing_sales: 30000,
        total: 220000,
        currency: "USD"
      },
      
      assigned_team: "Enterprise Product & Engineering",
      target_completion: "2025-03-31",
      
      reasoning: {
        source: "Market analysis and revenue opportunity analysis",
        confidence: 0.85,
        priority: "critical",
        market_size: "$500M addressable enterprise market",
        competitive_position: "First-to-market advantage in our segment",
        revenue_impact: "Potential $5M annual revenue from enterprise tier"
      }
    });
    
    return proposal;
  }
};

// ============================================================================
// OPERATIONS ORCHESTRATOR
// ============================================================================
// Focuses on: Efficiency, process improvement, cost reduction

const operationsOrchestrator = {
  id: 'operations-orchestrator',
  name: 'Operational Excellence',
  proposer: 'Eliana',
  
  async evaluateDirective(directive) {
    // Example: "Our support costs are too high"
    // -> Generates proposal for automation
    
    const proposal = await autonomousProposal({
      title: "Customer Support Automation and Self-Service System",
      proposer: 'Eliana',
      description: "Build an intelligent support automation system including knowledge base, chatbot, and self-service features to reduce support costs by 40%.",
      orchestratorId: this.id,
      
      objectives: [
        "Create comprehensive knowledge base with 500+ articles",
        "Implement AI-powered support chatbot",
        "Build self-service ticketing and status system",
        "Develop ticket routing and automation rules",
        "Create customer community forum"
      ],
      
      timeline: {
        phase1: "Knowledge base structure and content (3 weeks)",
        phase2: "Chatbot implementation and training (2 weeks)",
        phase3: "Self-service portal development (3 weeks)",
        phase4: "Integration and optimization (2 weeks)"
      },
      
      budget: {
        development: 45000,
        ai_ml_services: 8000,
        content_creation: 15000,
        tools: 5000,
        total: 73000,
        currency: "USD"
      },
      
      assigned_team: "Customer Success & Engineering",
      target_completion: "2024-11-30",
      
      reasoning: {
        source: "Support ticket volume and cost analysis",
        confidence: 0.90,
        priority: "high",
        current_costs: "$200K annually for support team",
        projected_savings: "$80K annually (40% reduction)",
        payback_period: "10-11 months"
      }
    });
    
    return proposal;
  }
};

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/**
 * Example 1: How to use the Analytical Orchestrator
 */
async function example1_analyticalProposal() {
  console.log("\n📊 ANALYTICAL ORCHESTRATOR EXAMPLE\n");
  
  try {
    const proposal = await analyticalOrchestrator.evaluateDirective(
      "We need better user analytics"
    );
    
    console.log("✓ Proposal created:", proposal.id);
    console.log("  Title:", proposal.title);
    console.log("  Status:", proposal.status);
    console.log("  Confidence:", proposal.proposal_json.reasoning.confidence);
    
  } catch (error) {
    console.error("Error:", error.message);
  }
}

/**
 * Example 2: How to use the Creative Orchestrator
 */
async function example2_creativeProposal() {
  console.log("\n🎨 CREATIVE ORCHESTRATOR EXAMPLE\n");
  
  try {
    const proposal = await creativeOrchestrator.evaluateDirective(
      "Users want more customization"
    );
    
    console.log("✓ Proposal created:", proposal.id);
    console.log("  Title:", proposal.title);
    console.log("  Objectives:", proposal.proposal_json.objectives.length);
    
  } catch (error) {
    console.error("Error:", error.message);
  }
}

/**
 * Example 3: Chaining multiple proposals
 */
async function example3_multipleProposals() {
  console.log("\n🔗 MULTIPLE ORCHESTRATORS EXAMPLE\n");
  
  try {
    const proposals = [];
    
    proposals.push(await analyticalOrchestrator.evaluateDirective("Analytics"));
    console.log("✓ Analytical proposal created");
    
    proposals.push(await creativeOrchestrator.evaluateDirective("UX"));
    console.log("✓ Creative proposal created");
    
    proposals.push(await operationsOrchestrator.evaluateDirective("Operations"));
    console.log("✓ Operations proposal created");
    
    console.log(`\nTotal proposals: ${proposals.length}`);
    console.log("All proposals created successfully!");
    
  } catch (error) {
    console.error("Error:", error.message);
  }
}

/**
 * Example 4: Custom orchestrator
 */
async function example4_customOrchestrator() {
  console.log("\n🔧 CUSTOM ORCHESTRATOR EXAMPLE\n");
  
  const customOrchestrator = {
    id: 'custom-orchestrator',
    name: 'Custom Implementation',
    proposer: 'Sarah',
    
    async propose(title, description, objectives, budget) {
      return await autonomousProposal({
        title,
        proposer: this.proposer,
        description,
        orchestratorId: this.id,
        objectives,
        timeline: {
          phase1: "Planning (1 week)",
          phase2: "Implementation (4 weeks)",
          phase3: "Testing (1 week)"
        },
        budget,
        target_completion: "2024-12-31",
        reasoning: {
          source: "Custom orchestrator directive",
          confidence: 0.80,
          priority: "medium"
        }
      });
    }
  };
  
  try {
    const proposal = await customOrchestrator.propose(
      "Mobile App Development",
      "Build native iOS and Android applications",
      [
        "iOS app with core features",
        "Android app with core features",
        "Push notification system",
        "Offline support"
      ],
      {
        ios_development: 80000,
        android_development: 80000,
        infrastructure: 10000,
        total: 170000,
        currency: "USD"
      }
    );
    
    console.log("✓ Custom proposal created:", proposal.id);
    console.log("  Title:", proposal.title);
    
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Export for use in other modules
module.exports = {
  analyticalOrchestrator,
  creativeOrchestrator,
  strategicOrchestrator,
  operationsOrchestrator,
  example1_analyticalProposal,
  example2_creativeProposal,
  example3_multipleProposals,
  example4_customOrchestrator
};

// Uncomment to run examples when this file is executed directly:
// (async () => {
//   if (require.main === module) {
//     await example1_analyticalProposal();
//     await example2_creativeProposal();
//     await example3_multipleProposals();
//     await example4_customOrchestrator();
//   }
// })();
