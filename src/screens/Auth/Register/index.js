import React, {useRef, useState} from 'react'
import {useDispatch, useSelector } from 'react-redux'
import {
    View, 
    KeyboardAvoidingView, 
    Text, 
    Platform, 
    ScrollView, 
    TouchableOpacity,
    Dimensions,
    Switch
} from 'react-native'
// import { BoxPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import ImageWrapper from '../../../components/image'
import imagePaths from '../../../utilities/imagePaths'
import { InputBox } from '../../../components/inputBox'
import MainButton from '../../../components/mainButton'
import Header from '../../../components/header'
import SwitchToggle from "react-native-switch-toggle";
import styles from './style'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { showErrorMessage } from '../../../utilities/helpers'
import Entypo from 'react-native-vector-icons/Entypo';
import { auth } from '../../../redux/features/authReducer'
import { Colors } from '../../../theme/colors'
const { width } = Dimensions.get("window");

const Register = (props) => {
const {registerLoading} = useSelector(state => state.auth);
const formikRef = useRef();
const dispatch = useDispatch();
const [lockToggle, setLockToggle] = useState(true)
const levels =  [
    {
    label: 'Weak',
    labelColor: '#ff6900',
    activeBarColor: '#ff6900',
    },
    {
        label: 'Average',
        labelColor: '#f3d331',
        activeBarColor: '#f3d331',
    },
    {
        label: 'Strong',
        labelColor: '#14eb6e',
        activeBarColor: '#14eb6e',
    },
    {
        label: 'Very strong',
        labelColor: '#0af56d',
        activeBarColor: '#0af56d',
    }
]

const initialValues = {
    username:"",
    email: "",
    password:"",
    agreeToTerms:false,
    agreeToNews:false
};
const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const registerSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters long')
      .max(15, 'Username must not exceed 15 characters'),
    email: Yup.string()
        .required("Email is required")
        .email('Please provide valid email address')
        .nullable('Please provide valid email address')
        .matches(emailRegExp, "Email is not valid"),
    password: Yup.string()
        .required('Password is required') 
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
    agreeToTerms: Yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('Agreement is required'),
    agreeToNews: Yup.boolean()
    })
    

