import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Home from "./pages/home/Home"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route> </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
