<template>
    <div class="mb-5">
        <canvas :id="chartId"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    props: ['chartId','chartdata', 'option'],
    methods: {
        renderChart() {
            let ctx = document.getElementById(this.chartId);
            new Chart(ctx, {
                type: 'line',
                data:this.chartdata,
                options: this.option
            });
        }
    },
    mounted() {
        this.renderChart();
    }
};
</script>