import React, { useEffect, useState } from "react";
import { FormSchemaFields } from "../../../../domain/interfaces/FormSchemaFields";
import { PiPushPinBold } from "react-icons/pi";
import { ButtonBack } from "../../buttons/ButtonBack";
import { ButtonSubmit } from "../../buttons/ButtonSubmit";
import { ButtonCiudadania } from "../../buttons/ButtonCiudadania";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface OptionsProps {
  user:{
    name:string;
    lastname:string,
    email:string;
    password:string;
    ci:string;
  },
  navigate:string,
  fields: FormSchemaFields;
  options: {
    Submit: boolean;
    Back: boolean;
    Ciudadania: boolean;
  };
  handleChange:(name:any,value:any)=>void;
  handleSubmitUserCreate:()=>void;
  handleLogin:()=>void;
}

export const FormOptions = ({ user,fields, options,handleChange,handleSubmitUserCreate,handleLogin }: OptionsProps) => {
  const { option } = useParams();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); 
  const verificarSesion = async (query: any,location:any) => {
    try {
      const nonce = localStorage.getItem("nonce");

      const response = await axios.post("http://localhost:3001/api/ciudadania/verificar-sesion", {
        nonce: nonce,
        query: query
      });
      handleChange("email",response.data.email);
      handleChange("name",response.data.nombreCompleto)
      handleChange("lastname",response.data.nombreCompleto)
      console.log(response.data)
      
      // Guardar datos en localStorage como en el ejemplo de Vue
      localStorage.setItem("usuario", response.data.usuario || null);
      localStorage.setItem("nombreCompleto", response.data.nombreCompleto || null);
      localStorage.setItem("email", response.data.email || null);
      localStorage.setItem("fechaNacimiento", response.data.fechaNacimiento || null);
      localStorage.setItem("idToken", response.data.idToken || null);
      localStorage.setItem("token", response.data.token || null);
 
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.mensaje || "Error al verificar sesión");
    }
  };

 
  const handleSubmit = async () => {
    const response = await handleSubmitUserCreate();
    navigate("/config-game/use-code")
  }

  useEffect(() => {
    if (location.pathname === "/config-game/create-game") {
      const queryParams = new URLSearchParams(location.search);
      const query = Object.fromEntries(queryParams.entries());

      // Verificar sesión solo si hay 'query' y 'nonce'
      if (query && localStorage.getItem("nonce")) {
        verificarSesion(query,location.search);
      } else {
        navigate("/proveedor"); // Redirige si falta nonce o query
      }
    }
  }, [location, navigate]);

  return (
    <React.Fragment>
      <div className="flex flex-col gap-4 min-h-screen items-center justify-center w-full translate-y-[-6%] sm:translate-y-0">
        {error && (
          <div className="text-red-500 flex items-center mb-4">
            <span className="mr-2">⚠️</span> {error}
          </div>
        )}
        {!error && (
          <div className="text-green-500 flex items-center mb-4">
            <span className="mr-2">✅</span> Verificando inicio de sesión...
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault(); 
          }}
          className="rounded-lg bg-white dark:dark:bg-slate-800 p-6 dark:bg-opacity-20 shadow-lg flex flex-col w-72 sm:w-96"
        >
          <div className="block mb-8 flex flex-row items-center justify-start w-full text-sm font-medium text-slate-800 dark:text-white">
            <span className="flex items-center justify-center h-8 w-8 border rounded-full border-slate-300 mr-2">
              <PiPushPinBold />
            </span>
            <h1>Form to join the game</h1>
          </div>
          {Object.keys(fields).map((key) => {
            const field = fields[key];
            return (
              <div className="mb-4" key={key}>
                <label
                  htmlFor={field.label}
                  className="block mb-2 text-sm font-medium text-slate-800 dark:text-white"
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={user[field.name]}
                  onChange={(e)=>handleChange(e.target.name,e.target.value)}
                  required={field.required}
                  className="bg-gray-50 focus:outline-none focus:ring-0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={`Write your ${field.label.toLowerCase()}`}
                />
              </div>
            );
          })}
          <div className="block mb-4 flex flex-row items-center justify-between w-full text-sm font-medium text-slate-800 dark:text-white">
            {options.Back && <ButtonBack text="Back" />}
            {options.Submit && <ButtonSubmit onClick={
                location.pathname === "/config-game/use-code"
                  ? handleLogin
                  : handleSubmit
              }
              text="Next" />}
          </div>
          {options.Ciudadania && option==="/config/create-game" && <ButtonCiudadania onPress={handleLogin} text="Ciudadania" />}
        </form>
      </div>
    </React.Fragment>
  );
};
