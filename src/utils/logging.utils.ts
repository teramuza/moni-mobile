import APP_CONFIG from '@constants/AppConfig.ts';

function log(message: any, ...optionalParams: any[]) {
  const _messages = [message, ...optionalParams];
  if (APP_CONFIG.ENABLE_CONSOLE_LOG)
    console.log('[Log] MONIAPPLOG: ', ..._messages);
}

function info(message: any, ...optionalParams: any[]) {
  const _messages = [message, ...optionalParams];
  if (APP_CONFIG.ENABLE_CONSOLE_LOG)
    console.info('[Info] MONIAPPLOG: ', ..._messages);
}

function warn(message: any, ...optionalParams: any[]) {
  const _messages = [message, ...optionalParams];
  if (APP_CONFIG.ENABLE_CONSOLE_LOG)
    console.warn('[Warn] MONIAPPLOG: ', ..._messages);
}

function error(message: any, ...optionalParams: any[]) {
  const _messages = [message, ...optionalParams];
  if (APP_CONFIG.ENABLE_CONSOLE_LOG)
    console.error('[Error] MONIAPPLOG: ', ..._messages);
}

const AppLogging = {
  log,
  info,
  error,
  warn,
}

export default AppLogging;
