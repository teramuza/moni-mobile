import {useState} from 'react';

export function useLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();

  // const isValidEmail = !isEmpty(email) && !isEmpty(emailError);
  // const isValidPass = !isEmpty(password) && !isEmpty(passwordError);
  //
  // const isValid = isValidEmail && isValidPass;

  // const validateEmail = () => {
  //   const isValid = isValidEmail(email);
  //   if (!isValid) {
  //     setEmailError("Email tidak valid");
  //   }
  // };

  return {
    email,
    password,
    emailError,
    passwordError,
    setEmail,
    setPassword,
  };
}
