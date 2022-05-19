import * as yup from 'yup';

const validationEdit = yup.object().shape({
  name: yup
    .string()
    .required('Username is required')
    .min(4, 'Username must be at least 4 characters')
    .max(20, 'Username must not exceed 20 characters'),
  login: yup
    .string()
    .required('Username is required')
    .min(4, 'Username must be at least 4 characters')
    .max(20, 'Username must not exceed 20 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
});

const validationLogin = yup.object().shape({
  login: yup
    .string()
    .required('Login is required')
    .min(4, 'Login must be at least 4 characters')
    .max(20, 'Login must not exceed 20 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
});
const validationRegister = yup.object().shape({
  name: yup
    .string()
    .required('Username is required')
    .min(4, 'Username must be at least 4 characters')
    .max(20, 'Username must not exceed 20 characters'),
  login: yup
    .string()
    .required('Username is required')
    .min(4, 'Username must be at least 4 characters')
    .max(20, 'Username must not exceed 20 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
});

const validationShema = {
  validationEdit,
  validationLogin,
  validationRegister,
};
export default validationShema;
