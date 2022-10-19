import * as Yup from 'yup'

export const passwordSchema = Yup.object().shape({
  password: Yup.string().required('Password is required').min(4, 'Password length should be at least 4 characters'),
  passwordConfirm: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must and should match'),
})
