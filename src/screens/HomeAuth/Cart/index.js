import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import CommonCart from '../../../components/CommonCart'; // Adjust path as per your project structure
import styles from './style'; // Import your style file
import Entypo from 'react-native-vector-icons/Entypo'; // Assuming you have Entypo icons installed
import { Colors } from '../../../theme/colors'; // Import your colors from theme
import MainButton from '../../../components/MainButton';
import images from '../../../theme/Images'; // Import your images from theme
import { responsiveHeight } from 'react-native-responsive-dimensions';

const Cart = ({ navigation }) => {
    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleContinue = () => {
        navigation.navigate('Address');
    };

    const renderHeader = () => {
        return (
            <View style={styles.row}>
                <Text style={styles.headerText}>Cart</Text>
                <TouchableOpacity onPress={handleBackPress}>
                    <Entypo name="cross" size={25} color={Colors.OFFBLACK} />
                </TouchableOpacity>
            </View>
        )
    }

    const [couponValue, setCouponValue] = useState('');
    const handleApplyCoupon = () => {
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
    return (
        <View style={styles.container}>
            {renderHeader()}
            {/* {renderEmptyCart()} */}
            <CommonCart
                itemText="Winston Creek IFM Project (1)"
                quantityText="2 x $25.00 /"
                priceText="$20.00"
                totalPriceText="$40.00"
                showDeleteIcon={true}
                showIncrementContainer={true}
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
