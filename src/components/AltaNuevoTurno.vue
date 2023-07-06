<script setup>
import flatpickr from "flatpickr";
import { useCounterStore } from "../stores/counter.js";
import { ref, onMounted } from "vue";
import router from "../router/index";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';


const store = useCounterStore();
const {
  nuevoTurno,
  nombre,
  apellido,
  dni,
  buscarEspecialistas,
  idUsuario,
  buscarTurnosPorIdMedicoYFecha,
} = store;
const fecha = ref("");
const horario = ref("");
const especialidad = ref("");
const email = ref("");
const medicos = ref("");
const medicoSeleccionado = ref("");
const disableHorario = ref(true);
let horariosDisponibles = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];
const horariosDisponiblesRef = ref(horariosDisponibles);
const isLoading = ref(true);

async function verMedicos(especialidad) {
  isLoading.value = true;
  this.medicos = await buscarEspecialistas(especialidad);
  isLoading.value = false;
 
}

async function verHorarios() {
  disableHorario.value = true;
  setTimeout(async () => {
    isLoading.value = true;
      let turnosNoDisponibles = await buscarTurnosPorIdMedicoYFecha(
      medicoSeleccionado["_value"],
      this.fecha
    );
     turnosNoDisponibles = turnosNoDisponibles.map((e) => e.hora);

    horariosDisponiblesRef.value = horariosDisponibles.filter(
      (turno) => !turnosNoDisponibles.includes(turno)
    );
    isLoading.value = false;
    disableHorario.value = false;
  }, 1000);
  
}

onMounted(() => {
  let maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);
  flatpickr("#fecha", {
    disable: [
      function (date) {
        return date.getDay() === 6 || date.getDay() === 0;
      },
    ],
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "F j, Y",
    minDate: Date.now(),
    maxDate: maxDate,
  });
  isLoading.value = false;
});

async function validarTurno() {
  this.idMedico = this.medicoSeleccionado;
  isLoading.value=true;
  try {
     await nuevoTurno(
      medicoSeleccionado,
      idUsuario,
      this.fecha,
      this.horario,
      this.especialidad
    );
    window.alert("Turno creado correctamente");
    router.push({ path: "/InicioUsuario" });
  } catch (error) {
    console.log("Error en validarTurno:" + error);
    window.alert(JSON.parse(error.request.response).error);
  } finally{
    isLoading.value = false;
  }
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
      <input type="text" class="form-control" disabled v-bind:value="nombre" />
    </div>
    <div class="input-group">
      <span class="input-group-text">Apellido</span>
      <input
        disabled
        v-bind:value="apellido"
        type="text"
        class="form-control"
        placeholder="Ingrese Apellido"
        required
      />
    </div>
    <div class="input-group">
      <span class="input-group-text">Documento de Identidad</span>
      <input
        type="text"
        class="form-control"
        disabled
        placeholder="DNI"
        required
        v-bind:value="dni"
      />
    </div>

    <div class="input-group">
      <span class="input-group-text">Seleccioná una especialidad</span>
      <select
        class="form-select"
        aria-label="Default select example"
        v-model="especialidad"
        required
        @change="verMedicos(especialidad)"
      >
        <option>Otorrinolaringologia</option>
        <option>Odontologia</option>
        <option>Kinesiologia</option>
      </select>
    </div>

    <div class="input-group" v-show="medicos">
      <span class="input-group-text">Seleccioná un médico</span>
      <select
        class="form-select"
        aria-label="Default select example"
        v-model="medicoSeleccionado"
        required
      >
        <option v-for="m in medicos" selected :value="m._id">
          Dr.{{ m.apellido }}, {{ m.nombre }}
        </option>
      </select>
    </div>

    <div class="input-group" v-show="medicoSeleccionado">
      <span class="input-group-text">Selecciona una fecha</span>
      <input
        id="fecha"
        type="text"
        class="form-control"
        placeholder="Fecha"
        v-model="fecha"
        @change="verHorarios()"
        required
      />
    </div>

    <div class="input-group" v-show="fecha">
      <span class="input-group-text">Selecciona un horario</span>
      <select
        class="form-select"
        aria-label="Default select example"
        v-model="horario"
        required
        :disabled="disableHorario"
      >
        <option v-for="h in horariosDisponiblesRef" :value="h">{{ h }}</option>
      </select>
    </div>
    
     
    <div class="botones">
      <button
        class="btn btn-outline-secondary"
        type="submit"
        @click="validarTurno()"
      >
        Confirmar turno
      </button>

      <RouterLink to="/InicioUsuario"
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

.container {
  margin-top: 2%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.botones {
  display: flex;
  justify-content: center;
  margin-top: 5%;
}
button {
  margin: 15px;
  padding: 20px;
}
.calendar {
  position: relative;
  display: inline-block;
}

.calendar .dropdown {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  padding: 8px;
}

.calendar:hover .dropdown {
  display: block;
}

.cargando-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.cargando-texto {
  color: #ffffff;
  font-size: 24px;
}
#spinner {
  background-color: #fff;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
}
#spinner.hidden {
  display: none;
}
</style>
