import winston from "winston"
import { isProduction } from "../../utils/helpers"

// Define your severity levels.
// With them, You can create log files,
// see or hide levels based on the running ENV.
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

// This method set the current severity based on the current NODE_ENV:
// show all the log levels if the server is run in development mode; otherwise, if it was run in production, show only warn and error messages.
const level = isProduction ? "warn" : "debug"

// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "blue",
}

// Tell winston that you want to link the colors
// defined above to the severity levels.
winston.addColors(colors)

const format = winston.format.combine(
    winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    winston.format.printf(({
                               timestamp,
                               level,
                               message
                           }) => `timestamp: ${timestamp} ${level}: ${JSON.stringify(message)}`)
)

// Define which transports the logger must use to print out messages.
const transports = [
    // Allow the use the console to print the messages
    new winston.transports.Console({ format: winston.format.colorize({ all: true }) }),
    // Allow to print all the info level messages inside the info.log file
    new winston.transports.File({
        filename: "logs/info.log",
        level: "info",
    }),
    // Allow to print all the error level messages inside the error.log file
    new winston.transports.File({
        filename: "logs/error.log",
        level: "error",
    }),
]

// Create the logger instance that has to be exported
// and used to log messages.
export const logger = winston.createLogger({
    level,
    levels,
    format,
    transports,
})
