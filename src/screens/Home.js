import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/HomeCSS.module.css';
import SketchTile from './SketchTile';
import {useUser} from "../context/UserContext";

export default function Home({isAuth}) {

  const [sketches, setSketches] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const {userData} = useUser();

  const navigate = useNavigate();

  React.useEffect(() => {
    if(!isAuth){
      navigate('/');
    }
  }, [isAuth, navigate]);

  React.useEffect(() => {
    const getSketches = async()=>{
      let sketchesApi = `http://localhost:3000/sketches/getSketches/${userData._id}`;
      let sketchesData = await fetch(sketchesApi);
      let jsonSketchesData = await sketchesData.json();
      setSketches(jsonSketchesData);
    }
    const getUsers = async()=>{
      let usersApi = `http://localhost:3000/users/getUsers`;
      let usersData = await fetch(usersApi);
      let jsonUsersData = await usersData.json();
      setUsers(jsonUsersData);
      setIsLoading(false)
    }
    getSketches()
    getUsers()
  },[userData]);

  const navigateToSketch = ()=> {
    let data = {
      state : {
        sketchData : {},
        isUpdate: false,
        users: users
      }
    }
    navigate(`/sketch`, data)
  }

  if(isLoading){
    return (<div className='mb-20'>Loading</div>);
  }

  return (
    <div>
      <div className='container'>
        <div className={`${styles.fab}`}><button onClick={navigateToSketch} type="button" className="btn btn-dark btn-sm shadow p-3 mb-5 rounded">Add Sketches</button></div>
        {sketches.length===0 && <div className="h2">Sketches are not Available</div>}
        {sketches.length!==0 && <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mx-10 mt-10">
          {sketches.map((e)=>{
            return <div key={e._id}><SketchTile users={users} sketchData={e}/></div>
          })}
        </div>}
      </div>
    </div>
  )
}
