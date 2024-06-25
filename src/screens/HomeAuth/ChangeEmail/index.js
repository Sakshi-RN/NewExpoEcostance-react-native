import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CommonHeader from '../../../components/HomeHeaders/CommonHeader';
import InputField from '../../../components/CommonInput/InputField';
import { Colors } from '../../../theme/colors';
import styles from './style';

const ChangeEmail = () => {
    const navigation = useNavigation();
    const [showButtonRow, setShowButtonRow] = useState(false); 
    const [showSecondary, setShowSecondary] = useState(false); 

    const handleEditButtonClick = () => {
        setShowButtonRow(true); 
    };

    const handleCancelButtonClick = () => {
        setShowButtonRow(false); 
    };

    const handleSecondaryButton = () => {
        setShowSecondary(true); 
    };

    const handleSecondaryCancel = () => {
        setShowSecondary(false); 
    };

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleSavePress = () => {
        navigation.navigate('Setting');
    };

    return (
        <View style={styles.container}>
            <CommonHeader onBackPress={handleBackPress} />
            <View style={styles.content}>
                <View style={styles.inputContainer}>
                    <InputField
                        placeholder="tgiroti@yahoo.com"
                        label="Primary Email"
                        showEditButton={true}
                        onEditButtonClick={handleEditButtonClick} 
                    />
                </View>

                {showButtonRow && ( 
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.button} onPress={handleSavePress}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: Colors.OFFBLACK }]}
                            onPress={handleCancelButtonClick} 
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.inputContainer}>
                    <InputField
                        placeholder="tgiroti@yahoo.com"
                        label="Secondary Email"
                        showEditButton={true}
                        onEditButtonClick={handleSecondaryButton} 
                    />
                    {showSecondary && ( 
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.button} onPress={handleSavePress}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: Colors.OFFBLACK }]}
                                onPress={handleSecondaryCancel} 
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

export default ChangeEmail;
