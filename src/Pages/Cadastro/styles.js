import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
width: 100%;
margin: 0 auto;
`

export const ContainerRegister = styled.div`
width: 100%;
min-height: 100vh;
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: center;
padding: 15px;
background-color: ${({ theme }) => theme.COLORS.GRAY_100};
`

export const WrapRegister = styled.div`
width: 280px;
background-color: ${({ theme }) => theme.COLORS.GRAY_400};
border-radius: 10px;
overflow: hidden;
padding: 77px 55px 33px 55px;
box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.2);
`

export const RegisterForm = styled.div`
width: 100%;
`

export const RegisterFormTitle = styled.span`
font-family: Nunito, sans-serif;
display: block;
font-size: 30px;
color: ${({ theme }) => theme.COLORS.WHITE};
line-height: 1.2;
text-align: center;
`

export const WrapInput = styled.div`
width: 100%;
position: relative;
display: flex;
justify-content: space-between;
border-bottom: 2px solid ${({ theme }) => theme.COLORS.GRAY_200};
margin-bottom: 37px;
`

export const Input = styled.input`
font-size: 15px;
color: ${({ theme }) => theme.COLORS.WHITE};
line-height: 1.2;
border: none;
display: block;
width: 100%;
height: 45px;
background-color: transparent;
padding: 0 5px;
font-family: Nunito, sans-serif;
:focus{
    outline: 0;
}
`

export const FocusInput = styled.span`
position: absolute;
display: block;
width: 100%;
height: 100%;
top: 0;
left: 0;
pointer-events: none;
color: ${({ theme }) => theme.COLORS.WHITE};
font-family: Nunito, sans-serif;
`

export const ContainerRegisterBtn = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
padding-bottom: 13px;
`

export const RegisterBtn = styled.button`
font-size: 15px;
border: none;
border-radius: 10px;
color: #fff;
line-height: 1.2;
text-transform: uppercase;
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 50px;
background: ${({ theme }) => theme.COLORS.GRAY_200};
background: -webkit-linear-gradient(to left,  ${({ theme }) => theme.COLORS.GRAY_100}, ${({ theme }) => theme.COLORS.GRAY_700});
background: -o-linear-gradient(to left, ${({ theme }) => theme.COLORS.GRAY_100}, ${({ theme }) => theme.COLORS.GRAY_700});
background: -moz-linear-gradient(to left, ${({ theme }) => theme.COLORS.GRAY_100}, ${({ theme }) => theme.COLORS.GRAY_700});
background: linear-gradient(to left, ${({ theme }) => theme.COLORS.GRAY_100}, ${({ theme }) => theme.COLORS.GRAY_700});
:hover{
    cursor: pointer;
}
`

export const TextCenter = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 50px;
`

export const Txt1 = styled.div`
font-size: 14px;
color: ${({ theme }) => theme.COLORS.GRAY_300};
line-height: 1.5;
padding-right: 5px;
`

export const Txt2 = styled(Link)`
font-size: 14px;
color: ${({ theme }) => theme.COLORS.BLUE_300};
line-height: 1.5;
text-decoration: none;
`