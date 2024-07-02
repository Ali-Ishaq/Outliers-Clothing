import * as Yup from 'yup'

export const addProductSchema =Yup.object({
    title:Yup.string().min(2,"This Field must contain atleast 2 Characters").max(60).required("* This field is mandatory"),
    description:Yup.string().min(15 ,"Product Description can not be less than 15 Characters").max(2000).required("* This field is mandatory"),
    price:Yup.number().required("* This field is mandatory"),
    thumbnail:Yup.string().min(2,"Invalid Link").required("* This field is mandatory"),
    category: Yup.string().required('* This field is mandatory'),
    images: Yup.array().required('* This field is mandatory'),
    quantity:Yup.array().of(Yup.number().required('* all fields are mandatory')).required('* all fields are mandatory').min(3,'* all fields are mandatory')

})