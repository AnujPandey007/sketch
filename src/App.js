import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signin from './screens/Signin';
import Signup from './screens/Signup';

function App() {
  return (
    <>
      <Router>

        <Routes>
          <Route path='/' element={<Signin/>}/>
          <Route path='/register' element={<Signup/>}/>
        </Routes>

      </Router>
    </>
  );
}

export default App;
