import {CommonActions, createNavigationContainerRef, StackActions} from '@react-navigation/native';
import SplashScreenScene from "@scenes/SplashScreen/SplashScreen.scene.tsx";

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params?: any) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name as never, params as never);
    }
}

export function replace(name: string, params?: any) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(name, params));
    }
}

export function goBack() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.goBack();
    }
}

export const reInitScreenApp = () => {
    navigationRef.current?.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{ name: SplashScreenScene.name }],
        })
    );
};

export function getCurrentRoute() {
    if (navigationRef.isReady()) {
        return navigationRef.getCurrentRoute();
    }
    return null;
}
