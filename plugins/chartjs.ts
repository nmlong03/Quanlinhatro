import { Chart, registerables } from "chart.js";
export default defineNuxtPlugin(() => {
  registerables.forEach((registerable) => {
    Chart.register(registerable);
  });
});
