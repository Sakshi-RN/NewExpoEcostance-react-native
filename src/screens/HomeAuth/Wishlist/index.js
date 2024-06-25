import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import CommonCart from '../../../components/CommonCart';
import styles from './style';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../../../theme/colors';

const Wishlist = ({ navigation }) => {
    const handleBackPress = () => {
        navigation.goBack();
    };

    const orders = [
        { id: 1 },
    ];

    const renderHeader = () => {
        return (
            <View style={styles.row}>
                <Text style={styles.headerText}>Wishlist</Text>
                <TouchableOpacity onPress={handleBackPress}>
                    <Entypo name="cross" size={25} color={Colors.OFFBLACK} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            <CommonCart
                itemText="Winston Creek IFM Project (1)"
                quantityText="2 x $25.00 /"
                priceText="$20.00"
                totalPriceText="$40.00"
                showHeartIcon={true}
            />
        </View>
    );
};

export default Wishlist;
