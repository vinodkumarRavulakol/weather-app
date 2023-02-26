import React, { useState, useEffect } from 'react';
import './App.css';
import {
    Box,
    TextField,
    Grid,
    CardContent,
    Typography,
    Button,
    Modal,
    IconButton
} from '@mui/material';
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

    const handleClose = () => setOpen(false);
    const errMsg = "Please enable location access in browser"

    const weatherList = async (city = '') => {
        await getCurrentWeather(city, lat, long)
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
    }

    const forecastList = async (city = '') => {
        await getForecast(city, lat, long)
            .then(forecastWeather => {
                const forecastData = forecastWeather?.list.map(mapWeatherData);
                setForecastData(forecastData);
                setCityName('');
            })
            .catch(err => {
                err.message === 'Failed to fetch' ? setErrorMsg(errMsg) : setErrorMsg(err.message);
                setOpen(true);
                setCityName('');
            });
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
        });
        if (lat && long) {
        weatherList();
        forecastList();
        }

    }, [lat, long])

    const handleSearch = () => {
        weatherList(cityName);
        forecastList(cityName);
    }

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
                            sx={{
                                input: {
                                    color: "#fff",
                                    borderBottom: "0.5px solid #fff"
                                },
                                label: { color: "#fff" }
                            }}
                        />
                        <Button
                            variant="contained"
                            align="center"
                            onClick={handleSearch}
                            sx={{
                                background: "none"
                            }}
                        >Search</Button>
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
                sx={{display: "flex"}}
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
