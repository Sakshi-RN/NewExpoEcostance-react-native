import React from 'react';
import {useDispatch} from 'react-redux'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import images from '../../../theme/Images';
import CommonHeader from '../../../components/HomeHeaders/CommonHeader';
import { auth } from '../../../redux/features/authReducer';
import { confirmAlert, showSuccessMessage } from '../../../utilities/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart'; 

const MyProfile = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const clearLocalStorage = async()=>{
        const asyncStorageKeys = await AsyncStorage.getAllKeys();
        if (asyncStorageKeys.length > 0) {
            if (Platform.OS === 'android') {
                await AsyncStorage.removeItem("loginData");
                await AsyncStorage.removeItem("loginUser");
                await AsyncStorage.clear();
            }else if (Platform.OS === 'ios') {
                await AsyncStorage.multiRemove(asyncStorageKeys);
            }
        }
        RNRestart.restart();
        // props.navigation.navigate("Start")
    }
    const logoutUser = async()=>{
        let alertData = {
          title:"Logout",
          message : 'Are you sure you want to logout?',
          ok : 'Yes',
          cancel : 'No',
          callBack : async () => {
            dispatch(auth.logoutThread())
            .then((responseJson) => {
           
                if(responseJson?.payload?.success == true){
                    // showSuccessMessage("User Logout successfully")
                    clearLocalStorage()
                }
            })
            .catch((error) => {
                console.error(error);
                showErrorMessage(error.message)
            });
            
          }
        }
        confirmAlert(alertData)
    }

    const renderMenu = () => {
        return (
            <View>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MyDashboard')}>
                    <Image source={images.globe} />
                    <Text style={styles.menuItemText}>My Carbon Offsets</Text>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>3</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MyOrders')}>
                    <Image source={images.Shoppingcart} />
                    <Text style={styles.menuItemText}>My Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Setting')}>
                    <Image source={images.settingIcon} />
                    <Text style={styles.menuItemText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('TermsConditions')}>
                    <Image source={images.useragrement} />
                    <Text style={styles.menuItemText}>User Agreement</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}
                    onPress={() => logoutUser()}
                >
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
                <TouchableOpacity  onPress={() => navigation.navigate('EditProfile')}>

                    <Image source={images.prfl} style={styles.profileImage} />
                    </TouchableOpacity>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>John Smith</Text>
                        <Text style={styles.profileEmail}>jhoonsmith@gmail.com</Text>
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
