import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useUser} from "../context/UserContext";

export default function Signin({isAuth, setIsAuth, setAlert}) {

    const navigate = useNavigate();
    
    const [email, setEmail]= React.useState("")
    const [password, setPassword]= React.useState("")
    const [loading, setLoading] = React.useState(false)
    const {setUserData} = useUser();

    const handleEmail=(event) =>{
        setEmail(event.target.value);
    }
    
    const handlePassword=(event) =>{
        setPassword(event.target.value)
    }
   
    const login = async()=>{
        //  event.preventDefault();

        const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
        if(validEmail.test(email) && email.length!==0&&password.length!==0){
            setLoading(true);
        
            const loginApi="http://localhost:3000/auth/login";
        
            const jsonData={
                "userEmail":email,
                "userPassword":password
            };
        
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(jsonData)
            };
        
            try{
                const userData = await fetch(loginApi, requestOptions);
                let jsonUserData = await userData.json();
            if(jsonUserData==="Password is wrong"){
                setAlert("Password is wrong", "danger");
            }else if(jsonUserData==="Please login"){
                setAlert("Please Signup", "danger");
            }else{
                // setAlert("Successfully Login", "success");
                localStorage.setItem("isAuth", true);
                localStorage.setItem("userData", JSON.stringify(jsonUserData));
                setUserData(JSON.stringify(jsonUserData));
                setIsAuth(true);
                navigate("/home");
            }
            }catch(e){
                setAlert("Failed to create an account", "danger");
                console.log(e);
            }
            setLoading(false);
        }else{
            setAlert("Please fill all details correctly", "danger");
        }
    }
      

    React.useEffect(() => {
        if(isAuth){
            navigate('/home');
        }
    }, [isAuth, navigate]);


  return (
    <div className='flex h-screen'>
        <div className='flex flex-col m-auto gap-2 items-center'>
            <div className="flex text-4xl self-center text-center w-72" style={{color:"#4F00C1"}}>
                Log in to continue
            </div>

            <div className="flex flex-col mt-7 w-72 gap-4 justify-center">
                <div className="flex">
                    <input type="email" onChange={handleEmail}  className="bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Email" required/>
                </div>
                <div className="flex">
                    <input type="password" onChange={handlePassword}  className="bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Password" required/>
                </div>
            </div>

            <div style={{color:"#4F00C1"}} className="flex w-72 justify-center my-4">
                <button onClick={()=> alert("Under maintenance")}>Forgot password?</button>
            </div>

            <div className="flex w-72 justify-center">
                <button type="submit" onClick={()=> login()} disabled={loading} style={{backgroundColor:"#4F00C1"}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm h-10 w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log In</button>
            </div>

            <div className="flex flex-row w-72 justify-center">
                <div className="flex mx-2">
                    Don't have an account? 
                </div>
                <Link to={"/register"}>
                    <div style={{color:"#4F00C1"}} className="flex">
                        Sign up
                    </div>
                </Link>
            </div>

            <div className="flex w-72 justify-center">
                or
            </div>

            <div className="w-72 justify-center">
                <button onClick={()=> alert("Under maintenance")} className="w-full h-10 text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                    <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt=""/> 
                    <span>Log in with Google</span>
                </button>
            </div>

        </div>
    </div>
  )
}
