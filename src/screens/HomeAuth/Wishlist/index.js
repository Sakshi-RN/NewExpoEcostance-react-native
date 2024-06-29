import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import CommonCart from '../../../components/CommonCart';
import styles from './style';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../../../theme/colors';

const Wishlist = ({ navigation }) => {
  const handleBackPress = () => {
    navigation.goBack();
  };

  const orders = [
    { id: 1, itemText: 'Winston Creek IFM Project (1)', quantityText: '2 x $25.00 /', priceText: '$20.00', totalPriceText: '$40.00' },
    { id: 2, itemText: 'Creekside Retreat (2)', quantityText: '1 x $30.00 /', priceText: '$30.00', totalPriceText: '$30.00' },
    { id: 3, itemText: 'Mountain Escape (3)', quantityText: '3 x $15.00 /', priceText: '$15.00', totalPriceText: '$45.00' },
    { id: 4, itemText: 'Lakeside View (4)', quantityText: '1 x $50.00 /', priceText: '$50.00', totalPriceText: '$50.00' },
    { id: 5, itemText: 'Forest Cabin (5)', quantityText: '2 x $20.00 /', priceText: '$20.00', totalPriceText: '$40.00' },
  ];

  const renderHeader = () => {
    return (
      <View style={styles.row}>
        <Text style={styles.headerText}>Wishlist</Text>
        <TouchableOpacity onPress={handleBackPress}>
          <Entypo name="cross" size={25} color={Colors.OFFBLACK} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <CommonCart
      itemText={item.itemText}
      quantityText={item.quantityText}
      priceText={item.priceText}
      totalPriceText={item.totalPriceText}
      showHeartIcon={true}
    />
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default Wishlist;
