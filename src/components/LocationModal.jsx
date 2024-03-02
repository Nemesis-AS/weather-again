import React, { useState } from "react";

const LocationModal = ({ dialogRef, setLocation }) => {
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    const useCurrentLocation = e => {
        navigator.geolocation.getCurrentPosition(pos => {
            const loc = {
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
                city: null,
                country: null
            };
            setLocation(loc);
            localStorage.setItem("locationData", JSON.stringify(loc));
        }, err => {
            console.error("An Error Occurred while getting device location!");
            console.error(err);
        });
    };

    const handleClose = e => {
        const loc = {
            lat: null,
            lon: null,
            city: city,
            country: country
        };
        setLocation(loc);
        localStorage.setItem("locationData", JSON.stringify(loc));
    };

    return (
        <dialog
            ref={dialogRef}
            className="p-4 rounded-lg backdrop:bg-zinc-900/50 w-full max-w-96"
        >
            <form className="flex flex-col gap-4 px-4 py-2" method="dialog">
                <h1 className="text-center text-4xl font-bold mb-4">
                    Pick a location
                </h1>
                <button
                    onClick={useCurrentLocation}
                    className="w-full font-bold text-md bg-zinc-800 text-zinc-200 py-2 rounded-md flex justify-center gap-1"
                    type="submit"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                        />
                    </svg>

                    <span>Use Current location</span>
                </button>

                <div className="text-center text-zinc-900 relative before:content-[''] before:absolute before:top-0 before:w-full">
                    OR
                </div>

                <div>
                    <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-zinc-900"
                    >
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        onInput={e => setCity(e.target.value)}
                        className="block w-full rounded-md border-0 py-2 px-2 text-zinc-900 ring-1 ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 outline-none"
                    />
                </div>

                <div>
                    <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-zinc-900"
                    >
                        Country
                    </label>
                    <input
                        type="text"
                        id="country"
                        onInput={e => setCountry(e.target.value)}
                        className="block w-full rounded-md border-0 py-2 px-2 text-zinc-900 ring-1 ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 outline-none"
                    />
                </div>

                <button
                    onClick={handleClose}
                    className="w-full font-bold text-md bg-zinc-800 text-zinc-200 py-2 rounded-md text-center"
                    type="submit"
                >
                    Close
                </button>
            </form>
        </dialog>
    );
};

export default LocationModal;
