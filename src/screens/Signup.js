import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup({isAuth, setIsAuth, setAlert}) {

  const navigate = useNavigate();

  React.useEffect(() => {
    if(isAuth){
      navigate('/home');
    }
  }, [isAuth, navigate]);

  const register = () => {
    setAlert("Successfully Registered", "success");
    localStorage.setItem("isAuth", true);
    setIsAuth(true);
    navigate("/home");
}

  return (
    <div className='flex h-screen'>
      <div className='flex flex-col m-auto gap-2 items-center'>
        <div className="flex text-4xl self-center text-center w-80" style={{color:"#4F00C1"}}>
          Register to continue
        </div>

        <div className="flex flex-col mt-7 w-80 gap-4 justify-center">
          <div className="flex">
              <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="First Name" required/>
          </div>
          <div className="flex">
              <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Last Name" required/>
          </div>
          <div className="flex">
              <input type="email" className="bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Email" required/>
          </div>
          <div className="flex">
              <input type="password" className="bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Password" required/>
          </div>
          <div className="flex">
              <input type="password" className="bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Confirm Password" required/>
          </div>
        </div>


        <div className="flex w-80 mt-7 justify-center">
          <button type="submit" onClick={()=> register()} style={{backgroundColor:"#4F00C1"}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm h-10 w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
        </div>

        <div className="flex flex-row w-80 justify-center">
          <div className="flex mx-2">
              Already have an account? 
          </div>
          <Link to={"/"}>
            <div style={{color:"#4F00C1"}} className="flex">
                Sign in
            </div>
          </Link>
        </div>

      </div>
    </div>
  )
}
