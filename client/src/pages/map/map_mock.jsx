import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  Autocomplete,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Search, MyLocation } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const GoogleMap = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [infoWindow, setInfoWindow] = useState(null);
  const navigate = useNavigate();

  const locations = [
    { name: "RTS (India)", lat: 11.1271, lng: 78.6569, present: 50, absent: 10, totalEmployees: 60, address: "123 Main St, Erode, Tamil Nadu" },
    { name: "Erode Corporation (India)", lat: 11.341, lng: 77.7172, present: 120, absent: 20, totalEmployees: 140, address: "456 Park Ave, Erode, Tamil Nadu" },
    { name: "Perundurai (India)", lat: 11.2755, lng: 77.5874, present: 90, absent: 5, totalEmployees: 95, address: "789 Elm St, Perundurai, Tamil Nadu" },
    { name: "Coimbatore (India)", lat: 11.0168, lng: 76.9558, present: 130, absent: 20, totalEmployees: 150, address: "321 Oak St, Coimbatore, Tamil Nadu" },
    { name: "Mumbai Office", lat: 19.076, lng: 72.8777, present: 120, absent: 30, totalEmployees: 150, address: "Mumbai, Maharashtra, India" },
    { name: "Delhi HQ", lat: 28.6139, lng: 77.209, present: 140, absent: 25, totalEmployees: 165, address: "New Delhi, India" },
    { name: "Bangalore Tech Park", lat: 12.9716, lng: 77.5946, present: 110, absent: 15, totalEmployees: 125, address: "Bangalore, Karnataka, India" },
    { name: "Hyderabad Office", lat: 17.385, lng: 78.4867, present: 100, absent: 20, totalEmployees: 120, address: "Hyderabad, Telangana, India" },
    { name: "Chennai Hub", lat: 13.0827, lng: 80.2707, present: 95, absent: 10, totalEmployees: 105, address: "Chennai, Tamil Nadu, India" },
    { name: "Pune Development Center", lat: 18.5204, lng: 73.8567, present: 130, absent: 15, totalEmployees: 145, address: "Pune, Maharashtra, India" },
    { name: "Kolkata Branch", lat: 22.5726, lng: 88.3639, present: 90, absent: 10, totalEmployees: 100, address: "Kolkata, West Bengal, India" },
    { name: "Ahmedabad Unit", lat: 23.0225, lng: 72.5714, present: 85, absent: 5, totalEmployees: 90, address: "Ahmedabad, Gujarat, India" },
    { name: "Jaipur Corporate", lat: 26.9124, lng: 75.7873, present: 75, absent: 10, totalEmployees: 85, address: "Jaipur, Rajasthan, India" },
    { name: "Lucknow Branch", lat: 26.8467, lng: 80.9462, present: 60, absent: 10, totalEmployees: 70, address: "Lucknow, Uttar Pradesh, India" },
    // Worldwide Locations (50%)
    { name: "New York Office", lat: 40.7128, lng: -74.006, present: 160, absent: 20, totalEmployees: 180, address: "New York, USA" },
    { name: "London HQ", lat: 51.5074, lng: -0.1278, present: 140, absent: 15, totalEmployees: 155, address: "London, UK" },
    { name: "Berlin Tech Center", lat: 52.52, lng: 13.405, present: 110, absent: 10, totalEmployees: 120, address: "Berlin, Germany" },
    { name: "Paris Office", lat: 48.8566, lng: 2.3522, present: 130, absent: 15, totalEmployees: 145, address: "Paris, France" },
    { name: "Sydney Hub", lat: -33.8688, lng: 151.2093, present: 90, absent: 5, totalEmployees: 95, address: "Sydney, Australia" },
    { name: "Tokyo Development Center", lat: 35.6895, lng: 139.6917, present: 170, absent: 10, totalEmployees: 180, address: "Tokyo, Japan" },
    { name: "Toronto Corporate", lat: 43.65107, lng: -79.347015, present: 85, absent: 5, totalEmployees: 90, address: "Toronto, Canada" },
    { name: "Beijing Office", lat: 39.9042, lng: 116.4074, present: 150, absent: 25, totalEmployees: 175, address: "Beijing, China" },
    { name: "Dubai Branch", lat: 25.276987, lng: 55.296249, present: 100, absent: 15, totalEmployees: 115, address: "Dubai, UAE" },
    { name: "Moscow HQ", lat: 55.7558, lng: 37.6173, present: 125, absent: 20, totalEmployees: 145, address: "Moscow, Russia" }
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
        center: { lat: 20, lng: 0 },
        zoom: 3,
      });

      setMap(newMap);
      const newInfoWindow = new window.google.maps.InfoWindow();
      setInfoWindow(newInfoWindow);

      const customIcon = {
        url: "/facemaker.png",
        scaledSize: new window.google.maps.Size(40, 40),
      };

      locations.forEach((location) => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: newMap,
          title: location.name,
          icon: customIcon,
        });

        marker.addListener("click", () => {
          const content = `
            <div style="padding: 10px; font-family: Arial, sans-serif; max-width: 250px;">
              <h3 style="font-size: 18px; font-weight: bold; color: #1a73e8; margin-bottom: 10px;">
                ${location.name}
              </h3>
              <p style="font-size: 14px; color: #555;"><strong>Address:</strong> ${location.address}</p>
              <p style="font-size: 14px; color: #1E3A8A;"><strong>Present Employees:</strong> ${location.present}</p>
              <p style="font-size: 14px; color: #DC2626;"><strong>Absent Employees:</strong> ${location.absent}</p>
              <p style="font-size: 14px; color: #555;"><strong>Total Employees:</strong> ${location.totalEmployees}</p>
              <p style="font-size: 14px; font-weight: bold; color: #0F766E;">
                <strong>Attendance Rate:</strong> ${Math.round((location.present / location.totalEmployees) * 100)}%
              </p>
              ${
                location.name === "Erode Corporation (India)"
                  ? `<button id="viewDetailsBtn" style="background-color: #1a73e8; color: white; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
                    View Details
                  </button>`
                  : ""
              }
            </div>
          `;

          newInfoWindow.setContent(content);
          newInfoWindow.open(newMap, marker);
          newMap.setCenter({ lat: location.lat, lng: location.lng });
          newMap.setZoom(12);

          if (location.name === "Erode Corporation (India)") {
            setTimeout(() => {
              document.getElementById("viewDetailsBtn")?.addEventListener("click", () => {
                navigate("/dashboard");
              });
            }, 0);
          }
        });
      });
    };

    loadGoogleMaps();
    return () => {
      window.initMap = null;
    };
  }, [navigate]);

  const handleSearch = (event, value) => {
    setSearch(value);
  
    // Clear search results and reset map zoom and center when search input is cleared
    if (!value) {
      setFilteredLocations([]); // Clear filtered locations
  
      if (map && infoWindow) {
        map.setCenter({ lat: 20, lng: 0 });  // Default center (zoom out to the whole world or any desired default center)
        map.setZoom(3);  // Default zoom level
        infoWindow.close();  // Close the info window if open
      }
      return;
    }
  
    // Filter locations based on search value
    const filteredResults = locations.filter((loc) =>
      loc.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredLocations(filteredResults);
  
    // Check if the search value matches any location and update the map
    const location = locations.find((loc) => loc.name.toLowerCase() === value.toLowerCase());
    if (location && map && infoWindow) {
      const markerPosition = { lat: location.lat, lng: location.lng };
      map.setCenter(markerPosition);
      map.setZoom(12); // Zoom in on the selected location
  
      infoWindow.setContent(`
        <div style="padding: 10px; font-family: Arial, sans-serif; max-width: 250px;">
          <h3 style="font-size: 18px; font-weight: bold; color: #1a73e8; margin-bottom: 10px;">${location.name}</h3>
          <p style="font-size: 14px; color: #555; margin-bottom: 8px;"><strong>Address:</strong> ${location.address}</p>
          <p style="font-size: 14px; color: #1E3A8A;"><strong>Total Employees:</strong> ${location.present}</p>
          <p style="font-size: 14px; color: #DC2626;"><strong>Absent Employees:</strong> ${location.absent}</p>
          <p style="font-size: 14px; color: #555;"><strong>Total Employees:</strong> ${location.totalEmployees}</p>
          <p style="font-size: 14px; font-weight: bold; color: #0F766E; margin-bottom: 8px;">
          <strong>Attendance Rate:</strong> ${Math.round((location.present / location.totalEmployees) * 100)}%
          </p>
          ${location.name === "Erode Corporation (India)" ? `
            <div style="margin-top: 10px;">
              <button id="searchViewDetailsBtn" style="background-color: #1a73e8; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
                View Details
              </button>
            </div>
          ` : ''}
        </div>
      `);
      infoWindow.setPosition(markerPosition);
      infoWindow.open(map);
  
      // Navigate to details page if the specific location is selected
      if (location.name === "Erode Corporation (India)") {
        setTimeout(() => {
          document.getElementById("searchViewDetailsBtn").addEventListener("click", () => {
            navigate("/dashboard");
          });
        }, 0);
      }
    }
  };
  
  const locateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (map) {
          map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
          map.setZoom(12);
        }
      });
    }
  };

  return (
    <div className="relative w-full h-screen">
      <Paper className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 p-2 shadow-lg flex items-center w-[450px]">
        <Autocomplete
          freeSolo
          options={locations.map((option) => option.name)}
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
              style={{ width: "100%", minWidth: "400px" }}
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
        <IconButton onClick={locateUser} color="primary">
          <MyLocation />
        </IconButton>
      </Paper>
      <div ref={mapRef} className="absolute inset-0 rounded-xl border-2 border-gray-300 shadow-lg"></div>
    </div>
  );
};

export default GoogleMap;