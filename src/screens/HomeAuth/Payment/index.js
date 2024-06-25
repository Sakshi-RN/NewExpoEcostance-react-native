import React, {useState, useEffect} from 'react'
import {
    View, 
    KeyboardAvoidingView, 
    Text, 
    Platform, 
    ScrollView, 
    TouchableOpacity
} from 'react-native'
import ImageWrapper from '../../../components/image'
import imagePaths from '../../../utilities/imagePaths'
import { InputBox } from '../../../components/inputBox'
import MainButton from '../../../components/mainButton'
import Header from '../../../components/header'
import ProductCard from '../../../components/productCard'
import styles from './style'
import { CouponCorrectIcon, DeleteIcon } from '../../../assets'
import SecondaryButton from '../../../components/SecondaryButton'
import RadioButton from 'react-native-radio-buttons-group';
import { Colors } from '../../../theme/colors'



const Payment = (props) => {
    const [couponVal, setCouponval] = useState("")
    const [toggleShow, setToggleShow] = useState(true)
    const [selectedOption, setSelectedOption] = useState('oneTime');
    let filterData = [
        {
            id:"1",
            product_name:"Winston Creek IFM Project (1)",
            image:require('../../../assets/images/product_name.png'),
        },
        {
            id:"2",
            product_name:"Winston Creek IFM Project (1)",
            image:require('../../../assets/images/product_name.png'),
        },
        {
            id:"3",
            product_name:"Winston Creek IFM Project (1)",
            image:require('../../../assets/images/product_name.png'),
        },
        {
            id:"4",
            product_name:"Winston Creek IFM Project (1)",
            image:require('../../../assets/images/product_name.png'),
        },
        {
            id:"5",
            product_name:"Winston Creek IFM Project (1)",
            image:require('../../../assets/images/product_name.png'),
        }
    ]
  return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <View style={styles.container}>
                    <ScrollView style={styles.scrolViewWrapper}>
                        <View style={styles.topBanner}>
                            <ImageWrapper
                                imagePath={imagePaths.loginTopVector}
                                maxWidth={"100%"} maxHeight={89}
                            />
                            <View style={styles.headerRowAdjust}>
                                <Header 
                                    navigation={props.navigation}
                                    title="Payment"
                                    cancelbtn={
                                        <TouchableOpacity style={{marginTop:-20}}>
                                            <Text style={styles.cancelButtonText}>Cancel</Text>
                                        </TouchableOpacity>
                                    }
                                    centerLogo={false}
                                    rightIcon={
                                        <TouchableOpacity 
                                        style={{paddingRight:0, flexDirection:'row', 
                                            flexWrap:'wrap'}}
                                            // onPress={()=> logoutUser()}
                                        >
                                            <Text style={{opacity:0}}>shd</Text>
                                            <Text style={styles.cancelButtonText}>2/2</Text>
                                        </TouchableOpacity>
                                    }
                                    backIcon={false}
                                />
                            </View>
                        </View>

                        <View style={styles.loginContainer}>
                            {filterData && filterData?.length > 0 &&
                            filterData?.map((item)=> { 
                                return(
                                    <ProductCard
                                        dataItem={item}
                                        navigation={props.navigation}
                                    />
                                )
                            })}
                        </View>
                           
                    </ScrollView>

                    <View style={styles.bottomSlideContainer}>
                        <View style={styles.dotContainer}>
                            <TouchableOpacity style={[styles.circleDot, {
                                backgroundColor:toggleShow ? Colors.OFFBLACK :Colors.LIGHTGREY
                            }]}
                                onPress={()=> setToggleShow(true)}
                            >
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.circleDot, {
                                backgroundColor:!toggleShow ? Colors.OFFBLACK :Colors.LIGHTGREY
                            }]}
                                onPress={()=> setToggleShow(false)}
                            >
                            </TouchableOpacity>
                        </View>
                        {toggleShow ?
                            <View onMoveShouldSetResponder={()=> setToggleShow(false)}>
                                <Text style={styles.addCouponText}>Add Coupon</Text>
                                <View style={styles.couponRow}>
                                    <View style={styles.couponInputWrapper}>
                                        <InputBox
                                            style={styles.input}
                                            leftIcon={false}
                                            rightIcon={
                                            <CouponCorrectIcon/>
                                            }
                                            keyboardType={'default'}
                                            autoCapitalize="none"
                                            placeholder="CODE1234"
                                            value={couponVal}
                                            onChangeText={(value)=> setCouponval(value)}
                                        />
                                    </View> 
                                    <View style={styles.discountWrapper}>
                                    <View>
                                            <Text style={styles.discountText}>Discount:</Text>
                                            <Text style={styles.discountText}>$50.00</Text>
                                    </View>

                                    <View style={styles.deleteIcon}>
                                            <DeleteIcon/>
                                    </View>
                                    </View>  
                                </View>
                                <Text style={styles.cartTotalText}>Cart Total: $250.00</Text>
                                <Text style={styles.totalItemCountText}>Total items: 11</Text>
                                <Text style={styles.orderTotalText}>Order Total: $220.00</Text>
                                <View style={styles.changeCurrencyButton}>
                                    <SecondaryButton
                                        title='Change Currency'
                                    />
                                </View>
                                <View>
                                    <MainButton
                                        title='Next'
                                    />
                                </View>
                            </View>
                        :
                            <View 
                                // onMoveShouldSetResponder={()=> setToggleShow(true)}
                            >
                                <View style={styles.radioContainer}>
                                    <View style={styles.radioOption}>
                                        <TouchableOpacity   
                                            style={[styles.radioCircle, selectedOption === 'oneTime' && styles.selectedCircle]}
                                            onPress={() => setSelectedOption('oneTime')}    
                                        >
                                        </TouchableOpacity>
                                        <View style={styles.radioTextContainer}>
                                            <Text style={styles.optionText}>1 Time Payment:</Text>
                                            <Text style={styles.optionAmount}>Pay $108.00 Today</Text>
                                        </View>
                                    </View>

                                    <View style={styles.radioOption}>
                                        <TouchableOpacity 
                                            style={[styles.radioCircle, selectedOption === 'subscription' && styles.selectedCircle]}
                                            onPress={() => setSelectedOption('subscription')}
                                        >
                                        </TouchableOpacity>
                                        <View style={styles.radioTextContainer}>
                                            <Text style={styles.optionText}>12 Subscription Payments of $9.00 per month:</Text>
                                            <Text style={styles.optionAmount}>Pay $9.00 Today</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                                        <Text style={styles.buttonWhiteText}>Back</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.payButton} onPress={() => alert(`Pay ${selectedOption === 'oneTime' ? '$108.00' : '$9.00 Today'}`)}>
                                        <Text style={styles.buttonText}>Pay</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
)}

export default Payment
