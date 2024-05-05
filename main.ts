import { execSync } from "node:child_process";
import { Worker } from "node:worker_threads";

const threadQty = parseInt(execSync(`ps -M ${process.pid} | wc -l`).toString());

const createThread = ({ to }: { to: number }) => {
  const worker = new Worker("./worker.mjs");

  worker.once("message", ({ count }) => {
    console.info("count: ", count);
  });

  worker.postMessage({ to });
};

console.info("Current thread count: ", threadQty);

[
  1e10, 2e10, 1e5, 1e3, 1e10, 2e10, 1e5, 1e3, 1e10, 1e5, 1e3, 1e10, 1e5, 1e3,
  1e10, 2e3,
].forEach((to) => {
  createThread({ to });
});
