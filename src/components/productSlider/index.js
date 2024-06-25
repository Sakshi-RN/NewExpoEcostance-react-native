import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Platform
} from "react-native"
import styles from "./style";
import ImageWrapper from "../image";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
const { width } = Dimensions.get('window');
import Header from "../header";

const ProductSlider = ({navigation, dataItem, productDetailsData}) => {
	return (

		<View style={styles.cardContainer}>
            <SwiperFlatList
                autoplay
                autoplayDelay={3}
                autoplayLoop
                index={2}
                showPagination
                data={dataItem}
                paginationStyleItemActive={styles.paginationActiveStyle}
                paginationStyleItemInactive={styles.paginationInactiveStyle}
                renderItem={({ item }) => (
                    <View>
                        <ImageWrapper
                            imagePath={{uri:`${item?.image}`}}
                            maxWidth={width} maxHeight={Platform.OS =="ios" ? 338 :250}
                            resizeMode={"contain"}
                        />
                    </View>
                )}
            />

            <View style={styles.headerAdjustment}>
                <Header 
                    navigation={navigation}
                    centerLogo={true}
                    rightIcon={
                        <TouchableOpacity 
                            style={{paddingRight:0}}
                        >
                            <Text style={{opacity:0}}>Logt</Text>
                        </TouchableOpacity>
                    }
                    backIcon={true}
                />
            </View>
            <View style={styles.bannerAdjustment}>
                <View style={styles.productBrandBannerRow}>
                {productDetailsData?.details?.sdgs && productDetailsData?.details?.sdgs?.length > 0 &&
                productDetailsData?.details?.sdgs?.map((item)=>{
                    return(
                        <View style={styles.standardWrapper}>
                            <ImageWrapper
                                imagePath={{uri:`${item?.sdg?.image}`}}
                                maxWidth={48} maxHeight={48}
                                resizeMode={"contain"}
                            />
                        </View>
                    )
                })}
                    
                </View>
            </View>
        </View>
	);
};

export default ProductSlider;
