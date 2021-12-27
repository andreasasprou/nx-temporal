const { bundleWorkflowCode } = require('@temporalio/worker');
const { writeFile } = require('fs/promises');

async function run() {
  const { code } = await bundleWorkflowCode({
    workflowsPath: require.resolve('./src/workflows.ts'),
  });

  await writeFile(
    './dist/out-tsc/apps/temporal-worker/src/workflow-bundle.js',
    code,
  );
}

run();
