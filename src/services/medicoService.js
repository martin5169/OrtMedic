import axiosClient from "./axios"

const client = axiosClient;

export default {
    findAll(){
        return client.get("/medico");
    },
    findById(id){
        return client.get(`/medico/${id}`)
    },
    create(medico){
        return client.post("/medico",medico)
    },
    delete(id){
        return client.delete(`/medico/${id}`)
    },
    update(id,medico){
        return client.put(`/medico/${id}`,medico)
    },
    login(credenciales){
        return client.post(`/medico/login`, credenciales);
    },
    buscarEspecialidad(especialidad){
        return client.post("/medico/especialidad", especialidad)
    }

}