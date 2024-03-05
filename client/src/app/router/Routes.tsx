import {  Navigate, createBrowserRouter } from 'react-router-dom';

import Catalog from '../../features/catalog/Catalog.tsx';
import ProductDetails from '../../features/catalog/ProductDetails.tsx';
import AboutPage from '../../features/about/AboutPage.tsx';
import ContactPage from '../../features/contact/ContactPage.tsx';
import  App from '../layout/App.tsx';
import React from 'react';
import ServerError from '../errors/ServerError.tsx';
import NotFound from '../errors/NotFound.tsx';
import { BasketPage } from '../../features/basket/BasketPage.tsx';



export const router = createBrowserRouter(([
    {
        path: '/',
        element: <App />,
        children: [
         
            { path: 'catalog', element: <Catalog /> },
            { path: 'catalog/:id', element: <ProductDetails /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'contact', element: <ContactPage /> },
           {path:'server-error',element:<ServerError/>},
           {path:'basket',element:<BasketPage/>},
           {path:'not-found',element:<NotFound/>},
            { path: '*', element: <Navigate replace to='/not-found' /> },
        ]
    }
]))