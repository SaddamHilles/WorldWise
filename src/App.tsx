import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import Homepage from './pages/Homepage';
// import Pricing from './pages/Pricing';
import SpinnerFullPage from './components/SpinnerFullPage/SpinnerFullPage';
import { Suspense, lazy } from 'react';
// import Product from './pages/Pricing';
// import Login from './pages/Login';
import Form from './components/Form/Form';
// import PageNotFound from './pages/PagNotfound';
import CityList from './components/CityList/CityList';
import CountryList from './components/CountryList/CountryList';
import City from './components/City/City';
import { CitiesProvider } from './contexts/CitiesProvider';
import { AuthProvider } from './contexts/AuthProvider';
import ProtectedRoute from './pages/ProtectedRoute';
// import AppLayout from './pages/AppLayout';
const Homepage = lazy(() => import('./pages/Home/Homepage'));
const Product = lazy(() => import('./pages/Product/Product'));
const Pricing = lazy(() => import('./pages/Pricing/Pricing'));
const Login = lazy(() => import('./pages/Login/Login'));
const AppLayout = lazy(() => import('./pages/AppLayout/AppLayout'));
const PageNotFound = lazy(() => import('./pages/PageNotFound/PageNotFound'));

const App = () => {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path='product' element={<Product />} />
              <Route path='pricing' element={<Pricing />} />
              <Route path='login' element={<Login />} />
              <Route
                path='app'
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to={'cities'} replace />} />
                <Route path='cities' element={<CityList />} />
                <Route path='cities/:id' element={<City />} />
                <Route path='countries' element={<CountryList />} />
                {/* <Route path="*" element={<p>City Not found!</p>} /> */}
                <Route path='form' element={<Form />} />
              </Route>
              {/* <Route index element={<Navigate replace to="cities" />} /> */}
              {/* <Route path="cities" element={<CityList />} /> */}
              {/* <Route path="cities/:id" element={<City />} /> */}
              {/* <Route path="countries" element={<CountryList />} /> */}
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
};

export default App;
