// CountryCodePicker.js

import React, { useState, useEffect } from 'react';
import { View, Modal, FlatList, Text, TouchableOpacity } from 'react-native';
import { CountryPicker } from 'react-native-country-codes-picker';
import { State } from 'country-state-city';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import InputField from '../../components/CommonInput/InputField'; 

const CountryCodePicker = () => {
  const [show, setShow] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [stateList, setStateList] = useState([]);
  const [isStateModalVisible, setIsStateModalVisible] = useState(false);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry.code);
      setStateList(states);
    }
  }, [selectedCountry]);

  const handleCountryChange = (item) => {
    setSelectedCountry(item);
    setShow(false);
  };

  const handleStateChange = (item) => {
    setSelectedState(item);
    setIsStateModalVisible(false);
    // Handle state selection logic here (if needed)
  };

  return (
    <View>
      {/* Example integration of InputField */}
      <InputField
        showDropdownIcon={true}
        label="Country"
        placeholder="Select Country"
        showFlag={true}
        imagePath={selectedCountry?.flag}
        value={selectedCountry?.name}
        editable={false}
      />

      {/* Example integration of CountryPicker */}
      <View style={styles.container}>
        <CountryPicker
          show={show}
          onChange={(item) => handleCountryChange(item)}
          closeable={true}
          filterable={true}
          filterPlaceholder="Search..."
          visible={show}
          priorityCountries={['IN', 'US', 'CA']}
        />
     
        {isStateModalVisible && (
          <Modal animationType="slide">
            <FlatList
              data={stateList}
              keyExtractor={(item) => item.stateCode}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleStateChange(item)} style={styles.ItemStyling}>
                  <Text style={styles.ItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </Modal>
        )}
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  ItemStyling: {
    height: 40,
    backgroundColor: '#f2f5f3',
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
  },
  ItemText: {
    fontSize: responsiveFontSize(2),
    alignSelf: 'center',
    textAlign: 'center',
  },
};

export default CountryCodePicker;




