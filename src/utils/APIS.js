
const API_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = '3144cc6c87fe7ca6a4f934ecdf0634dd';

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
