fetch("college_placement.csv")
    .then(response => response.text())
    .then(data => {

        const rows = data.split("\n").slice(1);

        let totalStudents = 0;
        let totalPackage = 0;
        let count = 0;

        const companyMap = {};
        const yearPackageMap = {};

        rows.forEach(row => {
            if (!row.trim()) return;

            const cols = row.split(",");
            const year = cols[0];
            const company = cols[1];
            const students = parseInt(cols[3]);
            const avgPackage = parseFloat(cols[4]);

            totalStudents += students;
            totalPackage += avgPackage;
            count++;

            companyMap[company] = (companyMap[company] || 0) + students;

            if (!yearPackageMap[year]) {
                yearPackageMap[year] = { sum: 0, count: 0 };
            }

            yearPackageMap[year].sum += avgPackage;
            yearPackageMap[year].count++;
        });

        document.getElementById("totalStudents").innerText = totalStudents;
        document.getElementById("avgPackage").innerText =
            (totalPackage / count).toFixed(2) + " LPA";

        const companyLabels = Object.keys(companyMap);
        const companyData = Object.values(companyMap);

        const gradientBar = (ctx) => {
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, "#4e73df");
            gradient.addColorStop(1, "#1cc88a");
            return gradient;
        };

        new Chart(document.getElementById("studentsChart"), {
            type: "bar",
            data: {
                labels: companyLabels,
                datasets: [{
                    label: "Students Selected",
                    data: companyData,
                    backgroundColor: gradientBar(document.getElementById("studentsChart").getContext("2d")),
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                }
            }
        });

        const yearLabels = Object.keys(yearPackageMap);
        const yearData = yearLabels.map(year =>
            (yearPackageMap[year].sum / yearPackageMap[year].count).toFixed(2)
        );

        const ctxLine = document.getElementById("packageChart").getContext("2d");
        const gradientLine = ctxLine.createLinearGradient(0, 0, 0, 400);
        gradientLine.addColorStop(0, "rgba(78,115,223,0.4)");
        gradientLine.addColorStop(1, "rgba(28,200,138,0.05)");

        new Chart(ctxLine, {
            type: "line",
            data: {
                labels: yearLabels,
                datasets: [{
                    label: "Average Package (LPA)",
                    data: yearData,
                    borderColor: "#4e73df",
                    backgroundColor: gradientLine,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: "#1cc88a"
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                }
            }
        });
    })
    .catch(error => console.error("Error:", error));