<script setup>
import { RouterLink } from 'vue-router';
import { useCounterStore } from "../stores/counter.js"
import { storeToRefs } from "pinia";
const store = useCounterStore();
const { nombre } = storeToRefs(store);
const {cerrarSesion} = store;
</script>

<template>
  <div class="container">
    <h2>Bienvenido {{ nombre }}</h2>
    <div class="menu">
      <RouterLink to="/GestionTurnos"><button class="btn btn-outline-secondary" type="button">Ver mis turnos asignados <img src="https://cdn2.iconfinder.com/data/icons/party-new-years/128/Party_Newyears_Watch-128.png" id="imgButton" alt=""></button></RouterLink>
      <RouterLink to="/DatosPersonales"><button class="btn btn-outline-secondary" type="button">Ver mis datos <img src="https://cdn4.iconfinder.com/data/icons/man-user-human-person-avatar-business-profile/100/18A-1User-128.png" id="imgButton" alt=""></button></RouterLink>
      <RouterLink to="/Contactese"><button class="btn btn-outline-secondary" type="button">Contáctese <img src="https://cdn1.iconfinder.com/data/icons/contact-us-flat-1/58/028_-_Contact_Info-512.png" id="imgButton" alt=""></button>
      </RouterLink>
    </div>
    <RouterLink to="/"
    @click="cerrarSesion()"><button class="btn btn-outline-secondary" id="btnSalir" type="button">
      Salir
    </button></RouterLink>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
  margin-top: 45px;
  text-align: center;
}

h2{
  margin: 20px;
}
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.menu{
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;
}
#btnSalir{
  margin-top: 50px;
}
button {
  margin: 15px;
  padding: 20px
}

#imgButton{
  width: 40px;
  margin-left: 10px;
}


</style>
