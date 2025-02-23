'use client';
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      const response = await axios.post(`${backendUrl}/api/auth/login`, {
        email,
        password,
      });

      if (response.data.success) {
        
        localStorage.setItem('access_token', response.data.access_token);

      
        router.push('/todos');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">

          <div className="pb-12 text-center">
            <h1 className=" text-white  bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Welcome back
            </h1>
          </div>

          <form className="mx-auto max-w-[400px]">
            <div className="space-y-5">
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-white"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input w-full rounded-[10px] text-black p-2.5"
                  placeholder="Your email"
                />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between gap-3">
                  <label
                    className="block text-sm font-medium text-white "
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Link
                    className="text-sm text-gray-600 hover:underline"
                    href="/reset-password"
                  >
                    Forgot?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input w-full p-2.5 rounded-[10px] text-black"
                  placeholder="Your password"
                />
              </div>
            </div>


            <div className="mt-6 space-y-5">
              <button
                type="button"
                onClick={handleLogin}
                className="btn w-full bg-linear-to-t rounded-[10px] from-indigo-600 py-[5px] to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
              >
                Sign in
              </button>
            </div>
          </form>

  
          <div className="mt-6 text-center text-sm text-white">
            Don't you have an account?{" "}
            <Link className="font-medium text-indigo-500" href="/">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}