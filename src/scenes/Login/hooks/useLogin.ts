import { login } from '@networks/apis/auth';
import { useAuthStore } from '@stores/AuthStore';
import { useState } from 'react';
import { DefaultHandler } from '@type/FunctionHandler';

export default function useLogin() {
  const setAuth = useAuthStore(s => s.setAuth);
  const [username, setUsername] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [isLoading, setLoading] = useState(false);

  const validateUsername = () => {
    const exp = /^[\w-\.\d*]+@[\w\d]+(\.\w{2,4})$/;
    const valid = exp.test(username.value);
    if (valid) {
      setUsername(prevState => ({ ...prevState, error: '' }));
    } else {
      setUsername(prevState => ({ ...prevState, error: 'Email tidak valid' }));
    }
    return valid;
  };

  const validatePassword = () => {
    const exp = /^[a-zA-Z0-9-]{6,}\b$/;
    const valid = exp.test(password.value);
    if (valid) {
      setPassword(prevState => ({ ...prevState, error: '' }));
    } else {
      setPassword(prevState => ({
        ...prevState,
        error: 'Password minimal 6 karakter',
      }));
    }
    return valid;
  };

  const onChangeUsername = (value: string) => {
    setUsername({ value, error: '' });
  };

  const onChangePassword = (value: string) => {
    setPassword({ value, error: '' });
  };

  const loginUser = async () => {
    login(username.value, password.value).then((authData) => {
      setAuth(authData.access, {
        id: authData.id,
        role: authData.role,
        username: authData.username,
        status: authData.status,
        profile_id: authData.profile_id,
      });
    });

  };

  const handleSubmit = ({ onSuccess, onFailure }: DefaultHandler) => {
    const isValid = validateUsername() && validatePassword();
    if (isValid) {
      setLoading(true);
      loginUser()
        .then(() => {
          onSuccess?.();
        })
        .catch(() => {
          onFailure?.();
        })
        .finally(() => setLoading(false));
    }
  };

  return {
    isLoading,
    username: username.value,
    password: password.value,
    errors: {
      username: username.error,
      password: password.error,
    },
    onChangeUsername,
    onChangePassword,
    handleSubmit,
  };
}
