import React from 'react';
import { useNavigate } from 'react-router-dom';
import Canvas from '../components/Canvas';

export default function Sketch({isAuth}) {

  const navigate = useNavigate();

  React.useEffect(() => {
    if(!isAuth){
      navigate('/');
    }
  }, [isAuth, navigate]);

  return (
    <div className='flex'>
      <Canvas width={800} height={500} color={"black"}/>
    </div>
  )
}
