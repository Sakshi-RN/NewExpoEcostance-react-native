import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CommonHeader from '../../../components/HomeHeaders/CommonHeader';
import InputField from '../../../components/CommonInput/InputField';
import styles from './style';
import { Change_Address } from '../../../redux/features/changeAddressReducer';
import MainButton from '../../../components/MainButton';
import CountryComponent from '../../../components/CountryComponent';
import StateComponent from '../../../components/StateComponent';
import CityComponent from '../../../components/CityComponent';

const ChangeAddress = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const address = useSelector((state) => state.address.data);
    const loading = useSelector((state) => state.address.updateLoading);

    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
    const [isStateModalVisible, setIsStateModalVisible] = useState(false);
    const [isCityModalVisible, setIsCityModalVisible] = useState(false);

    const [countryError, setCountryError] = useState('');
    const [stateError, setStateError] = useState('');
    const [cityError, setCityError] = useState('');
    const [addressLine1Error, setAddressLine1Error] = useState('');
    const [pincodeError, setPincodeError] = useState('');

    const toggleCountryModal = () => {
        setIsCountryModalVisible(!isCountryModalVisible);
    };

    const toggleStateModal = () => {
        setIsStateModalVisible(!isStateModalVisible);
    };

    const toggleCityModal = () => {
        setIsCityModalVisible(!isCityModalVisible);
    };

    const handleSelectCountry = (countryCode) => {
        setSelectedCountry(countryCode);
        setSelectedState('');
        setSelectedCity('');
        setIsCountryModalVisible(false);
        setCountryError(''); 
    };

    const handleSelectState = (stateCode) => {
        setSelectedState(stateCode);
        setSelectedCity('');
        setIsStateModalVisible(false);
        setStateError(''); 
    };

    const handleSelectCity = (cityName) => {
        setSelectedCity(cityName);
        setIsCityModalVisible(false);
        setCityError(''); 
    };

    useEffect(() => {
        if (address) {
            setAddressLine1(address.addressLine1 || '');
            setAddressLine2(address.addressLine2 || '');
            setCity(address.city || '');
            setState(address.state || '');
            setCountry(address.country || '');
            setPincode(address.pincode || '');
        }
    }, [address]);

    const handleBackPress = () => {
        navigation.goBack();
    };

    const validateFields = () => {
        let valid = true;
        if (!selectedCountry) {
            setCountryError("Please select a country");
            valid = false;
        }
        if (!selectedState) {
            setStateError("Please select a state");
            valid = false;
        }
        if (!selectedCity) {
            setCityError("Please select a city");
            valid = false;
        }
        if (!addressLine1.trim()) {
            setAddressLine1Error("Address Line 1 is required");
            valid = false;
        }
        if (!pincode.trim()) {
            setPincodeError("Pincode is required");
            valid = false;
        }
        return valid;
    };

    const handleSave = () => {
        if (!validateFields()) {
            return;
        }

        const addressData = {
            addressLine1,
            addressLine2,
            city: selectedCity,
            state: selectedState,
            country: selectedCountry,
            pincode,
        };

        dispatch(Change_Address(addressData));
        navigation.goBack();
    };

    const renderCountryList = () => {
        return (
            <View >
                <View style={styles.inputContainer}>
                    <InputField
                        placeholder="Select your Country"
                        showDropdownIcon
                        onDropDownPress={toggleCountryModal}
                        label={'Country'}
                        value={selectedCountry}
                    />
                    {countryError ? <Text style={styles.errorText}>{countryError}</Text> : null}
                </View>
                <View style={styles.inputContainer}>
                    <InputField
                        placeholder="Select your State"
                        showDropdownIcon
                        onDropDownPress={toggleStateModal}
                        label={'State'}
                        value={selectedState}
                    />
                    {stateError ? <Text style={styles.errorText}>{stateError}</Text> : null}
                </View>
                <View style={styles.inputContainer}>
                    <InputField
                        placeholder="Select your City"
                        showDropdownIcon
                        onDropDownPress={toggleCityModal}
                        label={'City'}
                        value={selectedCity}
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
                    selectedCountry={selectedCountry}
                />
                <CityComponent
                    isVisible={isCityModalVisible}
                    toggleModal={toggleCityModal}
                    onSelectCity={handleSelectCity}
                    selectedCountry={selectedCountry}
                    selectedState={selectedState}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <CommonHeader onBackPress={handleBackPress} />

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {renderCountryList()}
                <View style={styles.inputContainer}>
                    <InputField
                        placeholder="Address Line 1"
                        value={addressLine1}
                        onChangeText={(text) => {
                            setAddressLine1(text);
                            setAddressLine1Error(''); 
                        }}
                    />
                    {addressLine1Error ? <Text style={styles.errorText}>{addressLine1Error}</Text> : null}
                </View>
                <View style={styles.inputContainer}>
                    <InputField
                        placeholder="Address Line 2"
                        value={addressLine2}
                        onChangeText={setAddressLine2}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <InputField
                        placeholder="ZIP Code / Pin code"
                        value={pincode}
                        onChangeText={(text) => {
                            setPincode(text);
                            setPincodeError(''); 
                        }}
                    />
                    {pincodeError ? <Text style={styles.errorText}>{pincodeError}</Text> : null}
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <MainButton title="Save" onPress={handleSave} disabled={loading} />
            </View>
        </View>
    );
};

export default ChangeAddress;
