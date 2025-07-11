import Config from 'react-native-config';

const APP_CONFIG = {
  API_URL: Config.API_URL,
  ENABLE_CONSOLE_LOG: Boolean(Config.ENABLE_CONSOLE_LOG),
};

export default APP_CONFIG;
