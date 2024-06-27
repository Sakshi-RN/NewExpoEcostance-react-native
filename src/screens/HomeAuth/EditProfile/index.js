import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, ScrollView } from 'react-native';
import CommonHeader from '../../../components/HomeHeaders/CommonHeader';
import InputField from '../../../components/CommonInput/InputField';
import MainButton from '../../../components/mainButton';
import styles from './style';
import { updateProfile } from '../../../redux/features/profileReducer/index';
import { fetchCountryCodes } from '../../../redux/features/countryCodeReducer';
import ImagePickerComponent from '../../../components/ImagePickerComponent/index';
import CalendarPickerComponent from '../../../components/CalendarPickerComponent';
import DropdownComponent from '../../../components/DropdownComponent';
import CountryComponent from '../../../components/CountryComponent';

const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const loading = useSelector((state) => state.profile.updateLoading);

  const [isCountryFocus, setIsCountryFocus] = useState(false);
  const [isCurrencyFocus, setCurrencyFocus] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  // const [selectedCountry, setSelectedCountry] = useState("USA");
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const { countryCodes, countryName } = useSelector((state) => state.country);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);


  const toggleCountryModal = () => {
      setIsCountryModalVisible(!isCountryModalVisible);
  };


  const handleSelectCountry = (countryCode) => {
      setSelectedCountry(countryCode);
      setIsCountryModalVisible(false);
  };



  useEffect(() => {
    if (countryName) {
      setSelectedCountry(countryName);
    }
  }, [countryName]);

  const countryData = countryCodes.map((code) => ({
    label: code.name,
    value: code.name,
  }));

  const currencyData = countryCodes.map((code) => ({
    label: code.currencyName,
    value: code.currency,
  }));

  useEffect(() => {
    if (profile) {
      setFirstName(profile.data.firstName || "");
      setLastName(profile.data.lastName || "");
      setEmail(profile.data.email || "");
      setSelectedDate(new Date(profile.data.dob) || "");
      setSelectedImage(profile.data.profileImage || "");
      setSelectedCurrency(profile.data.checkoutDefaultCurrency || "");
    }
  }, [profile]);

  useEffect(() => {
    dispatch(fetchCountryCodes());
  }, [dispatch]);

  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
      return "";
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleCountryChange = (item) => {
    setSelectedCountry(item.value);
    setIsCountryFocus(false);
  };

  const handleCurrencyChange = (item) => {
    setSelectedCurrency(item.value);
    setCurrencyFocus(false);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const openCalendarModal = () => setIsCalendarModalVisible(true);
  const closeCalendarModal = () => setIsCalendarModalVisible(false);

  const handleSave = () => {
    const profileData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      checkoutDefaultCurrency: selectedCurrency,
      countryCode: selectedCountry,
      dob: formatDate(selectedDate),
    };

    const formData = new FormData();
    Object.keys(profileData).forEach((key) => {
      formData.append(key, profileData[key]);
    });

    if (selectedImage) {
      formData.append("profileImage", {
        uri: selectedImage.uri,
        type: selectedImage.type,
        name: selectedImage.name,
      });
    }

    dispatch(updateProfile(formData));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CommonHeader onBackPress={handleBackPress} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ImagePickerComponent
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        <View style={styles.inputParent}>
          <View style={styles.inputContainer}>
            <InputField
              placeholder="Smith"
              label="Last name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <View style={styles.inputContainer}>
            <InputField
              placeholder="jhoonsmith@gmail.com"
              label="Email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
                    <InputField
                        placeholder="Select your Country"
                        showDropdownIcon
                        onDropDownPress={toggleCountryModal}
                        label={'Country'}
                    />
                </View>
                <CountryComponent
                    isVisible={isCountryModalVisible}
                    toggleModal={toggleCountryModal}
                    onSelectCountry={handleSelectCountry}
                />
          {/* <DropdownComponent
            data={countryData}
            selectedValue={selectedCountry}
            isFocus={isCountryFocus}
            setIsFocus={setIsCountryFocus}
            handleChange={handleCountryChange}
            placeholder="USA"
            label="Country"
          /> */}
          <DropdownComponent
            data={currencyData}
            selectedValue={selectedCurrency}
            isFocus={isCurrencyFocus}
            setIsFocus={setCurrencyFocus}
            handleChange={handleCurrencyChange}
            placeholder={profile?.temporaryCheckoutCurrency || "..."}
            label="Default Currency"
          />
          <View style={styles.inputContainer}>
            <InputField
              label="Birthday"
              placeholder="1992-09-23"
              showCalendarIcon={true}
              value={selectedDate ? formatDate(new Date(selectedDate)) : ""}
              onCalendarIconPress={openCalendarModal}
            />
          </View>
          <CalendarPickerComponent
            isCalendarModalVisible={isCalendarModalVisible}
            closeCalendarModal={closeCalendarModal}
            onDateChange={(date) => setSelectedDate(date)}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <MainButton title="Save" onPress={handleSave} disabled={loading} />
      </View>
    </View>
  );
};

export default EditProfile;



// import React, { Component } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import CountryComponent from '../../../components/CountryComponent';


// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedCountry: '',
//       selectedState: '',
//       selectedCity: '',
//       selectedPhoneCode: '',
//       isCountryModalVisible: false,
//       isStateModalVisible: false,
//       isCityModalVisible: false,
//       isPhoneModalVisible: false,
//     };
//   }

//   toggleCountryModal = () => {
//     this.setState({ isCountryModalVisible: !this.state.isCountryModalVisible });
//   };



//   handleSelectState = (stateCode) => {
//     this.setState({ selectedState: stateCode, selectedCity: '', isStateModalVisible: false });
//   };

//   handleSelectCity = (cityName) => {
//     this.setState({ selectedCity: cityName, isCityModalVisible: false });
//   };

//   handleSelectPhoneCode = (phoneCode) => {
//     this.setState({ selectedPhoneCode: phoneCode, isPhoneModalVisible: false });
//   };

//   render() {
//     const { selectedCountry } = this.state;

//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <TouchableOpacity onPress={this.toggleCountryModal}>
//           <Text>Select a country</Text>
//         </TouchableOpacity>


//         <CountryComponent
//           isVisible={this.state.isCountryModalVisible}
//           toggleModal={this.toggleCountryModal}
//           onSelectCountry={this.handleSelectCountry}
//         />
//       </View>
//     );
//   }
// }

// export default App;