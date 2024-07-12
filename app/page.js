import Link from 'next/link'
export default function Home() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className='h-[85vh]'>
<div className="h-[40vh] bg-gradient-to-r from-cyan-500 to-blue-500 flex gap-2 items-center justify-center">
  <button className='bg-blue-950 h-10 rounded-md'>
    get started
  </button>
  <button className='bg-blue-950 h-10 rounded-md'>
    <Link href="/about">Learn more </Link>
  </button>

</div>
<div className="bg-slate-400 h-1 w-full"></div>

<div className="h-[40vh] bg-gradient-to-r from-cyan-500 to-blue-500">
  this is main page
</div>

<div className=" bg-blue-500 h-10 w-full m-1">
          <p>&copy; {currentYear} Your Website Name. All Rights Reserved.</p>
        </div>
        
    </div>
  );
}
