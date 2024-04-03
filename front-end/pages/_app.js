import React, { createContext, useEffect, useState } from 'react';
import Head from 'next/head';

import { ChakraProvider } from '@chakra-ui/react';

import MainNavbar from '../components/MainNavbar';
import Footer from '../components/Footer';

// Import CSS
import '../styles/globals.css';
import { auth } from '../special/FirebaseConfig';

export const UserContext = createContext();

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
 
  //Check if user is logged in or not
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if(userAuth){
        setUser(userAuth);
      }
    })
    return unsubscribe;
  }, []);

  return(
    <div id="container">
      <Head>
        <title>CampusConnect</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <ChakraProvider>
        <>
            <UserContext.Provider value={user}>
              <MainNavbar/>
              <div id="main-content"><Component {...pageProps}/></div>
            </UserContext.Provider>
            <Footer/>
        </>
      </ChakraProvider>
    </div>
  )
}

export default MyApp;
