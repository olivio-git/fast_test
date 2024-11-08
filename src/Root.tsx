import { Route, Routes } from "react-router-dom";
import LandinPage from "./presentation/screens/LandingPageScreen/LandinPage";
import { ToggleIndex } from "./presentation/components/ToggleIndex";
import { CreateGameScreen } from "./presentation/screens/GameInit/ConfigGameScreen";
import { CiudadaniaDigital } from "./presentation/screens/CiudadaniaDigital";
import React from "react";
import { SplashCiudadania } from "./presentation/screens/splash/SplashCiudadania";
import {  Toaster } from 'react-hot-toast';
import { Home } from "./presentation/screens/Home";

function Root() {
  return (
    <React.Fragment>
      <ToggleIndex /> 
        <Routes>
          <Route path="/" element={<LandinPage />} />
          <Route path="/config-game/:option" element={<CreateGameScreen />} />
          <Route path="/ciudadania" element={<CiudadaniaDigital />} />   
          <Route path="/splash" element={<SplashCiudadania />} />    
          <Route path="/home" element={<Home />} />    

        </Routes> 
        <Toaster />
    </React.Fragment>
  );
}

export default Root;
