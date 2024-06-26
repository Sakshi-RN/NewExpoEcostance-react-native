import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CommonHeader from '../../../components/HomeHeaders/CommonHeader';
import InputField from '../../../components/CommonInput/InputField';
import styles from './style';
import { Change_Address } from '../../../redux/features/changeAddressReducer';

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

    const handleSave = () => {
        const addressData = {
            addressLine1,
            addressLine2,
            city,
            state,
            country,
            pincode,
        };

        console.log("@@resonsedta@@@", addressData);

        dispatch(Change_Address(addressData));
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <CommonHeader onBackPress={handleBackPress} />

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.inputContainer}>
                    <InputField
                        placeholder="Address"
                        value={addressLine1}
                        onChangeText={setAddressLine1}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <InputField
                        placeholder="Address"
                        value={addressLine2}
                        onChangeText={setAddressLine2}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <InputField
                        placeholder="ZIP Code / Pin code"
                        value={pincode}
                        onChangeText={setPincode}
                    />
                </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSave} disabled={loading}>
                    <Text>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChangeAddress;
