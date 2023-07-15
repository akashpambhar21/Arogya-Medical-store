import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './Components/Login';
import Signup from './Components/Signup';
import Orders from './Components/Users/Orders';
import Profile from './Components/Users/Profile';
import AddMedicine from './Components/Admin/AddMedicine';
import Home from './Components/Home';
import {UserContext} from './Components/UserContext';

export default function App() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={value}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/addmedicine' element={<AddMedicine />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}