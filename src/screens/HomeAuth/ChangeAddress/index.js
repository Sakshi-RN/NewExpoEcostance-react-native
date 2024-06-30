import React, { useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CommonHeader from "../../../components/HomeHeaders/CommonHeader";
import InputField from "../../../components/CommonInput/InputField";
import styles from "./style";
import {
  Change_Address,
  Set_Address_Field,
} from "../../../redux/features/changeAddressReducer";
import MainButton from "../../../components/MainButton";
import CountryComponent from "../../../components/CountryComponent";
import StateComponent from "../../../components/StateComponent";
import CityComponent from "../../../components/CityComponent";

const ChangeAddress = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const address = useSelector((state) => state.address.data);
  const loading = useSelector((state) => state.address.updateLoading);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [isStateModalVisible, setIsStateModalVisible] = useState(false);
  const [isCityModalVisible, setIsCityModalVisible] = useState(false);

  const [countryError, setCountryError] = useState("");
  const [stateError, setStateError] = useState("");
  const [cityError, setCityError] = useState("");
  const [addressLine1Error, setAddressLine1Error] = useState("");
  const [pincodeError, setPincodeError] = useState("");

  const toggleCountryModal = () => {
    setIsCountryModalVisible(!isCountryModalVisible);
  };

  const toggleStateModal = () => {
    setIsStateModalVisible(!isStateModalVisible);
  };

  const toggleCityModal = () => {
    setIsCityModalVisible(!isCityModalVisible);
  };

  const handleSelectCountry = (countryObject) => {
    setSelectedCountry(countryObject.name);
    dispatch(Set_Address_Field({ field: "country", value: countryObject.isoCode }));
    dispatch(Set_Address_Field({ field: "state", value: "" }));
    dispatch(Set_Address_Field({ field: "city", value: "" }));
    setIsCountryModalVisible(false);
    setCountryError("");
  };

  const handleSelectState = (stateObject) => {
    setSelectedState(stateObject.name);
    dispatch(Set_Address_Field({ field: "state", value: stateObject.isoCode }));
    dispatch(Set_Address_Field({ field: "city", value: "" }));
    setIsStateModalVisible(false);
    setStateError("");
  };

  const handleSelectCity = (cityName) => {
    dispatch(Set_Address_Field({ field: "city", value: cityName }));
    setIsCityModalVisible(false);
    setCityError("");
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const validateFields = () => {
    let valid = true;
    if (!address.country) {
      setCountryError("Please select a country");
      valid = false;
    }
    if (!address.state) {
      setStateError("Please select a state");
      valid = false;
    }
    if (!address.city) {
      setCityError("Please select a city");
      valid = false;
    }
    if (!address.addressLine1.trim()) {
      setAddressLine1Error("Address Line 1 is required");
      valid = false;
    }
    if (!address.pincode.trim()) {
      setPincodeError("Pincode is required");
      valid = false;
    }
    return valid;
  };

  const handleSave = () => {
    if (!validateFields()) {
      return;
    }

    dispatch(Change_Address(address)); // Trigger the async action here
    navigation.goBack();
  };

  const handleAddressLine1Change = (text) => {
    dispatch(Set_Address_Field({ field: "addressLine1", value: text }));
    setAddressLine1Error("");
  };

  const handleAddressLine2Change = (text) => {
    dispatch(Set_Address_Field({ field: "addressLine2", value: text }));
  };

  const handlePincodeChange = (text) => {
    dispatch(Set_Address_Field({ field: "pincode", value: text }));
    setPincodeError("");
  };

  const renderCountryList = () => {
    return (
      <View>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="Select your Country"
            showDropdownIcon
            onDropDownPress={toggleCountryModal}
            label={"Country"}
            value={selectedCountry}
          />
          {countryError ? (
            <Text style={styles.errorText}>{countryError}</Text>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="Select your State"
            showDropdownIcon
            onDropDownPress={toggleStateModal}
            label={"State"}
            value={selectedState}
          />
          {stateError ? (
            <Text style={styles.errorText}>{stateError}</Text>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="Select your City"
            showDropdownIcon
            onDropDownPress={toggleCityModal}
            label={"City"}
            value={address.city}
          />
          {cityError ? <Text style={styles.errorText}>{cityError}</Text> : null}
        </View>
        <CountryComponent
          isVisible={isCountryModalVisible}
          toggleModal={toggleCountryModal}
          onSelectCountry={handleSelectCountry}
        />
        <StateComponent
          isVisible={isStateModalVisible}
          toggleModal={toggleStateModal}
          onSelectState={handleSelectState}
          selectedCountry={address.country}
        />
        <CityComponent
          isVisible={isCityModalVisible}
          toggleModal={toggleCityModal}
          onSelectCity={handleSelectCity}
          selectedCountry={address.country}
          selectedState={address.state}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CommonHeader onBackPress={handleBackPress} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {renderCountryList()}

        <InputField
          placeholder="Address Line 1"
          value={address.addressLine1}
          onChangeText={handleAddressLine1Change}
        />
        {addressLine1Error ? (
          <Text style={styles.errorText}>{addressLine1Error}</Text>
        ) : null}

        <InputField
          placeholder="Address Line 2"
          value={address.addressLine2}
          onChangeText={handleAddressLine2Change}
        />

        <InputField
          placeholder="ZIP Code / Pin code"
          value={address.pincode}
          onChangeText={handlePincodeChange}
        />
        {pincodeError ? (
          <Text style={styles.errorText}>{pincodeError}</Text>
        ) : null}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <MainButton title="Save" onPress={handleSave} disabled={loading} />
      </View>
    </View>
  );
};

export default ChangeAddress;
