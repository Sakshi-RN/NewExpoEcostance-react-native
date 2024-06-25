import React from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import CommonHeader from '../../../components/HomeHeaders/CommonHeader';
import InputField from '../../../components/CommonInput/InputField';
import MainButton from '../../../components/mainButton';
import styles from './style';

const Address = ({navigation}) => {

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleContinue = () => {
        navigation.navigate('Checkout'); 
    };

    return (
        <View style={styles.container}>
            <CommonHeader
                cancelText="Cancel"
                title="Address"
                rightText="1/2"
                initialCancelBtn={true}
                onBackPress={handleBackPress}
            />
            <ScrollView contentContainerStyle={styles.content}
 showsVerticalScrollIndicator={false}>
                <View style={styles.inputContainer}>
                    <InputField placeholder="Example" label="Country" />
                </View>
                <View style={styles.inputContainer}>
                    <InputField placeholder="State" label="State" />
                </View>
                <View style={styles.inputContainer}>
                    <InputField placeholder="City" label="City" />
                </View>
                <View style={styles.inputContainer}>
                    <InputField placeholder="MM / YY" label="ZIP" />
                </View>
                <View style={styles.inputContainer}>
                    <InputField placeholder="example@gmail.com" label="Email" />
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <MainButton title="Continue" onPress={handleContinue} />
            </View>
        </View>
    );
};

export default Address;
