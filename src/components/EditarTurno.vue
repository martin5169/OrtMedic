<script setup>
import { onMounted } from "vue";
import flatpickr from "flatpickr";
import { useCounterStore } from "../stores/counter.js";
import { ref } from "vue";
import router from "../router";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
const store = useCounterStore();
const { turno, buscarTurnosPorIdMedicoYFecha, actualizarTurno } = store;

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
const fecha = ref("");
const horario = ref("");
const disableHorario = ref(true);
const isLoading = ref(false);

async function verHorarios() {
  isLoading.value = true;
  disableHorario.value = true;
  
      let turnosNoDisponibles = await buscarTurnosPorIdMedicoYFecha(
      turno.medico,
      turno.fecha
    )
    turnosNoDisponibles = turnosNoDisponibles.map((e) => e.hora);
    horariosDisponiblesRef.value = horariosDisponibles.filter(
      (turno) => !turnosNoDisponibles.includes(turno)
    );
    isLoading.value = false;
    disableHorario.value = false;
  
}

async function confirmar() {
  isLoading.value=true
  try {
    await actualizarTurno(turno.id, { fechaNueva: fecha.value, horaNueva: horario.value });
    router.push({path:"/GestionTurnos"})
  } catch (e) {
    console.log(e);
    window.alert("Ocurrio un error");
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  let minDate = new Date(turno.fecha);
  minDate.setDate(minDate.getDate() + 2);
  let maxDate = new Date(turno.fecha);
  console.log(maxDate);
  console.log(turno.fecha);
  maxDate.setDate(maxDate.getDate() + 8);
  flatpickr("#fecha", {
    disable: [
      function (date) {
        return date.getDay() === 6 || date.getDay() === 0;
      },
    ],
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "F j, Y",
    minDate: minDate,
    maxDate: maxDate,
  });
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
  <div class="card margin">
    <div class="card-body">
      <h4>Ingrese los datos para su nuevo turno</h4>
      <p></p>
      <div class="input-group">
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
      <br />
      <div class="input-group" v-show="fecha">
        <span class="input-group-text">Selecciona un horario</span>
        <select
          class="form-control"
          aria-label="Default select example"
          v-model="horario"
          required
          :disabled="disableHorario"
        >
          <option v-for="h in horariosDisponiblesRef" :value="h">
            {{ h }}
          </option>
        </select>
      </div>
      <br />
      <a class="btn btn-success" @click="confirmar()">Confirmar</a>
    </div>
    <RouterLink to="/GestionTurnos"
      ><button class="btn btn-outline-secondary" type="button">Volver</button>
    </RouterLink>
  </div>
</template>

<style>
.margin {
  margin: 20px;
  text-align: center;
}
.input-group{
  margin-top: 15px;
}
a{
  margin-bottom: 15px;
}

</style>
