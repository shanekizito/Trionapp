import React, { useState, useEffect } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
    })();
  }, []);

  const handleDestinationInputChange = (value) => {
    setDestination(value);
  };

  return (
    <MapView
      style={{width: '100%', height: '100%'}}
      showsUserLocation
      initialRegion={{
        latitude: currentLocation ? currentLocation.coords.latitude : 0,
        longitude: currentLocation ? currentLocation.coords.longitude : 0,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121,
      }}
    >
      {currentLocation && destination && (
        <>
          <Marker
            coordinate={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            }}
            title="Current Location"
          />
          <Marker
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
            title="Destination"
          />
          <Polyline
            coordinates={[
              {
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
              },
              {
                latitude: destination.latitude,
                longitude: destination.longitude,
              },
            ]}
            strokeWidth={4}
            strokeColor="red"
          />
        </>
      )}
    </MapView>
  );
};

export default Map;
