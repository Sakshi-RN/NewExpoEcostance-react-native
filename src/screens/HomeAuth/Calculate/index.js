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
import CircularProgressChart from '../../../components/circulerProgressChart'
import styles from './style'

const Calculate = ({route, navigation}) => {
const { carbonEmissionParam} = route?.params;
const [email, setEmail] = useState("");
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
                                maxWidth={"100%"} maxHeight={Platform.OS == "ios" ? 89 :80}
                            />
                            <View style={styles.headerRowAdjust}>
                                <Header 
                                    navigation={navigation}
                                    centerLogo={true}
                                    rightIcon={
                                        <TouchableOpacity 
                                        style={{paddingRight:0}}
                                            // onPress={()=> logoutUser()}
                                        >
                                            <Text style={{opacity:0}}>Logt</Text>
                                        </TouchableOpacity>
                                    }
                                    backIcon={true}
                                />
                            </View>
                        </View>

                        <View style={styles.loginContainer}>
                            <Text style={styles.chooseAmountLabel}>Choose Amount or Tons</Text>
                            <View style={styles.calculateVectorCenter}>
                                {/* <ImageWrapper
                                    imagePath={imagePaths.calculateVector}
                                    maxWidth={289} maxHeight={289}
                                /> */}
                                {carbonEmissionParam != undefined &&
                                    <CircularProgressChart
                                        total={carbonEmissionParam}
                                        footprint={12}
                                        cost={84.00}
                                        reduction={12}
                                        size={200}
                                    />
                                }
                            </View>

                            <View style={styles.productSelectedColumn}>
                                <Text style={styles.productSelectedText}>Product Selected</Text>
                                <Text style={styles.productDescText}>119.8MW - India Carbon* - Energy</Text>
                                <Text style={styles.productDescText}>Industries (Renewable/Neon-renewable </Text>
                                <Text style={styles.productDescText}>source) - $7.00 </Text>
                            </View>

                            <View style={styles.bottomButtonRow}>
                                <View style={styles.bottomRowLeft}>
                                    <TouchableOpacity style={styles.chooseProductButton}>
                                        <Text style={styles.chooseProductText}>Choose Product</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.bottomRowRight}>
                                    <TouchableOpacity style={styles.buynowButton}>
                                        <Text style={styles.buyNowText}>Buy Now</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </>
)}

export default Calculate
