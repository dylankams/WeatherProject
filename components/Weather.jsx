import React, { useEffect, useState } from 'react';
import { View, Image, Text, ActivityIndicator, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import WeatherCurrent from './WeatherCurrent';
import WeatherForecast from './WeatherForecast';

const API_KEY = 'fe15b043f8750eff8eca663f0b86a299';
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const WeatherProject = () => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          throw new Error("Permission d'accès à la localisation refusée");
        }

        const location = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = location.coords;

        const url = `${API_URL}?lat=${latitude}&lon=${longitude}&lang=fr&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.log("Erreur lors de la récupération des données météo", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: '#FFFFFF', marginBottom: 10 }}>Un instant s'il vous plaît...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const { list, city } = weatherData;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options).replace(/^\w/, (c) => c.toUpperCase());
  };

  const groupedForecasts = {};
  list.forEach((forecast) => {
    const day = formatDate(forecast.dt);
    if (!groupedForecasts[day]) {
      groupedForecasts[day] = [];
    }
    groupedForecasts[day].push(forecast);
  });

  const dayLabels = Object.keys(groupedForecasts);

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require('../assets/background-meteo.jpg')}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        resizeMode="cover"
      />

      <View style={{ marginBottom: 240, paddingTop: 100 }}>
        <WeatherCurrent city={city} currentWeather={list[0]} />
      </View>

      <ScrollView style={{ marginBottom: 20 }} horizontal>
        {dayLabels.map((day, index) => (
          <View key={day} style={{ marginBottom: 20, marginLeft: index === 0 ? 0 : 20 }}>
            <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 10, padding: 10 }}>
              <Text style={{ fontSize: 24, color: '#FFFFFF', textAlign: 'center', marginBottom: 10 }}>
                {day}
              </Text>
              <ScrollView horizontal>
                <WeatherForecast forecast={groupedForecasts[day]} />
              </ScrollView>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default WeatherProject;
