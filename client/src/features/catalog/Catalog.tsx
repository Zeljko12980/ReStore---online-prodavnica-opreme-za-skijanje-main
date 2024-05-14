import { useState, useEffect } from 'react';
import { Product } from '../../app/models/product';
import ProductList from './ProductList.tsx';
import React from 'react';
import agent from '../../app/api/agent.ts'
import LoadingComponent from '../../app/layout/LoadingComponent.tsx';
import NotFound from '../../app/errors/NotFound.tsx';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore.ts';
import { fetchProductsAsync, productSelectors } from './catalogSlice.ts';

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
  
    useEffect(()=>{

       if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    if(products===null) return <NotFound/>
    if (status.includes('pending')) return <LoadingComponent message='Loading products...' />

    return (
        <>
            <ProductList products={products} />
        </>
    )
}