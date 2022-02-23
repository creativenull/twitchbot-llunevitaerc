import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Commands from "../views/Commands.vue";
import TimerCommands from "../views/TimerCommands.vue";
import AddCommand from "../views/AddCommand.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/commands/all",
      name: "commands.all",
      component: Commands,
    },
    {
      path: "/commands/timers",
      name: "commands.timers",
      component: TimerCommands,
    },
    {
      path: "/commands/add",
      name: "commands.add",
      component: AddCommand,
    },
  ],
});

export default router;
