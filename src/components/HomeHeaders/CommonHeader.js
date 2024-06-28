import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import images from '../../theme/Images';
import { Fonts } from '../../theme/fonts';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const CommonHeader = ({ title, onBackPress, initialCancelBtn, rightText, cancelText }) => {
    const [showCancelBtn, setShowCancelBtn] = useState(initialCancelBtn);

    return (
        <View style={styles.container}>
            {onBackPress && (
                <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                    {showCancelBtn ? (
                        <Text style={styles.cancelText}>{cancelText}</Text>
                    ) : (
                        <Entypo name="chevron-left" size={25} />
                    )}
                </TouchableOpacity>
            )}
            <View style={styles.centerContainer}>
                {title ? (
                    <Text style={styles.centerText}>{title}</Text>
                ) : (
                    <Image source={images.logoText}  />
                )}
            </View>
            {rightText && <Text style={styles.rightText}>{rightText}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: responsiveHeight(3),
        marginHorizontal: responsiveWidth(3),
        height: responsiveHeight(7),
    },
    backButton: {
        position: 'absolute',
        left: responsiveWidth(1), // Adjust this value as needed
        padding: responsiveWidth(1), // Adjust padding as needed
    },
    centerContainer: {
        width: responsiveWidth(60), // Adjusted width to give space for right text
        alignItems: 'center',
    },
    centerText: {
        fontFamily: Fonts.regular,
        fontSize: responsiveFontSize(2.6),
    },
    cancelText: {
        fontFamily: Fonts.regular,
        fontSize: responsiveFontSize(2.2),
    },
    rightText: {
        position: 'absolute',
        right: 0,
        fontFamily: Fonts.regular,
        fontSize: responsiveFontSize(2.2),
    },
 
});

export default CommonHeader;
