import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useUser} from "../context/UserContext";


export default function Signup({isAuth, setIsAuth, setAlert}) {

  const navigate = useNavigate();

  const [firstName, setFirstName]= React.useState("")
  const [lastName, setLastName]= React.useState("")
  const [email, setEmail]= React.useState("")
  const [password, setPassword]= React.useState("")
  const [password2, setPassword2]= React.useState("")
  const [loading, setLoading] = React.useState(false)
  const {setUserData} = useUser();


  React.useEffect(() => {
    if(isAuth){
      navigate('/home');
    }
  }, [isAuth, navigate]);

  const handleFirstName=(event) =>{
    setFirstName(event.target.value)
  }

  const handleLastName=(event) =>{
    setLastName(event.target.value)
  }
 
  const handleEmail=(event) =>{
    setEmail(event.target.value)
  }
  
  const handlePassword=(event) =>{
    setPassword(event.target.value)
  }

  const handlePassword2=(event) =>{
    setPassword2(event.target.value)
  }

  const register= async()=>{
    //  event.preventDefault();
    const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    if(password!==password2){
      setAlert("Password does not match", "danger");
    }else if(validEmail.test(email) && firstName.length!==0&&lastName.length!==0&&email.length!==0&&password.length!==0&&password2.length!==0){
      setLoading(true);
      
      const registerApi="http://localhost:3000/auth/register";
    
      const jsonData={
        "userFirstName":firstName,
        "userLastName":lastName,
        "userEmail":email,
        "userPassword":password,
        "userImage": "https://firebasestorage.googleapis.com/v0/b/questionaire-b0b15.appspot.com/o/images%2Fuser.png?alt=media&token=b2750c51-8569-4948-bf61-ef80ac7c8de2"
      };
    
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jsonData)
      };
    
      try{
          const authData = await fetch(registerApi, requestOptions);
          let jsonUserData = await authData.json();
          // console.log(jsonUserData);
          localStorage.setItem("userData", JSON.stringify(jsonUserData));
          setUserData(JSON.stringify(jsonUserData));
          localStorage.setItem("isAuth", true);
          setIsAuth(true);
          navigate("/home");
        }catch(e){
          setAlert("Failed to create an account", "danger");
          console.log(e);
        }
    
        setLoading(false);
    }else{
      setAlert("Please fill all details correctly", "danger");
    }
  }

  return (
    <div className='flex h-screen'>
      <div className='flex flex-col m-auto gap-2 items-center'>
        <div className="flex text-4xl self-center text-center w-80" style={{color:"#4F00C1"}}>
          Register to continue
        </div>

        <div className="flex flex-col mt-7 w-80 gap-4 justify-center">
          <div className="flex">
              <input type="text" onChange={handleFirstName}  className="bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="First Name" required/>
          </div>
          <div className="flex">
              <input type="text" onChange={handleLastName}  className="bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Last Name" required/>
          </div>
          <div className="flex">
              <input type="email" onChange={handleEmail}  className="bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Email" required/>
          </div>
          <div className="flex">
              <input type="password" onChange={handlePassword}  className="bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Password" required/>
          </div>
          <div className="flex">
              <input type="password" onChange={handlePassword2}  className="bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Confirm Password" required/>
          </div>
        </div>


        <div className="flex w-80 mt-7 justify-center">
          <button type="submit" onClick={()=> register()} disabled={loading} style={{backgroundColor:"#4F00C1"}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm h-10 w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
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
