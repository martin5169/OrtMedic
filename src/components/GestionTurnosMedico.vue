<script setup>
import { useCounterStore } from "../stores/counter.js";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { ref, onMounted } from "vue";
const store = useCounterStore();

const { buscarTurnosPorIdMedico, idMedico, buscarPacientePorId } = store;

const turnosMap = ref(new Map());
const sinTurnos = ref(false);
const isLoading = ref(true);
const fechaSeleccionada = ref("");
let fechas = [];
const nroFechaSeleccionada = ref(0);
const datosPaciente = ref({});

async function verTurnosMedico(idMedico) {
  try {
    let turnos = await buscarTurnosPorIdMedico(idMedico);
    const hashMapTurnos = new Map();
    turnos.forEach((turno) => {
      const fecha = turno.fecha;

      if (hashMapTurnos.has(fecha)) {
        // Si la fecha ya existe en el HashMap, agregamos el turno a la lista existente
        hashMapTurnos.get(fecha).push(turno);
      } else {
        // Si la fecha no existe en el HashMap, creamos una nueva lista con el turno
        hashMapTurnos.set(fecha, [turno]);
      }
      return hashMapTurnos;
    });
    hashMapTurnos.forEach((value, key, map) => {
      console.log(map.get(key));
    });
    turnosMap.value = hashMapTurnos;
    fechaSeleccionada.value = hashMapTurnos.keys().next().value;
    fechas = Array.from(hashMapTurnos.keys()).sort(
      (a, b) => new Date(a) - new Date(b)
    );
    sinTurnos.value = false;
  } catch (error) {
    console.log(error);
    sinTurnos.value = true;
  } finally {
    isLoading.value = false;
  }
}

async function verDatospaciente(idPaciente, idTurno, e) {
  e.preventDefault();
  document
    .querySelectorAll(".datos")
    .forEach((e) => (e.style.display = "none"));
  isLoading.value = true;
  datosPaciente.value = await buscarPacientePorId(idPaciente);
  console.log(datosPaciente);
  document.getElementById(idTurno).style.display = "initial";
  isLoading.value = false;
}

function siguienteFecha() {
  if (nroFechaSeleccionada.value + 1 >= fechas.length) {
    nroFechaSeleccionada.value = 0;
  } else {
    nroFechaSeleccionada.value++;
  }
  fechaSeleccionada.value = fechas[nroFechaSeleccionada.value];
}

function anteriorFecha() {
  if (nroFechaSeleccionada.value - 1 < 0) {
    nroFechaSeleccionada.value = fechas.length - 1;
  } else {
    nroFechaSeleccionada.value--;
  }
  fechaSeleccionada.value = fechas[nroFechaSeleccionada.value];
}

onMounted(() => {
  verTurnosMedico(idMedico);
});
</script>

<template>
  <div>
    <loading
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
    />
  </div>
  <div class="container">
    <div class="card text-center" v-if="sinTurnos">
      <div class="card-body">
        <p>No hay turnos asignados</p>
      </div>
    </div>
    <h2 style="text-align: center">Fecha seleccionada:</h2>
    <div class="botones" v-if="!isLoading">
      <button @click="anteriorFecha()" class="btn btn-primary modificadorFecha">
        &lt
      </button>
      <h3 class="titulo-fecha">{{ fechaSeleccionada }}</h3>
      <button
        @click="siguienteFecha()"
        class="btn btn-primary modificadorFecha"
      >
        >
      </button>
    </div>
    <div
      class="card text-center"
      v-for="turno in turnosMap.get(fechaSeleccionada)"
    >
      <div class="card-header">Turno</div>
      <div class="card-body">
        <h4 class="card-title">{{ turno.especialidad }}</h4>
        <p class="card-text"><b>Fecha :</b> {{ turno.fecha }}</p>
        <p class="card-text"><b>Hora :</b> {{ turno.hora }}hs</p>
        <a
          href="#"
          type="button"
          class="btn btn-secondary"
          @click="(e) => verDatospaciente(turno.paciente, turno._id, e)"
          >Ver datos paciente</a
        >
        <div class="card-body datos" :id="turno._id" style="display: none">
          <p class="card-title">
            Paciente : {{ datosPaciente.apellido }}, {{ datosPaciente.nombre }}
          </p>
          <p class="card-text">DNI N° : {{ datosPaciente.dni }}</p>
          <p class="card-text">Email : {{ datosPaciente.email }}</p>
        </div>
      </div>
    </div>
  </div>
  <RouterLink
    style="display: flex; justify-content: center; margin-top: 1%"
    to="/InicioMedico"
    ><button class="btn btn-outline-secondary" type="button">Volver</button>
  </RouterLink>
</template>

<style>
.botones {
  text-align: center;
  margin: 10px 0;
}
.modificadorFecha {
  display: inline;
  padding: 5px;
}
.titulo-fecha {
  display: inline;
  margin: 10px 20px;
}
.container{
    margin: 5%;
}
.card{
    margin-bottom: 20px;
}
</style>
