import APP_CONFIG from '@constants/AppConfig.ts';

function log(...message: any[]) {
  if (APP_CONFIG.ENABLE_CONSOLE_LOG)
    console.log('[Log] MONIAPPLOG: ', ...message);
}

function info(...message: any[]) {
  if (APP_CONFIG.ENABLE_CONSOLE_LOG)
    console.info('[Info] MONIAPPLOG: ', ...message);
}

function warn(...message: any[]) {
  if (APP_CONFIG.ENABLE_CONSOLE_LOG)
    console.warn('[Warn] MONIAPPLOG: ', ...message);
}

function error(...message: any[]) {
  if (APP_CONFIG.ENABLE_CONSOLE_LOG)
    console.error('[Error] MONIAPPLOG: ', ...message);
}

const AppLogging = {
  log,
  info,
  error,
  warn,
}

export default AppLogging;
