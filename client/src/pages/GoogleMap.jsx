import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  Autocomplete,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Search, MyLocation } from "@mui/icons-material";

const ClientLocationsMap = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [infoWindow, setInfoWindow] = useState(null);

  const locations = [
    { name: "RTS (India)", lat: 11.1271, lng: 78.6569, present: 50, absent: 10, totalEmployees: 60, address: "123 Main St, Erode, Tamil Nadu" },
    { name: "Erode Corporation (India)", lat: 11.341, lng: 77.7172, present: 120, absent: 20, totalEmployees: 140, address: "456 Park Ave, Erode, Tamil Nadu" },
    { name: "Perundurai (India)", lat: 11.2755, lng: 77.5874, present: 90, absent: 5, totalEmployees: 95, address: "789 Elm St, Perundurai, Tamil Nadu" },
    { name: "Coimbatore (India)", lat: 11.0168, lng: 76.9558, present: 130, absent: 20, totalEmployees: 150, address: "321 Oak St, Coimbatore, Tamil Nadu" },
  ];

  useEffect(() => {
    const loadGoogleMaps = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBAajo1CfPyRxHf18mzhJLLQwsuXbb6sPA&callback=initMap`;
      script.async = true;
      window.initMap = initMap;
      document.body.appendChild(script);
    };

    const initMap = () => {
      if (!mapRef.current || map) return;
  
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: {  lat: 20, lng: 0  }, // Default center (India)
        zoom: 3,
      });
  
      setMap(newMap);
      const newInfoWindow = new window.google.maps.InfoWindow();
      setInfoWindow(newInfoWindow);

      // Custom marker icon
      const customIcon = {
        url: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Replace with your custom icon URL
        scaledSize: new window.google.maps.Size(40, 40), // Adjust size as needed
      };

      locations.forEach((location) => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: newMap,
          title: location.name,
          icon: customIcon, // Use custom icon
        });

        marker.addListener("click", () => {
          newInfoWindow.setContent(`
            <div style="padding: 10px; font-family: Arial, sans-serif; max-width: 250px;">
              <h3 style="font-size: 18px; font-weight: bold; color: #1a73e8; margin-bottom: 10px;">${location.name}</h3>
              <p style="font-size: 14px; color: #555; margin-bottom: 8px;"><strong>Address:</strong> ${location.address}</p>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <p style="font-size: 14px; color: #555;"><strong>Present:</strong> ${location.present}</p>
                <p style="font-size: 14px; color: #555;"><strong>Absent:</strong> ${location.absent}</p>
              </div>
              <p style="font-size: 14px; color: #555;"><strong>Total Employees:</strong> ${location.totalEmployees}</p>
              <div style="margin-top: 10px;">
                <button style="background-color: #1a73e8; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
                  View Details
                </button>
              </div>
            </div>
          `);
          newInfoWindow.open(newMap, marker);
          newMap.setCenter({ lat: location.lat, lng: location.lng });
          newMap.setZoom(12);
        });
      });
    };

    loadGoogleMaps();
    return () => {
      window.initMap = null;
    };
  }, []);

  const handleSearch = (event, value) => {
    setSearch(value);
    if (value) {
      setFilteredLocations(locations.filter((loc) => loc.name.toLowerCase().includes(value.toLowerCase())));
    } else {
      setFilteredLocations([]);
    }

    const location = locations.find(loc => loc.name.toLowerCase() === value.toLowerCase());
    if (location && map && infoWindow) {
      const markerPosition = { lat: location.lat, lng: location.lng };
      map.setCenter(markerPosition);
      map.setZoom(12);
      infoWindow.setContent(`
        <div style="padding: 10px; font-family: Arial, sans-serif; max-width: 250px;">
          <h3 style="font-size: 18px; font-weight: bold; color: #1a73e8; margin-bottom: 10px;">${location.name}</h3>
          <p style="font-size: 14px; color: #555; margin-bottom: 8px;"><strong>Address:</strong> ${location.address}</p>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <p style="font-size: 14px; color: #0000;"><strong>Present:</strong> ${location.present}</p>
            <p style="font-size: 14px; color: #555;"><strong>Absent:</strong> ${location.absent}</p>
          </div>
          <p style="font-size: 14px; color: #555;"><strong>Total Employees:</strong> ${location.totalEmployees}</p>
          <div style="margin-top: 10px;">
            <button style="background-color: #1a73e8; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
              View Details
            </button>
          </div>
        </div>
      `);
      infoWindow.setPosition(markerPosition);
      infoWindow.open(map);
    }
  };

  const locateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        if (map) {
          map.setCenter({ lat: latitude, lng: longitude });
          map.setZoom(12);
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Search Box */}
      <Paper className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-white p-2 rounded-lg shadow-lg flex items-center w-[450px]">
        <Autocomplete
          freeSolo
          options={filteredLocations.map((option) => option.name)}
          onInputChange={handleSearch}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              size="small"
              placeholder="Search locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              style={{ width: "100%", minWidth: "400px" }} // Ensures full width
              InputProps={{
                ...params.InputProps,
                style: {
                  fontSize: "1rem",
                  padding: "12px",
                  borderRadius: "8px",
                  minWidth: "100%",
                  overflow: "visible",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="text-gray-500" style={{ fontSize: "1.5rem" }} />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <IconButton onClick={locateUser} color="primary" aria-label="locate">
          <MyLocation style={{ fontSize: "1.5rem" }} />
        </IconButton>
      </Paper>

      {/* Map Container */}
      <div ref={mapRef} className="absolute inset-0 rounded-xl border-2 border-gray-300 shadow-lg"></div>
    </div>
  );
};

export default ClientLocationsMap;