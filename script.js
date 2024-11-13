function calculer(event) {
    event.preventDefault();

    var x = parseFloat(document.getElementsByName("x")[0].value);
    var fx = document.getElementsByName("fx")[0].value;

    if (isNaN(x)) {
        alert("Veuillez entrer un nombre pour x.");
        return;
    }

    try {
        var result = eval(fx.replace(/x/g, x));
        document.getElementById("reponse").innerText = "Le résultat est : " + result;

        updateChart(fx);
    } catch (error) {
        alert("Erreur : veuillez entrer une expression valide.");
    }
}

function generateData(fx) {
    let yValues = [];
    for (let x = -5; x <= 5; x++) {
        yValues.push(eval(fx.replace(/x/g, x)));
    }
    return yValues;
}

function updateChart(fx) {
    const yValues = generateData(fx);
    const xValues = Array.from({length: 11}, (_, i) => i - 5);

    chart.data.labels = xValues;
    chart.data.datasets[0].data = yValues;
    chart.update();
}

function download() {
    var a = document.createElement('a');
    a.href = chart.toBase64Image();
    a.download = 'f_de_x.png';

    // Trigger the download
    a.click();
}

const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], 
        datasets: [{
            label: 'Valeur de la fonction',
            data: [],
            borderColor: 'rgb(255, 0, 0)',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            tension: 0.4
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                beginAtZero: true
            }
        }
    }
});
