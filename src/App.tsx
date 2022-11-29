import './assets/scss/global.scss'
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';

import { AuthProvider } from './context/AuthProvider';
import PersistLogin from './PersistLogin'

// import components
import Navbar from './components/navbar/Navbar'
import NotFound from './components/notFound/NotFound';
import Footer from './components/footer/Footer';

// import pages
import Login from './pages/login/Login'
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
const FavList = React.lazy(() => import('./pages/favList/FavList'))

function App() {
  return (
    <AuthProvider >
      <div className="App">
        <Router>
          <Navbar />
          <Suspense>
            <Routes>
              <Route element={<PersistLogin />}>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register isAdmin={false} />} />
                <Route path='/details/:id' element={<Details />} />
                <Route path='/favourites' element={<FavList />} />
                <Route path='*' element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
