// Function to toggle the sidebar visibility
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const content = document.querySelector(".content");
    sidebar.classList.toggle("collapsed");
    content.classList.toggle("collapsed");
}

// Function to test the API connection
function testAPIConnection() {
    const lat = 0;
    const lon = 0;
    const apiKey = "lol"; // Replace with your actual API key

    const apiURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error("API request failed with status " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("API is working well. Response:", data);
            alert("API is working well!");
        })
        .catch(error => {
            console.error("Error testing API:", error);
            alert("API request failed. Please check the console for more details.");
        });
}

// Call the testAPIConnection function when the page loads
window.onload = function() {
    testAPIConnection();
};