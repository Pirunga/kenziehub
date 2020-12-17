import React from "react";
import { useSelector } from "react-redux";

import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  IconButton,
  Button,
  TextField,
  CardContent,
  CardActions,
  Card,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ImCheckboxChecked } from "react-icons/im";
import Fade from "@material-ui/core/Fade";
import Popper from "@material-ui/core/Popper";

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
  popup: {
    padding: theme.spacing(1),
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    backgroundColor: "#424242",
    color: "#fff",
  },
  cancel: {
    margin: theme.spacing(2, 0, 1),
    color: "#f48fb1",
    "& :hover": {
      backgroundColor: "red",
      color: "#fff",
    },
  },
}));

export default function TechCard({ tech, setTechs, prevTechs }) {
  const classes = useStyles();
  const token = useSelector((state) => state.userToken);

  const [edit, setEdit] = useState(true);
  const [techLevel, setTechLevel] = useState(tech.status);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "transitions-popper" : undefined;

  const handleUpdate = () => {
    setEdit(true);
    axios
      .put(
        `https://kenziehub.me/users/techs/${tech.id}`,
        { status: techLevel },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleRemoveCard = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const confirmedRemoveCard = () => {
    axios
      .delete("https://kenziehub.me/users/techs/" + tech.id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        const newTechs = prevTechs.filter((el) => {
          return el.title !== tech.title;
        });
        setTechs(newTechs);
      });
  };

  const status = [
    {
      value: "Iniciante",
      label: "Iniciante",
    },
    {
      value: "Intermediario",
      label: "Intermediario",
    },
    {
      value: "Avançado",
      label: "Avançado",
    },
  ];

  const handleChange = (event) => {
    setTechLevel(event.target.value);
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <form className={classes.form} noValidate autoComplete="off">
          <div>
            <TextField
              name="title"
              className={classes.textField}
              disabled={true}
              id="outlined-multiline-flexible"
              label="Nome da Tecnologia"
              multiline
              rowsMax={2}
              fullWidth
              value={tech.title}
              variant="outlined"
            />

            <TextField
              name="status"
              id="status"
              variant="outlined"
              select
              autoFocus
              disabled={edit}
              fullWidth
              value={techLevel}
              onChange={handleChange}
            >
              {status.map((level, index) => (
                <MenuItem key={index} value={level.value}>
                  {level.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </form>
      </CardContent>

      <CardActions className={classes.buttons}>
        <IconButton onClick={() => setEdit(false)}>
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
                enabled: false,
              },
              preventOverflow: {
                enabled: false,
                // boundariesElement: "scrollParent",
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
                      onClick={() => confirmedRemoveCard()}
                    >
                      Deletar
                    </Button>
                  </div>
                </div>
              </Fade>
            )}
          </Popper>
        </IconButton>

        <Button onClick={handleUpdate} className={classes.saveButtonOuter}>
          <IconButton className={classes.saveButton}>
            <ImCheckboxChecked></ImCheckboxChecked>
          </IconButton>
          Salvar
        </Button>
      </CardActions>
    </Card>
  );
}
