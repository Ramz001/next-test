import { Logger } from "pino";

declare global {
  var logger: Logger | undefined;
}

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const pino = (await import("pino")).default;
    const pinoLoki = (await import("pino-loki")).default;

    const transport = pinoLoki({
      host: process.env.LOKI_HOST!,
      batching: true,
      interval: 5,
      labels: { job: "nextjs-app" },
    });

    const logger = pino(transport);
    globalThis.logger = logger;
  }
}
