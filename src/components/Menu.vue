
<script setup>
import { useCounterStore } from "../stores/counter.js"
import router from "../router/index";
const store = useCounterStore();
const { nombre, cerrarSesion } = store;

function logout(){
  router.push({ path: "/" });
  cerrarSesion();
  store.$reset()
}
</script>

<template>
  <nav class="navbar navbar-light" style="background-color: #e3f2fd;">
  <div>
    <img src="../img/iconoNav.png" id="imagenNav">
    <a class="navbar-brand" href="/">CuidApp</a>
   </div>
  
  
    <button v-show="nombre!==''" @click="logout()" class="btn btn-secondary" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    Cerrar Sesion
    </button>
   
  </nav>
  



  
</template>

<style scoped>
  
  img{
    width: 8%;
    height: 4%;
    margin: 5px 20px;
  }

  a{
    font-weight: bold;
  }
 

  /* Footer*/

  .mainfooter{
        width: 100%;
        padding: 50px 0px;
        background-image: url(../img/background-footer.svg);
        background-size: cover;
        
        
      }
      
      .container__footer{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        max-width: 1200px;
        margin: auto;
        margin-top: 100px;
      }
      .box__footer{
        display: flex;
        flex-direction: column;
        padding: 40px;
      }
      
      .box__footer h2{
        margin-bottom: 30px;
        color: #343434;
        font-weight: 700;
      }
      
      .box__footer a{
        margin-top: 10px;
        color: #7a7a7a;
        font-weight: 600;
        text-decoration: none;
      }
      
      .box__footer a:hover{
        opacity: 0.8;
      }
      
      .box__footer a .fab{
        font-size: 20px;
      }
      
      .box__copyright{
        max-width: 1200px;
        margin: auto;
        text-align: center;
        padding: 0px 40px;
      }
      
      .box__copyright p{
        margin-top: 20px;
        color: #7a7a7a;
      }
      
      .box__copyright hr{
        border: none;
        height: 1px;
        background-color: #7a7a7a;
      }
      


</style>

