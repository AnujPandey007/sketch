import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Home({isAuth}) {

  const navigate = useNavigate();

  React.useEffect(() => {
    if(!isAuth){
      navigate('/');
    }
  }, [isAuth, navigate]);

  return (
    <div>Home</div>
  )
}
