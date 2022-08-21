export const getCoordinates = async (city_name) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city_name.toLowerCase()}&appid=${
        import.meta.env.VITE_APP_OPEN_WEATHER_MAP_API_KEY
      }`
    );

    const coords = await response.json();

    return {
      latitude: coords.coord.lat,
      longitude: coords.coord.lon,
      name: coords.name,
      country: coords.country,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getLocationName = async (coords) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        coords.latitude
      }&lon=${coords.longitude}&appid=${
        import.meta.env.VITE_APP_OPEN_WEATHER_MAP_API_KEY
      }`
    );

    const data = await response.json();

    return {
      latitude: data.coord.lat,
      longitude: data.coord.lon,
      name: data.name,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCurrentPosition = (cb) => {
  navigator.geolocation.getCurrentPosition((position) => cb(position));
}