'use client'

import { useState ,useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { format } from 'path';
export default function Profile() {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [email,setEmail]=useState(session?.user?.email)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    profilePic: '',
    coverPic: '',
    account: '',
    paymentMethod: '',
  });


      

  useEffect(() => {
    const fetchData = async () => {
      try {

        const data = await getData(); // Assuming getData is defined elsewhere
        if (data && data.data && data.data.length > 0) {
          const { email, ...rest } = data.data[0];
          setFormData(rest);

        } else {
          console.error('No data found or invalid data structure.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [session]); // Ensure useEffect runs when session or email changes
      // Call fetchData and initializeGoogleSignIn
      const getData= async ()=>{
        

        if(!email)
        {
          console.log(" email stilll emtpy",session.user.email)
          setEmail(session?.user?.email)
        }
        console.log("email is : ",email)
    const result=await fetch(`/api/dashboard?param1=${email}`);
    const data = await result.json();
    return data;
      }
    
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handlePaymentMethodSelect = (method) => {
    setFormData({ ...formData, paymentMethod: method });
    setDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...formData,email:email}),
      });
      const data = await response.json();
      console.log(JSON.stringify(data));
      if (response.ok) {
        console.log('Data sent successfully');
      } else {
        console.log('Error sending data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="h-[87vh] bg-blue-500 p-4">
      <form className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            readOnly
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          
          <label htmlFor="profilePic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Pic</label>
          <input
            type="text"
            id="profilePic"
            value={formData.profilePic}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          
          <label htmlFor="coverPic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Pic</label>
          <input
            type="text"
            id="coverPic"
            value={formData.coverPic}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          
          <div className="m-2">
            <button
              id="dropdownHoverButton"
              onClick={toggleDropdown}
              className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Dropdown
              <svg className="w-2.5 h-2.5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            {dropdownOpen && (
              <div id="dropdownHover" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handlePaymentMethodSelect('Easypaisa')}>Easypaisa</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handlePaymentMethodSelect('JazzCash')}>JazzCash</a>
                  </li>
                </ul>
              </div>
            )}
            
            <label htmlFor="account" className="block m-2 text-sm font-medium text-gray-900 dark:text-white">Account Number</label>
            <input
              type="text"
              id="account"
              value={formData.account}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
