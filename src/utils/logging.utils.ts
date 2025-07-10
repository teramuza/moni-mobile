import APP_CONFIG from 'constants/AppConfig.ts';

function log(...args: any[]) {
  if (APP_CONFIG.ENABLE_CONSOLE_LOG)
    console.log('[Log] MONIAPPLOG: ', ...args);
}

function info(...args: any[]) {
  if (APP_CONFIG.ENABLE_CONSOLE_LOG)
    console.info('[Info] MONIAPPLOG: ', ...args);
}

function warn(...args: any[]) {
  if (APP_CONFIG.ENABLE_CONSOLE_LOG)
    console.warn('[Warn] MONIAPPLOG: ', ...args);
}

function error(...args: any[]) {
  if (APP_CONFIG.ENABLE_CONSOLE_LOG)
    console.error('[Error] MONIAPPLOG: ', ...args);
}

const AppLogging = {
  log,
  info,
  error,
  warn,
}

export default AppLogging;
