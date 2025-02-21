import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const OrderDetails = () => {
  const location = useLocation();
  const map_id = location?.state?.id;
  console.log("map_id", map_id);

  const mapCenter = { lat: 22.58431884062898, lng: 88.43580331530566 };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCCQry1jnMQwz_GOOhEewP_uPOQGzFCJRU",
  });
  const [markers, setMarkers] = useState({});
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("https://clantracking.bestworks.cloud"); // Backend Socket.IO Server

    socketRef.current.on("connect", () => {
      console.log("Connected to server:", socketRef.current.id);
      socketRef.current.emit("userLiveInfo", { map_id: map_id });
    });

    socketRef.current.on("userIdUpdate", (userLocations) => {
      //   try {
      //     let locations =
      //       typeof userLocations === "string"
      //         ? JSON.parse(userLocations)
      //         : userLocations;
      //     console.log("location", locations);
      //     setMarkers((prevMarkers) => {
      //       const newMarkers = { ...prevMarkers };
      //       locations.forEach((loc) => {
      //         newMarkers[loc.map_id] = { lat: loc.latitude, lng: loc.longitude };
      //       });
      //       return newMarkers;
      //     });
      //   } catch (error) {
      //     console.error("Error parsing location data:", error);
      //   }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <div>
        <h2 className="text-black text-[18px] lg:text-[28px] font-bold">
          Order Details
        </h2>
        <GoogleMap
          mapContainerStyle={{ height: "100vh", width: "100vw" }}
          zoom={13}
          center={mapCenter}
        >
          {/* Main Marker */}
          <Marker
            position={mapCenter}
            title="Main Location"
            icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
          />

          {/* Dynamic Delivery Person Markers */}
          {Object.keys(markers).map((id) => (
            <Marker
              key={id}
              position={markers[id]}
              title={`Delivery Person ${id}`}
              icon={{
                url: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/103795/r15-right-side-view-7.png?isig=0&q=80&wm=3",
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
          ))}
        </GoogleMap>
      </div>
    </>
  );
};
export default OrderDetails;
