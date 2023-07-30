import { cleanEnv, str } from "envalid";

const envVariables = cleanEnv(process.env, {
	SWA_API: str(),
});

export default envVariables;
