
const API_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = {/* your api key*/}

export function getCurrentWeather(cityName, lat, lon) {
    return fetch(
        `${API_URL}/weather?lat=${lat}&lon=${lon}&q=${cityName}&units=metric&appid=${API_KEY}`
    )
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Something went wrong, try agian later!");
            }
        })
}

export function getForecast(cityName, lat, lon) {
    return fetch(
        `${API_URL}/forecast?lat=${lat}&lon=${lon}&q=${cityName}&units=metric&appid=${API_KEY}`
    )
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Something went wrong, try agian later!");
            }
        })
}
