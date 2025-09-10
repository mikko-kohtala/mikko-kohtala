import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    APP_ENV: z.enum(["local", "development", "production"]),
  },
  client: {},
  runtimeEnv: {
    APP_ENV: process.env.APP_ENV,
  },
});
