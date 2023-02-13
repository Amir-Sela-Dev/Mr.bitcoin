<template>
  <Line :data="chartData" :options="options" />
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "App",
  props: {
    priceHistory: {
      type: Object,
      required: true,
    },
  },

  components: {
    Line,
  },
  data() {
    return {
      chartData: {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: this.priceHistory,
          },
        ],
      },
      options: {
        responsive: true,
      },
    };
  },
};
</script>