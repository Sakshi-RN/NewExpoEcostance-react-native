import React, {useState, useEffect} from 'react'
import {View, KeyboardAvoidingView, Text, Platform, TouchableOpacity} from 'react-native'
import imagePaths from '../../../utilities/imagePaths'
import ImageWrapper from '../../../components/image'
import styles from './style'
import Header from '../../../components/header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CameraIcon } from '../../../assets'

const WelcomeUser = (props) => {
  return (
	<KeyboardAvoidingView
		behavior={Platform.OS === "ios" ? "padding" : "height"}
		style={styles.container}
	>
        <View style={styles.container}>
            <View style={styles.welcomeContainer}>
                <View>
                    <View style={styles.centerWelcomeWrapper}>
                        <ImageWrapper
                            imagePath={imagePaths.thanksRegisterVector}
                            maxWidth={"100%"} maxHeight={Platform.OS == "ios" ? 450 : 300}
                        />

                        <View style={styles.headerRowAdjust}>
                            <Header 
                                navigation={props.navigation}
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
                    

                    <View style={styles.titleWrapper}>
                        <View style={styles.ImageUploadRow}>
                            <View style={styles.CameraUploadIconBox}>
                                <CameraIcon/>
                            </View>               
                        </View>
                        <Text style={styles.subTitleText}>
                            Hi, John
                        </Text>

                        <Text style={styles.titleText}>
                           Good Morning
                        </Text>

                        <View style={styles.rowbannerFirst}>
                            <ImageWrapper
                                imagePath={imagePaths.welcomeVectorSecond}
                                maxWidth={"100%"} maxHeight={82}
                            />
                        </View>

                        <View style={styles.rowbannerSecond}>
                            <ImageWrapper
                                imagePath={imagePaths.welcomeVectorFirst}
                                maxWidth={"100%"} maxHeight={82}
                            />
                        </View>
                    </View>
                </View>            
            </View>
        </View>
	</KeyboardAvoidingView>
)}

export default WelcomeUser
