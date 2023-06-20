import React from 'react';
import { View, Text, Image } from 'react-native';

const WeatherCurrent = ({ city, currentWeather }) => {
  const { dt, weather, main } = currentWeather;

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const dayOfWeek = date.toLocaleString('fr-FR', { weekday: 'long' });
    return dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { hour: 'numeric', minute: 'numeric' };
    return date.toLocaleString('fr-FR', options);
  };

  return (
    <View style={{ marginTop: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 24, color: '#FFFFFF' }}>{city.name}</Text>
      <Text style={{ fontSize: 18, color: '#FFFFFF' }}>Aujourd'hui à {formatTime(dt)}</Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/w/${weather[0].icon}.png` }}
        style={{ width: 100, height: 100 }}
      />
      <Text style={{ fontSize: 70, color: '#FFFFFF', marginBottom: 20 }}>{main.temp}°C</Text>
      <Text style={{ fontSize: 18, color: '#FFFFFF'}}>{weather[0].description}</Text>
    </View>
  );
};

export default WeatherCurrent;
