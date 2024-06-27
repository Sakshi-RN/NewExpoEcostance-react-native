import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    View, 
    KeyboardAvoidingView, 
    Text, 
    Platform, 
    ScrollView, 
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    Image
} from 'react-native'
import ImageWrapper from '../../../components/image'
import imagePaths from '../../../utilities/imagePaths'
import MainButton from '../../../components/MainButton'
import styles from './style'
import { 
    HeartBlackIcon, 
    ProductCommentsGreyIcon, 
    ProductCommentsHighlightIcon, 
    ProductGlobeGreyIcon, 
    ProductGlobeHighlightIcon, 
    ProductHomeGreyIcon, 
    ProductHomeHighlightIcon, 
    ProductMapGreyIcon, 
    ProductMapHighlightIcon, 
    ShoppingCartBlackIcon 
} from '../../../assets'
import ProductSlider from '../../../components/productSlider'
import Stars from 'react-native-stars';
import { product } from '../../../redux/features/getetProductReducer'
import { cart } from '../../../redux/features/cartReducer'
import { showErrorMessage } from '../../../utilities/helpers'

const ProductDetail = ({route, navigation}) => {
    const { productId} = route?.params;
    // console.log("productId", productId)
    const {productDetailsLoading, productDetailsData} = useSelector(state => state.product);
    const {expressCheckoutLoading} = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const { width } = Dimensions.get('window');
    const [tabFirst, setTabFirst] = useState(true);
    const [tabSecond, setTabSecond] = useState(false);
    const [tabThird, setTabThird] = useState(false);
    const [tabFourth, setTabFourth] = useState(false);  
    const [qty, setQty] = useState(1);  
    let banners = productDetailsData?.image?.map((item, index) =>{
        let data = {
            id:index,
            image:item
        }
        
        return data;
    })

    useEffect(() => {
        if(productId != undefined){
            let data = {
                "productId":productId
            }
            getSingleProductDetails(data)
        }
       
    }, [productId != undefined]);

    const getSingleProductDetails = (data)=>{
        dispatch(product.getProductDetailsThread(data))
        .then((responseJson) => {
            if(responseJson?.payload?.success == true){
                // console.log("responsedataaa=====", responseJson?.payload?.data)
            }else {
                showErrorMessage(responseJson?.payload?.message)
            }
        })
        .catch((error) => {
            console.error(error);
            showErrorMessage(error.message)
        });
    }

    const buyNow = (product_id)=>{
        let data = {
            "getStripeCoupon": false,
            "products": [
                {
                    "product": `${product_id}`,
                    "quantity": 1
                }
            ]
        }

       
        dispatch(cart.calculateExpressCheckoutThread(data))
        .then((responseJson) => {
            if(responseJson?.payload?.success == true){
                // console.log("cart express response=====", responseJson)
                navigation.navigate("Address")
            }else {
                showErrorMessage(responseJson?.payload?.message)
            }
        })
        .catch((error) => {
            console.error(error);
            showErrorMessage(error.message)
        });
    }
    
  return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <View style={styles.container}>

                {productDetailsLoading ?
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator  size={"large"} color='#7BA986'/>
                    </View>
                    
                :
                <>
                    <ScrollView style={styles.scrolViewWrapper}>
                        <View style={styles.loginContainer}>
                            {productDetailsData?.image &&
                            <ProductSlider 
                                dataItem={banners}
                                navigation={navigation}
                                productDetailsData={productDetailsData}
                            />
                            }

                            <View style={styles.productContainer}>
                                <Text style={styles.productTitle}>{productDetailsData?.name}</Text>
                                <View style={styles.priceWrapper}>
                                    <View style={styles.priceLeft}>
                                        {productDetailsData?.priceList &&
                                        <View style={styles.priceRow}>
                                            <Text style={styles.usdText}>{productDetailsData?.priceList[0].currency}</Text>
                                            <Text style={styles.cuttingText}> 
                                            {productDetailsData?.priceList[0].currencySymbol}{productDetailsData?.priceList[0].oldPrice}
                                            </Text>
                                            <Text style={styles.usdText}>
                                                 / {productDetailsData?.priceList[0].currencySymbol}{productDetailsData?.priceList[0].price}
                                            </Text>
                                        </View>
                                        }
                                    </View>
                                    <View style={styles.ratingRight}>
                                        <View>
                                            {productDetailsData?.avgRating != 0 ?
                                                <Stars
                                                    display={productDetailsData?.avgRating}
                                                    spacing={8}
                                                    count={5}
                                                    starSize={15}
                                                    fullStar= {imagePaths.largeFilledStarIcon}
                                                    emptyStar= {imagePaths.largeUnFilledStarIcon}
                                                />
                                            :
                                                <Stars
                                                    display={0}
                                                    spacing={8}
                                                    count={5}
                                                    starSize={15}
                                                    fullStar= {imagePaths.largeFilledStarIcon}
                                                    emptyStar= {imagePaths.largeUnFilledStarIcon}
                                                />
                                            }
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.tabWrapperRow}>
                                    <View style={styles.tabLeft}>
                                        <TouchableOpacity style={styles.tabButton}
                                            onPress={()=>{
                                                setTabFirst(true)
                                                setTabSecond(false)
                                                setTabThird(false)
                                                setTabFourth(false)
                                            }}
                                        >
                                            {tabFirst ?
                                                <ProductHomeHighlightIcon/>
                                            :
                                                <ProductHomeGreyIcon/>
                                            }
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.tabButton}
                                            onPress={()=>{
                                                setTabFirst(false)
                                                setTabSecond(true)
                                                setTabThird(false)
                                                setTabFourth(false)
                                            }}
                                        >
                                            {tabSecond ?
                                                <ProductGlobeHighlightIcon/>
                                            :
                                                <ProductGlobeGreyIcon/>
                                            }
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.tabButton}
                                            onPress={()=>{
                                                setTabFirst(false)
                                                setTabSecond(false)
                                                setTabThird(true)
                                                setTabFourth(false)
                                            }}
                                        >
                                            {tabThird ?
                                                <ProductCommentsHighlightIcon/>
                                            :
                                                <ProductCommentsGreyIcon/>
                                            }
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.tabButton}
                                            onPress={()=>{
                                                setTabFirst(false)
                                                setTabSecond(false)
                                                setTabThird(false)
                                                setTabFourth(true)
                                            }}
                                        >
                                            {tabFourth ?
                                                <ProductMapHighlightIcon/>
                                            :
                                                <ProductMapGreyIcon/>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.tabContentRight}>
                                        {tabFirst &&
                                            <View style={styles.tabFirstContent}>
                                                <Text style={styles.descHeaderText}>Description</Text>
                                                <Text style={styles.descText}>
                                                    {productDetailsData?.shortDescription}
                                                </Text>

                                                <Text style={styles.descHeaderText}>LEARN MORE</Text>
                                                <View style={styles.LearnRow}>
                                                    {productDetailsData?.details?.sdgs && productDetailsData?.details?.sdgs?.length > 0 &&
                                                    productDetailsData?.details?.sdgs?.map((item)=>{
                                                        return(
                                                            <View style={styles.learnLeft}>
                                                                <ImageWrapper
                                                                    imagePath={{uri:`${item?.sdg?.image}`}}
                                                                    maxWidth={56} maxHeight={56}
                                                                    resizeMode={"contain"}
                                                                />
                                                            </View>
                                                        )
                                                    })}
                                                </View>
                                            </View>
                                        }

                                        {tabSecond &&
                                            <View style={styles.tabFirstContent}>
                                                {productDetailsData?.details?.sdgs && productDetailsData?.details?.sdgs?.length > 0 &&
                                                productDetailsData?.details?.sdgs?.map((item)=>{
                                                    return(
                                                        <View style={styles.secondTabRow}>
                                                            <View style={styles.secondTabLeft}>
                                                                <ImageWrapper
                                                                    imagePath={{uri:`${item?.sdg?.image}`}}
                                                                    maxWidth={56} maxHeight={56}
                                                                    resizeMode={"contain"}
                                                                />
                                                            </View>
                                                            <View style={styles.secondTabRight}>
                                                                <Text style={styles.secondTabText}>
                                                                    {item?.sdg?.description}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    )
                                                })}
                                            </View>
                                        }

                                        {tabThird &&
                                            <View style={styles.tabFirstContent}>
                                                {productDetailsData?.avgRating != 0 ?
                                                    <View style={styles.reviewContainer}>
                                                        <View style={styles.reviewLeft}>
                                                        <ImageWrapper
                                                            imagePath={imagePaths.avatarIcon}
                                                            maxWidth={40} maxHeight={40}
                                                            resizeMode={"contain"}
                                                        />
                                                        </View>   

                                                        <View style={styles.reviewRight}>
                                                            <Stars
                                                                display={productDetailsData?.avgRating}
                                                                spacing={8}
                                                                count={5}
                                                                starSize={15}
                                                                fullStar= {imagePaths.largeFilledStarIcon}
                                                                emptyStar= {imagePaths.largeUnFilledStarIcon}
                                                            />
                                                            <View style={styles.ReviewNameRow}>
                                                                <Text style={styles.reviewNameText}>Kate Smith</Text>
                                                                <Text style={styles.dateText}>Apr 5, 2022</Text>
                                                            </View>

                                                            <View>
                                                                <Text style={styles.descText}>
                                                                    Lorem ipsun dolor sit ament consectur ament elite
                                                                </Text>
                                                            </View>
                                                        </View>   
                                                    </View> 
                                                :
                                                    <View style={styles.noReviewsRow}>
                                                        <Text style={styles.descText}>
                                                           No Reviews
                                                        </Text>
                                                    </View>
                                                }
                                            </View>
                                        }

                                        {tabFourth &&
                                            <View style={styles.tabFirstContent}>
                                                <View style={styles.mapView}>
                                                    {/* <MapView
                                                        style={styles.map}
                                                        initialRegion={{
                                                            latitude: 20.5937,
                                                            longitude: 78.9629,
                                                            latitudeDelta: 10.0,
                                                            longitudeDelta: 10.0,
                                                        }}
                                                    /> */}
                                                    <ImageWrapper
                                                        imagePath={imagePaths.mapVectorIcon}
                                                        maxWidth={307} maxHeight={173}
                                                        resizeMode={"contain"}
                                                    />
                                                </View>
                                            </View>
                                        }
                                    </View>
                                </View>

                                {tabSecond &&
                                    <>
                                        <View style={styles.standardRow}>
                                            <Text style={styles.standardText}>Standards:</Text>
                                            {productDetailsData?.details?.standards &&
                                                <ImageWrapper
                                                    imagePath={{uri:`${productDetailsData?.details?.standards[0]?.logo}`}}
                                                    maxWidth={166} maxHeight={91}
                                                    resizeMode={"contain"}
                                                />
                                            }
                                        </View>

                                        <View style={styles.downloadFileWrapper}>
                                            <View style={styles.downloadLeft}>
                                                <View style={styles.examplePdfRow}>
                                                    <View>
                                                        <ImageWrapper   
                                                            imagePath={imagePaths.downloadIcon}
                                                            maxWidth={28} maxHeight={38}
                                                            resizeMode={"contain"}
                                                        />
                                                    </View>

                                                    <View style={{marginLeft:10}}>
                                                        <Text style={styles.fileNameText}>Example.pdf</Text>
                                                        <Text style={styles.totalMbText}>23.67 Mb</Text>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={styles.downloadRight}>
                                                <MainButton
                                                    title="Download"
                                                />
                                            </View>
                                        </View>
                                    </>
                                }
                            </View>
                        </View>  
                    </ScrollView>

                    <View style={styles.bottomConatiner}>
                        <View style={styles.qunatityRow}>
                            <View style={styles.quantityLeft}>
                                <View style={styles.qtyRow}>
                                    <TouchableOpacity
                                        onPress={()=> {
                                            qty > 0 && setQty(qty - 1)
                                        }}
                                    >
                                        <Text styles={styles.minusText}>-</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity>
                                        <Text styles={styles.minusText}>{qty}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={()=> setQty(qty + 1)}
                                    >
                                        <Text styles={styles.minusText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.quantityCenter}>
                            </View>

                            <View style={styles.quantityRight}>
                                <View style={styles.heartIconButton}>
                                    <HeartBlackIcon/>
                                </View>

                                <View style={styles.heartIconButton}>
                                    <ShoppingCartBlackIcon/>
                                </View>
                            </View>                  
                        </View>
                        <MainButton
                            title="BUY NOW"
                            activeOpacity={0.4}
                            onPress={()=> buyNow(productId)}
                            disabled={qty >= 1 ? false :true}
                            loader={expressCheckoutLoading}
                        />
                    </View>
                </>
                }
                </View>
            </KeyboardAvoidingView>
        </>
)}

export default ProductDetail
