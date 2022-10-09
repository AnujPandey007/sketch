import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from '../css/HomeCSS.module.css';

export default function Home({isAuth}) {

  const [sketches, setSketches] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const navigate = useNavigate();

  React.useEffect(() => {
    if(!isAuth){
      navigate('/');
    }
  }, [isAuth, navigate]);

  // React.useEffect(() => {
  //   const getQuestions = async()=>{
  //     let sketchesApi = `http://localhost:3000/sketches/getSketch/63410968f44d6f8b2b5f74ac`;
  //     let sketchesData = await fetch(sketchesApi);
  //     let jsonSketchesData = await sketchesData.json();
  //     setSketches(jsonSketchesData);
  //     setIsLoading(false)
  //   }
  //   getQuestions()
  // },)

  const navigateToSketch = () =>{
    navigate('/sketch');
  }


  // if(isLoading){
  //   return ( <div className='text-center'>
  //       <div className="spinner-border" role="status">
  //         <span className="sr-only"></span>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div>
      {/* <div className='container'>
        <div className={`${styles.fab}`}><Link type="button" to="/addSketches" className="btn btn-dark btn-sm shadow p-3 mb-5 rounded">Add Sketches</Link></div>
        {sketches.length===0 && <div className="h2">Questions are not Available</div>}
        {sketches.length!==0 && <div className="row row-cols-1">
          {sketches.map((e)=>{
            return <div key={e._id}><QuestionTile questionData={e} ></QuestionTile></div>
          })}
        </div>}
      </div> */}
      <button type="submit" onClick={()=> navigateToSketch()} style={{backgroundColor:"#4F00C1"}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm h-10 w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sketch</button>
    </div>
  )
}
