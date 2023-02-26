import React from 'react';
import {

	ListItem,
	Tabs,
	Typography,
	Toolbar,
	Paper,

} from '@mui/material';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import InvertColorsOutlinedIcon from '@mui/icons-material/InvertColorsOutlined';
import AirIcon from '@mui/icons-material/Air';
import { format, parseISO } from 'date-fns';

const ForecastWeather = ({ forecastData }) => {

	const forecastList = forecastData.filter((item) => {
		const date = new Date(item.dt_txt);
		return date.getTime() >= new Date().getTime();
	});

	return (
		<Toolbar sx={{ p: "1rem 0" }}>
			<Tabs variant="scrollable"
				className="menulist"
				value={false}
			>
				{forecastList?.map((item) => {
					const iconId = item.icon;
					const time = format(parseISO(item.dt_txt), 'hh a');
					const weekDay = format(parseISO(item.dt_txt), 'EEEE');
					const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
					const day = days[new Date().getDay()] === weekDay ? 'Today' : weekDay;
					const windSpeed = 3.6 * item.wind;
					return (
						<ListItem className="listItem" key={item.dt_txt}>
							<Paper align="center" elevation={10}
								sx={{
									background: "none",
									color: "#fff",
									padding: "8px",
									width: "200px"
								}}>
								<Typography variant="h6">
									{day} {time}
								</Typography>
								<ListItem style={{ display: "flex", justifyContent: "space-between" }}>
									<p>{item.description}</p>
									<div style={{ display: "inline-flex" }}>
										<img class="forecast-icon" src={`http://openweathermap.org/img/w/${iconId}.png`} alt="weather icon" />

										<p>{Math.round(item.temp)}&deg;</p></div>
								</ListItem>

								<ListItem style={{ display: "flex", justifyContent: "space-between" }}>
									<div style={{ display: "inline-flex" }}><ArrowUpwardOutlinedIcon />{Math.round(item.max)}&deg;</div>
									<div style={{ display: "inline-flex" }}><ArrowDownwardOutlinedIcon />{Math.round(item.min)}&deg;</div>
								</ListItem>

								<ListItem style={{ display: "flex", justifyContent: "space-between" }}>
									<div style={{ display: "inline-flex" }}><InvertColorsOutlinedIcon />{item.humidity}%</div>
									<div style={{ display: "inline-flex" }}><AirIcon />{Math.round(windSpeed)} km/h</div>
								</ListItem>

							</Paper>
						</ListItem>

					);
				})}
			</Tabs>
		</Toolbar>

	)
};

export default ForecastWeather;
