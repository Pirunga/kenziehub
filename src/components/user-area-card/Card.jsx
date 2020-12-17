import React from "react";

import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  IconButton,
  Button,
  TextField,
  CardContent,
  CardActions,
  Card,
} from "@material-ui/core";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ImCheckboxChecked } from "react-icons/im";
import Fade from "@material-ui/core/Fade";

import Popper from "@material-ui/core/Popper";
import axios from "axios";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10%",
    maxWidth: 400,
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  editButton: {
    color: "#3666eb",
    width: "2vw",
  },
  deleteButton: {
    color: "#f33636",
    width: "2vw",
  },
  saveButtonOuter: {
    "& .MuiIconButton-root:hover": {
      color: "#2fb822",
    },
  },
  saveButton: {
    color: "#9ebcec",
  },
  textField: {
    "& .MuiInputBase-root": {
      padding: "20px",
    },
    "& .MuiFormLabel-root": {
      fontSize: "14px",
    },
  },
  buttons: {
    padding: "1px",
    justifyContent: "center",
  },
  paper: {
    border: "1px solid",
    backgroundColor: theme.palette.background.paper,
  },
  popup: {
    padding: theme.spacing(1),
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    backgroundColor: "#424242",
    color: "#fff",
  },
  cancel: {
    margin: theme.spacing(3, 0, 2),
    color: "#f48fb1",
    "& :hover": {
      backgroundColor: "red",
      color: "#fff",
    },
  },
}));

export default function UserCard({
  inputCards,
  setInputCards,
  inputCard,
  index,
}) {
  const classes = useStyles();

  const [edit, setEdit] = useState(true);

  const token = useSelector((state) => state.userToken);

  const enableEdit = () => {
    setEdit(false);
  };

  const disableEdit = () => {
    setEdit(true);

    axios.put(`https://kenziehub.me/users/works/${inputCard.id}`, inputCard, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const handleChangeInput = (index, event) => {
    const values = [...inputCards];
    values[index][event.target.name] = event.target.value;
    setInputCards(values);
  };

  const handleRemoveCard = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const confirmedRemoveCard = (index) => {
    const values = [...inputCards];
    values.splice(index, 1);
    setInputCards(values);
    console.log(inputCards);

    axios.delete(`https://kenziehub.me/users/works/${inputCard.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "transitions-popper" : undefined;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <form className={classes.form} noValidate autoComplete="off">
          <div>
            <TextField
              name="title"
              className={classes.textField}
              disabled={edit}
              id="outlined-multiline-flexible"
              label="Nome do Projeto "
              multiline
              rowsMax={2}
              value={inputCard.title}
              variant="outlined"
              onChange={(event) => handleChangeInput(index, event)}
            />
            <TextField
              name="desc"
              className={classes.textField}
              disabled={edit}
              id="outlined-multiline-static"
              label="Descreva o projeto"
              multiline
              rows={5}
              variant="outlined"
              value={inputCard.description}
              onChange={(event) => handleChangeInput(index, event)}
            />
            <TextField
              name="url"
              className={classes.textField}
              disabled={true}
              type="url"
              id="outlined-textarea"
              label="Link para o seu projeto"
              multiline
              variant="outlined"
              value={inputCard.deploy_url}
              onChange={(event) => handleChangeInput(index, event)}
            />
          </div>
        </form>
      </CardContent>

      <CardActions className={classes.buttons}>
        <IconButton onClick={enableEdit}>
          <FaEdit className={classes.editButton} />
        </IconButton>

        <IconButton onClick={(event) => handleRemoveCard(event)}>
          <MdDelete className={classes.deleteButton} />
          <Popper
            id={id}
            open={open}
            anchorEl={anchorEl}
            transition
            placement="bottom"
            disablePortal={false}
            modifiers={{
              flip: {
                enabled: true,
              },
              preventOverflow: {
                enabled: true,
                boundariesElement: "scrollParent",
              },
            }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps}>
                <div className={classes.popup}>
                  <span>Você tem certeza?</span>
                  <div>
                    <Button
                      fullWidth
                      className={classes.cancel}
                      onClick={() => confirmedRemoveCard(index)}
                    >
                      Deletar
                    </Button>
                  </div>
                </div>
              </Fade>
            )}
          </Popper>
        </IconButton>

        <Button onClick={disableEdit} className={classes.saveButtonOuter}>
          <IconButton className={classes.saveButton}>
            <ImCheckboxChecked></ImCheckboxChecked>
          </IconButton>
          Salvar
        </Button>
      </CardActions>
    </Card>
  );
}
