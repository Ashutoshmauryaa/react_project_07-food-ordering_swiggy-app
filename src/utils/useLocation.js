import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        fetchCityData(latitude, longitude);
      });
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  }, []);

  const fetchCityData = async (latitude, longitude) => {
    try {
      const data = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const json = await data.json();
      setCity(json.address);
      console.log(json);
    } catch (error) {
      console.error("Error getting location:", error.message);
      toast.error(error.message, { duration: 5000 });
    }
  };
  return [location, city];
};

export default useLocation;