const handleFormSubmission = async(values)=>{
    if(values?.username != "" && values?.email != "" && values?.password != "" && values?.agreeToTerms != false){
        let data = {
            "email": values?.email.trim(),
            "phone": "",
            "password": values?.password.trim(),
            "confirmPassword": values?.password.trim(),
            "userType": "Individual",
            "termsAndConditions": values?.agreeToTerms,
            "newsLetter": values?.agreeToNews,
            "checkout": false
        }

        dispatch(auth.registerThread(data))
        .then((responseJson) => {
            // console.log("responsedata=====", responseJson?.payload)
            if(responseJson?.payload?.success == true){
                props.navigation.navigate("FillOTP", {emailParam:values?.email})
            }else if(responseJson?.payload?.success == false){
                showErrorMessage(responseJson?.payload?.message)
            }
        })
        .catch((error) => {
            console.error(error);
            showErrorMessage(error.message)
        });
    }
}
  return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <View style={styles.container}>
                    <Formik
                        innerRef={formikRef}
                        initialValues={initialValues}
                        validationSchema={registerSchema}
                        onSubmit={values => handleFormSubmission(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, setFieldValue, setFieldTouched, values, errors, touched }) => (
                            <ScrollView style={styles.scrolViewWrapper}>
                                <View style={styles.topBanner}>
                                    <ImageWrapper
                                        imagePath={imagePaths.loginTopVector}
                                        maxWidth={"100%"} maxHeight={89}
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

                                <View style={styles.loginContainer}>
                                    <Text style={styles.loginText}>Registration</Text>
                                    <Text style={styles.loginDescText}>Create an account and start saving nature.</Text>
                                
                                    <View style={styles.inputWrapper}>
                                        <Text style={styles.labelText}>Username</Text>
                                        <InputBox
                                            style={styles.input}
                                            leftIcon={false}
                                            rightIcon={false}
                                            keyboardType={'default'}
                                            autoCapitalize="none"
                                            placeholder="John Smith"
                                            value={values?.username}
                                            onBlur={handleBlur('username')}
                                            onChangeText={handleChange('username')}
                                        />
                                        {errors.username && touched.username ? (
                                            <Text style={styles.error}>{errors.username}</Text>
                                        ) : null}
                                    </View>

                                    <View style={styles.inputWrapper}>
                                        <Text style={styles.labelText}>Email</Text>
                                        <InputBox
                                            style={styles.input}
                                            leftIcon={false}
                                            rightIcon={false}
                                            keyboardType={'default'}
                                            autoCapitalize="none"
                                            placeholder="example@gmail.com"
                                            value={values.email}
                                            onBlur={handleBlur('email')}
                                            onChangeText={handleChange('email')}
                                        />
                                        {errors.email && touched.email ? (
                                            <Text style={styles.error}>{errors.email}</Text>
                                        ) : null}
                                    </View>

                                    <View style={styles.inputWrapper}>
                                        <Text style={styles.labelText}>Create a Password</Text>
                                        <InputBox
                                            style={styles.input}
                                            leftIcon={false}
                                            rightIcon={
                                                <>
                                                {lockToggle ?
                                                    <Entypo name="eye" size={20} color={Colors.grey} onPress={()=> setLockToggle(false)}/>
                                                :
                                                    <Entypo name="eye-with-line" size={20} color={Colors.grey} onPress={()=> setLockToggle(true)}/>
                                                }
                                                </>
                                            }
                                            keyboardType={'default'}
                                            autoCapitalize="none"
                                            placeholder="must be 8 character"
                                            value={values.password}
                                            onBlur={handleBlur('password')}
                                            onChangeText={handleChange('password')}
                                            secureTextEntry={lockToggle? true : false}
                                        />
                                    </View>

                                    <View style={styles.passwordStrengthRow}>
                                        {/* <BoxPasswordStrengthDisplay
                                            password={values.password}
                                            meterType="box"
                                            scoreLimit={100}
                                            levels={levels}
                                            width={width - 50}
                                            boxSpacing={2}
                                        /> */}
                                    </View>
                                    {errors.password && touched.password ? (
                                        <Text style={styles.error}>{errors.password}</Text>
                                    ) : null}
                                

                                    <View style={styles.termsRow}>
                                        <View style={styles.termsLeft}>
                                            <SwitchToggle
                                                switchOn={values.agreeToTerms}
                                                onPress={() => setFieldValue('agreeToTerms', !values.agreeToTerms)}
                                                circleColorOff='#ffffff'
                                                circleColorOn='#ffffff'
                                                backgroundColorOn='#000000'
                                                backgroundColorOff='#DDDCE1'
                                                containerStyle={{
                                                    // marginTop: 16,
                                                    width: 40,
                                                    height: 21,
                                                    borderRadius: 20,
                                                    padding: 5,
                                                }}
                                                circleStyle={{
                                                    width: 17,
                                                    height: 17,
                                                    borderRadius: 20,
                                                }}
                                            />
                                        </View>

                                        <View style={styles.termsRight}>
                                            <Text style={styles.termsText}>Terms and Conditions</Text>
                                            <Text style={styles.termsDescText}>I agree with Terms & Conditions and Privacy Policy</Text>
                                        </View>
                                    </View>
                                   

                                    <View style={styles.termsRow}>
                                        <View style={styles.termsLeft}>
                                            <SwitchToggle
                                                switchOn={values.agreeToNews}
                                                onPress={() => setFieldValue('agreeToNews', !values.agreeToNews)}
                                                circleColorOff='#ffffff'
                                                circleColorOn='#ffffff'
                                                backgroundColorOn='#000000'
                                                backgroundColorOff='#DDDCE1'
                                                containerStyle={{
                                                    // marginTop: 16,
                                                    width: 40,
                                                    height: 21,
                                                    borderRadius: 20,
                                                    padding: 5,
                                                }}
                                                circleStyle={{
                                                    width: 17,
                                                    height: 17,
                                                    borderRadius: 20,
                                                }}
                                            />
                                        </View>
                                        <View style={styles.termsRight}>
                                            <Text style={styles.termsText}>Daily news</Text>
                                            <Text style={styles.termsDescText}>I want to receive any updates and newslettr on my email</Text>
                                        </View>
                                    </View>
                                </View>
                                {errors.agreeToTerms && touched.agreeToTerms ? (
                                    <Text style={[styles.error, {paddingHorizontal:30}]}>{errors.agreeToTerms}</Text>
                                ) : null}
                               

                                <View style={styles.loginButtonWrapper}>
                                    <MainButton
                                        title="Registration"
                                        onPress={handleSubmit}
                                        loader={registerLoading}
                                    />
                                </View>
                                
                            </ScrollView>
                        )}
                    </Formik>
                </View>
            </KeyboardAvoidingView>
        </>
)}

export default Register
