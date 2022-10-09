import React from 'react';
import {Link} from 'react-router-dom';
import logo from "../assets/logo.png";
import {useUser} from "../context/UserContext";

export default function Navbar({isAuth}) {

  const {userData} = useUser();

  return (
    <div className="mb-10">
         <div className='fixed top-0 w-full z-50 flex flex-auto flex-row bg-white shadow p-2 px-5 items-center justify-between text-sm'>
            <Link to="/">
                <img src={logo} alt="..."/>
            </Link>
            {isAuth && <Link to="/me">
              <div className='flex flex-row items-center'>
                <div className="font-bold mr-3">
                    {userData.userFirstName} {userData.userLastName}
                </div>
                <div className="w-6 h-6 mr-1">
                  <img src={userData.userImage} alt="Logo" height="35" width="35" className="d-inline-block rounded align-text-top"/>
                </div>
              </div>
            </Link>}
        </div>
    </div>
  );
}
