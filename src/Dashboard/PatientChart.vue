<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref, onBeforeUnmount } from 'vue';

const chartRef = ref(null);
let chartInstance = null;

const fetchData = async () => {
  const res = await fetch('http://localhost:3000/pacientes/por-mes');
  const data = await res.json();

  const meses = data.map(item => item.mes);
  const valores = data.map(item => item.total);

  updateChart(meses, valores);
};

const updateChart = (meses, valores) => {
  if (!chartInstance) return;

  const option = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: meses },
    yAxis: { type: 'value' },
    series: [{
      name: 'Pacientes',
      data: valores,
      type: 'bar',
      itemStyle: {
        color: '#4CAF50',
        borderRadius: [6, 6, 0, 0]
      }
    }],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    }
  };

  chartInstance.setOption(option);
};

const initChart = () => {
  chartInstance = echarts.init(chartRef.value);
  fetchData();
  window.addEventListener('resize', () => chartInstance.resize());
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
