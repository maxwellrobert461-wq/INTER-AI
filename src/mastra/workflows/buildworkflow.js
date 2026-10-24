import { Workflow, Step } from '@mastra/core';
import { z } from 'zod';

const planStep = new Step({
  id: 'plan',
  execute: async ({ context }) => {
    return { plan: `Build ${context.query} with responsive modern UI and working JS` };
  }
});

const buildStep = new Step({
  id: 'build',
  execute: async ({ context, mastra }) => {
    const agent = mastra.getAgent('builderAgent');
    const res = await agent.generate(`Build: ${context.plan}. Return ONLY full HTML.`);
    return { html: res.text };
  }
});

export const buildWorkflow = new Workflow({
  name: 'build-workflow',
  triggerSchema: z.object({ query: z.string() }),
});

buildWorkflow.step(planStep).then(buildStep).commit();