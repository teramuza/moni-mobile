import {useInitialRoute} from "@navigations/InitialRoute.hooks.ts";
import {useEffect} from "react";
import {navigate} from "@navigations/Navigation.service.ts";
import LoginScene from "@scenes/Login/Login.scene.tsx";
import LoggingUtils from "@utils/logging.utils.ts";

const useLoadingApp = () => {
    const route = useInitialRoute();

    useEffect(() => {
      LoggingUtils.log('route', route);
        let _navigate = () => {};
        if (route !== "Loading") {
            if (route === 'Login') {
                _navigate = () => navigate(LoginScene.name)
            }
            else if (route === 'DashboardSalesWithSession') {

            }
            else if (route === 'DashboardSalesWithoutSession') {

            }
            else if (route === 'DashboardSupervisor') {

            }
        }
        let navigationTimer = setTimeout(_navigate, 3 * 1000);
        return () => {
            clearTimeout(navigationTimer);
        };
    }, [route]);
}

export default useLoadingApp;
