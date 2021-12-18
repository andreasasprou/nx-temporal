import { Worker } from '@temporalio/worker';
import * as activities from '@nx-temporal/activities';
import { environment } from './environments';
import * as path from 'path';

const workflowOption = () =>
  environment.production
    ? { workflowBundle: { path: path.resolve('./dist/libs/workflows/src/index.js') } }
    : { workflowsPath: require.resolve('./workflows.ts') }

async function run() {
  const worker = await Worker.create({
    ...workflowOption(),
    activities,
    taskQueue: 'tutorial',
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
