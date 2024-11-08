import React from "react";
import { WrapperArt } from "../../Wrappers/WrapperArt";
import { useNavigate } from "react-router-dom";
import { ButtonStart } from "../../components/buttons/ButtonStart"; 
import { Fa500Px } from "react-icons/fa";
export const SplashCiudadania = () => {
 
  return (
    <WrapperArt>
      <div className="flex flex-col gap-4 min-h-screen items-center justify-center w-full translate-y-[-6%] sm:translate-y-0">
 
        <ButtonStart
            option="/ciudadania"
            screen="/"
            element={<Fa500Px className="mr-2 text-white text-2xl" />}
            text={"Validar ciudadania"}
          />
      </div>
    </WrapperArt>
  );
};
