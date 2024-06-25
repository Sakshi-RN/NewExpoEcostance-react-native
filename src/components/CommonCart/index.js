import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import images from '../../theme/Images';
import styles from './style';
import { Colors } from '../../theme/colors';

const CommonCart = ({ 
    itemText, 
    quantityText, 
    priceText, 
    totalPriceText, 
    showDeleteIcon = false, 
    showHeartIcon = false, 
    showIncrementContainer = false 
}) => {
    const [quantity, setQuantity] = useState(1);

    const increment = () => {
        setQuantity(quantity + 1);
    };

    const decrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const renderMyOrderList = () => {
        return (
            <View style={styles.orderContainer}>
                <View style={styles.row}>
                    <Image source={images.orderImg} style={styles.image} />
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.orderItemText}>{itemText}</Text>
                        <View style={styles.priceRow}>
                            <Text style={styles.orderDetails}>{quantityText}</Text>
                            <Text style={styles.orderItem}>{priceText}</Text>
                        </View>
                        <Text style={styles.orderItemText}>{totalPriceText}</Text>
                    </View>
                </View>
                <View style={[styles.row, styles.marginTop]}>
                    {showIncrementContainer && (
                        <View style={styles.incrementContainer}>
                            <Text style={styles.quantity} onPress={decrement}>-</Text>
                            <Text style={styles.quantity}>{quantity}</Text>
                            <Text style={styles.quantity} onPress={increment}>+</Text>
                        </View>
                    )}
                    {showDeleteIcon && (
                        <TouchableOpacity style={styles.deltIcon}>
                            <Entypo name="trash" size={25} color={Colors.DARKRED} />
                        </TouchableOpacity>
                    )}
                    {showHeartIcon && (
                        <TouchableOpacity style={styles.heartIcon}>
                            <Entypo name="heart" size={25} color={Colors.DARKRED} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {renderMyOrderList()}
        </View>
    );
};

export default CommonCart;
