// pages/login/page.js
"use client"

import { signIn} from 'next-auth/react';

import { FaGoogle, FaFacebook, FaGithub, FaApple } from 'react-icons/fa';

const providersList = [
  { id: 'google', name: 'Google' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'github', name: 'GitHub' },
  { id: 'apple', name: 'Apple' },
];

export default function LoginPage() {
 

  return (

      <div className="h-[88vh] flex items-center justify-center bg-blue-500">
        <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-center text-2xl font-bold">Log in to Your Account</h2>

          <div className="flex flex-col space-y-4">
            {providersList.map(provider => (
              <button
                key={provider.id}
                className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 p-3 rounded-lg"
                onClick={() => signIn(provider.id)}
              >
                {getProviderIcon(provider.id)} {/* Function to display provider icon */}
                <span className="ml-2">{capitalize(provider.name)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
  
  );
}

// Function to get provider icon based on provider ID
function getProviderIcon(providerId) {
  switch (providerId) {
    case 'google':
      return <FaGoogle className="w-6 h-6" />;
    case 'facebook':
      return <FaFacebook className="w-6 h-6" />;
    case 'github':
      return <FaGithub className="w-6 h-6" />;
    case 'apple':
      return <FaApple className="w-6 h-6" />;
    default:
      return null;
  }
}

// Function to capitalize the first letter of a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
