import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../Service/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton'
import { Container, ContainerRegister, ContainerRegisterBtn, Input, RegisterBtn, RegisterForm, RegisterFormTitle, TextCenter, Txt1, Txt2, WrapInput, WrapRegister } from "./styles";

export const Cadastro = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [visiblePassword, setVisiblePassword] = useState(false)
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false)

    const Navigation = useNavigate()

    const VisiblePassword = () => {
        if(visiblePassword !== true){
            setVisiblePassword(true)
        }
        else{
            setVisiblePassword(false)
        }
    }

    const VisibleConfirmPassWord = () => {
      if(visibleConfirmPassword !== true){
        setVisibleConfirmPassword(true)
      }
      else{
        setVisibleConfirmPassword(false)
      }
    }

    const notify = () =>
    toast.success("Cadastro realizado com sucesso", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notifyPassword = () =>
    toast.error("As senhas são diferentes", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    const Registro = async () => {
        if(password === confirmPassword){
            await api.post(
                "/auth/registro",
                {             
                  userLogin: login ,
                  userPassword: password             
                }
            ).then(res => {
                if(res.status === 200){
                  notify();
                    setTimeout(() => {
                      Navigation("/");
                    }, "3000");
                }
            }).catch((err) => {
                console.log('erro ao relizar a requisição: ' + JSON.stringify(err))
            })
        }else{
            notifyPassword();
        }
    }

    return(
        <Container>
        <ContainerRegister>
          <WrapRegister>
            <RegisterForm>
              <RegisterFormTitle> Cadastre-se </RegisterFormTitle>
              <WrapInput>
                <Input
                  type="login"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="Login"
                />
              </WrapInput> 
              <WrapInput>
                <Input
                  type= {visiblePassword === true ? "login" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <IconButton edge="end" onClick={() => {VisiblePassword()}} >
                    <VisibilityIcon sx={{ fontSize: 20, color:'#eee' }}/>
                </IconButton>
              </WrapInput>
              <WrapInput>
                <Input
                  type= {visibleConfirmPassword === true ? "login" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
                <IconButton edge="end" onClick={() => {VisibleConfirmPassWord()}} >
                    <VisibilityIcon sx={{ fontSize: 20, color:'#eee' }}/>
                </IconButton>
              </WrapInput>
              <ContainerRegisterBtn>
                <RegisterBtn onClick={() => {Registro()}}>Cadastrar</RegisterBtn>
              </ContainerRegisterBtn>
              <TextCenter>
                <Txt1>Já possui conta? Faça</Txt1>
                <Txt2 to={"/"} href="#">
                  Login
                </Txt2>
              </TextCenter>
            </RegisterForm>
          </WrapRegister>
        </ContainerRegister>
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
}