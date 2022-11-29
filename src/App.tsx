import './assets/scss/global.scss'
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
import NewReview from './pages/new_review/NewReview'
import EditReview from './pages/edit_review/EditReview'
const FavList = React.lazy(() => import('./pages/favList/FavList'))
const ReviewList = React.lazy(() => import('./pages/reviewList/ReviewList'))

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
                <Route path='/new-review/:id' element={<NewReview />} />
                <Route path='/edit-review/:id' element={<EditReview />} />
                <Route path='/favourites' element={<FavList />} />
                <Route path='/reviews' element={<ReviewList />} />
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
