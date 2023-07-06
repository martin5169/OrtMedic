import { createRouter, createWebHistory } from 'vue-router'
import { useCounterStore } from "../stores/counter.js";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', 
      name: 'home',
      component:() => import('../views/HomeView.vue')
    },
    {
      path: '/LoginUsuario',
      name: 'LoginUsuario',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginUsuarioView.vue')
    },
    {
      path: '/Registrar',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/InicioUsuario',
      name: 'InicioUsuario',
      meta: {
        requiereDoctor: false
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/InicioUsuarioView.vue')
    },
    {
      path: '/InicioMedico',
      name: 'InicioMedico',
      meta: {
        requiereDoctor: true
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import ('../views/InicioMedicoView.vue')
    },
    {
      path: '/DatosPersonales',
      name: 'Datos',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DatosPersonalesView.vue')
    },
    {
      path: '/Contactese',
      name: 'Contacto',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ContacteseView.vue')
    },
    {
      path: '/AltaNuevoTurno',
      name: 'AltaNuevoTurno',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AltaNuevoTurnoView.vue')
    },
    {
      path: '/GestionTurnos',
      name: 'GestionTurnos',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GestionTurnosView.vue')
    },
    {
      path: '/LoginMedico',
      name: 'LoginMedico',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginMedicoView.vue')
    },
    {
      path: '/EditarTurno',
      name: 'editar',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/EditarTurno.vue')
    }
  ]

})

router.beforeEach((to, from, next) => {
  const store = useCounterStore();

  const {tipoUsuario, nombre} = store;
  if(to.name==="InicioUsuario" && tipoUsuario === "MEDICO" ){
    next({name:"InicioMedico"});
  }else if(to.name==="InicioMedico" && tipoUsuario === "USUARIO"){
    next({name:"InicioUsuario"});
  }else if(to.name==="GestionTurnos" && nombre===""){
    next({name:"home"});
  }else{
    next();
  }
})

export default router;
