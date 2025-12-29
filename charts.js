// 1. Market Overview Chart (Doughnut)
const ctxMarket = document.getElementById('marketChart').getContext('2d');
const marketChart = new Chart(ctxMarket, {
    type: 'doughnut',
    data: {
        labels: ['ERPs Tradicionales (Almacén)', 'Procesos Manuales / Excel', 'IA Genérica (Riesgosa)', 'Agente 24 (Oportunidad)'],
        datasets: [{
            data: [40, 35, 15, 10],
            backgroundColor: [
                '#9CA3AF', // Gray
                '#FCD34D', // Yellow
                '#EF4444', // Red
                '#2563EB'  // Vibrant Blue
            ],
            borderWidth: 2,
            borderColor: '#ffffff'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom', labels: { padding: 20, font: { family: 'Segoe UI' } } },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    label: function(context) {
                        return ' ' + context.label + ': ' + context.raw + '%';
                    }
                }
            }
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }
});

// 2. Financial Comparison Chart (Bar) - ACTUALIZADO ESTRATEGIA $389
const ctxFinance = document.getElementById('financeChart').getContext('2d');
const financeChart = new Chart(ctxFinance, {
    type: 'bar',
    data: {
        labels: ['Suscripción Usuario (Mensual)', 'SaaS Pro (Estimado)', 'Multa Mínima (Un Evento)'],
        datasets: [{
            label: 'Costo en MXN',
            data: [389, 1000, 18000], // PRECIO ACTUALIZADO A 389
            backgroundColor: [
                'rgba(37, 99, 235, 0.8)', // Azul (Inversión mínima)
                'rgba(59, 130, 246, 0.5)', // Azul Claro (Futuro)
                'rgba(220, 38, 38, 0.9)'   // Rojo Intenso (Peligro)
            ],
            borderColor: [
                '#2563EB',
                '#3B82F6',
                '#DC2626'
            ],
            borderWidth: 2,
            borderRadius: 6,
            barPercentage: 0.6
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: '#f3f4f6', borderDash: [5, 5] },
                ticks: {
                    callback: function(value) { return '$' + value.toLocaleString(); },
                    font: { family: 'Segoe UI' }
                },
                title: { display: true, text: 'Pesos Mexicanos (MXN)' }
            },
            x: {
                grid: { display: false },
                ticks: { font: { family: 'Segoe UI', weight: 'bold', size: 11 } }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    label: function(context) {
                        return ' Costo: $' + context.raw.toLocaleString('es-MX');
                    }
                }
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeOutBounce'
        }
    }
});