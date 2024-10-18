let accessCount = 0;
let timestamps = [];
let counts = [];
const notification = document.getElementById('notification');

const ctx = document.getElementById('accessChart').getContext('2d');
const accessChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: timestamps,
        datasets: [{
            label: 'DSTAT REQUEST',
            data: counts,
            borderColor: 'rgba(97, 218, 251, 1)',
            backgroundColor: 'rgba(97, 218, 251, 0.2)',
            fill: true,
            tension: 0.3
        }]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10
                }
            },
            y: { beginAtZero: true }
        },
        animation: {
            duration: 1000 
        }
    }
});

function updateAccessCount() {
    accessCount++;
    const currentTime = new Date();
    timestamps.push(currentTime.getMinutes() * 60 + currentTime.getSeconds());
    counts.push(accessCount);


    accessChart.data.labels = timestamps;
    accessChart.data.datasets[0].data = counts;
    accessChart.update();

    // Show notification every minute
    if (currentTime.getSeconds() === 0) {
        notification.innerText = `Total ${accessCount}`;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 10000); // Hiện trong 10 giây
    }
}

setInterval(updateAccessCount, 1000);