import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signin({isAuth, setIsAuth, setAlert}) {

    const navigate = useNavigate();

    React.useEffect(() => {
        if(isAuth){
            navigate('/home');
        }
    }, [isAuth, navigate]);

    const login = () => {
        setAlert("Successfully Login", "success");
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/home");
    }


  return (
    <div className='flex h-screen'>
        <div className='flex flex-col m-auto gap-2 items-center'>
            <div className="flex text-4xl self-center text-center w-80" style={{color:"#4F00C1"}}>
                Log in to continue
            </div>

            <div className="flex flex-col mt-7 w-80 gap-4 justify-center">
                <div className="flex">
                    <input type="email" className="bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Email" required/>
                </div>
                <div className="flex">
                    <input type="password" className="bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Password" required/>
                </div>
            </div>

            <div style={{color:"#4F00C1"}} className="flex w-80 justify-center my-4">
                Forgot password?
            </div>


            <div className="flex w-80 justify-center">
                <button type="submit" onClick={()=> login()} style={{backgroundColor:"#4F00C1"}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm h-10 w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log In</button>
            </div>

            <div className="flex flex-row w-80 justify-center">
                <div className="flex mx-2">
                    Don't have an account? 
                </div>
                <Link to={"/register"}>
                    <div style={{color:"#4F00C1"}} className="flex">
                        Sign up
                    </div>
                </Link>
            </div>

            <div className="flex w-80 justify-center">
                or
            </div>

            <div className="w-80 justify-center">
                <button className="w-full h-10 text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                    <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt=""/> 
                    <span>Log in with Google</span>
                </button>
            </div>

        </div>
    </div>
  )
}
