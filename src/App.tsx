import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import { AuthProvider } from './context/AuthProvider';
import PersistLogin from './PersistLogin'

// import components
import Navbar from './components/navbar/Navbar'
import NotFound from './components/notFound/NotFound';

// import pages
import Login from './pages/login/Login'
import Register from './pages/register/Register';
import Home from './pages/home/Home';

function App() {
  return (
    <AuthProvider >
      <div className="App">
        <Router>
            <Navbar />
            <Routes>
              <Route element={<PersistLogin />}>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register isAdmin={false} />} />
                <Route path='*' element={<NotFound />} />
              </Route>
            </Routes>
            {/* <Footer /> */}
          </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
