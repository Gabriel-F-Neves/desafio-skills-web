import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";

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

export function LogoutModal ({visible, dimiss}){

    const Navigation = useNavigate();

    const Logout = () => {
        localStorage.removeItem("key_Login");
        Navigation("/");
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
                    Deseja realmente sair?
                </Typography>
                <Button>
                <span
                    onClick={() => {Logout()}}
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