import { defineStore } from "pinia";
import medicoService from "../services/medicoService";
import usuariosService from "../services/usuariosService";
import turnoService from "../services/turnoService";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    idUsuario: "",
    idMedico: "",
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    matricula: "",
    dni: "",
    tipoUsuario: "",
    turnos: [],
    medicos: [],
    especialidad: "",
    turno:{}
  }),
  persist: true,
  actions: {
    async registerUsuario(nombre, apellido, dni, email, password) {
      const obj = {
        nombre,
        apellido,
        dni,
        email,
        password
      };
      try {
        await usuariosService.create(obj);
      } catch (e) {
        throw e;
      }
    },
    async registerMedico(nombre, apellido, dni, email, password, matricula, especialidad) {
      console.log(password)
      const obj = {
        nombre,
        apellido,
        dni,
        email,
        password,
        matricula,
        especialidad
      };
      try {
        await medicoService.create(obj);
      } catch (e) {
        throw e;
      }
    },
    async loginUsuario(email, password) {
      if (!email || !password) {
        return false;
      }
      try {
        let { data } = await usuariosService.login({ email, password });
        this.nombre = data.nombre;
        this.apellido = data.apellido;
        this.email = data.email;
        this.dni = data.dni;
        this.tipoUsuario = "USUARIO";
        this.idUsuario = data._id;
        return true;
      } catch (e) {
        return false;
      }
    },
    async loginMedico(email, password) {
      if (!email || !password) {
        return false;
      }
      try {
        let { data } = await medicoService.login({ email, password });
        this.nombre = data.nombre;
        this.apellido = data.apellido;
        this.email = data.email;
        this.dni = data.dni;
        this.tipoUsuario = "MEDICO";
        this.idMedico = data._id;

        return true;
      } catch (e) {
        return false;
      }
    },
    async nuevoTurno(medicoId, usuarioId, fecha, hora, especialidad) {
      const nuevoTurno = {
        medico: medicoId._value,
        paciente: usuarioId,
        fecha: fecha,
        hora: hora,
        especialidad: especialidad,
      };
      try {
        await turnoService.create(nuevoTurno);
        return true;
      } catch (error) {
        throw error;
      }
    },
    async eliminarTurno(turnoId) {
      await turnoService.delete(turnoId);
    },
    async buscarEspecialistas(especialidad) {
      let { data } = await medicoService.buscarEspecialidad({ especialidad });
      this.medicos = data;
      return this.medicos;
    },
    async buscarTurnosPorIdPaciente(idUsuario) {
      let { data } = await turnoService.findByPaciente(idUsuario);
      this.turnos = data;
      return this.turnos;
    },
    async buscarTurnosPorIdMedico(idMedico) {
      let { data } = await turnoService.findByMedico(idMedico);
      this.turnos = data;
      return this.turnos;
    },
    async buscarTurnosPorIdMedicoYFecha(idMedico, fecha) {
      let { data } = await turnoService.verDisponibilidadHoraria(
        idMedico,
        fecha
      );
      return data;
    },
    async buscarMedicoPorId(idMedico){
      let { data } = await medicoService.findById(
        idMedico
      );
      return data;
    },
    async buscarPacientePorId(idPaciente){
      let { data } = await usuariosService.findById(
        idPaciente
      );
      return data;
    },
    guardarTurno(medico, paciente, id, fecha, hora, nombrePaciente){
      this.turno = {
        medico,
        paciente,
        id,
        fecha,
        hora,
        nombrePaciente
      }
    },
    async actualizarTurno(id, turno){
      try{
        await turnoService.update(id, turno);
      } catch(e){
        throw e;
      }
    },
    cerrarSesion(){
      this.nombre="";
      this.apellido="";
      this.dni="";
      this.email="";
      this.password="";
      this.especialidad="";
      this.medicos=[];
      this.turno={};
      this.turnos=[];
      this.idMedico="";
      this.idUsuario="";
    }
  },
});
