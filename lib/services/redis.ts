import { Redis } from "@upstash/redis";

export const redisClient = new Redis({
  url: "https://living-mongoose-43881.upstash.io",
  token:
    "AatpASQgOGNlMGRjMTItMzdiNy00ODYyLWI5NTQtMmU5NWNkZmZkZDU3ZGI4NDc5NzM3ZDkxNDEzYzljY2Y0NzIxZjY0N2YyYTc=",
});
