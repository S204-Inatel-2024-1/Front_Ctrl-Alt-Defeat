import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

//Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from "./pages/home/Home"
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/register" element={<Register />}/>
        </Routes>
      </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
