import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent.ts";
import { Product } from "../../app/models/product.ts";
import { RootState } from '../../app/store/configureStore.ts';

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Catalog.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
    async (productId, thunkAPI) => {
        try {
            const product = await agent.Catalog.details(productId);
            return product;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)
export const fetchFilters=createAsyncThunk(

    'catalog/fetchFilters',
    async(_,thunkAPI)=>{
        try {
            return agent.Catalog.filters();
        } catch (error:any) {
            thunkAPI.rejectWithValue({error:error.data})
        }
    }
)

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        filtersLoaded:false,
        status: 'idle',
        brands:[],
        types:[]
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts'
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle',
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct'
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle'
        });
        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle'
        })
        builder.addCase(fetchFilters.pending, (state)=>{
            state.status="pendingFetchFilters";
        });
        builder.addCase(fetchFilters.fulfilled,(state,action)=>{
            state.brands=action.payload.brands;
            state.types=action.payload.types;
            state.filtersLoaded=true;
        });
        builder.addCase(fetchFilters.rejected,(state,action)=>{
            state.status='idle';
            console.log(action.payload);
        })
    })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);