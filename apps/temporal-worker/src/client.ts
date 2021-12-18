import { Connection, WorkflowClient } from '@temporalio/client';

async function run() {
  const connection = new Connection();

  const client = new WorkflowClient(connection.service);

  const handle = await client.start('example', {
    args: ['Temporal'],
    taskQueue: 'tutorial',
    workflowId: 'my-business-id',
  });

  console.log(`Started workflow ${handle.workflowId}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

