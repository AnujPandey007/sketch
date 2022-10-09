import React from 'react';
import { useNavigate } from 'react-router-dom';
// import {useUser} from "../context/UserContext";

export default function Profile({isAuth, setIsAuth, setAlert}) {
  const navigate = useNavigate();
  // const {setUserData, userData} = useUser();

  const signUserOut = ()=>{
    try{
        localStorage.clear();
        setIsAuth(false);
        navigate('/');
    }catch(e){
        console.log("error");
    }
  }

  React.useEffect(() => {
    if(!isAuth){
      navigate('/');
    }
  }, [isAuth, navigate])

  return (
    <>
      <div>Profile</div>
      <button onClick={signUserOut}>Signout</button>
    </>
  )
}
