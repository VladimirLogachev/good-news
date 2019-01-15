/**
 * This module incapsulates the way app gets its settings, and provides typed values.
 * Other modules should not access `process.env`.
 * Target-specific values should be set in .env files
 */

export const env = {
  API_URL: process.env.API_URL,
  API_KEY: process.env.API_KEY,
  SOURCE_NAME: process.env.SOURCE_NAME,
  STORAGE_PREFIX: process.env.STORAGE_PREFIX,
  ALLOW_CONSOLE_OUTPUT: process.env.ALLOW_CONSOLE_OUTPUT === 'true',
  BASENAME: process.env.BASENAME
};

// TODO: we could also insure type-safety of config using JS's eager behavior and `runtypes`.
