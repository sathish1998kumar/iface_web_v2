import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  Autocomplete,
  Paper,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import { Search, MyLocation, ZoomIn, ZoomOut, Home } from "@mui/icons-material";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useJsApiLoader } from "@react-google-maps/api";
import MarkerClusterer from "@googlemaps/markerclustererplus";
import { ClipLoader } from "react-spinners";

const GoogleMap = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  const locations = [
    // Original India locations
    { name: "RTS (India)", lat: 11.2809, lng: 77.5988, present: 50, absent: 10, totalEmployees: 60, address: "123 Main St, Erode, Tamil Nadu" },
    { name: "Erode Corporation (India)", lat: 11.341, lng: 77.7172, present: 120, absent: 20, totalEmployees: 140, address: "456 Park Ave, Erode, Tamil Nadu" },
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

    { name: "Nagpur Regional Office", lat: 21.1458, lng: 79.0882, present: 80, absent: 10, totalEmployees: 90, address: "Nagpur, Maharashtra, India" },
    { name: "Indore Tech Center", lat: 22.7196, lng: 75.8577, present: 95, absent: 5, totalEmployees: 100, address: "Indore, Madhya Pradesh, India" },
    { name: "Bhopal Operations", lat: 23.2599, lng: 77.4126, present: 70, absent: 10, totalEmployees: 80, address: "Bhopal, Madhya Pradesh, India" },
    { name: "Patna Branch", lat: 25.5941, lng: 85.1376, present: 65, absent: 5, totalEmployees: 70, address: "Patna, Bihar, India" },
    { name: "Ranchi Office", lat: 23.3441, lng: 85.3096, present: 60, absent: 5, totalEmployees: 65, address: "Ranchi, Jharkhand, India" },
    { name: "Bhubaneswar Development", lat: 20.2961, lng: 85.8245, present: 75, absent: 5, totalEmployees: 80, address: "Bhubaneswar, Odisha, India" },
    { name: "Guwahati Regional", lat: 26.1445, lng: 91.7362, present: 55, absent: 5, totalEmployees: 60, address: "Guwahati, Assam, India" },
    { name: "Chandigarh Office", lat: 30.7333, lng: 76.7794, present: 85, absent: 5, totalEmployees: 90, address: "Chandigarh, India" },
    { name: "Dehradun Center", lat: 30.3165, lng: 78.0322, present: 60, absent: 5, totalEmployees: 65, address: "Dehradun, Uttarakhand, India" },
    { name: "Shimla Branch", lat: 31.1048, lng: 77.1734, present: 40, absent: 5, totalEmployees: 45, address: "Shimla, Himachal Pradesh, India" },
    { name: "Thiruvananthapuram Office", lat: 8.5241, lng: 76.9366, present: 90, absent: 10, totalEmployees: 100, address: "Thiruvananthapuram, Kerala, India" },
    { name: "Kochi Operations", lat: 9.9312, lng: 76.2673, present: 85, absent: 5, totalEmployees: 90, address: "Kochi, Kerala, India" },
    { name: "Goa Development", lat: 15.2993, lng: 74.1240, present: 50, absent: 5, totalEmployees: 55, address: "Panaji, Goa, India" },
    { name: "Visakhapatnam Branch", lat: 17.6868, lng: 83.2185, present: 75, absent: 5, totalEmployees: 80, address: "Visakhapatnam, Andhra Pradesh, India" },
    { name: "Vijayawada Office", lat: 16.5062, lng: 80.6480, present: 65, absent: 5, totalEmployees: 70, address: "Vijayawada, Andhra Pradesh, India" },
    { name: "Raipur Center", lat: 21.2514, lng: 81.6296, present: 60, absent: 5, totalEmployees: 65, address: "Raipur, Chhattisgarh, India" },
    { name: "Jamshedpur Plant", lat: 22.8046, lng: 86.2029, present: 110, absent: 10, totalEmployees: 120, address: "Jamshedpur, Jharkhand, India" },
    { name: "Surat Operations", lat: 21.1702, lng: 72.8311, present: 95, absent: 5, totalEmployees: 100, address: "Surat, Gujarat, India" },
    { name: "Vadodara Office", lat: 22.3072, lng: 73.1812, present: 80, absent: 5, totalEmployees: 85, address: "Vadodara, Gujarat, India" },
    { name: "Nashik Branch", lat: 20.0059, lng: 73.7913, present: 70, absent: 5, totalEmployees: 75, address: "Nashik, Maharashtra, India" },
  ];

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (isLoaded && !map) {
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 22.9734, lng: 78.6569 },  // Center of India
        zoom: 4,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: false,
      });
      setMap(newMap);

      const markers = locations.map((location) => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: newMap,
          title: location.name,
          icon: {
            url: "/facemaker.png",
            scaledSize: new window.google.maps.Size(40, 40),
          },
          label: {
            text: `${Math.round((location.present / location.totalEmployees) * 100)}%`,
            color: "#1a73e8",
            fontSize: "14px",
            fontWeight: "bold",
          },
        });

        const content = `
        <div class="w-[260px] p-3 font-sans rounded-lg shadow-sm bg-white">
          <!-- Header with icon and title -->
          <div class="flex items-center mb-2">
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
              <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"/>
                <path d="M12 14C7.58172 14 4 15.7909 4 18V20H20V18C20 15.7909 16.4183 14 12 14Z"/>
              </svg>
            </div>
            <h3 class="text-sm font-semibold text-gray-900 line-clamp-2">
              ${location.name}
            </h3>
          </div>
      
          <!-- Address -->
          <div class="flex items-start mb-3 text-xs text-gray-600">
            <svg class="w-3.5 h-3.5 text-gray-500 mr-1.5 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span class="break-words">${location.address}</span>
          </div>
      
          <!-- Stats grid -->
          <div class="grid grid-cols-2 gap-1.5 mb-3">
            <div class="bg-green-50 p-1.5 rounded text-center">
              <p class="text-xs text-gray-600 mb-0.5">Present</p>
              <p class="text-sm font-semibold text-green-600">${location.present}</p>
            </div>
            <div class="bg-red-50 p-1.5 rounded text-center">
              <p class="text-xs text-gray-600 mb-0.5">Absent</p>
              <p class="text-sm font-semibold text-red-600">${location.absent}</p>
            </div>
            <div class="bg-blue-50 p-1.5 rounded text-center col-span-2">
              <p class="text-xs text-gray-600 mb-0.5">Total</p>
              <p class="text-sm font-semibold text-blue-600">${location.totalEmployees}</p>
            </div>
          </div>
      
          <!-- Attendance progress bar -->
          <div class="mb-${location.name === "Erode Corporation (India)" ? '3' : '0'}">
            <div class="flex justify-between mb-1">
              <span class="text-xs text-gray-600">Attendance</span>
              <span class="text-xs font-semibold text-green-600">${Math.round((location.present / location.totalEmployees) * 100)}%</span>
            </div>
            <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-green-600" style="width: ${(location.present / location.totalEmployees) * 100}%"></div>
            </div>
          </div>
      
          ${location.name === "Erode Corporation (India)"
            ? `<button id="viewDetailsBtn-${location.name}" class="w-full py-2 px-3 bg-blue-500 text-white text-xs font-medium rounded-md mt-2 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  View Details
                  <svg class="w-3.5 h-3.5 ml-1.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                  </svg>
                </button>`
            : ""
          }
        </div>
      `;

        const infoWindow = new window.google.maps.InfoWindow({
          content: content,
        });

        marker.addListener("click", () => {
          infoWindow.open(newMap, marker);
          newMap.setCenter({ lat: location.lat, lng: location.lng });
          newMap.setZoom(12);

          if (location.name === "Erode Corporation (India)") {
            setTimeout(() => {
              document.getElementById(`viewDetailsBtn-${location.name}`)?.addEventListener("click", () => {
                navigate("/dashboard");
              });
            }, 0);
          }
        });

        return marker;
      });

      new MarkerClusterer(newMap, markers, {
        imagePath:
          "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      });
    }
  }, [isLoaded, map, locations, navigate]);

  const handleSearch = (event, value) => {
    setSearch(value);
    const location = locations.find((loc) => loc.name.toLowerCase() === value.toLowerCase());
    if (location && map) {
      map.setCenter({ lat: location.lat, lng: location.lng });
      map.setZoom(12);
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

  const resetMap = () => {
    if (map) {
      map.setCenter({ lat: 20, lng: 0 });
      map.setZoom(3);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#1a73e8" size={50} />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen p-4">
      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        variant="contained"
        color="error"
        startIcon={<LogOut size={18} />}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 1000,
          borderRadius: "8px",
          textTransform: "none",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          }
        }}
      >
        Logout
      </Button>

      <div className="w-full h-full border-2 border-gray-300 rounded-xl shadow-lg overflow-hidden relative">
        {/* Search Bar */}
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

        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
          <IconButton onClick={() => map.setZoom(map.getZoom() + 1)} color="primary">
            <ZoomIn />
          </IconButton>
          <IconButton onClick={() => map.setZoom(map.getZoom() - 1)} color="primary">
            <ZoomOut />
          </IconButton>
          <IconButton onClick={resetMap} color="primary">
            <Home />
          </IconButton>
        </div>

        {/* Map */}
        <div ref={mapRef} className="w-full h-full"></div>
      </div>
    </div>
  );
};

export default GoogleMap;