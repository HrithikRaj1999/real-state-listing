import { createLogger, format, transports } from "winston";
const { combine, timestamp, prettyPrint } = format;

export const logger = createLogger({
  format: combine(
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    prettyPrint({ colorize: true }),
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "logs/backend_logs.log",
    }),
    new transports.File({
      level: "error",
      filename: "logs/error.log",
    }),
  ],
});
