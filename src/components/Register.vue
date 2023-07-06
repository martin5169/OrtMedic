<script setup>
import { ref } from "vue";
import { useCounterStore } from "../stores/counter";
import router from "../router/index";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const store = useCounterStore();
const nombre = ref("");
const apellido = ref("");
const dni = ref("");
const password = ref("");
const email = ref("");
const tipo = ref("");
const matricula = ref("");
const especialidad = ref("");
const isLoading = ref(false);
const { registerUsuario, registerMedico } = store;

async function validarRegister(
  nombre,
  apellido,
  dni,
  email,
  password,
  tipo
) {
  isLoading.value=true;
  if (nombre && apellido && dni && password) {
    if (tipo === "Usuario") {
      try {
        await registerUsuario(nombre, apellido, dni, email, password);
        router.push({ path: "/" });
      } catch (e) {
        window.alert("Ya existe un usuario con ese mail");
      }finally{
        isLoading.value=false;
      }
    } else {
      try {
        await registerMedico(
          nombre,
          apellido,
          dni,
          email,
          password,
          matricula.value,
          especialidad.value
        );
        router.push({ path: "/" });
      } catch (e) {
        window.alert("Ya existe un medico con ese mail");
      }finally{
        isLoading.value=false;
      }
    }
  }
  isLoading.value=false;
}
</script>

<template>
  <div>
    <loading v-model:active="isLoading"
                 :can-cancel="false"
                 :is-full-page="fullPage"/>
  </div>

  <form class="container" v-on:submit.prevent>
    <div class="input-group">
      <span class="input-group-text">Nombre</span>
      <input
        type="text"
        class="form-control"
        placeholder="Ingrese su nombre"
        v-model="nombre"
        required
      />
    </div>
    <div class="input-group">
      <span class="input-group-text">Apellido</span>
      <input
        type="text"
        class="form-control"
        placeholder="Ingrese su apellido"
        v-model="apellido"
        required
      />
    </div>
    <div class="input-group">
      <span class="input-group-text">Documento de Identidad</span>
      <input
        type="text"
        class="form-control"
        placeholder="DNI"
        v-model="dni"
        required
      />
    </div>
    <div class="input-group">
      <span class="input-group-text">Email</span>
      <input
        type="mail"
        class="form-control"
        placeholder="Ingrese su email"
        v-model="email"
        required
      />
    </div>

    <div class="input-group">
      <input
        type="password"
        class="form-control"
        placeholder="Ingrese una contraseña"
        v-model="password"
        required
      />
      <span class="input-group-text">Contraseña</span>
    </div>

    <div class="input-group">
      <select
        class="form-select"
        aria-label="Default select example"
        v-model="tipo"
        required
      >
        <option disabled selected hidden>Selecciona el tipo de usuario</option>
        <option>Medico</option>
        <option>Usuario</option>
      </select>
    </div>
    <div class="input-group" v-show="tipo === 'Medico'">
      <span class="input-group-text">Ingrese su matricula</span>
      <input type="text" class="form-control" v-model="matricula" required />
    </div>

    <div class="input-group" v-show="tipo === 'Medico'">
    <span class="input-group-text" >Seleccioná una especialidad</span>
      <select
        class="form-select"
        aria-label="Default select example"
        v-model="especialidad"
        required 
      >
        <option>Odontologia</option>
        <option>Otorrinolaringologia</option>
        <option>Kinesiologia</option>
      </select>
    </div>



    <div class="router">
      <button
        type="submit"
        class="btn btn-outline-secondary"
        @click="
          validarRegister(
            nombre,
            apellido,
            dni,
            email,
            password,
            tipo
          )
        "
      >
        Registrar
      </button>
      <RouterLink to="/"
        ><button class="btn btn-outline-secondary" type="button">
          Volver al inicio
        </button>
      </RouterLink>
    </div>
  </form>
</template>

<style scoped>
div {
  margin: 20px;
  align-items: center;
}

.input-group {
  width: 60%;
}

.container {
  margin-top: 2%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

button {
  margin: 15px;
  padding: 20px;
}

.router {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
</style>
