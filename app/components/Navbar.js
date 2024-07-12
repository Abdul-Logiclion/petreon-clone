// NavBar.js
'use client'
import Link from 'next/link';
import Component from './login-btn'; // Renamed from login-btn.js to Component.js

export default function NavBar() {
  
  return (
    <>
      <div className="bg-blue-500 h-14 w-full flex justify-between mt-1 mb-2 ">
        <h1 className="text-xl">
          <Link href="/">Get Me a</Link>
        </h1>
        <div className="flex items-center">
          
            <Component />
          
        </div>
      </div>
    </>
  );
}
