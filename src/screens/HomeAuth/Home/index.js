import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    ImageBackground,
    Modal
} from 'react-native';
import { connect } from 'react-redux';
import ImageWrapper from '../../../components/image';
import imagePaths from '../../../utilities/imagePaths';
import HomeCard from '../../../components/homeCard';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './style';
import { HeartIcon, ShoppingCartIcon, PlusWhiteIcon } from '../../../assets';
import { Colors } from '../../../theme/colors';
import { fetchProducts } from '../../../redux/features/getetProductReducer';
import CommonHeader from '../../../components//HomeHeaders/CommonHeader'
import Wishlist from '../Wishlist';
import Cart from '../Cart';


const Home = ({ products, loading, error, fetchProducts, navigation, metadata }) => {

    const [showToggle, setShowToggle] = useState(false);
    const [isWishlistModalVisible, setWishlistModalVisible] = useState(false);
    const [isCartModalVisible, setCartModalVisible] = useState(false);

    const listRef = useRef(null);

    useEffect(() => {
        fetchProducts({ page: 1 });
    }, [fetchProducts]);

    const onRefresh = () => {
        fetchProducts({ page: 1 });
    };
    const handleBackPress = () => {
        navigation.goBack();
    };


    const handleEndReached = () => {
        if (!loading && metadata.nextPage) {
            fetchProducts({ page: metadata.nextPage });
        }
    };

    const toggleWishlistModal = () => {
        setWishlistModalVisible(!isWishlistModalVisible);
    };

    const toggleCartModal = () => {
        setCartModalVisible(!isCartModalVisible);
    };

    const renderHeader = () => {
        return (

            <ImageBackground
                source={imagePaths.loginTopVector}
                style={styles.backgroundStyle}
            >
                <TouchableOpacity onPress={handleBackPress} style={styles.wishlistButton} >
                    <Entypo name="chevron-left" size={25} color={Colors.BLACK} />

                </TouchableOpacity>
                <CommonHeader />

                <View style={styles.shoppingCartRow}>
                <TouchableOpacity style={styles.wishlistButton} onPress={toggleWishlistModal}>
                <HeartIcon />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.CartButton]} onPress={toggleCartModal}>
                        <ShoppingCartIcon />
                    </TouchableOpacity>
                </View>
            </ImageBackground>

        )
    }


    const renderFlatlist = () => {
        return (
            <View style={styles.loginContainer}>
                {loading && metadata.currentPage === 1 ? (
                    <Text>Loading...</Text>
                ) : error ? (
                    <Text>Error: {typeof error === 'object' ? JSON.stringify(error) : error}</Text>
                ) : (
                    <View>
                        <FlatList
                            ref={listRef}
                            contentContainerStyle={{ flexDirection: 'column' }}
                            data={products}
                            keyExtractor={(item, index) => String(index)}
                            onRefresh={onRefresh}
                            refreshing={loading && metadata.currentPage === 1}
                            renderItem={({ item }) => (
                                <HomeCard
                                    dataItem={item}
                                    navigation={navigation}
                                />
                            )}
                            onEndReached={handleEndReached}
                            onEndReachedThreshold={0.5}
                            ListFooterComponent={loading && metadata.currentPage > 1 ? <ActivityIndicator /> : null}
                        />
                    </View>
                )}
            </View>
        )
    }

    const renderToggle = () => {
        return (
            <>
                {!showToggle ? (
                    <View style={[styles.bottomButtonAdjust, { bottom: showToggle ? 100 : 30 }]}>
                        <View style={styles.bottomRow}>
                            <TouchableOpacity style={styles.plusIconWrapper}
                                onPress={() => setShowToggle(true)}
                            >
                                <PlusWhiteIcon />
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={[styles.bottomRowAdjust, {
                        backgroundColor: showToggle ? Colors.OFFBLACK : "transparent",
                        opacity: showToggle ? 0.9 : 0.9,
                    }]}>
                        <View style={[styles.bottomButtonAdjust, { bottom: showToggle ? 100 : 30 }]}>
                            <View style={styles.bottomRow}>
                                {showToggle && (
                                    <TouchableOpacity style={styles.percentIconButton}>
                                        <ImageWrapper
                                            imagePath={imagePaths.percentBlackIcon}
                                            maxWidth={24} maxHeight={24}
                                        />
                                    </TouchableOpacity>
                                )}
                                {showToggle && (
                                    <TouchableOpacity style={styles.percentIconButton}>
                                        <ImageWrapper
                                            imagePath={imagePaths.downArrowIcon}
                                            maxWidth={25} maxHeight={28}
                                        />
                                    </TouchableOpacity>
                                )}
                                {showToggle && (
                                    <TouchableOpacity style={styles.percentIconButton}
                                        onPress={() => navigation.navigate("Cart")}
                                    >
                                        <ImageWrapper
                                            imagePath={imagePaths.cartBucketIcon}
                                            maxWidth={35} maxHeight={35}
                                        />
                                    </TouchableOpacity>
                                )}
                                {showToggle && (
                                    <TouchableOpacity style={styles.crossIconButton}
                                        onPress={() => setShowToggle(false)}
                                    >
                                        <ImageWrapper
                                            imagePath={imagePaths.crossIcon}
                                            maxWidth={20} maxHeight={20}
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>
                )}
            </>
        )
    }

    const wishlistModal = () => {
        <Modal
        visible={isWishlistModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleWishlistModal}
        >
            <View style={styles.row}>
                <Text style={styles.headerText}>Wishlist</Text>
                <TouchableOpacity onPress={toggleWishlistModal}>
                    <Entypo name="cross" size={25} color={Colors.OFFBLACK} />
                </TouchableOpacity>
            </View>
            <Wishlist/>
        </Modal>
    }

    const CartModal = () => {
        <Modal
        visible={isCartModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleCartModal}
        >
            <View style={styles.row}>
                <Text style={styles.headerText}>Cart</Text>
                <TouchableOpacity onPress={toggleCartModal}>
                    <Entypo name="cross" size={25} color={Colors.OFFBLACK} />
                </TouchableOpacity>
            </View>
            <Cart/>
        </Modal>
    }


    return (

        <View style={styles.topBanner}>
            {renderHeader()}
            {renderFlatlist()}
            {renderToggle()}
            {wishlistModal()}
            {CartModal()}
        </View>

    );
};

const mapStateToProps = state => ({
    products: state?.product?.products,
    loading: state?.product?.loading,
    error: state?.product?.error,
    metadata: state?.product?.metadata,
});

const mapDispatchToProps = {
    fetchProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
