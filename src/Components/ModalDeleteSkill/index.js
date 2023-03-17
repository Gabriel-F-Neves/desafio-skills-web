import React, { useContext } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { api } from "../../Service/Api";
import { DataContext } from "../../Context/DataContext";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
  };

export function DeleteSkillModal ({visible, deletedSkill, dimiss, notify}){

    const { dadosUsuario } = useContext(DataContext);

    const DeleteSkill = async (id) => {
        api.delete(`/user_skill/${id}`, {
        headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
        })
        .then((resp) => {
        console.log("DELETADO COM SUCESSO DO BANCO" + id);
        })
        .catch((error) => {
        console.log("Erro no DELETE  " + JSON.stringify(error));
        });

        notify(true)
    };

    return(
        <>
        <Modal
        open={visible}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Atenção
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Deseja realmente deletar essa skill?
                </Typography>
                <Button>
                <span
                    onClick={() => {DeleteSkill(deletedSkill); dimiss(true)}}
                >
                    Sim
                </span>
                </Button>
                <Button>
                <span
                    onClick={() => {dimiss(true)}}
                >
                    Não
                </span>
                </Button>
            </Box>
        </Modal>
        </>
    )
}