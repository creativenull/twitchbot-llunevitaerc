import Logger from "https://deno.land/x/logger@v1.0.2/logger.ts";
import { config } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";

const env = config({ safe: true });

const logger = new Logger()
await logger.initFileLogger(env.LOGGER_PATH);
logger.disableConsole();

export default logger;
