import { createSlice } from '@reduxjs/toolkit';
import {Basket} from '../../app/models/basket.ts';



interface BasketState {
    basket: Basket | null;
    status: string;
}

const initialState: BasketState = {
    basket: null,
    status: 'idle' // Dodajte odgovarajuću vrednost statusa, na primer 'idle', 'loading', 'success', 'error' itd.
};


export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload
        },
        removeItem:(state,action)=>{
            const {productId, quantity} = action.payload;
            const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);
            if (itemIndex === -1 || itemIndex === undefined) return; 
            state.basket!.items[itemIndex].quantity -= quantity;
            if (state.basket?.items[itemIndex].quantity === 0) 
                state.basket.items.splice(itemIndex, 1);
        }
    }
})

export const {setBasket,removeItem} = basketSlice.actions;