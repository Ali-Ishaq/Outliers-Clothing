import * as Yup from 'yup'

export const logInFormSchema =Yup.object({
   
    username:Yup.string().required("* Field can not be empty"),
    password:Yup.string().required("* Field can not be empty")
    
})