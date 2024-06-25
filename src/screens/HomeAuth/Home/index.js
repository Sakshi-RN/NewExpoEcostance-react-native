import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    Platform,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import ImageWrapper from '../../../components/image';
import imagePaths from '../../../utilities/imagePaths';
import HomeCard from '../../../components/homeCard';
import Header from '../../../components/header';
import styles from './style';
import { HeartIcon, ShoppingCartIcon, PlusWhiteIcon } from '../../../assets';
import { Colors } from '../../../theme/colors';
import { fetchProducts } from '../../../redux/features/getetProductReducer';

const Home = ({ products, loading, error, fetchProducts, navigation, metadata }) => {
    const [showToggle, setShowToggle] = useState(false);

    const listRef = useRef(null);

    useEffect(() => {
        fetchProducts({ page: 1 });
    }, [fetchProducts]);

    const onRefresh = () => {
        fetchProducts({ page: 1 });
    };

    const handleEndReached = () => {
        if (!loading && metadata.nextPage) {
            fetchProducts({ page: metadata.nextPage });
        }
    };

    return (
        <>
            <View style={styles.topBanner}>
                <ImageWrapper
                    imagePath={imagePaths.loginTopVector}
                    maxWidth={"100%"} maxHeight={Platform.OS === "ios" ? 89 : 80}
                />
                <View style={styles.headerRowAdjust}>
                    <Header
                        navigation={navigation}
                        centerLogo={true}
                        rightIcon={
                            <View style={styles.shoppingCartRow}>
                                <TouchableOpacity style={styles.shoppingCartButton}
                                    onPress={() => navigation.navigate("Cart")}
                                >
                                    <ShoppingCartIcon />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <HeartIcon />
                                </TouchableOpacity>
                            </View>
                        }
                        backIcon={false}
                    />
                </View>
            </View>

            <View style={styles.container}>
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
            </View>

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
