import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector } from 'react-redux'
import {
    View, 
    KeyboardAvoidingView, 
    Text, 
    Platform, 
    ScrollView
} from 'react-native'
import ImageWrapper from '../../../components/image'
import imagePaths from '../../../utilities/imagePaths'
import MainButton from '../../../components/MainButton'
import { Dropdown } from 'react-native-element-dropdown';
import { DropdownArrowIcon } from '../../../assets'
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { carbon } from '../../../redux/features/carbonReducer'
import { showErrorMessage, showSuccessMessage } from '../../../utilities/helpers'
import Slider from '@react-native-community/slider';
import { Colors } from '../../../theme/colors'
import { carbonType, exactCarbonValue } from '../../../utilities/helpers'
import styles from './style'
let carbonValue = "0";
let carbonEmissionValue = "";
let firstCarbonValue =  "";

const CalculateCarbonFootprint = (props) => {
    const {countriesLoading} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [country, setCountry] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [countryData, setCounryData] = useState([]);
    const [householdMemberValue, setHouseholdMemberValue] = useState(5); 
    const [publicMemberValue, setPublicMemberValue] = useState(5); 
    const [incomeValue, setIncomeValue] = useState(1); 
    const [houseSizeValue, setHouseSizeValue] = useState(1);
    const [airTravelValue, setAirTravelValue] = useState(1);
    const [meatConsumptionValue, setMeatConsumptionValue] = useState(1);
    const [carbonValueChange, setCarbonValueChange] = useState(false);


    useEffect(() => {
       getCountries()
    }, []);

    useEffect(() => {
       
        setCarbonValueChange(true)
    }, [householdMemberValue, publicMemberValue, incomeValue, houseSizeValue, airTravelValue, meatConsumptionValue]);

    const getCountries = async()=>{
        dispatch(carbon.getCountriesThread())
        .then((responseJson) => {
            if(responseJson?.payload?.success == true){
                if(responseJson?.payload?.data?.length > 0){
                    let data = responseJson?.payload?.data?.map(country => ({
                        id:country?.carbonCountryPerCapita,
                        label: `${country.entity} ${country?.carbonCountryPerCapita}`,
                        value: country.countryCode,
                        // carbonValue:country.carbonCountryPerCapita
                    }));

                    data.sort((a, b) => (a.label > b.label) ? 1 : -1)   
                    firstCarbonValue = data?.filter((item)=> item?.value == 'USA')
                    let countrySelected = firstCarbonValue[0];
                    setCountry(countrySelected?.value)
                    carbonValue = countrySelected?.id;
                    console.log("firstCarbonValue", firstCarbonValue)
                    setCounryData(data)
                }else{
                    setCounryData([])
                }
            }else {
                showErrorMessage(responseJson?.payload?.message)
            }
        })
        .catch((error) => {
            console.error(error);
            showErrorMessage(error.message)
        });
    }

    let household = householdMemberValue;
    let transport = publicMemberValue;
    let income = exactCarbonValue(incomeValue);
    let housesize = exactCarbonValue(houseSizeValue);
    let airtravel = exactCarbonValue(airTravelValue);
    let foodconsumption = exactCarbonValue(meatConsumptionValue);
    

    let lifeStyle =  income *  housesize * airtravel * foodconsumption;
    // console.log("lifeStyle", income, housesize, airtravel, foodconsumption, lifeStyle.toFixed(2))

    // Total emission= household * carbonCountryPerCapita - 0.15 *transport * carbonCountryPerCapita* lifeStyle;
    let totalEmission = household * carbonValue - 0.15 * transport * carbonValue * lifeStyle;
    // console.log("calculation:", household,`,`, carbonValue, `,`, transport, `,`, lifeStyle);
    

    carbonEmissionValue = totalEmission.toFixed(1);
    // console.log("totalEmission", carbonEmissionValue);
    
    
    const calculateCarbon = ()=>{
        if(householdMemberValue != "" && publicMemberValue != "" && incomeValue != "" && 
        houseSizeValue != "" && airTravelValue != "" && meatConsumptionValue != ""){

            let data ={
                "houseHoldMembers": householdMemberValue,
                "publicTransportationMembers":publicMemberValue,
                "income": carbonType(incomeValue),
                "houseSize": carbonType(houseSizeValue),
                "airTravel": carbonType(airTravelValue),
                "meatConsumption": carbonType(meatConsumptionValue),
                "totalCarbonEmissions": carbonEmissionValue,
                "countryCode": country
            }

            dispatch(carbon.saveCarbonCalculationThread(data))
            .then((responseJson) => {
                if(responseJson?.payload?.success == true){
                    showSuccessMessage(responseJson?.payload?.message)
                    props.navigation.navigate("Calculate", {carbonEmissionParam:carbonEmissionValue})
                }else {
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
                    <ScrollView style={styles.scrolViewWrapper}>
                        <View style={styles.topBanner}>
                            <ImageWrapper
                                imagePath={imagePaths.loginTopVector}
                                maxWidth={"100%"} maxHeight={Platform.OS == "ios" ? 89 :80}
                            />
                            <View style={styles.headerRowAdjust}>
                                <View style={styles.calculateRowHeader}>
                                    <Text style={styles.chooseAmountLabel}>Calculate my carbon footprint </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.loginContainer}>
                            <View style={styles.countryDropdownWrapper}>
                                {countryData && countryData?.length > 0 &&
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: Colors.OFFBLACK }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={countryData}
                                    // search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={!isFocus ? 'Select item' : '...'}
                                    searchPlaceholder="Search..."
                                    value={country}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        carbonValue = item?.id;
                                        setCountry(item.value);
                                        setIsFocus(false);
                                    }}
                                    renderRightIcon={() => (
                                        <View style={styles.iconStyle}>
                                            <DropdownArrowIcon/>
                                        </View>
                                    )}
                                />
                                }
                            </View>
                            
                            <View style={styles.calculateBanner}>
                                <View>
                                    <ImageWrapper
                                        imagePath={imagePaths.calculateBanner}
                                        maxWidth={100} maxHeight={100}
                                    />
                                </View>

                                <View style={styles.carbonRowAdjustment}>
                                    <View style={styles.carbonTextRow}>
                                        <View style={styles.carbonRowLeft}>
                                            <Text style={styles.totalCarbonsText}>
                                                {carbonEmissionValue !=""  ? carbonEmissionValue: carbonValue}
                                                {/* {carbonValueChange ? carbonValue : carbonEmissionValue} */}
                                            </Text>    
                                        </View>

                                        <View style={styles.carbonRowRight}>
                                            <Text style={styles.annualText}>
                                                My annual carbon footprint Metric tons of carbon
                                            </Text>
                                        </View>
                                    </View> 
                                </View>
                                
                            </View>

                            <View style={styles.memberContainer}>
                                
                                <View style={styles.flexContainer}>
                                    <Text style={styles.memberText}>Members in your household</Text> 
                                    <View style={styles.sliderContainer}>
                                        <Text style={styles.sliderLabel}>1</Text>
                                        <View style={styles.sliderWrapper}>
                                        <Slider
                                        style={styles.slider}
                                        minimumValue={1}
                                        maximumValue={10}
                                        step={1}
                                        value={householdMemberValue}
                                        onValueChange={(val) => setHouseholdMemberValue(val)}
                                        minimumTrackTintColor="#8FB297" // Color for the filled part
                                        maximumTrackTintColor="#E5E5E5" // Color for the unfilled part
                                        thumbTintColor="#8FB297" // Thumb color
                                        />
                                        {/* <View style={[styles.thumb, { left: `${(value - 1) / 9 * 100}%` }]}> */}
                                           <View style={styles.rowWrapper}>
                                                <Text style={styles.thumbText}>{householdMemberValue}</Text>
                                           </View>
                                        {/* </View> */}
                                        </View>
                                        <Text style={styles.sliderLabel}>10+</Text>
                                    </View>
                                </View>

                                <View style={styles.flexContainer}>
                                <Text style={styles.memberText}>Members using public transportation</Text> 
                                    <View style={styles.sliderContainer}>
                                        <Text style={styles.sliderLabel}>1</Text>
                                        <View style={styles.sliderWrapper}>
                                        <Slider
                                        style={styles.slider}
                                        minimumValue={1}
                                        maximumValue={5}
                                        step={1}
                                        value={publicMemberValue}
                                        onValueChange={(val) => setPublicMemberValue(val)}
                                        minimumTrackTintColor="#8FB297" 
                                        maximumTrackTintColor="#E5E5E5" 
                                        thumbTintColor="#8FB297" 
                                        />
                                        
                                        <View style={styles.rowWrapper}>
                                            <Text style={styles.thumbText}>{publicMemberValue}</Text>
                                        </View>
                                      
                                        </View>
                                        <Text style={styles.sliderLabel}>5</Text>
                                    </View>
                                </View>
                        
                                <View style={styles.IncomeContainer}>
                                    <Text style={styles.memberText}>Income 1.0</Text>
                                    <SegmentedControlTab
                                        values={['High', 'Medium', 'Low']}
                                        selectedIndex={incomeValue}
                                        onTabPress={(index)=> setIncomeValue(index)}
                                        tabsContainerStyle={styles.tabsContainer}
                                        tabStyle={styles.tabStyle}
                                        activeTabStyle={styles.activeTabStyle}
                                        tabTextStyle={styles.tabTextStyle}
                                        activeTabTextStyle={styles.activeTabTextStyle}
                                        borderRadius={20}
                                    />
                                    {/* <Text style={styles.selectedText}>
                                        Selected: {['High', 'Medium', 'Low'][selectedIndex]}
                                    </Text> */}
                                </View>

                                <View style={styles.IncomeContainer}>
                                    <Text style={styles.memberText}>House Size</Text>
                                    <SegmentedControlTab
                                        values={['High', 'Medium', 'Low']}
                                        selectedIndex={houseSizeValue}
                                        onTabPress={(index)=> setHouseSizeValue(index)}
                                        tabsContainerStyle={styles.tabsContainer}
                                        tabStyle={styles.tabStyle}
                                        activeTabStyle={styles.activeTabStyle}
                                        tabTextStyle={styles.tabTextStyle}
                                        activeTabTextStyle={styles.activeTabTextStyle}
                                        borderRadius={20}
                                    />
                                </View>

                                <View style={styles.IncomeContainer}>
                                    <Text style={styles.memberText}>Air Travel</Text>
                                    <SegmentedControlTab
                                        values={['High', 'Medium', 'Low']}
                                        selectedIndex={airTravelValue}
                                        onTabPress={(index)=> setAirTravelValue(index)}
                                        tabsContainerStyle={styles.tabsContainer}
                                        tabStyle={styles.tabStyle}
                                        activeTabStyle={styles.activeTabStyle}
                                        tabTextStyle={styles.tabTextStyle}
                                        activeTabTextStyle={styles.activeTabTextStyle}
                                        borderRadius={20}
                                    />
                                </View>

                                <View style={styles.IncomeContainer}>
                                    <Text style={styles.memberText}>Meat/Fish/Egg Consumption</Text>
                                    <SegmentedControlTab
                                        values={['High', 'Medium', 'Low']}
                                        selectedIndex={meatConsumptionValue}
                                        onTabPress={(index)=> setMeatConsumptionValue(index)}
                                        tabsContainerStyle={styles.tabsContainer}
                                        tabStyle={styles.tabStyle}
                                        activeTabStyle={styles.activeTabStyle}
                                        tabTextStyle={styles.tabTextStyle}
                                        activeTabTextStyle={styles.activeTabTextStyle}
                                        borderRadius={20}
                                    />
                                </View>

                                <View style={styles.continueButtonWrapper}>
                                    <MainButton
                                        title="Continue"
                                        onPress={()=> calculateCarbon()}
                                        loader={countriesLoading}
                                        // onPress={()=> props.navigation.navigate("Calculate")}
                                    />
                                </View>
                                

                            </View>
                
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </>
)}

export default CalculateCarbonFootprint
