import React from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CommonHeader from '../../../components/HomeHeaders/CommonHeader';
import InputField from '../../../components/CommonInput/InputField';
import MainButton from '../../../components/mainButton';
import styles from './style';

const ChangeAddress = () => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <CommonHeader onBackPress={handleBackPress} />
            <ScrollView contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}>
                <View style={styles.inputContainer}>
                    <InputField
                        placeholder="Country"
                        label="Country"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <InputField
                        placeholder="State"
                        label="State"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <InputField
                        placeholder="City"
                        label="City"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <InputField
                        placeholder="ZIP"
                        label="ZIP"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <InputField
                        placeholder="example@gmail.com"
                        label="Email"
                    />
                </View>
            </ScrollView>


            <View style={styles.buttonContainer}>
                <MainButton
                    title="Save"
                    onPress={() => navigation.navigate("ChangeEmail")}
                />
            </View>
        </View>
    );
};

export default ChangeAddress;
