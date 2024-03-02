import React, { useState } from "react";

const WeatherCard = ({ weatherData }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpansion = e => {
        setExpanded(!expanded);
    };

    const formatTime = timestamp => {
        const date = new Date(timestamp * 1000);
        return `${date.getHours()}:${date.getMinutes()}`;
    };

    const formatTemp = temp => {
        return (temp - 273).toFixed(2);
    }

    return (
        <div
            className={`grid single-col overflow-hidden transition-all border rounded-lg dark:text-zinc-100 duration-300 bg-zinc-400/25 shadow-2xl backdrop-blur-md ${
                expanded ? "expanded" : ""
            }`}
        >
            <div className="flex flex-col min-w-96">
                <div className="location px-4 py-2 text-2xl font-bold text-center">
                    <div className="title">{weatherData ? weatherData.name : "<LOCATION>"}</div>
                </div>
                <div className="card-icon px-4">
                    <img
                        src={`https://openweathermap.org/img/wn/${weatherData ? weatherData.weather[0].icon : "01d"}@4x.png`}
                        alt="Weather Info"
                        className="aspect-square mx-auto"
                    />
                </div>
                <div className="card-text px-4 py-2">
                    <div className="text-3xl text-center font-bold">{ weatherData ? weatherData.weather[0].main : "<WEATHER>" }</div>
                    <div className="text-center font-2xl">{ weatherData ? weatherData.weather[0].description : "<WEATHER SUBHEAD>" }</div>
                    <div className="grid grid-cols-2 pt-4">
                        <div className="flex flex-col items-center p-2">
                            <div className="text-xl font-bold">{ weatherData ? formatTemp(weatherData.main.temp) : "<X>" }&deg;C</div>
                            <div className="font-light font-xl">Temp</div>
                        </div>
                        <div className="flex flex-col items-center p-2">
                            <div className="text-xl font-bold">{ weatherData ? weatherData.main.humidity : "<X>" }%</div>
                            <div className="font-light font-xl">Humidity</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="min-w-0">
                <div className="px-6 py-2 divide-y flex flex-col justify-center min-w-0">
                    <section className="border-zinc-800 py-2">
                        <div className="text-xl font-bold text-center uppercase">
                            Temperature
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="flex items-center justify-between px-2 py-1">
                                <div className="font-lg uppercase">Temp</div>
                                <div className="text-lg font-bold">{ weatherData ? formatTemp(weatherData.main.temp) : "<X>" }&deg;C</div>
                            </div>
                            <div className="flex items-center justify-between px-2 py-1">
                                <div className="font-lg uppercase">
                                    Feels_Like
                                </div>
                                <div className="text-lg font-bold">{ weatherData ? formatTemp(weatherData.main.feels_like) : "<X>" }&deg;C</div>
                            </div>
                            <div className="flex items-center justify-between px-2 py-1">
                                <div className="font-lg uppercase">Min</div>
                                <div className="text-lg font-bold">{ weatherData ? formatTemp(weatherData.main.temp_min) : "<X>" }&deg;C</div>
                            </div>
                            <div className="flex items-center justify-between px-2 py-1">
                                <div className="font-lg uppercase">Max</div>
                                <div className="text-lg font-bold">{ weatherData ? formatTemp(weatherData.main.temp_max) : "<X>" }&deg;C</div>
                            </div>
                        </div>
                    </section>
                    <section className="border-zinc-800 py-2">
                        <div className="text-xl font-bold text-center uppercase">
                            Wind
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="flex items-center justify-between px-2 py-1">
                                <div className="font-lg uppercase pr-4">
                                    Speed
                                </div>
                                <div className="text-lg font-bold">{ weatherData ? weatherData.wind.speed : "<X>" }m/s</div>
                            </div>
                            <div className="flex items-center justify-between px-2 py-1">
                                <div className="font-lg uppercase pr-4">
                                    Degree
                                </div>
                                <div className="text-lg font-bold">{ weatherData ? weatherData.wind.deg : "<X>" }&deg;</div>
                            </div>
                            <div className="flex items-center justify-between px-2 py-1 col-span-2">
                                <div className="font-lg uppercase pr-4">
                                    Gust
                                </div>
                                <div className="text-lg font-bold">{ weatherData ? weatherData.wind.gust : "<X>" }m/s</div>
                            </div>
                        </div>
                    </section>
                    <section className="border-zinc-800 py-2">
                        <div className="text-xl font-bold text-center uppercase">
                            Others
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="flex items-center justify-between px-2 py-1">
                                <div className="font-lg uppercase pr-4">
                                    Pressure
                                </div>
                                <div className="text-lg font-bold">{ weatherData ? weatherData.main.pressure : "<X>" }hPa</div>
                            </div>
                            <div className="flex items-center justify-between px-2 py-1">
                                <div className="font-lg uppercase pr-4">
                                    Sea_Level
                                </div>
                                <div className="text-lg font-bold">{ weatherData ? weatherData.main.sea_level : "<X>" }hPa</div>
                            </div>
                            <div className="flex items-center justify-between px-2 py-1">
                                <div className="font-lg uppercase pr-4">
                                    Sunrise
                                </div>
                                <div className="text-lg font-bold">{ weatherData ? formatTime(weatherData.sys.sunrise) : "<X>" }</div>
                            </div>
                            <div className="flex items-center justify-between px-2 py-1">
                                <div className="font-lg uppercase pr-4">
                                    Sunset
                                </div>
                                <div className="text-lg font-bold">{ weatherData ? formatTime(weatherData.sys.sunset) : "<X>" }</div>
                            </div>
                            <div className="flex items-center justify-between px-2 py-1">
                                <div className="font-lg uppercase pr-4">
                                    Visibility
                                </div>
                                <div className="text-lg font-bold">{ weatherData ? weatherData.visibility : "<X>" }m</div>
                            </div>
                            <div className="flex items-center justify-between px-2 py-1">
                                <div className="font-lg uppercase pr-4">
                                    Clouds
                                </div>
                                <div className="text-lg font-bold">{ weatherData ? weatherData.clouds.all : "<X>" }%</div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div className="sidebar flex flex-col justify-center">
                <button onClick={handleExpansion} className="h-full w-full bg-zinc-600/25 hover:bg-zinc-800/25 transition=colors duration-300">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default WeatherCard;
