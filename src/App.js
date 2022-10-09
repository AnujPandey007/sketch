import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import Sketch from './screens/Sketch';
import Alert from './components/Alert';
import {UserProvider} from './context/UserContext';

function App() {

  const [customAlert, setCustomAlert] = React.useState(null);
  const [isAuth, setIsAuth] = React.useState(localStorage.getItem("isAuth")??false);

  const setAlert=(message, type)=>{
    let alertObject = {
      message: message,
      type: type
    }
    setCustomAlert(alertObject);

    setTimeout(() => {
      setCustomAlert(null);
    }, 1500);
  }


  return (
    <UserProvider>
      <Router>
        <Navbar isAuth={isAuth}/>
        <Alert customAlert={customAlert}/>

        <Routes>
          <Route path='/' element={<Signin isAuth={isAuth} setIsAuth={setIsAuth} setAlert={setAlert}/>}/>
          <Route path='/register' element={<Signup isAuth={isAuth} setIsAuth={setIsAuth} setAlert={setAlert}/>}/>
          <Route path='/home' element={<Home isAuth={isAuth}/>}/>
          <Route path='/sketch/:id' element={<Sketch isAuth={isAuth} />}/>
          <Route path='/sketch' element={<Sketch isAuth={isAuth} />}/>
          <Route path='/me' element={<Profile isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
