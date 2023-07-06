import axiosClient from "./axios";

const client = axiosClient;

export default {
    findAll(){
        return client.get("/turno");
    },
    findById(id){
        return client.get(`/turno/${id}`);
    },
    findByMedico(idMedico){
        return client.get(`/turno/medico/${idMedico}`);
    },
    findByPaciente(idPaciente){
        console.log(idPaciente);
        return client.get(`/turno/paciente/${idPaciente}`);
    },
    create(turno){
        return client.post("/turno", turno);
    },
    delete(id){
        return client.delete(`/turno/${id}`);
    },
    update(id,turno){
        return client.put(`/turno/${id}`, turno);
    },
    verDisponibilidadHoraria(idMedico,fecha){
        console.log(idMedico)
        return client.get(`/turno/disponibilidad?medico=${idMedico}&fecha=${fecha}`)
    }
};
