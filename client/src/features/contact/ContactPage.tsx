import React from 'react';


import { Button, ButtonGroup, Typography } from '@mui/material';


import { decrement, increment } from './counterSlice.ts'; // Removed file extension
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore.ts'; // Removed file extension

export default function ContactPage() {
    const dispatch = useAppDispatch();
    const {data, title} = useAppSelector(state => state.counter);

    return (
        <>
        <Typography gutterBottom variant='h3'>{title}</Typography>
        <Typography variant='h4'>The data is: {data}</Typography>
        <ButtonGroup>
            <Button onClick={() => dispatch(decrement(1))} variant='contained' color='error'>Decrement</Button>
            <Button onClick={() => dispatch(increment(1))} variant='contained' color='primary'>Increment</Button>
            <Button onClick={() => dispatch(increment(5))} variant='contained' color='secondary'>Increment by 5</Button>
        </ButtonGroup>
    </>
    );
}
