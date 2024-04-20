import { useRef, useState, useEffect } from "react";

import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";
import LocationModal from "./components/LocationModal";

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [location, setLocation] = useState({
        lat: null,
        lon: null,
        city: null,
        country: null,
    });
    const [weatherData, setWeatherData] = useState(null);

    const dialog = useRef(null);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const openDialog = () => {
        dialog.current.showModal();
    };

    const fetchWeatherData = async () => {
        if (
            !location.lat &&
            !location.lon &&
            !location.city &&
            !location.country
        ) {
            if (localStorage.getItem("locationData")) {
                setLocation(JSON.parse(localStorage.getItem("locationData")));
                return;
            }

            console.log("No Location Provided!");
            return;
        }

        if (location.lat && location.lon) {
            getDataByCoords(location.lat, location.lon);
        } else {
            getDataByCity(location.city, location.country);
        }
    };

    const getDataByCoords = async (lat, lon) => {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=66845e6a6fee50dc8f4f2e376703af7d`
        );
        const json = await res.json();
        console.log(json);
        setWeatherData(json);
    };

    const getDataByCity = async (city, country) => {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=66845e6a6fee50dc8f4f2e376703af7d`
        );
        const json = await res.json();
        console.log(json);
        setWeatherData(json);
    };

    useEffect(() => {
        fetchWeatherData();
    }, [location]);

    return (
        <div
            className={`h-screen flex flex-col bg-[url('./bg.jpg')] dark:bg-[url('./bg-dark.jpeg')] transition-all duration-300 bg-cover bg-center ${
                darkMode ? "dark" : ""
            }`}
        >
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <main className="flex justify-center items-center grow transition-colors duration-300 relative">
                <WeatherCard weatherData={weatherData} />

                <button
                    aria-label="Open Location Picker"
                    onClick={openDialog}
                    className="absolute bottom-8 right-8 p-2 border rounded-lg hover:bg-zinc-300/50 dark:border-zinc-200/50 dark:text-zinc-100 dark:hover:bg-zinc-600/50 transition-colors duration-300 bg-zinc-400/25 shadow-2xl backdrop-blur-md"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                        />
                    </svg>
                </button>
            </main>

            <LocationModal dialogRef={dialog} setLocation={setLocation} />
        </div>
    );
}

export default App;
