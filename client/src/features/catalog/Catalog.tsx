import { useState, useEffect } from 'react';
import { Product } from '../../app/models/product';
import ProductList from './ProductList.tsx';
import React from 'react';
import agent from '../../app/api/agent.ts'
import LoadingComponent from '../../app/layout/LoadingComponent.tsx';
import NotFound from '../../app/errors/NotFound.tsx';

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading,setLoading]=useState(true);
    useEffect(() => {
      agent.Catalog.list()
      .then(products=>setProducts(products))
      .catch(error=>console.log(error))
      .finally(()=>setLoading(false))
      
    }, [])

    if(products===null) return <NotFound/>
if(loading) return <LoadingComponent message='Loading products...'/>


    return (
        <>
            <ProductList products={products} />
        </>
    )
}