import { I18nManager } from 'react-native';

export const disableRTL = () => {
    try {
        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);
        I18nManager.swapLeftAndRightInRTL(false);
    }
    catch (e) {
        console.log('MoniAppLog', e);
    }
};

