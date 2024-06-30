import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, FlatList } from 'react-native';
import CommonCart from '../../../components/CommonCart';
import styles from './style';
import Entypo from 'react-native-vector-icons/Entypo';
import MainButton from '../../../components/MainButton';
import images from '../../../theme/Images';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { Colors } from '../../../theme/colors';

const Cart = ({ navigation }) => {

    const handleContinue = () => {
        navigation.navigate('Address');
    };



    const [couponValue, setCouponValue] = useState('');
    const handleApplyCoupon = () => {
        // Logic to apply coupon
    };

    const renderCoupon = () => {
        return (
            <View>
                <Text style={styles.totalItemsText}>Add coupon</Text>
                <View style={styles.inputButtonWrapper}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Type here'
                            style={styles.input}
                            placeholderTextColor={Colors.grey}
                            value={couponValue}
                            onChangeText={setCouponValue}
                        />
                        {couponValue ? (
                            <Image source={images.checked} />
                        ) : null}
                    </View>

                    {couponValue ? (
                        <TouchableOpacity
                            style={styles.removeBtn}
                            onPress={handleApplyCoupon}
                        >
                            <Text style={styles.removebtnText}>
                                Remove
                            </Text>
                        </TouchableOpacity>) :
                        (
                            <TouchableOpacity
                                style={styles.btnContainer}
                                onPress={handleApplyCoupon}
                            >
                                <Text style={styles.btnText}>
                                    Apply
                                </Text>
                            </TouchableOpacity>)}
                </View>
                {couponValue ? (
                    <>
                        <Text style={styles.DiscountText}>Discount: $5.00</Text>
                        <Text style={styles.CartText}>Cart Total: $250.00</Text>
                    </>
                ) : (
                    <View style={styles.blankView} />

                )}
                <View style={styles.summaryContainer}>
                    <View>
                        <Text style={styles.totalItemsText}>Total items: 11</Text>
                        <Text style={styles.orderTotalText}>Order Total: $220.00</Text>
                    </View>
                    <TouchableOpacity style={styles.floatingButton}>
                        <Text style={styles.plusIcon}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderEmptyCart = () => {
        return (
            <View style={styles.containerEmptyCart}>
                <Image source={images.emtycart} style={styles.image} />
                <Text style={styles.titleEmptyCart}>Empty Cart</Text>
                <TouchableOpacity style={styles.goShopButtonEmptyCart}>
                    <Text style={styles.buttonTextEmptyCart}>Go Shop</Text>
                </TouchableOpacity>
            </View>
        )
    }

    // Mock data for FlatList
    const mockData = Array.from({ length: 5 }, (_, index) => ({
        id: index.toString(),
        itemText: `Item ${index + 1}`,
        quantityText: `2 x $25.00 /`,
        priceText: `$20.00`,
        totalPriceText: `$40.00`,
        showDeleteIcon: true,
        showIncrementContainer: true
    }));

    const renderItem = ({ item }) => (
        <CommonCart
            itemText={item.itemText}
            quantityText={item.quantityText}
            priceText={item.priceText}
            totalPriceText={item.totalPriceText}
            showDeleteIcon={item.showDeleteIcon}
            showIncrementContainer={item.showIncrementContainer}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={mockData}
                showVerticalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={renderEmptyCart}
            />
            {renderCoupon()}
            <MainButton
                title='Checkout'
                onPress={handleContinue}
            />
        </View>
    );
};

export default Cart;
