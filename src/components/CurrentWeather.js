import React from 'react';
import {
	Box,
	Grid,
	CardContent,
	Typography,
	Divider,
} from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import InvertColorsOutlinedIcon from '@mui/icons-material/InvertColorsOutlined';
import { format } from 'date-fns';

const CurrentWeather = ({ weatherData }) => {

	const {
		temp,
		description,
		city,
		icon,
		country,
		feels_like,
		sunrise,
		sunset,
		humidity,
		wind
	} = weatherData;

	const sunriseTime = format(new Date(sunrise * 1000), 'hh:mm a');
	const sunsetTime = format(new Date(sunset * 1000), 'hh:mm a');
	const time = format(new Date(), 'hh:mm a');
	const windSpeed = 3.6 * wind;

	const StyledTypographyItem = ({ Icon, text }) => {
		return (
			<Typography sx={{ display: "flex", mb: 0.5 }}>
				<Icon /> {text}
			</Typography>
		);
	}

	return (
		<Box
			variant="outlined">
			<Grid container spacing={2}>
				<Grid item xs={8}>
					<Typography variant="h4"
						sx={{
							display: "flex",
							justifyContent: "center",
							whiteSpace: "nowrap"
						}}>
						{city}{','} {country}
					</Typography>

					<CardContent
						align="center"
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center"
						}}>
						<Typography>
							<img className='w_icon' src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather icon" />

							<Typography variant="h6"
								sx={{
									display: "flex",
									justifyContent: "center",
								}}>
								{description}
							</Typography>
							{time}
						</Typography>
						<Divider
							orientation="vertical"
							flexItem
							sx={{
								height: "100px",
								margin: "0 12px",
								backgroundColor: "#fff"
							}}
						/>
						<Typography>
							<Typography variant='h1'>
								{Math.round(temp)}
								&deg;
							</Typography>
							Feels like: {Math.round(feels_like)}&deg;
						</Typography>
						<Divider />
					</CardContent>
				</Grid>
				<Grid item xs={4} className="grid-item">
					<CardContent sx={{ px: 1, py: 10 }}>
						<Box>
							<StyledTypographyItem Icon={WbSunnyIcon} text={sunriseTime}></StyledTypographyItem>
							<StyledTypographyItem Icon={WbTwilightIcon} text={sunsetTime}></StyledTypographyItem>
							<StyledTypographyItem Icon={AirIcon} text={`${Math.round(windSpeed)} ${'km/h'}`}></StyledTypographyItem>
							<StyledTypographyItem Icon={InvertColorsOutlinedIcon} text={`${humidity} ${'%'}`}></StyledTypographyItem>
						</Box>
					</CardContent>
				</Grid>
			</Grid>
			<Divider
				sx={{
					backgroundColor: "#fff"
				}}
			/>
		</Box>

	)
};

export default CurrentWeather;
