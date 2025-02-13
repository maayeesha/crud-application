import { createLogger, format, transports } from "winston";

// Log display format
const customFormat = format.printf(({ timestamp, level, stack, message }) => {
    return `${timestamp} - [${level.toUpperCase().padEnd(7)}] - ${stack || message}`;
});

const logFilePath = "/Users/admin/Projects/hospital-prisma/";

const options = {
    fileError: {
        filename: `${logFilePath}error.log`,
        level: 'error',
    },
    fileInfo: {
        filename: `${logFilePath}combine.log`,
        level: 'info',
    },
    console: {
        level: 'silly',
    }
};

// Common logger settings
const commonLoggerSettings = {
    format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        customFormat
    ),
    transports: [
        new transports.Console(options.console),
        new transports.File(options.fileError),
        new transports.File(options.fileInfo),
    ]
};

// Create logger instance
export const instance = createLogger(commonLoggerSettings);
