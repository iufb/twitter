import React from 'react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
function Login({ providers }) {
  return (
    <div className="flex flex-row align-center ">
      <div
        className="w-[1040px] h-[880px] flex align-center justify-center"
        style={{ backgroundImage: 'url(../logimg.png)' }}
      >
        <Image
          src="https://rb.gy/ogau5a"
          width={349}
          height={284}
          objectFit="contain"
         
        />
      </div>
      <div className="w-[880px] h-[880px]">
        <div className="space-y-[60px] ml-[35px]">
          <img
            src="https://rb.gy/ogau5a"
            width={42}
            height={34}
            objectFit="contain"
            className="mt-[40px] "
          />
          <h1 className="mt-7 text-white font-bold text-7xl">
            Aware <br /> of what is happening
          </h1>
          <h3 className="text-white font-bold text-4xl ">Join Twitter now!</h3>
          <div>
            <a
              href="#_"
              className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-sans tracking-normal font-bold  text-white  bg-gray-800 rounded-lg group w-[228px] h-[56px]"
              onClick={() => signIn(providers.google.id, { callbackUrl: '/' })}
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
              <span className="relative">
                Sign in with {providers.google.name}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
