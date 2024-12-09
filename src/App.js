import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import ContextState from './ContextAPI/ContextState'
import Navs from './Components/Navs'
import Alerts from './Components/Alerts'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Logout from './Pages/Logout'
import { CookiesProvider } from 'react-cookie'

function App() {
  return (
    <CookiesProvider>
      <ContextState>
        <Router>
          <Navs />
          <Alerts />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logout' element={<Logout/>}/>
          </Routes>
        </Router>
      </ContextState>
    </CookiesProvider>
  );
}

export default App;
