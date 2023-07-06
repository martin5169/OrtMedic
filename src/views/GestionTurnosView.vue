<script setup>
import GestionTurnos from '../components/GestionTurnos.vue'
import GestionTurnosMedico from '../components/GestionTurnosMedico.vue';
import { useCounterStore } from "../stores/counter.js";
const store = useCounterStore();

const { tipoUsuario } = store;

</script>

<template>
  <main>
    <GestionTurnos v-if="tipoUsuario === 'USUARIO'" />
    <GestionTurnosMedico v-else />
  </main>
</template>
