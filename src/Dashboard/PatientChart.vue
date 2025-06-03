<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref, onBeforeUnmount } from 'vue';

const chartRef = ref(null);
let chartInstance = null;

const initChart = () => {
  chartInstance = echarts.init(chartRef.value);

  const option = {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Pacientes',
        data: [90, 20, 10, 40, 50, 80, 110, 30, 60, 50, 40, 90],
        type: 'bar',
        itemStyle: {
          color: '#4CAF50',
          borderRadius: [6, 6, 0, 0]
        }
      }
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    }
  };

  chartInstance.setOption(option);

  window.addEventListener('resize', () => {
    chartInstance.resize();
  });
};

onMounted(() => {
  initChart();
});

onBeforeUnmount(() => {
  if (chartInstance) {
    window.removeEventListener('resize', chartInstance.resize);
    chartInstance.dispose();
  }
});
</script>

<style scoped>
.chart {
  width: 100%;
  height: 300px;
}
</style>
