import React, { useState, useEffect } from 'react';

// import "bootstrap/dist/css/bootstrap.min.css";

import Routes from "./components/Routes"

import { AppContext } from "./components/lib/contextlib";

import NavigationBar from './components/navbar';

import 'animate.css'

import "./App.css"
import { CookiesProvider } from 'react-cookie';








function App(req, res) {


  const [isAuthenticated, userHasAuthenticated] = useState(false);


  const [activepage, setactivepage] = useState(1);







  useEffect(() => {

    onLoad();
  }, [])


  async function onLoad() {

    try {
      var access = localStorage.getItem("usertoken");
      if (access) {
        userHasAuthenticated(true)
      }

    }
    catch (event) {
      if (event !== 'No current user') {
        console.log(event)
      }
    }

  }


  return (

    <div className="root_parentdiv">
      <CookiesProvider cookies={req.universalCookies}>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <NavigationBar />
          <Routes activepage={activepage} setactivepage={setactivepage} />
        </AppContext.Provider>
      </CookiesProvider>
    </div>













  )
}

export default App;
