import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile({isAuth, setIsAuth, setAlert}) {
  const navigate = useNavigate()

  React.useEffect(() => {
    if(!isAuth){
      navigate('/login');
    }
  }, [isAuth, navigate])

  return (
    <div>Profile</div>
  )
}
