
<script>
import ValueChart from "@/cmps/value-chart.vue";
import AvgChart from "@/cmps/avg-chart.vue";

export default {
  components: {
    ValueChart,
    AvgChart,
  },
};
</script>

<template>
  <div class="stats">
    <section class="value-chart">
      <ValueChart />
    </section>

    <section class="avg-chart">
      <AvgChart />
    </section>
  </div>
</template>

<style scoped lang="scss">
.stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  .value-chart {
    width: 700px;
    margin-block: 30px;
  }
  .avg-chart {
    width: 700px;
  }
}
</style>
