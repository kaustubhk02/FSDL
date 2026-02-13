// let studentsChart = null;
// let packageChart = null;

// async function loadDashboard(){

//     const res = await fetch("placementData.json");
//     const data = await res.json();

//     let companyMap = {};
//     let packageMap = {};
//     let totalStudents = 0;

//     data.forEach(item=>{
//         companyMap[item.company] =
//             (companyMap[item.company] || 0) + item.students_selected;

//         packageMap[item.company] = item.avg_package_lpa;

//         totalStudents += item.students_selected;
//     });

//     const companies = Object.keys(companyMap);
//     const students = Object.values(companyMap);
//     const packages = Object.values(packageMap);

//     document.getElementById("totalCompanies").innerText = companies.length;
//     document.getElementById("totalStudents").innerText = totalStudents;

//     /* ===== LINE GRAPH ===== */

//     studentsChart = new Chart(
//         document.getElementById("studentsChart"),
//         {
//             type:"line",
//             data:{
//                 labels:companies,
//                 datasets:[{
//                     label:"Students Selected",
//                     data:students,
//                     borderColor:"rgba(20,20,20,1)",
//                     backgroundColor:"rgba(20,20,20,0.3)",
//                     borderWidth:3,
//                     fill:true,
//                     tension:0.4
//                 }]
//             },
//             options:{
//                 plugins:{legend:{labels:{color:"#fff"}}},
//                 scales:{
//                     x:{ticks:{color:"#fff"}},
//                     y:{ticks:{color:"#fff"}}
//                 }
//             }
//         }
//     );

//     /* ===== BAR GRAPH ===== */

//     packageChart = new Chart(
//         document.getElementById("packageChart"),
//         {
//             type:"bar",
//             data:{
//                 labels:companies,
//                 datasets:[{
//                     label:"Average Package (LPA)",
//                     data:packages,
//                     backgroundColor:"rgba(30,30,30,0.85)",
//                     borderColor:"rgba(0,0,0,1)",
//                     borderWidth:2
//                 }]
//             },
//             options:{
//                 plugins:{legend:{labels:{color:"#fff"}}},
//                 scales:{
//                     x:{ticks:{color:"#fff"}},
//                     y:{ticks:{color:"#fff"}}
//                 }
//             }
//         }
//     );
// }

// loadDashboard();

const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";

let tempChart = null;
let humidityChart = null;


searchBtn.addEventListener("click", () => {
    const city = input.value;
    checkWeather(city);
});

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = input.value;
        checkWeather(city);
    }
});
async function checkWeather(city) {

    const currentURL = url + city + apikey + unit;
    const forecastURL = forecastUrl + city + apikey + unit;

    const response = await fetch(currentURL);
    const data = await response.json();

    const forecastRes = await fetch(forecastURL);
    const forecastData = await forecastRes.json();

    if (data.cod === 200) {

        values.style.display = "block";

        const temp = Math.round(data.main.temp);
        const humidity = data.main.humidity;
        const windSpeed = Math.round(data.wind.speed * 3.6);
        const description = data.weather[0].main;
        const cityName = data.name;
        const country = data.sys.country;
        const feelsLike = Math.round(data.main.feels_like);

        values.innerHTML = `
            <div class="weather-container">
                <div class="city-info">
                    <h2>${cityName}, ${country}</h2>
                    <p class="description">${description}</p>
                </div>
                <div class="temp-display">
                    <div class="temp-main">${temp}°C</div>
                    <div class="feels-like">Feels like ${feelsLike}°C</div>
                </div>
                <div class="weather-details">
                    <div class="detail-card">
                        <i class="fas fa-droplet"></i>
                        <div class="detail-info">
                            <p>Humidity</p>
                            <h4>${humidity}%</h4>
                        </div>
                    </div>
                    <div class="detail-card">
                        <i class="fas fa-wind"></i>
                        <div class="detail-info">
                            <p>Wind Speed</p>
                            <h4>${windSpeed} km/h</h4>
                        </div>
                    </div>
                </div>
            </div>
        `;

        /* ======= PREPARE 7 DATA POINTS ======= */
        let labels = [];
        let temps = [];
        let humidities = [];

        for (let i = 0; i < 7; i++) {
            labels.push("Day " + (i + 1));
            temps.push(Math.round(forecastData.list[i].main.temp));
            humidities.push(forecastData.list[i].main.humidity);
        }

        /* ===== TEMPERATURE LINE GRAPH ===== */
        const tempCtx = document.getElementById("tempChart");

        if (tempChart) {
            tempChart.destroy();
        }

        tempChart = new Chart(tempCtx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Temperature Trend",
                    data: temps,
                    tension: 0.4,

                    borderColor: "rgba(20,20,20,1)",      // dark solid line
                    backgroundColor: "rgba(20,20,20,0.3)",// slight fill under line
                    pointBackgroundColor: "rgba(0,0,0,1)",
                    pointBorderColor: "#ffffff",
                    borderWidth: 3,
                    fill: true
                }]

            },
            options: {
                plugins: {
                    legend: { labels: { color: "#fff" } }
                },
                scales: {
                    x: {
                        ticks: { color: "#fff" },
                        grid: { color: "rgba(255,255,255,0.1)" }
                    },
                    y: {
                        ticks: { color: "#fff" },
                        grid: { color: "rgba(255,255,255,0.1)" }
                    }
                }

            }
        });

        /* ===== HUMIDITY BAR GRAPH ===== */
        const humidityCtx = document.getElementById("humidityChart");

        if (humidityChart) {
            humidityChart.destroy();
        }

        humidityChart = new Chart(humidityCtx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "Humidity Trend",
                    data: humidities,

                    backgroundColor: "rgba(30,30,30,0.85)", // dark bars
                    borderColor: "rgba(0,0,0,1)",
                    borderWidth: 2
                }]

            },
            options: {
                plugins: {
                    legend: { labels: { color: "#fff" } }
                },
                scales: {
                    x: {
                        ticks: { color: "#fff" },
                        grid: { color: "rgba(255,255,255,0.1)" }
                    },
                    y: {
                        ticks: { color: "#fff" },
                        grid: { color: "rgba(255,255,255,0.1)" }
                    }
                }

            }
        });
    }
}


