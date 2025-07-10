import {login} from '@networks/apis/auth';
import {useAuthStore} from '@stores/AuthStore';

export function useLogin() {
    const setAuth = useAuthStore(s => s.setAuth);

    const loginUser = async (username: string, password: string) => {
        const authData = await login(username, password);
        setAuth(authData.access, {
            id: authData.id,
            role: authData.role,
            username: authData.username,
            status: authData.status,
        });
    };

    return {loginUser};
}
