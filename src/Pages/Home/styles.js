import styled from "styled-components";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MuiInput from "@mui/material/Input";

export const Container = styled.div`
height: 100vmin;
background-color: ${({ theme }) => theme.COLORS.GRAY_100};
`

export const Header = styled.header`
background-color: ${({ theme }) => theme.COLORS.GRAY_400};
color: ${({ theme }) => theme.COLORS.WHITE};
display: flex;
justify-content: space-between;
align-items: center;
padding-bottom: 20px;
padding-top: 20px;
`

export const HeaderTitle = styled.text`
font-size: 30px;
font-weight: bold;
color: ${({ theme }) => theme.COLORS.WHITE};
`

export const ContainerList = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
margin-top: 10px;
`

export const Body = styled.body`
align-items: center;
background-color: ${({ theme }) => theme.COLORS.GRAY_100};
`

export const Logo = styled.img`
height: 3rem;
width: 9rem;
`

export const Info = styled.div`
display: flex;
justify-content: center;
width: 25%;
`

export const ContainerSkills = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
`

export const Icons = styled.div`
display: flex;
justify-content: space-between;
margin: 1rem;
`

export const Button = styled.div`
background-color: #333;
color: #ccc;
width: 8rem;
height: 4rem;
margin-top: 1rem;
display: flex;
justify-content: center;
align-items: center;
border-radius: 0.5rem;
cursor: pointer;
`

export const ListSkills = styled(List)`
width: 100%;
max-width: 600px;
background-color: ${({ theme }) => theme.COLORS.GRAY_100};
`

export const ItemList = styled(ListItem)`
margin-bottom: 0px;
border-radius: 10px;
background-color: ${({ theme }) => theme.COLORS.GRAY_400};
color: ${({ theme }) => theme.COLORS.WHITE};
`

export const ItemTextList = styled(ListItemText)`
margin: 5px;
margin-right: 20px;
color: ${({ theme }) => theme.COLORS.WHITE};
`

export const Input = styled(MuiInput)`
width: 42px;
`

export const ButtonRefreshLevel = {
fontSize:35,
color: 'white'
}

export const ButtonDeleteSkill = {
fontSize:35,
color: 'white'
}

export const BoxAddSkill = {
position: "absolute",
top: "50%",
left: "50%",
transform: "translate(-50%, -50%)",
width: 400,
bgcolor: "#eee",
borderRadius: 3,
boxShadow: 24,
p: 4,
}