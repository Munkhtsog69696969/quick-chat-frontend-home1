import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { CreateRoom } from './components/createRoom';
import { JoinRoom } from './components/JoinRoom';
import { Room } from './components/Room';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/createroom' element={<CreateRoom/>}/>
        <Route path='/joinroom' element={<JoinRoom/>}/>
        <Route path='/room' element={<Room/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;