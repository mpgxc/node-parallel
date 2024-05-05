import { parentPort, threadId } from "node:worker_threads";

parentPort.once("message", ({ to }) => {
  console.time("task-" + threadId);

  let count = 0;

  for (let i = 1; i <= to; i++) {
    count += 1;
  }

  console.log("-".repeat(20));

  console.timeEnd("task-" + threadId);

  parentPort.postMessage({ count });
});
