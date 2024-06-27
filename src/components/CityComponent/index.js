import React from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { City } from 'country-state-city';

const CityComponent = ({ isVisible, toggleModal, onSelectCity, selectedCountry, selectedState }) => {
  const cities = selectedCountry && selectedState ? City.getCitiesOfState(selectedCountry, selectedState) : [];

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10 }}>
          <FlatList
            data={cities}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {
                onSelectCity && onSelectCity(item.name);
                toggleModal();
              }}>
                <Text style={{ fontSize: 18, padding: 10 }}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={toggleModal}>
            <Text style={{ fontSize: 18, padding: 10, textAlign: 'center' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CityComponent;
