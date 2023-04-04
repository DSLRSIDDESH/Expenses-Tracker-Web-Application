import './App.css';
import Navbar from './components/Navbar';
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
          <Route path="/Events" element={<Events />} />
          <Route path="/Stats" element={<Stats />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  )
}