import React from 'react';
import { View, Text, Image } from 'react-native';

const WeatherForecast = ({ forecast }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.getHours() + 'h';
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        {forecast.map((item) => (
          <View key={item.dt} style={{ alignItems: 'center', marginRight: 10 }}>
            <Text style={{ fontSize: 12, color: '#FFFFFF' }}>{formatDate(item.dt)}</Text>
            <Image
              source={{ uri: `https://openweathermap.org/img/w/${item.weather[0].icon}.png` }}
              style={{ width: 50, height: 50 }}
            />
            <Text style={{ fontSize: 12, color: '#FFFFFF' }}>{item.main.temp}°C</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default WeatherForecast;
