"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';


const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(10, 'Password must be at least 10 characters').required('Password is required'),
});

type FormData = yup.InferType<typeof schema>;

export default function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });


  type FormData = yup.InferType<typeof schema>; 
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await axios.post(`${backendUrl}/api/auth/register`, data);
  
  
      if (response.status === 201) {
        toast.success('Registration successful! Redirecting to login...');
  
        setTimeout(() => {
          router.push('/auth'); 
        }, 2000); 
      }
    } catch (error) {
      console.error('Registration failed', error);
  
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.error('Email already in use');
        } else {
          toast.error('Registration failed. Please try again.');
        }
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
         
          <div className="pb-12 text-center">
            <h1 className=" text-white animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Create an account
            </h1>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-[400px]">
            <div className="space-y-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-white" htmlFor="name">
                  Name <span className="text-[#FEC242]">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  className="rounded-[6px] w-full p-2.5  text-black"
                  placeholder="Your full name"
                  {...register('name')}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-white" htmlFor="email">
                  Email <span className="text-[#FEC242]">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-input rounded-[6px] w-full p-2.5  text-black"
                  placeholder="Your email"
                  {...register('email')}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-white" htmlFor="password">
                  Password <span className="text-[#FEC242]">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-input w-full rounded-[6px] p-2.5  text-black"
                  placeholder="Password (at least 10 characters)"
                  {...register('password')}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
            </div>
            <div className="mt-6 space-y-5">
          
              <button
                type="submit"
                className="btn w-full bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] py-[5px] rounded-[10px] hover:bg-[length:100%_150%]"
              >
                Register
              </button>
             
            </div>
          </form>
  
          <div className="mt-6 text-center text-sm text-white">
            Already have an account?{' '}
            <Link className="font-medium text-indigo-500" href="/auth">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}