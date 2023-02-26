import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import {
    Box,
    TextField,
    Grid,
    CardContent,
    Typography,
    Modal,
    InputAdornment
} from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import ForecastWeather from './components/ForecastWeather';
import CurrentWeather from './components/CurrentWeather';
import { getCurrentWeather, getForecast } from './utils/APIS';
import { mapWeatherData } from './utils/common';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function App() {

    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [cityName, setCityName] = useState('');
    const [forecastData, setForecastData] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [open, setOpen] = React.useState(false);

    const weatherList = useCallback((city = '') => {
        getCurrentWeather(city, lat, long)
            .then(weather => {
                const weatherData = mapWeatherData(weather)
                setWeatherData(weatherData);
                setCityName('');
            })
            .catch(err => {
                setErrorMsg(err.message);
                setOpen(true);
                setCityName('');
            });
    }, [lat, long]);

    const forecastList = useCallback((city = '') => {
        getForecast(city, lat, long)
            .then(forecastWeather => {
                const forecastData = forecastWeather?.list.map(mapWeatherData);
                setForecastData(forecastData);
                setCityName('');
            })
            .catch(err => {
                setErrorMsg(err.message);
                setOpen(true);
                setCityName('');
            });
    }, [lat, long]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
        });
        if (lat && long) {
            weatherList();
            forecastList();
        }

    }, [lat, long, weatherList, forecastList])

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            weatherList(cityName);
            forecastList(cityName);
        }
    }

    const handleClose = () => setOpen(false);

    return (
        <>
            {(Object.keys(weatherData).length && forecastData.length) ? (
                <div className="main">
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                            p: "1rem 0",
                            display: "flex",
                            justifyContent: "center"
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            label="Enter city name"
                            variant="standard"
                            value={cityName}
                            onChange={(e) => setCityName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            sx={{
                                input: {
                                    color: "#fff",
                                    borderBottom: "0.5px solid #fff"
                                },
                                label: { color: "#fff" }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                    <Box
                        justify="center"
                        alignItems="center">
                        <Grid item xs={12} md={12}>
                            <CurrentWeather weatherData={weatherData} />
                            <ForecastWeather forecastData={forecastData} />
                        </Grid>
                    </Box>
                </div>
            ) : (
                <Box>
                    {!open && (
                        <CardContent align="center">
                            <Typography variant="h2" component="div">
                                Loading...
                            </Typography>
                        </CardContent>)}
                </Box>
            )}

            {open && (<Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display: "flex" }}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {errorMsg}
                    </Typography>
                </Box>
            </Modal>)}
        </>

    );
}
