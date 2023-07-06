import axiosClient from "./axios"

const client = axiosClient;

export default{
    findAll(){
        return client.get("/paciente");
    },
    findById(id){
        return client.get(`/paciente/${id}`);
    },
    create(usuario){
        return client.post("/paciente", usuario);
    },
    delete(id){
        return client.delete(`/paciente/${id}`);
    },
    update(id,usuario){
        return client.put(`/paciente/${id}`, usuario);
    },
    login(credenciales){
        return client.post(`/paciente/login`, credenciales);
    }
}