import {  useEffect } from 'react';

import ProductList from './ProductList.tsx';
import React from 'react';

import LoadingComponent from '../../app/layout/LoadingComponent.tsx';
import NotFound from '../../app/errors/NotFound.tsx';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore.ts';
import { fetchFilters, fetchProductsAsync, productSelectors } from './catalogSlice.ts';
import { Grid, Paper, TextField } from '@mui/material';

const sortOptions=[
    {value:'name',label:'Alphabetical'},
    {value:'priceDesc',label:'Price - High to low'},
    {value:'price',label:'Price - Low to high'}
]

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status,filtersLoaded} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
  
    useEffect(()=>{

       if (!productsLoaded) dispatch(fetchProductsAsync());
       
    }, [productsLoaded, dispatch])

    useEffect(()=>{
        if(!filtersLoaded) dispatch(fetchFilters());
    },[dispatch,filtersLoaded]);
    if(products===null) return <NotFound/>
    if (status.includes('pending')) return <LoadingComponent message='Loading products...' />

    return (
        <Grid container columnSpacing={4}>
            <Grid item xs={3}>
                <Paper sx={{ mb: 2 }}>
                  
                </Paper>
                <Paper sx={{ p: 2, mb: 2 }}>
                 
                </Paper>
                <Paper sx={{ p: 2, mb: 2 }}>
                   
                </Paper>
                <Paper sx={{ p: 2 }}>
                 
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <ProductList products={products} />
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={9} sx={{mb:2}}>
                
            </Grid>
        </Grid>
    )
}