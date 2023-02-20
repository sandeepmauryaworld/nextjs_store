import CheckOutWizard from '@/components/CheckOutWizard'
import Layout from '@/components/Layout'
import { Store } from '@/utils/Store';
import Cookies from 'js-cookie';
import { Router, useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form';


const ShippingScreen = () => {

    const { handleSubmit,register, formState:{errors},
setValue }= useForm();

const {state, dispatch} = useContext(Store)
const {cart}= state;
const {shippingAddress}= cart;
const router= useRouter();

useEffect(() => {
   setValue('fullName', shippingAddress.fullName)
   setValue('location', shippingAddress.location)
   setValue('city', shippingAddress.city)
   setValue('address', shippingAddress.address)
   setValue('postalCode', shippingAddress.postalCode)
},[setValue, shippingAddress]);



const submitHandler=({fullName, city, address, postalCode, country} )=>{

    dispatch({type:'SAVE_SHIPPING_ADDRESS',
    payload:{fullName, address, city, postalCode , country, location}
    });
    Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          shippingAddress: {
            fullName,
            address,
            city,
            postalCode,
            country,
          },
        })
      );

    router.push('/payment')

}
  return (
    <Layout title="Shipping Address. ">

        <CheckOutWizard activeStep={1}/>

        <form
        className='mx-auto max-w-screen-md'
        onSubmit={handleSubmit(submitHandler)}>
            <h1 className='mb-4 text-xl'>Shipping Address</h1>
            <div className='mb-4'>
                <label htmlFor='FullName'>Full Name</label>
                <input 
                className='w-full'
                id='FullName'
                autoFocus{...register('fullName', {
                    required:'Please enter full name', 
                })}
                />
                {errors.fullName && (
                    <div className='text-red-500'>{errors.fullName.message} </div>
                )}
            </div>
            <div className='mb-4'>
                <label htmlFor='address'>Address</label>
                <input 
                className='w-full'
                id='address'
                {...register('address', {
                    required:'Please enter full Address', 
                    minLength:{value:3 , message:"Address more then 2 char"},
                })}
                />
                {errors.address && (
                    <div className='text-red-500'>{errors.address.message} </div>
                )}
            </div>
            <div className='mb-4'>
                <label htmlFor='city'>City</label>
                <input 
                className='w-full'
                id='city'
                {...register('city', {
                    required:'Please enter full City', 
                    minLength:{value:3 , message:"City more then 2 char"},
                })}
                />
                {errors.city && (
                    <div className='text-red-500'>{errors.city.message} </div>
                )}
            </div>
            <div className='mb-4'>
                <label htmlFor='postal code'>Postal Code</label>
                <input 
                className='w-full'
                id='postalCode'
                {...register('postalCode', {
                    required:'Please enter full Postal Code', 
                   
                })}
                />
                {errors.postalCode && (
                    <div className='text-red-500'>{errors.postalCode.message} </div>
                )}
            </div>
            <div className='mb-4'>
                <label htmlFor='country'>Country</label>
                <input 
                className='w-full'
                id='country'
                {...register('country', {
                    required:'Please enter Country', 
                    
                })}
                />
                {errors.country && (
                    <div className='text-red-500'>{errors.country.message} </div>
                )}
            </div>

            <div className='mb-4 flex justify-between'>
                <button className='primary-button'>Next  </button>
            </div>
        </form>
    </Layout>
  )
}

export default ShippingScreen

ShippingScreen.auth= true;