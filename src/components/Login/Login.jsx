"use client";
import { useState, useEffect } from 'react';
import { Link } from 'next/link';
// import { useRouter } from 'next/navigation';
import { useRouter } from 'next/router';
import { MdVisibilityOff, MdVisibility } from 'react-icons/md'
import { toast } from 'react-toastify'


function Login() {

  const [password, setPassword] = useState('admin0000')
  const [showPassword, setShowPassword] = useState(true)

  const router = useRouter()

  //logging in 
  const onSubmit = async (e) => {
    e.preventDefault()
    router.push('/dashboard/analytics')
    toast.success("Welcome !")
  }

  return (
    <div dir='ltr' className='w-screen h-screen grid grid-cols-1 grid-rows-1 justify-items-center items-center py-20 bg-primary text-neutral'>
      <div className="glass w-10/12 sm:w-6/12 lg:w-5/12 h-fit rounded-2xl py-10 px-4">
        <h2 className='mx-auto text-center text-3xl font-bold'>Welcome !</h2>
        <p className='mx-auto mt-12 text-center font font-bold'>Please Enter Your Password </p>
        <form onSubmit={onSubmit} className='mt-4 grid grid-cols-1 justify-items-center '>
          <input
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => { setPassword(e.target.value) }}
            value={password}
            placeholder="Password" className="input input-sm input-bordered text-black bg-neutral font-extrabold w-full max-w-xs"
          />
          {showPassword ? (
            <MdVisibility
              className='w-5 h-5 relative bottom-7 text-black left-28 sm:relative sm:right-0'
              onClick={() => { setShowPassword((prevState) => { return !prevState }) }}
            />
          ) : (
            <MdVisibilityOff
              className='w-5 h-5 text-black relative bottom-7 left-28 sm:relative sm:right-0'
              onClick={() => { setShowPassword((prevState) => { return !prevState }) }}
            />
          )}
          <div className="text-end w-8/12 mt-6">
            <button className="btn btn-ghost">submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
