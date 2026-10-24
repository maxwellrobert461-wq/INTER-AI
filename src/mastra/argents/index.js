import { Agent } from '@mastra/core';
import { createGroq } from '@ai-sdk/groq';
const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

export const builderAgent = new Agent({
  name: 'BuilderAgent',
  instructions: `You are INTER AI builder. Build ONE complete working HTML file. Use <script src="https://cdn.tailwindcss.com"></script>. Must include CSS and JS inside. No markdown, no triple backticks. Start with <!DOCTYPE html>`,
  model: { provider: groq, name: 'llama-3.3-70b-versatile' },
});

export const domainAgent = new Agent({
  name: 'DomainAgent',
  instructions: 'You are domain expert. Suggest short .com names.',
  model: { provider: groq, name: 'llama-3.3-70b-versatile' },
});

export const billingAgent = new Agent({
  name: 'BillingAgent',
  instructions: 'Explain pricing: 20k with free domain + hosting, 10k with own domain. Both unlimited builds.',
  model: { provider: groq, name: 'llama-3.3-70b-versatile' },
});