import {fetchProfile} from '@/features/profileSlice';
import {loginSubmit} from '@/pages/api/api';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {Toaster, toast} from 'react-hot-toast';
import {useDispatch} from 'react-redux';

export default function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const dispatch = useDispatch();

  const loginClick = () => {
    loginSubmit(email, password).then((res) => {
      if (res.ok) {
        dispatch(fetchProfile());
      } else {
        toast.error('incorrect password or email');
      }
    });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(document.getElementById('googleButton'), {
        theme: 'outline',
        size: 'large',
      });
    };
    document.body.appendChild(script);
  }, []);

  const handleCredentialResponse = async (response) => {
    const credential = response.credential;
    const res = await fetch(
      new URL('/google-login', process.env.NEXT_PUBLIC_BACKEND),
      {
        method: 'POST',
        body: JSON.stringify({
          id_token: credential,
        }),
        credentials: 'include',
      }
    );
    if (res.ok) {
      dispatch(fetchProfile());
    } else {
      console.log('error');
    }
  };

  return (
    <>
      <Toaster></Toaster>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              loginClick();
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="flex items-center flex-col gap-3 mt-7">
            <button id="googleButton"></button>
          </div>
          <div className="flex flex-col gap-2 mt-10">
            <p className="text-gray-500 ">Do not have an account yet?</p>
            <Link href={'/register'}>
              <button className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Create Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
