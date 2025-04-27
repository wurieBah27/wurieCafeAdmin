import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  GoogleMap,
  Marker,
  OverlayView,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Avatar, Button } from "flowbite-react";

const containerStyle = {
  width: "100%",
  height: "800px",
};

const shopLocation = { lat: 24.0987521, lng: 53.4969862 };

const CustomerLocation = ({ details, userProfile }) => {
  const [mapInstance, setMapInstance] = useState(null);
  const [showMarker, setShowMarker] = useState(false); // State to control marker visibility
  const [directionsResponse, setDirectionsResponse] = useState(null); // State to store directions
  const [showDirections, setShowDirections] = useState(false); // State to control directions visibility

  const { street } = details;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // Memoize the center object to prevent unnecessary re-renders
  const center = useMemo(() => {
    return { lat: details?.lat || 24.0629579, lng: details?.lng || 53.4519003 };
  }, [details]);

  const onMapLoad = useCallback((map) => {
    setMapInstance(map); // Save the map instance
    console.log("Map instance loaded:", map); // Debugging log

    // Add a delay before showing the marker
    setTimeout(() => {
      setShowMarker(true); // Show the marker after a delay
    }, 2000); // 2000ms = 2 seconds
  }, []);

  const onMapUnmount = useCallback(() => {
    setMapInstance(null); // Clear the map instance when unmounted
    setDirectionsResponse(null);
  }, []);

  // Fetch directions when the "Show directions" button is clicked
  const handleShowDirections = () => {
    if (isLoaded && center.lat && center.lng) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: shopLocation, // Starting point
          destination: center, // Ending point
          travelMode: window.google.maps.TravelMode.DRIVING, // Travel mode
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            console.log("Directions result:", result);
            setDirectionsResponse(result); // Save the directions result
            setShowDirections(true); // Show the directions
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        },
      );
    }
  };

  return (
    <div>
      <div className="my-4">
        <Button onClick={handleShowDirections}>Show directions</Button>
      </div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={18}
          mapTypeId={window.google.maps.MapTypeId.SATELLITE}
          onLoad={onMapLoad} // Pass the onLoad callback
          onUnmount={onMapUnmount} // Pass the onUnmount callback
        >
          {showMarker && (
            <>
              <Marker position={center}>
                <OverlayView
                  position={center}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <div className="flex w-20 flex-col items-center gap-1 rounded-md bg-gray-50 px-2 py-1">
                    {userProfile ? (
                      <img
                        src={userProfile?.at(0)}
                        alt="Profile"
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <Avatar />
                    )}
                    <div className="text-[8px] text-gray-700">{street}</div>
                  </div>
                </OverlayView>
              </Marker>
              <Marker position={shopLocation} />
            </>
          )}

          {/* Render the directions on the map only if `showDirections` is true */}
          {showDirections && directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      ) : (
        <div>Loading...</div> // Show a loading spinner or message
      )}
    </div>
  );
};

export default CustomerLocation;
