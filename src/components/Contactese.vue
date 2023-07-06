<script setup>
import { RouterLink } from 'vue-router';
import { useCounterStore } from "../stores/counter.js"
const store = useCounterStore();
</script>

<template>
  
  
    <section class="form__principal container-fluid p-0" id="formulario">
          <h3>Contacto</h3>
          <div class="form__container wow animate__animated animate__slideInRight" id="formularioSecundario">
              <form id="form" action="https://formspree.io/f/mvoyrzyk" method="POST" class="section__form">
                <label for="name">Nombre Completo <span>*</span></label>
                <input name="name" required type="text" id="name" placeholder="Nombre">
                
                <label for="Asunto">Asunto <span></span></label>
                <input name="Asunto" required type="text" id="Asunto" placeholder="Asunto">
                
                                
                <label for="message">Mensaje</label>
                <textarea id="message" name="message"  rows="10" cols="40"></textarea>
                
                <button id="botonenviar" type="submit" class="button__enviar">Enviar</button>
              </form>
              <a href="" id="idform"></a>
          </div>  
    </section>

  <div class="container">
  <RouterLink to="/InicioUsuario"
    ><button class="btn btn-outline-secondary" type="button">
      Volver atras
    </button></RouterLink>
  </div>
</template>

<style scoped>

.form__principal{
  display: flex;
  flex-direction: column;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url();
}

.form__container{
  display: flex;
  justify-content: center;
  margin: 5% 0;
}

label{
  color: black;
}

#formulario h3{
  color: black;
 
}

#formulario{
  background-color:#F9F9F9;
  
}

#formulario h3{
  color: black;
  font-size: 40px;
  text-align: center;
  padding-top: 1%;
}

.section__form{
  display: flex;
  flex-direction: column;
  margin: 0 10%;
  font-size: 1em;
  font-weight: bold;
  width: 80%; 
}

input, textarea{
  border: solid 2px rgb(245, 242, 246);
  padding: 10px;
  margin: 5px 0px 10px;
  background: rgba(185, 188, 194, 0.3);
  color: black;
}

.button__enviar, .button__enviar:hover {
  display: inline-block;
  border-radius: 8px;
  padding: 15px 15px;
  color: white;
  font-weight: 400;
  font-size: 20px;
  background: #3d3d51;
  transition: all 1s;
}

.button__enviar:hover {
  background: #3d3d51;
  font-weight: bold;
}

</style>