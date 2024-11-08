import axios from "axios";
import { WrapperArt } from "../Wrappers/WrapperArt";
import { useEffect, useState } from "react";

export const CiudadaniaDigital = () => {
  const [data, setData] = useState({
    query: "",
    nonce: "",
  });

  const login = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/ciudadania/session/login"
      );
      if(response){
        console.log(response)
        const urlCiudadania = response.data.urlCiudadania;
        localStorage.setItem("nonce", response.data.nonce);
        window.location.href = urlCiudadania; 
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    login();
  }, []);

  return (
    <WrapperArt>
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          <p className="text-white text-xl">Procesando...</p>
        </div>
        
      </div>
    </WrapperArt>
  );
};
