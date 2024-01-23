import * as Yup from 'yup'


export const billingAddressSchema =Yup.object({
    firstname:Yup.string().min(3,"Can't be less than 3 characters").max(20,"Can't be greater than 20 characters").required('*Required'),
    lastName:Yup.string().min(3,"Can't be less than 3 characters").max(20,"Can't be greater than 20 characters").required('*Required'),
    streetAddress:Yup.string().min(3,"Street Address must be at least 3 characters").max(100).required('*Required'),
    country:Yup.string().matches(/^[A-Za-z]+$/,'Invalid country name').min(3,'Invalid country name').max(25,'Invalid country name').required('*Required'),
    city:Yup.string().matches(/^[A-Za-z]+$/,'Invalid city name').min(3,'Invalid city name').max(25,'Invalid city name').required('*Required'),
    email:Yup.string().email().required('*Required'),
    phone:Yup.string().length(10,'Number must be of 11 digits').required('*Required'),
    zip:Yup.string().min(2,'Invalid Zip').max(9,'Invalid Zip').required('*Required')

})