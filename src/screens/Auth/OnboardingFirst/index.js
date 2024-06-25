import React, {useState, useEffect} from 'react'
import {View, KeyboardAvoidingView, Text, Platform, TouchableOpacity} from 'react-native'
import imagePaths from '../../../utilities/imagePaths'
import ImageWrapper from '../../../components/image'
import styles from './style'
import { CarouselStepOneIcon } from '../../../assets'
import SecondaryButton from '../../../components/SecondaryButton'
import MainButton from '../../../components/mainButton'

const OnboardingFirst = (props) => {
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
                            imagePath={imagePaths.onboardingOne}
                            maxWidth={"100%"} maxHeight={Platform.OS == "ios" ? 450 : 390}
                        />

                        <View style={styles.logoWrapper}>
                            <View style={styles.headerRow}>
                                <View>
                                    <Text style={styles.onethreeText}>1/3</Text>
                                </View>

                                <View>
                                    <ImageWrapper
                                        imagePath={imagePaths.logoNew}
                                        maxWidth={135} maxHeight={24}
                                    />
                                </View>

                                <TouchableOpacity onPress={()=> props.navigation.navigate("LetStart")}>
                                    <Text style={styles.skipText}>SKIP</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    

                    <View style={styles.titleWrapper}>
                        <Text style={styles.titleText}>
                            Welcome to
                        </Text>
                        <Text style={styles.titleText}>
                            Netcarbons
                        </Text>

                        <Text style={styles.subTitleText}>
                            Live in harmony with nature
                        </Text>
                        
                        <View style={styles.carouselIconWrapper}>
                            <CarouselStepOneIcon/>
                        </View>
                    </View>
                </View>

                <View style={styles.btnWrapper}>
                    <MainButton
                        title="Next"
                        onPress={()=> props.navigation.navigate("OnboardingSecond")}
                    />  
                </View>
            
            </View>
        </View>
	</KeyboardAvoidingView>
)}

export default OnboardingFirst
