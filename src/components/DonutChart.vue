<template>
  <div class="donut-chart">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const chartRef = ref(null);
let chart = null;

const createChart = () => {
  const ctx = chartRef.value.getContext('2d');
  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Strategy 1', 'Strategy 2', 'Strategy 3', 'Strategy 4'],
      datasets: [{
        data: [22.5, 22.5, 38.8, 38.8],
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          const gradientRed = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradientRed.addColorStop(0, '#ef4444');
          gradientRed.addColorStop(1, '#ffffff');

          const gradientLightRed = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradientLightRed.addColorStop(0, '#FF0000');
          gradientLightRed.addColorStop(1, '#ffffff');

          return [
            '#3b82f6', // Strategy 1 (Blue)
            '#22c55e', // Strategy 2 (Green)
            gradientRed, // Strategy 3 (Red gradient)
            gradientLightRed // Strategy 4 (Light red gradient)
          ];
        },
        borderWidth: 0,
        borderRadius: 5
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 20,
            font: {
              family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              size: 12
            },
            generateLabels: (chart) => {
              const data = chart.data;
              if (data.labels.length && data.datasets.length) {
                return data.labels.map((label, i) => {
                  let fillStyle;
                  if (i === 2) {
                    fillStyle = '#ef4444'; // Red for Strategy 3
                  } else if (i === 3) {
                    fillStyle = '#FF0000'; // Light red for Strategy 4
                  } else {
                    fillStyle = data.datasets[0].backgroundColor[i];
                  }
                  return {
                    text: `${label} ${data.datasets[0].data[i]}%`,
                    fillStyle: fillStyle,
                    hidden: isNaN(data.datasets[0].data[i]),
                    index: i
                  };
                });
              }
              return [];
            }
          }
        },
        tooltip: {
          enabled: true
        }
      },
      cutout: '50%', // Reduced the inner size for a smaller donut
      spacing: 5
    }
  });
}

onMounted(() => {
  createChart();
});
</script>

<style scoped>
.donut-chart {
  height: 350px; /* Reduced height for a smaller chart */
  width: 100%;
  max-width: 500px; /* Reduced max-width to make the chart smaller */
  margin: 0 auto;
  font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
}

.chart-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: 500;
}
</style>
