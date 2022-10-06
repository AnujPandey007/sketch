import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Home({isAuth}) {

  const navigate = useNavigate();

  React.useEffect(() => {
    if(!isAuth){
      navigate('/');
    }
  }, [isAuth, navigate]);

  const navigateToSketch = () =>{
    navigate('/sketch');
  }

  return (
    <div>
      <button type="submit" onClick={()=> navigateToSketch()} style={{backgroundColor:"#4F00C1"}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm h-10 w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sketch</button>
    </div>
  )
}
