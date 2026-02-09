const responseElement = document.getElementById("reponse");
const inputX = document.getElementById("input-x");
const inputFx = document.getElementById("input-fx");

function createFunction(expression) {
    return new Function("x", `return ${expression}`);
}

function calculer(event) {
    event.preventDefault();

    const xValue = Number.parseFloat(inputX.value);
    const fxExpression = inputFx.value.trim();

    if (Number.isNaN(xValue)) {
        responseElement.textContent = "Veuillez entrer un nombre pour x.";
        return;
    }

    if (!fxExpression) {
        responseElement.textContent = "Veuillez entrer une expression valide.";
        return;
    }

    try {
        const fxFunction = createFunction(fxExpression);
        const result = fxFunction(xValue);

        if (!Number.isFinite(result)) {
            responseElement.textContent = "Le résultat est hors limites.";
            return;
        }

        responseElement.textContent = `Le résultat est : ${result}`;
        updateChart(fxFunction);
    } catch (error) {
        responseElement.textContent = "Erreur : veuillez entrer une expression valide.";
    }
}

function generateData(fxFunction) {
    const yValues = [];
    for (let x = -5; x <= 5; x += 1) {
        const value = fxFunction(x);
        yValues.push(Number.isFinite(value) ? value : null);
    }
    return yValues;
}

function updateChart(fxFunction) {
    const yValues = generateData(fxFunction);
    const xValues = Array.from({ length: 11 }, (_, i) => i - 5);

    chart.data.labels = xValues;
    chart.data.datasets[0].data = yValues;
    chart.update();
}

function download() {
    const link = document.createElement("a");
    link.href = chart.toBase64Image();
    link.download = "f_de_x.png";
    link.click();
}

const ctx = document.getElementById("chart").getContext("2d");
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], 
        datasets: [{
            label: 'Valeur de la fonction',
            data: [],
            borderColor: '#2f80ed',
            backgroundColor: 'rgba(47, 128, 237, 0.2)',
            tension: 0.35,
            pointRadius: 3,
            pointBackgroundColor: '#1c64d1'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(47, 128, 237, 0.08)'
                }
            },
            x: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(47, 128, 237, 0.08)'
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#1e2a3a'
                }
            }
        }
    }
});
