import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Home from "./pages/home/Home"
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/register" element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
