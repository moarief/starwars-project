import { cleanEnv, host, str, url } from "envalid";

const env = cleanEnv(process.env, {
  NEXT_PUBLIC_SWA_API: str(),
  NEXT_PUBLIC_REDIS: str(),
  NEXT_PUBLIC_REDIS_TOKEN: str(),
});

export default env;
