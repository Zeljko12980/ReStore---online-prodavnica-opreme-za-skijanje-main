import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../layout/App.tsx';
import Catalog from '../../features/catalog/Catalog.tsx';
import ProductDetails from '../../features/catalog/ProductDetails.tsx';
import AboutPage from '../../features/about/AboutPage.tsx';
import ContactPage from '../../features/contact/ContactPage.tsx';
import ServerError from '../errors/ServerError.tsx';
import NotFound from '../errors/NotFound.tsx';
import BasketPage from '../../features/basket/BasketPage.tsx';
import Login from '../../features/account/Login.tsx';
import Register from '../../features/account/Register.tsx';
import RequireAuth from './RequireAuth.tsx';
//import Orders from '../../features/orders/Orders';
//import CheckoutWrapper from '../../features/checkout/CheckoutWrapper';
//import Inventory from '../../features/admin/Inventory';
import React from 'react';

export const router = createBrowserRouter(([
    {
        path: '/',
        element: <App />,
        children: [
            {
                // authenticated routes
                element: <RequireAuth />, children: [
                 //   { path: '/checkout', element: <CheckoutWrapper /> },
                   // { path: '/orders', element: <Orders /> },
                ]
            },
            {
                // admin routes
                element: <RequireAuth roles={['Admin']} />, children: [
                    //{ path: '/inventory', element: <Inventory /> },
                ]
            },
            { path: 'catalog', element: <Catalog /> },
            { path: 'catalog/:id', element: <ProductDetails /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'contact', element: <ContactPage /> },
            { path: '/server-error', element: <ServerError /> },
            { path: '/not-found', element: <NotFound /> },
            { path: '/basket', element: <BasketPage /> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            { path: '*', element: <Navigate replace to='/not-found' /> },
        ]
    }
]))