export const getWindDirection = (wind_deg) => {
  if (wind_deg > 348.75 && wind_deg < 11.25) return 'N';
  else if (wind_deg > 11.5 && wind_deg < 33.75) return 'NNE';
  else if (wind_deg > 33.75 && wind_deg < 56.25) return 'NE';
  else if (wind_deg > 56.25 && wind_deg < 78.75) return 'ENE';
  else if (wind_deg > 78.75 && wind_deg < 101.25) return 'E';
  else if (wind_deg > 101.25 && wind_deg < 123.75) return 'ESE';
  else if (wind_deg > 123.75 && wind_deg < 146.25) return 'SE';
  else if (wind_deg > 146.25 && wind_deg < 168.75) return 'SS';
  else if (wind_deg > 168.75 && wind_deg < 191.25) return 'S';
  else if (wind_deg > 191.25 && wind_deg < 213.75) return 'SSW';
  else if (wind_deg > 213.75 && wind_deg < 236.25) return 'SW';
  else if (wind_deg > 236.25 && wind_deg < 258.75) return 'WSW';
  else if (wind_deg > 258.75 && wind_deg < 281.25) return 'W';
  else if (wind_deg > 281.25 && wind_deg < 303.75) return 'WNW';
  else if (wind_deg > 303.75 && wind_deg < 326.25) return 'NW';
  else if (wind_deg > 326.25 && wind_deg < 348.75) return 'NNW';
};
