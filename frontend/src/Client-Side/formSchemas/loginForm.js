import * as Yup from 'yup'


export const loginFormSchema =Yup.object({
 

    fullName: Yup.string().min(3,"Can't be less than 3 characters").max(20,"Can't be greater than 20 characters").required('*Required'),
    username: Yup.string().min(3,"Can't be less than 3 characters").max(20,"Can't be greater than 20 characters").required('*Required'),
    phone: Yup.string().length(10,'Number must be of 11 digits').required('*Required'),
    email: Yup.string().email().required('*Required'),
    password:Yup.string().min(3,"Can't be less than 3 characters").max(20,"Can't be greater than 20 characters").required('*Required'),

})