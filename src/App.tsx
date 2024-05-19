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
// import AppLayout from './pages/AppLayout';
const Homepage = lazy(() => import('./pages/Homepage'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Login = lazy(() => import('./pages/Login'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

const App = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
                <Routes>
                    <Route index element={<Homepage />} />
                    <Route path="product" element={<Product />} />
                    <Route path="pricing" element={<Pricing />} />
                    <Route path="login" element={<Login />} />
                    <Route path="app" element={<AppLayout />}>
                        <Route
                            index
                            element={<Navigate to={'cities'} replace />}
                        />
                        <Route path="cities" element={<CityList />} />
                        <Route path="cities/:id" element={<City />} />
                        <Route path="countries" element={<CountryList />} />
                        {/* <Route path="*" element={<p>City Not found!</p>} /> */}
                        <Route path="form" element={<Form />} />
                    </Route>
                    {/* <Route index element={<Navigate replace to="cities" />} /> */}
                    {/* <Route path="cities" element={<CityList />} /> */}
                    {/* <Route path="cities/:id" element={<City />} /> */}
                    {/* <Route path="countries" element={<CountryList />} /> */}
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
