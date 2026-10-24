import { Mastra } from '@mastra/core';
import { builderAgent, domainAgent, billingAgent } from './agents';
import { buildWorkflow } from './workflows/buildWorkflow';

export const mastra = new Mastra({
  agents: { builderAgent, domainAgent, billingAgent },
  workflows: { buildWorkflow },
});