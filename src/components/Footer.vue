<script setup>
import { useCounterStore } from "../stores/counter.js"
import { storeToRefs } from "pinia";
import { ref } from "vue";

const store = useCounterStore();
const { login } = store;
const nombre = ref("");
const email = ref("");

</script>

<template>

<footer id="mainfooter fixed-bottom">

   <div class="box__footer">
        <h2>Redes Sociales</h2>
        <a href="#"> <i class="fab fa-facebook-square"></i> Facebook</a>
        <a href="#"><i class="fab fa-twitter-square"></i> Twitter</a>
        <a href="#"><i class="fab fa-linkedin"></i> Linkedin</a>
        <a href="#"><i class="fab fa-tumblr-square"></i>Tumblr</a>
    </div>  
    <div class="box__copyright">
        <hr>
        <p>Todos los derechos reservados © 2023 <b>CuidApp </b></p>
    </div> 
</footer>
    
  
    

</template>
<style scoped>


    footer{
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