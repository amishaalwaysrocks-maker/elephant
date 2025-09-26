// Function to render the 7-Day Movement Forecast Chart (Bar Chart)
function renderMovementForecastChart() {
    const ctx = document.getElementById('movementForecastChart');
    // Check if the canvas element exists and is active
    if (!ctx) return;
    
    // Destroy existing chart instance to prevent duplicates/errors when switching pages
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    ctx.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [{
                label: 'Predicted Intrusion Risk (%)',
                data: [45, 55, 68, 75, 50, 40, 30], // Example data
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)', 
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 159, 64, 0.6)', // Medium-High Risk
                    'rgba(255, 99, 132, 0.6)', // Highest Risk
                    'rgba(255, 159, 64, 0.6)', 
                    'rgba(75, 192, 192, 0.6)', 
                    'rgba(75, 192, 192, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Risk Percentage'
                    }
                }
            },
            plugins: {
                legend: { display: false },
                title: { display: false }
            }
        }
    });
}

// Function to render the Annual Incident Trends Chart (Line Chart)
function renderAnnualIncidentChart() {
    const ctx = document.getElementById('annualIncidentChart');
    // Check if the canvas element exists and is active
    if (!ctx) return;

    // Destroy existing chart instance
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    ctx.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Incidents (Current Year)',
                data: [15, 18, 20, 25, 30, 45, 35, 20, 18, 30, 10, 5], 
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Incidents (Last Year)',
                data: [18, 20, 22, 28, 32, 50, 40, 25, 22, 35, 15, 10], // Slightly higher baseline for 'last year'
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Incidents'
                    }
                }
            },
            plugins: {
                legend: { position: 'top' },
                title: { display: false }
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page-content');

    // Function to switch pages and handle chart rendering
    function showPage(pageId) {
        // Deactivate all pages and nav items
        pages.forEach(page => page.classList.remove('active-page'));
        navItems.forEach(item => item.classList.remove('active'));

        // Activate the selected page
        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.classList.add('active-page');
        }

        // Activate the corresponding nav item
        const activeNavItem = document.querySelector(`.nav-item[data-page="${pageId}"]`);
        if (activeNavItem) {
             activeNavItem.classList.add('active');
        }
        
        // CRITICAL: Render charts only when the analytics page is selected
        if (pageId === 'analytics') {
            renderMovementForecastChart();
            renderAnnualIncidentChart();
        }
    }

    // Event listener for navigation links
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check for disabled links (not implemented in HTML, but good practice)
            if (item.classList.contains('disabled')) {
                return; 
            }

            const pageId = item.getAttribute('data-page');
            if (pageId) {
                showPage(pageId);
                // Update the URL hash without reloading the page
                window.history.pushState(null, null, '#' + pageId);
            }
        });
    });

    // Check URL hash on load to set the initial page (supports deep linking/refresh)
    const initialPageId = window.location.hash.substring(1) || 'map';
    showPage(initialPageId);
});