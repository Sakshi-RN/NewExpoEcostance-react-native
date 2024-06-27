import React from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { State } from 'country-state-city';

const StateComponent = ({ isVisible, toggleModal, onSelectState, selectedCountry }) => {
  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10 }}>
          <FlatList
            data={states}
            keyExtractor={(item) => item.isoCode}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {
                onSelectState && onSelectState(item.isoCode);
                toggleModal();
              }}>
                <Text style={{ fontSize: 18, padding: 10,color:'black' }}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={toggleModal}>
            <Text style={{ fontSize: 18, padding: 10, textAlign: 'center',color:'black'  }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default StateComponent;
