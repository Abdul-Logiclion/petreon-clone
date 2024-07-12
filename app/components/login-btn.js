// Component.js
'use client'
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import Dropdown from './Dropdown'
export default function Component() {
  const { data: session, status } = useSession();
  const router = useRouter()

  const handleSignOut = async () => {
    const confirmed = window.confirm('Do you want to sign out?');
    if (confirmed) {
  console.log(session);
      await signOut({redirect:true, callbackUrl: '/' })
      
    }
  };

  // If the session is loading, show a loading indicator
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // If the session exists and user is signed in, redirect to profile page
  if (session) {
    // Render nothing while redirecting
    router.push('/dashboard')
      return (<div className='mr-2'>
      
        <p>Signed in as {session.user.email}</p>
        <Dropdown/>
<button onClick={handleSignOut} className='bg-red-700 text-white py-2 px-4 ml-4 rounded '>
    Sign Out
  </button>

      </div>
      )
  }

  // If user is not signed in, show sign-in button
  return (
    <div className="flex items-center">
      <button className='bg-red-700 text-white py-2 px-4 rounded mr-2'>
      <Link href="/login">
    Sign In
      </Link>
      </button>
    </div>
  );
}
