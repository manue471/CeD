import { createRouter, createWebHistory } from 'vue-router';
import Register from '../views/Register.vue';
import AdminRegister from '../views/AdminRegister.vue'; 
import PatientRegister from '../views/PatientRegister.vue';
import Login from '../views/Login.vue';
import AdminDashboard from '../Dashboard/adminDashboard.vue';


const routes = [
  { path: '/', component: Register },
  { path: '/adminRegister', component: AdminRegister }, 
  { path: '/patientRegister', component: PatientRegister }, 
  { path: '/login', component: Login }, 
  { path: '/adminDashboard', component: AdminDashboard},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;