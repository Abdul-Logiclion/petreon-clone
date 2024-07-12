'use client'

import Image from 'next/image';
import { useState ,useEffect} from 'react';
import { useSession } from 'next-auth/react';
export default function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    amount: 0,
  });

  const { data: session, status } = useSession();

  const [email,setEmail]=useState(session?.user?.email)

  const [profilePic,setprofilePic]=useState("");
  const [coverPic,setcoverPic]=useState("")
  const [payments, setPayments] = useState([]);

  useEffect(()=>{
     
  const fetchData=async ()=>{
    const result=await fetch('/api/payment');
    const data = await result.json();
    
   // const paymentData=await JSON.parse(JSON.stringify(data.data))

   if (data && Array.isArray(data.data)) {
    if (data.data.length === 0) {
      console.log("Fetch returned an empty array.");
      // Handle the case where data.data is an empty array
      // For example, set a default state or show a message
    } else {
      setPayments(data.data); // Set payments array
      console.log("Payments data:", data.data); // Log the array of payments
    }
  } else {
    console.error("Invalid data format:", data);
    // Handle the case where data is not in the expected format
    // For example, show an error message or handle it appropriately
  }
  

  }


  const setImages= async ()=>{
    
    const data = await getData(); // Assuming getData is defined elsewhere
    if (data && data.data && data.data.length > 0) {
      const { coverPic,profilePic } = data.data[0];
     setprofilePic(JSON.parse(JSON.stringify(coverPic)));
     setcoverPic(JSON.parse(JSON.stringify(profilePic)));;
  }
}
  fetchData();
  setImages();
  
  },[session,formData]);
 

  const getData= async ()=>{
        
    if(!email)
      {
        console.log(" email stilll emtpy",session?.user?.email)
        setEmail(session?.user?.email)
      }
      console.log("email is : ",email)
  const result=await fetch(`/api/dashboard?param1=${email}`);
    const data = await result.json();
    
    return data;
      }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(JSON.stringify(data));
    } catch (error) {
      console.error('Error making payment:', error);
    }
  }
  

  return (
    <>
      <div className='h-[calc(95vh-70px)]'>
        <div className="relative h-[50vh]">
          <Image
            src={coverPic.startsWith('https://') || coverPic.startsWith('http://')?coverPic: "/Space Symposium graphic_1920x1080.jpg"}
            alt="Space Symposium Graphic"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
          <div className="absolute -bottom-7 inset-x-0 flex justify-center mb-3">
            <div className='h-[120px] w-[120px] relative'>
              <Image
                src={profilePic.startsWith('https://') || profilePic.startsWith('http://')?profilePic:"/bird-341898_1280.jpg"}
                alt="Bird Image"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          </div>
        </div>
        <div className='flex-1 flex flex-col md:flex-row p-4 gap-4 mt-3'>
          <div className='flex-1 bg-blue-500 p-4 rounded-md flex flex-col justify-start items-center'>
            <form className='w-full max-w-sm' onSubmit={handleSubmit}>
              <h2 className='text-white text-2xl mb-4'>Payment Form</h2>
              <div className='mb-3'>
                <label className='block text-white text-sm font-bold mb-1' htmlFor='name'>Name</label>
                <input
                  className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  id='name'
                  type='text'
                  placeholder='Your Name'
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className='mb-3'>
                <label className='block text-white text-sm font-bold mb-1' htmlFor='message'>Message</label>
                <input
                  className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  id='message'
                  type='text'
                  placeholder='Your Message'
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              <div className='mb-3'>
                <label className='block text-white text-sm font-bold mb-1' htmlFor='amount'>Amount</label>
                <input
                  className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                  id='amount'
                  type='number'
                  placeholder='Amount'
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
              <button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                Pay Now
              </button>
            </form>
            <div className='flex gap-3 mt-4'>
              <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='button'>
                Pay 10$
              </button>
              <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='button'>
                Pay 20$
              </button>
              <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='button'>
                Pay 30$
              </button>
            </div>
          </div>
          <div className='flex-1 bg-blue-500 p-4 rounded-md overflow-y-auto'>
            <h2 className='text-white text-2xl mb-4'>Latest Payments</h2>
            <ul className='space-y-2'>
              {/* Replace with dynamic data */}

                {payments.map((item,key)=>{
                 
                 return <li className='flex justify-between items-center text-white'>
                <span>{item.name}   Donated {item.amount}$ with a message  {item.message}❤️ 
                
                </span>
              </li>
              })
              
              }

            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
