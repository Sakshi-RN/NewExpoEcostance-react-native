

import React, { forwardRef,useState,useEffect } from 'react';
import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import Entypo from 'react-native-vector-icons/Entypo';


const MapComponent = forwardRef((props, ref) => {
  return (
    <MapView
      ref={ref}
      moveOnMarkerPress={true}
      mapType="standard"
      provider={PROVIDER_GOOGLE}
      minZoomLevel={8}
      pitchEnabled
      onRegionChangeComplete={props.onRegionChangeComplete}
      initialRegion={props.initialRegion}
      style={{ height: '100%', width: '100%', flex: 1 }}
    >
      <Marker
        key="marker"
        tappable
        draggable={true}
        onDragEnd={props.onDragEnd}
        title="Your current location here"
        description="Your exact location"
        coordinate={props.coordinate}
      >
 <Entypo name="location-pin" size={25} color={'red'} /> 
      </Marker>
    </MapView>
  );
});

export default function AddAddress({ route }) {
  const LiveLatLong =
    route?.params?.LatLong || { coords: { latitude: 37.78825, longitude: -122.4324 } };

  const [movebleAddress, setMovebleAddress] = useState('');
  const [address, setAddress] = useState('Waiting..');
  const [coordinate, setCoordinate] = useState({
    latitude: LiveLatLong.coords.latitude,
    longitude: LiveLatLong.coords.longitude,
  });

  useEffect(() => {
    (async () => {
      try {
        let place = await Location.reverseGeocodeAsync({
          latitude: movebleAddress?.latitude || LiveLatLong.coords.latitude,
          longitude: movebleAddress?.longitude || LiveLatLong.coords.longitude,
        });

        if (place.length > 0) {
          setAddress(place[0]);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [movebleAddress]);

  return (
    <View style={{ flex: 1 }}>
      <MapComponent
        ref={null} // or you can pass a ref if needed
        onRegionChangeComplete={(loc) => setMovebleAddress(loc)}
        initialRegion={{
          latitude: LiveLatLong.coords.latitude,
          longitude: LiveLatLong.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        coordinate={coordinate}
        onDragEnd={(e) => {
          setCoordinate(e.nativeEvent.coordinate);
          console.log(e.nativeEvent.coordinate);
        }}
      />
    </View>
  );
}

