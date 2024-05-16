import { TextField, debounce } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore.ts";
import { setProductParams } from "./catalogSlice.ts";

export default function ProductSearch()
{
    const{productParams}=useAppSelector(state=>state.catalog);
    const [searchTerm,setSearchTerm]=useState(productParams.searchTerm);
    const dispatch=useAppDispatch();
    
const debouncedSerach=debounce((event:any)=>{
    dispatch(setProductParams({searchTerm:event.target.value}))}
,1000);

    return(
       <TextField
       label='Search products...'
       variant='outlined'
       fullWidth
       value={searchTerm || ''}
       onChange={(event:any)=>{
        setSearchTerm(event.target.value);
        debouncedSerach(event);
       }}
       
       />
)

}