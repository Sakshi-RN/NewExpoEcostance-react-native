import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import images from "../../../theme/Images";
import CommonHeader from "../../../components/HomeHeaders/CommonHeader";
import { confirmAlert } from "../../../utilities/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../../redux/features/profileReducer";
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from "../../../theme/colors";

const MyProfile = (props) => {
  const navigation = useNavigation();
  const profile = useSelector((state) => state.profile.data);
  const dispatch = useDispatch();
  const logoutUser = async () => {
    let alertData = {
      title: "Logout",
      message: "Are you sure you want to logout?",
      ok: "Yes",
      cancel: "No",
      callBack: async () => {
        const asyncStorageKeys = await AsyncStorage.getAllKeys();
        if (asyncStorageKeys.length > 0) {
          if (Platform.OS === "android") {
            await AsyncStorage.removeItem("loginData");
            await AsyncStorage.removeItem("loginUser");
            await AsyncStorage.clear();
          } else if (Platform.OS === "ios") {
            await AsyncStorage.multiRemove(asyncStorageKeys);
          }
        }
        props.navigation.navigate("Start");
      },
    };
    confirmAlert(alertData);
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const renderMenu = () => {
    return (
      <View>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("MyDashboard")}
        >
          <Image source={images.globe} />
          <Text style={styles.menuItemText}>My Carbon Offsets</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("MyOrders")}
        >
          <Image source={images.Shoppingcart} />
          <Text style={styles.menuItemText}>My Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("EditProfile")}
        >
         <Entypo
              name="user"
              size={20}
              color={Colors.OFFBLACK}
            />
          <Text style={styles.menuItemText}>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Setting")}
        >
          <Image source={images.settingIcon} />
          <Text style={styles.menuItemText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("TermsConditions")}
        >
          <Image source={images.useragrement} />
          <Text style={styles.menuItemText}>User Agreement</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => logoutUser()}>
          <Image source={images.Logout} />
          <Text style={styles.menuItemText}>Log out</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderProfileHeader = () => {
    return (
      <View>
        <Text style={styles.headerText}>My Profile</Text>
        <View style={styles.profileContainer}>
      
            <Image
              source={
                profile.data && profile.data.profileImage
                  ? { uri: profile.data.profileImage }
                  : images.uploadPic
              }
              style={styles.profileImage}
            />
      
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {profile.data
                ? profile.data.firstName + " " + profile.data.lastName
                : "John Smith"}
            </Text>
            <Text style={styles.profileEmail}>
              {profile.data ? profile.data.email : "jhoonsmith@gmail.com"}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <CommonHeader />
      <ScrollView>
        {renderProfileHeader()}
        {renderMenu()}
      </ScrollView>
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.plusIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyProfile;