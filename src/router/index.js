import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Archivio from "@/views/Archivio.vue";

const routes = [
  { path: "/", component: Dashboard },
  { path: "/archivio", component: Archivio },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
