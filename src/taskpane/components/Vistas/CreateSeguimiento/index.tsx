import React, { useState } from "react";
import { TcTareaCortaModel } from "../../../models/TareaCorta";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

const CreateSeguimiento = ({ onClose }) => {
  const [personaACargo, setPersonaACargo] = useState("");
  const [nombreSeguimiento, setNombreSeguimiento] = useState("");
  const [proyecto, setProyecto] = useState(null);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [open, setOpen] = React.useState(false);

  const crearTareaCorta = (tareaCorta) => {
    return new Promise(async (resolve, eject) => {
      const nTarea = Object.assign({}, tareaCorta);

      nTarea.fechaVencimiento = DateToUtcString(nTarea.fechaVencimiento);

      HttpCliente.post("/TcTareaCorta", nTarea)
        .then((response) => {
          resolve([response, undefined, response.status]);
        })
        .catch((error) => {
          const err = getResponseError(error);
          resolve([undefined, err, error.response?.status]);
        });
    });
  };

  const handleAceptarClick = () => {
    // Realiza cualquier lógica necesaria antes de mostrar el pop-up
    if (personaACargo && nombreSeguimiento && startDate && proyecto) {
      // Ejemplo: Enviar datos al servidor
      console.log("Mandar datos");
      setOpen(true);
      // Llama a la función onClose para cerrar la vista
    } else {
      // Muestra un mensaje de error o realiza alguna acción cuando falta información
      alert("Por favor, completa todos los campos antes de continuar.");
    }
  };
  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  const handleChange = (event: SelectChangeEvent) => {
    setProyecto(event.target.value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Box
          className="input-container"
          sx={{
            m: 1,
          }}
        >
          <TextField
            name="personaACargo"
            value={personaACargo}
            onChange={(e) => setPersonaACargo(e.target.value)}
            label="Ingrese la persona a cargo (correo)"
            fullWidth
            required
          />
        </Box>
        <Box
          className="input-container"
          sx={{
            m: 1,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="seleccion-de-proyecto-label">Proyecto</InputLabel>
            <Select
              labelId="seleccion-de-proyecto-label"
              id="seleccion-de-proyecto"
              value={proyecto}
              label="Proyecto"
              onChange={handleChange}
            >
              {/*LLamar desde la API*/}
              <MenuItem value={"DGCA"}>DGCA</MenuItem>
              <MenuItem value={"AustranetGRC"}>AustranetGRC</MenuItem>
              <MenuItem value={"IA"}>IA</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          className="input-container"
          sx={{
            m: 1,
          }}
        >
          <TextField
            name="NombreSeguimiento"
            value={nombreSeguimiento}
            onChange={(e) => setNombreSeguimiento(e.target.value)}
            variant="outlined"
            label="Ingrese Nombre de Tarea"
            fullWidth
            required
          />
        </Box>

        <Box
          className="input-container"
          sx={{
            m: 1,
          }}
        >
          <DatePicker label="Fecha Limite" value={startDate} onChange={(date) => setStartDate(date)} />
        </Box>
        <Box display="flex" justifyContent="space-evenly">
          <Button variant="outlined" onClick={handleAceptarClick}>
            Aceptar
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
        </Box>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText>Seguimiento Creado!</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default CreateSeguimiento;
