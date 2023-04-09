import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("../views/Home.vue"); 
const Detail = () => import("../views/Detail.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: Detail,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
