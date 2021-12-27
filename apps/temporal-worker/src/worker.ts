import { bundleWorkflowCode, Worker } from '@temporalio/worker';
import * as activities from './activities';

async function run() {
  const worker = await Worker.create({
    workflowBundle: process.env.NODE_ENV === 'production'
      ? {
        path: './workflow-bundle.js',
      }
      : await bundleWorkflowCode({
        workflowsPath: require.resolve('./workflows'),
      }),
    activities,
    taskQueue: 'tutorial',
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
