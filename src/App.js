import './App.css';
import Navbar from './components/Navbar';
import Logout from './pages/Logout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Events from './pages/Events';
import Stats from './pages/Stats';
import Profile from './pages/Profile';
import {Route, Routes} from 'react-router-dom';

export default function App() {
  return(
    <div className="App">
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/events" element={<Events />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  )
}