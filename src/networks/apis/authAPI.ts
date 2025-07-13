const LoginURL = '/users/login';
const RegisterURL = '/users/register';
const RegisterProfileURL = (id: number) => `/users/register/${id}`;


export default {LoginURL, RegisterURL, RegisterProfileURL};
