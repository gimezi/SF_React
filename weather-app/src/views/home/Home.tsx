import {
  Header,
  GetTodayWidget,
  GetHourlyWidget,
  GetKakaoMapWidget,
  GetTodayHighlightsWidget,
  GetWeekWidget,
} from "@/components";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { cityNameAtom } from "@/stores";
import { Weather, ForecastTideDay, WeatherInfo } from "@/types";
import { getWeather, getTideWeather, getOneWeekWeather } from "@/api";
import defaultValue from "@/assets/defaultValue.json";

const defaultWeatherData = defaultValue.defaultWeatherData as Weather;
const defaultTideData = defaultValue.defaultTideData as ForecastTideDay;

function HomePage() {
  const [weatherData, setWeatherData] = useState(defaultWeatherData);
  const [tideData, setTideData] = useState(defaultTideData);
  const [oneWeekWeatherSummary, setOneWeekWeatherSummary] = useState<
    WeatherInfo[]
  >([]);

  const [cityName] = useAtom(cityNameAtom);

  const fetchData = async () => {
    const fetchedWeatherData = await getWeather(cityName);
    if (fetchedWeatherData) {
      setWeatherData(fetchedWeatherData);
    }

    const fetchedTideData = await getTideWeather(cityName);
    if (fetchedTideData) {
      setTideData(fetchedTideData);
    }

    const fetchedOneWeekData = await getOneWeekWeather(cityName);
    if (fetchedOneWeekData) {
      setOneWeekWeatherSummary(fetchedOneWeekData);
    }
  };

  // 빈배열이 들어가면 컴포넌트가 마운트 될 때 한번만 실행이 된다
  useEffect(() => {
    fetchData();
  }, [cityName]);

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <div className="w-full h-full flex flex-col items-center justify-start pb-6 px-6 gap-5">
          {/* 상단 3개의 위젯 */}
          <div className="w-full flex items-center gap-5">
            <GetTodayWidget data={weatherData} />
            <GetHourlyWidget data={weatherData.forecast.forecastday[0]} />
            <GetKakaoMapWidget />
          </div>
          {/* 하단 2개의 위젯 */}
          <div className="w-full flex items-center gap-5">
            <GetTodayHighlightsWidget
              currentData={weatherData}
              tideData={tideData}
            />
            <GetWeekWidget data={oneWeekWeatherSummary} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
