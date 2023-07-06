<script setup>
import { useCounterStore } from "../stores/counter.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import router from "../router/index"
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';


const store = useCounterStore();
const { loginMedico } = store;
const email = ref("");
const password = ref("");
const isLoading = ref(false);



async function validarLogin(email, password){
  isLoading.value = true;
  if(email && password){
    if(await loginMedico(email, password)){
      router.push({path:"/InicioMedico"});
      isLoading.value = false;
    }else{
      console.log("hola")
      isLoading.value = false;
      window.alert("Usuario no registrado")
    }
  }
  isLoading.value = false;
}
</script>

<template>
  <div>
    <loading v-model:active="isLoading"
                 :can-cancel="false"
                 :is-full-page="fullPage"/>
  </div>
  
  <div class="container">
    <form action="" v-on:submit.prevent>

    <div class="input-group">
      <input
        type="text"
        class="form-control"
        placeholder="Tu email"
        v-model="email"
        required
      />
      <span class="input-group-text">@example.com</span>
    </div>
    
    <div class="input-group">
      <span class="input-group-text">Contraseña</span>
      <input
        type="password"
        class="form-control"
        placeholder="Ingresa aqui tu contraseña"
        v-model="password"
        required
      />
    </div>

    <button
        @click="validarLogin(email, password)"
        type="submit"
        class="btn btn-outline-secondary"
      >
        Ingresar
    </button>
    

    <RouterLink to="/"
      ><button type="button" class="btn btn-danger" id="btnVolver">
        Volver al inicio
      </button></RouterLink
    >
  </form>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}
div{
    margin-top: 25px;
}

button {
  margin: 15px;
  padding: 20px;
}
</style>
