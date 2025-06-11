<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { useConsultationService } from '../services/consultation.service';

const { getAggregatedData } = useConsultationService();

const chartRef = ref(null);
let chartInstance = null;

const fetchData = async () => {
  try {
    const data = await getAggregatedData();

    const meses = data.map(item => item.mes);
    const valores = data.map(item => item.total);

    updateChart(meses, valores);
  } catch (error) {
    console.error('Erro ao buscar dados de consultas:', error);
  }
};

const updateChart = (meses, valores) => {
  if (!chartInstance) return;

  const option = {
    tooltip: { 
      trigger: 'axis',
      formatter: '{b}: {c} consultas'
    },
    xAxis: { 
      type: 'category', 
      data: meses,
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: { 
      type: 'value',
      name: 'Número de Consultas'
    },
    series: [{
      name: 'Consultas',
      data: valores,
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#2196F3'
      },
      lineStyle: {
        color: '#2196F3',
        width: 3
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'rgba(33, 150, 243, 0.3)'
          }, {
            offset: 1, color: 'rgba(33, 150, 243, 0.1)'
          }]
        }
      }
    }],
    grid: {
      left: '5%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    }
  };

  chartInstance.setOption(option);
};

const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);
    fetchData();
    window.addEventListener('resize', () => chartInstance.resize());
  }
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