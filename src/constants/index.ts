export const SESSION_NAME = "uid";
export const SESSION_SECRET = process.env.SESSION_SECRET || "123";
export const SMTP_HOST = process.env.SMTP_HOST || "";
export const SMTP_PORT = parseInt(process.env.SMTP_PORT!);
export const MAIL_USERNAME = process.env.MAIL_USERNAME;
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
