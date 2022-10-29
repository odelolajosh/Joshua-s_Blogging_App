const { format, createLogger, transports } = require('winston');
const { combine, timestamp, label, printf, prettyPrint, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    colorize(),
    prettyPrint(),
    myFormat
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
  ]
});

module.exports = logger;