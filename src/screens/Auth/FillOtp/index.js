import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  KeyboardAvoidingView,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ImageWrapper from "../../../components/image";
import imagePaths from "../../../utilities/imagePaths";
import MainButton from "../../../components/MainButton";
import Header from "../../../components/header";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { auth } from "../../../redux/features/authReducer";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../utilities/helpers";
import styles from "./style";

const FillOTP = ({ route, navigation }) => {
  const { emailParam } = route?.params;
  const { registerOtpVerifyLoading } = useSelector((state) => state.auth);
  const formikRef = useRef();
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(300);
  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const initialValues = {
    otp: "",
  };

  const otpSchema = Yup.object().shape({
    otp: Yup.string()
      .length(6, "OTP must be exactly 6 characters")
      .required("OTP is required"),
  });

  const handleFormSubmission = async (values) => {
    if (values?.otp != "") {
      let data = {
        email: emailParam != undefined && emailParam.trim(),
        otp: values?.otp,
      };

      dispatch(auth.registerOtpVerifyThread(data))
        .then((responseJson) => {
          if (responseJson?.payload?.success == true) {
            showSuccessMessage("User registered successfully");
            navigation.navigate("Login");
          } else if (responseJson?.payload?.success == false) {
            showErrorMessage(responseJson?.payload?.message);
          }
        })
        .catch((error) => {
          console.error(error);
          showErrorMessage(error.message);
        });
    }
  };

  const resendOTP = async () => {
    let data = {
      email: emailParam != undefined && emailParam.trim(),
      checkout: true,
    };

    dispatch(auth.resendOTPForRegisterationThread(data))
      .then((responseJson) => {
        if (responseJson?.payload?.success == true) {
          showSuccessMessage(responseJson?.payload?.message);
          setSeconds(300);
          // navigation.navigate("Login")
        } else if (responseJson?.payload?.success == false) {
          showErrorMessage(responseJson?.payload?.message);
        }
      })
      .catch((error) => {
        console.error(error);
        showErrorMessage(error.message);
      });
  };
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
            validationSchema={otpSchema}
            onSubmit={(values) => handleFormSubmission(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              setFieldTouched,
              values,
              errors,
              touched,
            }) => (
              <ScrollView style={styles.scrolViewWrapper}>
                <View style={styles.topBanner}>
                  <ImageWrapper
                    imagePath={imagePaths.loginTopVector}
                    maxWidth={"100%"}
                    maxHeight={89}
                  />
                  <View style={styles.headerRowAdjust}>
                    <Header
                      navigation={navigation}
                      centerLogo={true}
                      rightIcon={
                        <TouchableOpacity
                          style={{ paddingRight: 0 }}
                          onPress={() => navigation.navigate("LetStart")}
                        >
                          <Text style={styles.skipText}>Skip</Text>
                        </TouchableOpacity>
                      }
                      backIcon={true}
                    />
                  </View>
                </View>

                <View style={styles.loginContainer}>
                  <Text style={styles.usernameText}>
                    Hello Username, Welcome to Netcarbons!
                  </Text>
                  {emailParam != undefined && (
                    <View style={styles.rowWrap}>
                      <Text style={styles.contentLightText}>
                        Help us secure your account by verifying that{" "}
                      </Text>
                      <Text style={styles.contentDarkText}>{emailParam} </Text>
                      <Text style={styles.contentLightText}>
                        is your email.
                      </Text>
                    </View>
                  )}

                  <View style={{ marginTop: 20, marginBottom: 20 }}>
                    <Text style={styles.contentLightText}>
                      Please enter the six-digit code we have sent you in an
                      email, to verify and activate your account
                    </Text>
                  </View>

                  <View style={styles.otpWrapper}>
                    <OTPInputView
                      style={styles.otpInput}
                      keyboardType="numeric"
                      pinCount={6}
                      autoFocusOnLoad={false}
                      codeInputFieldStyle={styles.underlineStyleBase}
                      codeInputHighlightStyle={styles.underlineStyleHighLighted}
                      code={values.otp}
                      onCodeChanged={(code) => setFieldValue("otp", code)}
                    />
                  </View>
                  {errors.otp && touched.otp ? (
                    <Text style={styles.error}>{errors.otp}</Text>
                  ) : null}

                  <View style={styles.requestNewCodeWrapper}>
                    <View style={styles.requestNewWrap}>
                      <Text style={styles.contentLightText}>
                        You can request new code in:
                      </Text>
                      <Text style={styles.timerText}>
                        {`${minutes}:${
                          remainingSeconds < 10 ? "0" : ""
                        }${remainingSeconds}`}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.verifyButtonWrapper}>
                  <MainButton
                    title="Verify"
                    onPress={handleSubmit}
                    loader={registerOtpVerifyLoading}
                  />
                </View>

                <View
                  style={[
                    styles.requestNewCodeWrapper,
                    { marginTop: 20, marginBottom: 10 },
                  ]}
                >
                  <View style={styles.requestNewWrap}>
                    <Text style={styles.contentLightText}>
                      Didn’t get a code?{" "}
                    </Text>
                    <TouchableOpacity onPress={() => resendOTP()}>
                      <Text style={styles.resendText}>Click to Resend</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.pandaBottomRow}>
                  <ImageWrapper
                    imagePath={imagePaths.otpPandaVector}
                    maxWidth={240}
                    maxHeight={187}
                  />
                </View>
              </ScrollView>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default FillOTP;
