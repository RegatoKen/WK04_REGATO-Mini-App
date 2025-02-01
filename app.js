const apiKey = '30cf2ec6fc7b7a1f9401e2e859514b30'; 
document.getElementById('getWeather').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    if (city) {
        fetchWeather(city)
            .then(data => displayWeather(data))
            .catch(error => alert(error.message));
    } else {
        alert('Please enter a city name.');
    }
});
function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    reject(new Error('City not found'));
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(new Error('Failed to fetch weather data')));
    });
}
function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    if (data) {
        const { name, main, weather } = data;
        weatherDiv.innerHTML = `
            <h2>Weather in ${name}</h2>
            <p>Temperature: ${main.temp} °C</p>
            <p>Condition: ${weather[0].description}</p>
        `;
    }
}