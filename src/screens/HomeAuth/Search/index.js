import React from 'react';
import { View, TextInput } from 'react-native';
import CommonHeader from '../../../components/HomeHeaders/CommonHeader';
import styles from './style';

const Search = ({ navigation }) => {
    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <CommonHeader/>
            
            <TextInput
                style={styles.searchInput}
                placeholder="Search here...."
                placeholderTextColor="#888"
            />
        </View>
    );
};

export default Search;
