
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './Header.tsx';
import { useEffect, useState } from 'react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from '../context/StoreContext.tsx';
import { getCookie } from '../util/util.ts';
import agent from '../api/agent.ts';
import LoadingComponent from './LoadingComponent.tsx';

 export  default function App() {
  const {setBasket}= useStoreContext();
const[loading,setLoading]=useState(true);

useEffect(()=>{
  const buyerId=getCookie("buyerId")

  if(buyerId)
  {
    agent.Basket.get()
    .then(basket=>setBasket(basket))
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false));
  }
  else{
    setLoading(false);
  }
})


  const [darkMode, setDarkMode] = useState(false);
  const palleteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: (palleteType === 'light') ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }
if(loading) return <LoadingComponent message='Initialising app...'/>
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
       <Outlet/>
     </Container>
     
    </ThemeProvider>
  );
}
