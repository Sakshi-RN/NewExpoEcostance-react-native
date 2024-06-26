import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Text,
} from "react-native";
import CommonHeader from "../../../components/HomeHeaders/CommonHeader";
import InputField from "../../../components/CommonInput/InputField";
import MainButton from "../../../components/mainButton";
import Entypo from "react-native-vector-icons/Entypo";
import images from "../../../theme/Images";
import styles from "./style";
import * as ImagePicker from 'expo-image-picker';
import CalendarPicker from "react-native-calendar-picker";
import { updateProfile } from "../../../redux/features/profileReducer/index";
import { Dropdown } from "react-native-element-dropdown";
import { Colors } from "../../../theme/colors";
import { fetchCountryCodes } from "../../../redux/features/countryCodeReducer";

const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const loading = useSelector((state) => state.profile.updateLoading);

  const [isCountryFocus, setIsCountryFocus] = useState(false);
  const [isCurrencyFocus, setCurrencyFocus] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const { countryCodes, countryName } = useSelector((state) => state.country);
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
      setSelectedDate(formatDate(profile.data.dob) || "");
      setSelectedImage(profile.data.profileImage || "");
      setSelectedCurrency(profile.data.checkoutDefaultCurrency || "");
    }
  }, [profile]);

  useEffect(() => {
    dispatch(fetchCountryCodes());

    },[]);

  const onDateChange = (date) => {
    setSelectedDate(date);
    console.log(date);
    closeCalendarModal();
  };

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
    console.log(item.value);
    setCurrencyFocus(false);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleChoosePhoto = async () => {
    // ImagePicker.openPicker({
    //   width: 400,
    //   height: 400,
    //   cropping: true,
    // })
    //   .then((image) => {
    //     const file = {
    //       uri: image.path,
    //       type: image.mime,
    //       name: image.path.split("/").pop(),
    //     };
    //     setSelectedImage(file);
    //     closeImageModal();
    //     closeSelectedModal();
    //   })
    //   .catch((error) => {
    //     console.log("Error picking image: ", error);
    //   });
  };

  const handleTakePhoto = async () => {
    console.log("opencamera")
    // ImagePicker.getCameraPermissionsAsync()
    // const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    // let result = await ImagePicker.launchCameraAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    
      if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your photos!");

      } else {
        const result = await ImagePicker.launchCameraAsync();
    
        if (!result.cancelled) {
          uploadImage(result.uri)
        }

        return result;
      }
    // ImagePicker.openCamera({
    //   width: 400,
    //   height: 400,
    //   cropping: true,
    // })
    //   .then((image) => {
    //     const file = {
    //       uri: image.path,
    //       type: image.mime,
    //       name: image.path.split("/").pop(),
    //     };
    //     setSelectedImage(file);
    //     closeImageModal();
    //     closeSelectedModal();
    //   })
    //   .catch((error) => {
    //     console.log("Error taking photo: ", error);
    //   });
  };

  const openImageModal = () => {
    setIsModalVisible(true);
  };

  const closeImageModal = () => {
    setIsModalVisible(false);
  };

  const closeCalendarModal = () => {
    setIsCalendarModalVisible(false);
  };

  const openCalendarModal = () => {
    setIsCalendarModalVisible(true);
  };


  const handleSave = () => {
    const profileData = {
      firstName,
      lastName,
      dob: formatDate(selectedDate),
      checkoutDefaultCurrency: selectedCurrency,
      countryCode: selectedCountry,
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

  const renderInputs = () => {
    return (
      <View style={styles.inputParent}>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="John"
            label="First name"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
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
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Country</Text>
          <Dropdown
            style={[
              styles.dropdown,
              isCountryFocus && { borderColor: Colors.OFFBLACK },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={countryData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isCountryFocus ? "USA" : "..."}
            searchPlaceholder="Search..."
            value={selectedCountry}
            onFocus={() => setIsCountryFocus(true)}
            onBlur={() => setIsCountryFocus(false)}
            onChange={handleCountryChange}
            renderRightIcon={() => (
              <View style={styles.iconStyle}>
                <Entypo
                  name="triangle-down"
                  size={20}
                  color={Colors.OFFBLACK}
                />
              </View>
            )}
            closeModalWhenSelectedItem={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Default Currency</Text>
          <Dropdown
            style={[
              styles.dropdown,
              isCurrencyFocus && { borderColor: Colors.OFFBLACK },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={currencyData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={
              !isCurrencyFocus ? profile.temporaryCheckoutCurrency : "..."
            }
            searchPlaceholder="Search..."
            value={selectedCurrency}
            onFocus={() => setCurrencyFocus(true)}
            onBlur={() => setCurrencyFocus(false)}
            onChange={handleCurrencyChange}
            renderRightIcon={() => (
              <View style={styles.iconStyle}>
                <Entypo
                  name="triangle-down"
                  size={20}
                  color={Colors.OFFBLACK}
                />
              </View>
            )}
            closeModalWhenSelectedItem={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <InputField
            label="Birthday"
            placeholder="1992-09-23"
            showCalendarIcon={true}
            value={selectedDate ? formatDate(selectedDate) : ""}
            onCalendarIconPress={openCalendarModal}
          />
        </View>
      </View>
    );
  };

  const renderImagepicker = () => {
    return (
      <TouchableOpacity onPress={openImageModal}>
        <Image
          source={
            selectedImage
              ? { uri: !selectedImage.uri ? selectedImage : selectedImage.uri }
              : images.ImagePicker
          }
          style={styles.icon}
        />
      </TouchableOpacity>
    );
  };

  const ModalContent = () => {
    return (
      <View
        style={styles.modalWrapper}
      >
        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Image source={images.CaptureImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
          <Image source={images.selectImage} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderCalendarPicker = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={isCalendarModalVisible}
        onRequestClose={closeCalendarModal}
      >
        <View style={styles.calendercContainer}>
          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={false}
            minDate={new Date()}
            todayBackgroundColor="#f2e6ff"
            selectedDayColor="#7300e6"
            selectedDayTextColor="#FFFFFF"
            onDateChange={onDateChange}
          />
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <CommonHeader onBackPress={handleBackPress} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {renderImagepicker()}
        {renderInputs()}
        {renderCalendarPicker()}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeImageModal}
        >
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPressOut={closeImageModal}
          >
            <ModalContent />
          </TouchableOpacity>
        </Modal>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <MainButton title="Save" onPress={handleSave} disabled={loading} />
      </View>
    </View>
  );
};

export default EditProfile;


// import React from 'react';
// import { View } from 'react-native';
// import styles from './style';

// const EditProfile = ({ navigation }) => {


//     return (
//         <View style={styles.container}>
        
//         </View>
//     );
// };

// export default EditProfile;
