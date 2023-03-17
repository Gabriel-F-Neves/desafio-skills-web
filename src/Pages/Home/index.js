import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/DataContext";
import { api } from "../../Service/Api";
import { useNavigate } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import UpdateIcon from "@mui/icons-material/Update";
import { ToastContainer, toast } from "react-toastify";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "react-toastify/dist/ReactToastify.css";

import logo from "../../Assets/LogoNeki.png";
import {
  Body,
  BoxAddSkill,
  Button,
  ButtonDeleteSkill,
  ButtonRefreshLevel,
  Container,
  ContainerList,
  ContainerSkills,
  Header,
  HeaderTitle,
  Icons,
  Info,
  Input,
  ItemList,
  ListSkills,
  Logo,
} from "./styles";
import { LogoutModal } from "../../Components/ModalLogout";
import { DeleteSkillModal } from "../../Components/ModalDeleteSkill";

export const Home = () => {
  const { armazenaDadosUsuario } = useContext(DataContext);
  const { dadosUsuario } = useContext(DataContext);
  const [userSkills, setUserSkills] = useState();
  const [allSkills, setAllSkills] = useState();
  const [logado, setLogado] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedSkill, setSelectedSkill] = useState();
  const [level, setLevel] = useState();
  const [value, setValue] = useState();
  const [trueOrFalse, setTrueOrFalse] = useState(false);
  const [visibleLogout, setVisibleLogout] = useState(false);
  const [visibleDeleteSkill, setVisibleDeleteSkill] = useState(false);
  const [deletedSkill, setDeletedSkill] = useState();

  const notifyUpdate = () =>
    toast.success("Nível alterado com sucesso!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notifyDelete = () =>
    toast.success("Skill deletada com sucesso!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notifyAdd = () =>
    toast.success("Skill Adicionada com sucesso!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 10) {
      setValue(10);
    }
  };

  const handleChange = (event) => {
    setSelectedSkill(event.target.value);
  };

  const handleLevel = (event) => {
    setLevel(event.target.value);
  };

  const handleAllSkills = async () => {
    api
      .get(`/skill`, {
        headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
      })
      .then((res) => {
        setAllSkills(res.data);
      })
      .catch((error) => {
        console.log(
          "Erro ao realizar requisição das skills: " + JSON.stringify(error)
        );
      });
  };

  const handleSkills = async () => {
    api
      .get(`/user/${dadosUsuario.userId}`, {
        headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
      })
      .then((res) => {
        setUserSkills(res.data.user_skills);
        setLogado(res.data);
      })
      .catch((error) => {
        console.log(
          "Erro ao realizar requisição das skills: " + JSON.stringify(error)
        );
      });
  };

  const getCurrentDate = () => {
    const date = new Date().toJSON().slice(0, 10);
    return date;
  };

  const handleSaveUserSkill = async () => {
    FunctioTrueOrFalse();
    try {
      await api.post(
        "/user_skill",
        {
          user: {
            userId: dadosUsuario.userId,
          },
          skill: {
            skillId: selectedSkill,
          },
          knowledgeLevel: level,

          createdAt: getCurrentDate(),
        },
        { headers: { Authorization: `Bearer ${dadosUsuario?.token}` } }
      );
      notifyAdd();
    } catch (error) {
      console.log("Erro ao salvar a skill para este usuário!");
    }
  };

  const DeleteSkill = (idDeletedSkill) => {
    setVisibleDeleteSkill(true);
    setDeletedSkill(idDeletedSkill)
  };

  const handleUpdateLevel = async (idUserSkill, idSkill) => {
    try {
      await api
        .put(
          `/user_skill/${idUserSkill}`,
          {
            user: {
              userId: dadosUsuario.userId,
            },
            skill: {
              skillId: idSkill,
            },
            knowledgeLevel: value,

            updatedAt: getCurrentDate(),
          },
          { headers: { Authorization: `Bearer ${dadosUsuario?.token}` } },
          console.log(
            "USER ID: " +
              dadosUsuario.userId +
              "SKILL ID: " +
              selectedSkill +
              "LEVEL: " +
              value
          )
        )
        .then((resp) => {
          notifyUpdate();
        });
    } catch (error) {
      console.log("Algo deu errado, tente novamente.");
    }
  };

  const FunctioTrueOrFalse = () => {
    if (trueOrFalse == true) {
      setTrueOrFalse(false);
    } else {
      setTrueOrFalse(true);
    }
  };

  useEffect(() => {
    armazenaDadosUsuario(localStorage.getItem("key_Login"));
  }, [trueOrFalse]);

  useEffect(() => {
    handleSkills();
    handleAllSkills();
  }, [dadosUsuario]);

  return (
    <Container>
      <Header>
        <Info>
          <Logo src={logo} />
        </Info>
        <Info>
          <HeaderTitle>Página de skills</HeaderTitle>
        </Info>
        <Info>
          <Icons>
            <IconButton edge="end" onClick={handleOpen}>
              <AddCircleOutlineIcon sx={{ fontSize: 40, color: "#eee" }} />
            </IconButton>
          </Icons>
          <Icons>
            <IconButton edge="end" onClick={() => {setVisibleLogout(true)}}>
              <LogoutIcon sx={{ fontSize: 40, color: "#eee" }} />
            </IconButton>
          </Icons>
        </Info>
      </Header>
      <Body>
      <LogoutModal visible={visibleLogout} dimiss={() => {setVisibleLogout(false)}}/>
      <DeleteSkillModal visible={visibleDeleteSkill} deletedSkill={deletedSkill} dimiss={() => {setVisibleDeleteSkill(false); FunctioTrueOrFalse()}} notify={() => { notifyDelete()}}/>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={BoxAddSkill}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Skill</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedSkill}
                label="skill"
                onChange={handleChange}
                inputProps={{ "aria-label": "Without label" }}
              >
                {allSkills?.map((resSkills) => (
                  <MenuItem value={resSkills.skillId}>
                    {resSkills.skillName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 5 }}>
              <InputLabel id="demo-simple-select-label">Level</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedSkill}
                label="level"
                onChange={handleLevel}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={1}>Um</MenuItem>
                <MenuItem value={2}>Dois</MenuItem>
                <MenuItem value={3}>Três</MenuItem>
                <MenuItem value={4}>Quatro</MenuItem>
                <MenuItem value={5}>Cinco</MenuItem>
                <MenuItem value={6}>Seis</MenuItem>
                <MenuItem value={7}>Sete</MenuItem>
                <MenuItem value={8}>Oito</MenuItem>
                <MenuItem value={9}>Nove</MenuItem>
                <MenuItem value={10}>Dez</MenuItem>
              </Select>
            </FormControl>
            <Button>
              <span
                onClick={() => {
                  handleSaveUserSkill();
                }}
              >
                Adicionar skill
              </span>
            </Button>
          </Box>
        </Modal>
        <ContainerSkills>
          <ContainerList>
            {userSkills?.map((skills) => (
              <ListSkills>
                <ItemList>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ height: 100, width: 100 }}
                      src={skills?.skill.skillImage}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ margin: 5, marginRight: 20 }}
                    primary={skills.skill.skillName}
                    secondary={skills.skill.skillVersion}
                    secondaryTypographyProps={{ color: "#fff" }}
                  />
                  <Typography
                    id="input-slider"
                    gutterBottom
                    sx={{ marginRight: 2 }}
                    >
                    Nível
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Input
                        key={skills.skill.skillName}
                        sx={{ color: "#fff" }}
                        defaultValue={skills?.knowledgeLevel}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                          step: 1,
                          min: 0,
                          max: 10,
                          type: "number",
                          "aria-labelledby": "input-slider",
                        }}
                      />
                    </Grid>
                  </Grid>
                  <IconButton
                    edge="end"
                    onClick={() => {
                      handleUpdateLevel(
                        skills.userSkillId,
                        skills.skill.skillId
                      );
                    }}
                  >
                    <UpdateIcon sx={ButtonRefreshLevel} />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => {
                      DeleteSkill(skills.userSkillId);
                    }}
                  >
                    <DeleteForeverIcon sx={ButtonDeleteSkill} />
                  </IconButton>
                </ItemList>
              </ListSkills>
            ))}
          </ContainerList>
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
        </ContainerSkills>
      </Body>
    </Container>
  );
};
