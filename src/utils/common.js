export const mapWeatherData = (item) => {
    const mappedItem = {
        city: item?.name,
        date: item.dt,
        dt_txt: item?.dt_txt,
        description: item.weather[0].main,
        icon: item?.weather[0]?.icon,    /// get only if exists
        temp: Math.round(item.main.temp),
        min: Math.round(item.main.temp_min),
        max: Math.round(item.main.temp_max),
        feels_like: item.main.feels_like,
        humidity: item.main.humidity,
        wind: item.wind.speed,
        sunrise: item?.sys.sunrise,
        sunset: item?.sys.sunset,
        country: item?.sys.country,
    };

    return mappedItem;
}
