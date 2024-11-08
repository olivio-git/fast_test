import React, { useState } from "react";
import { WrapperArt } from "../../Wrappers/WrapperArt";
import { FormOptions } from "../../components/forms/FormInitGame/FormOptions"; 
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { formCreate, formJoin } from "./formTypes";
import axios from "axios";
import toast from "react-hot-toast";

export const CreateGameScreen = () => {
  const navigate = useNavigate()
  const {option} = useParams();
  const fields = option === "create-game" ? formCreate : formJoin;
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    password: "",
    email: "",
    ci: ""
  });

  const handleChange = (name:string, value:string) => {
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('usuario/login',{ email:user.email,password:user.password },{
        headers:{
          "Content-Type":"application/json"
        }
      }); 
      localStorage.setItem("token_session",response.data.data.token)
      navigate('/home')
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmitUserCreate = async () => { 
    console.log("here")
    try {
      const response = await axios.post("usuario/create", user);
      if (response) {
        toast.success("Registro completo");
      } 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <WrapperArt>
        <FormOptions 
          user={user}
          navigate={option === "create-game" ? "use-code" : "create-game"}
          fields={fields}
          options={{Submit:true, Back:true, Ciudadania:true}}
          handleChange={handleChange}
          handleSubmitUserCreate={handleSubmitUserCreate}
          handleLogin={handleLogin}
        />
      </WrapperArt>
    </React.Fragment>
  );
};
