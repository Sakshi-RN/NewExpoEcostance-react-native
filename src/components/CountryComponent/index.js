import React from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { Country } from "country-state-city";

const CountryComponent = ({ isVisible, toggleModal, onSelectCountry }) => {
  const countries = Country.getAllCountries().map((country) => ({
    isoCode: country.isoCode,
    name: country.name,
    flag: country.flag,
  }));

  return (
    <Modal transparent={true} visible={isVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{ width: "80%", backgroundColor: "white", borderRadius: 10 }}
        >
          <FlatList
            data={countries}
            keyExtractor={(item) => item.isoCode}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onSelectCountry(item.isoCode)}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, color: "black", color: "black" }}
                  >
                    {item.flag}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      paddingLeft: 10,
                      color: "black",
                      color: "black",
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={toggleModal}>
            <Text
              style={{
                fontSize: 18,
                padding: 10,
                textAlign: "center",
                color: "black",
                color: "black",
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CountryComponent;
