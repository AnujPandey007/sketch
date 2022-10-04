import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Sketch({isAuth}) {

  const navigate = useNavigate();

  React.useEffect(() => {
    if(!isAuth){
      navigate('/');
    }
  }, [isAuth, navigate]);

  return (
    <div>Sketch</div>
  )
}
