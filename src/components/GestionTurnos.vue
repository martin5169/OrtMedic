<script setup>
import { RouterLink } from "vue-router";
import { useCounterStore } from "../stores/counter.js";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
const store = useCounterStore();
import { ref, onMounted } from "vue";
import router from "../router";
const {
  buscarTurnosPorIdPaciente,
  idUsuario,
  eliminarTurno,
  tipoUsuario,
  buscarMedicoPorId,
  buscarPacientePorId,
  guardarTurno,
} = store;
let turnosTomados = ref([]);
const isLoading = ref(true);
const datosMedico = ref({});
const datosPaciente = ref({});
const sinTurnos = ref(false);

async function verTurnosUsuario(idUsuario) {
  try {
    turnosTomados.value = await buscarTurnosPorIdPaciente(idUsuario);
  } catch {
    sinTurnos.value = true;
  } finally {
    isLoading.value = false;
  }
}

async function borrarTurno(id, e) {
  e.preventDefault(e);
  isLoading.value = true;
  await eliminarTurno(id);
  turnosTomados.value = turnosTomados.value.filter((e) => e._id !== id);
  isLoading.value = false;
}

async function verDatosMedico(idMedico, idTurno, e) {
  e.preventDefault();
  document
    .querySelectorAll(".datos")
    .forEach((e) => (e.style.display = "none"));
  isLoading.value = true;
  datosMedico.value = await buscarMedicoPorId(idMedico);
  document.getElementById(idTurno).style.display = "initial";
  console.log(document.getElementById(idTurno));
  console.log(datosMedico);
  isLoading.value = false;
}

async function editarTurno(medico, paciente, id, fecha, hora, e) {
  e.preventDefault();
  isLoading.value = true;
  let { nombre, apellido } = await buscarPacientePorId(paciente);
  guardarTurno(medico, paciente, id, fecha, hora, `${nombre} ${apellido}`);
  router.push({ name: "editar" });
  isLoading.value = false;
}

function deshabilitarBoton(fecha) {
  let date = new Date(fecha);
  date.setHours(0, 0, 0);
  console.log(date);
  let fechaActual = new Date();
  fechaActual.setHours(0, 0, 0);
  console.log(new Date(fecha).getTime() - fechaActual.getTime() >= 172800000);
  return new Date(fecha).getTime() - fechaActual.getTime() < 172800000;
}

onMounted(() => {
  verTurnosUsuario(idUsuario);
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
  <div>
    <h2>Listado de Turnos</h2>
    <div class="card text-center" v-if="sinTurnos">
      <div class="card-body">
        <p>No hay turnos asignados</p>
      </div>
    </div>
    <div class="card text-center" v-for="turno in turnosTomados">
      <div class="card-header">Turno</div>
      <div class="card-body">
        <h4 class="card-title">{{ turno.especialidad }}</h4>
        <p class="card-text"><b>Fecha :</b> {{ turno.fecha }}</p>
        <p class="card-text"><b>Hora :</b> {{ turno.hora }}hs</p>

        <a
          href="#"
          class="btn btn-primary"
          @click="(e) => borrarTurno(turno._id, e)"
          v-show="!deshabilitarBoton(turno.fecha)"
          >Eliminar turno</a
        >
        <a
          href="#"
          type="button"
          class="btn btn-secondary"
          @click="(e) => verDatosMedico(turno.medico, turno._id, e)"
          v-show="tipoUsuario === 'USUARIO'"
          >Ver datos medico</a
        >

        <button
          href="#"
          type="button"
          class="btn btn-secondary editar"
          @click="
            (e) =>
              editarTurno(
                turno.medico,
                turno.paciente,
                turno._id,
                turno.fecha,
                turno.hora,
                e
              )
          "
          v-show="tipoUsuario === 'USUARIO'"
          :disabled="deshabilitarBoton(turno.fecha)"
        >
          Reprogramar
        </button>
        <div class="card-body datos" :id="turno._id" style="display: none">
          <p></p>
          <p class="card-title">
            Dr.{{ datosMedico.apellido }}, {{ datosMedico.nombre }}
          </p>
          <p class="card-text">Matricula N°: {{ datosMedico.matricula }}</p>
          <p class="card-text">Email : {{ datosMedico.email }}</p>
        </div>
      </div>
      <div class="card-footer text-muted">
        <p>Todos los derechos reservados © 2023 <b>CuidApp </b></p>
      </div>
    </div>
    <div class="botones">
      <RouterLink to="/InicioMedico"
        ><button class="btn btn-outline-secondary" type="button">Volver</button>
      </RouterLink>
    </div>
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
a {
  margin: 11px;
}

h2 {
  text-align: center;
}

.container {
  display: flex;
  flex-direction: column;
}

.grid-container {
  display: grid;
}

button {
  display: flex;
  flex-direction: column;
  margin: 15px;
  padding: 18px;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}

.text-center {
  margin: 25px;
}

.botones {
  display: flex;
  justify-content: center;
  margin-top: 5%;
}

.editar {
  display: inline-block;
  height: 10px;
  vertical-align: center;
  line-height: 0px;
  box-sizing: border-box;
}
</style>
