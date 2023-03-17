import { React, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";
import { PrivateRoute } from "../../Routes/privateRoute";
import { api } from "../../Service/Api";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  ContainerLogin,
  ContainerLoginBtn,
  Input,
  LoginBtn,
  LoginForm,
  LoginFormTitle,
  TextCenter,
  Txt1,
  Txt2,
  WrapInput,
  WrapLogin,
} from "./styles";

export const Login = () => {
  const { armazenaDadosUsuario } = useContext(DataContext);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);

  const Navigation = useNavigate();

  const Visible = () => {
    if (visiblePassword != true) {
      setVisiblePassword(true);
    } else {
      setVisiblePassword(false);
    }
  };

  const notifyPassword = () =>
    toast.error("Login ou senha não conferem", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleLogin = async () => {
    var tokenJwt = null;

    try {
      const retorno = await api.post("/auth/login", {
        userLogin: login,
        userPassword: password,
      });

      if (retorno.status === 200) {
        tokenJwt = retorno.data;

        localStorage.setItem("key_Login", tokenJwt["jwt-token"]);
        armazenaDadosUsuario(localStorage.getItem("key_Login"));

        Navigation("/home");

        PrivateRoute();
      } else {
        console.log("Erro ao realizar a autenticação");
      }
    } catch (error) {
      notifyPassword();
    }
  };

  return (
    <Container>
      <ContainerLogin>
        <WrapLogin>
          <LoginForm>
            <LoginFormTitle> Bem vindo </LoginFormTitle>
            <WrapInput>
              <Input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Login"
              />
            </WrapInput>
            <WrapInput>
              <Input
                type={visiblePassword == true ? "login" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <IconButton
                edge="end"
                onClick={() => {
                  Visible();
                }}
              >
                <VisibilityIcon sx={{ fontSize: 20, color: "#eee" }} />
              </IconButton>
            </WrapInput>
            <ContainerLoginBtn>
              <LoginBtn onClick={() => handleLogin()}>Login</LoginBtn>
            </ContainerLoginBtn>
            <TextCenter>
              <Txt1>Não possui conta? </Txt1>
              <Txt2 to={"/cadastro"} href="#">
                Criar conta
              </Txt2>
            </TextCenter>
          </LoginForm>
        </WrapLogin>
      </ContainerLogin>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Container>
  );
};
