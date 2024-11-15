import axios from "axios";
import { Weather, ForecastTideDay, WeatherInfo, ForecastDay } from "@/types";

const API_KEY = "6d5e35ad77bf45e599205106241411";
const BASE_URL = "http://api.weatherapi.com/v1";

const getWeather = async (localName: string): Promise<Weather | undefined> => {
  try {
    /** Promise 인스턴스 방법을 사용했을 땐, resolve에 해당 */
    const res = await axios.get(
      `${BASE_URL}/forecast.json?q=${localName}&days=7&key=${API_KEY}`
    );

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    /** Promise 인스턴스 방법을 사용했을 땐, reject에 해당 */
    console.error(error);
  }
};

const getTideWeather = async (
  localName: string
): Promise<ForecastTideDay | undefined> => {
  try {
    const res = await axios.get(
      `${BASE_URL}/marine.json?q=${localName}&days=1&key=${API_KEY}`
    );

    if (res.status === 200) {
      return res.data.forecast.forecastday[0];
    }
  } catch (error) {
    console.error(error);
  }
};

const getOneWeekWeather = async (
  localName: string
): Promise<WeatherInfo[] | undefined> => {
  try {
    const res = await axios.get(
      `${BASE_URL}/marine.json?q=${localName}&days=7&key=${API_KEY}`
    );

    if (res.status === 200 && res.data) {
      const newData = res.data.forecast.forecastday.map((item: ForecastDay) => {
        return {
          maxTemp: Math.round(item.day.maxtemp_c),
          minTemp: Math.round(item.day.mintemp_c),
          date: item.date,
          iconCode: item.day.condition.code,
          isDay: item.day.condition.icon.includes("day"),
        };
      });

      return newData;
    }
  } catch (error) {
    console.error(error);
  }
};

export { getWeather, getTideWeather, getOneWeekWeather };
