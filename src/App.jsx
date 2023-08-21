import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import Header from './components/Header';
import Landing from './views/Landing';
import SignUp from './views/SignUp';
import Login from './views/Login';
import Home from './views/Home';
import Activities from './views/Activities';
import ProtectedRoutes from './components/ProtectedRoutes';
import Toast from './components/Toast';
import { ActivitiesProvider } from './contexts/activitiesContext';

const App = () => {
  return (
    <>
      <Toast />
      <BrowserRouter>
        <AuthProvider>
          <ActivitiesProvider>
            <Header />
            <main>
              <Routes>
                <Route element={<ProtectedRoutes />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/activities" element={<Activities />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<Landing />} />
              </Routes>
            </main>
          </ActivitiesProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
