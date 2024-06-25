import {Platform, StyleSheet} from "react-native";
import { Colors } from "../../../theme/colors";
import { Fonts } from "../../../theme/fonts";
import { dynamicSize } from "../../../utilities/helpers";
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Colors.white,
    },
    scrolViewWrapper:{
        flex: 1,
        backgroundColor:Colors.white
    },
    topBanner:{
        flexDirection:'column',
        height:89
    },
    calculateRowHeader:{
        paddingTop:Platform.OS =="ios" ? 60 :25,
        paddingHorizontal: dynamicSize(12, true)
    },
    headerRowAdjust:{
        position:'absolute',
        top:0,
        left:0,
        right:0
    },
    loginContainer:{
        flex:1,
        flexDirection:'column',
        paddingHorizontal: dynamicSize(12, true),
        paddingTop:Platform.OS =="ios" ? 30 :0
    },
    chooseAmountLabel:{
        fontSize:22,
        lineHeight:29.35,
        color:Colors.OFFBLACK,
        fontFamily:Fonts.medium
    },
    calculateVectorCenter:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:20
    },
    buyNowText:{
        fontSize:15,
        lineHeight:22.01,
        color:Colors.WHITE,
        fontFamily:Fonts.medium,
        borderWidth:1,
        borderColor:"transparent"
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 4,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontSize: 15,
        lineHeight:21,
        fontFamily:Fonts.regular,
        color:Colors.DARKGREY
    },
    selectedTextStyle: {
        fontSize: 15,
        lineHeight:21,
        fontFamily:Fonts.regular,
        color:Colors.OFFBLACK
    },
    iconStyle: {
       marginRight:5
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 15,
        lineHeight:21,
        fontFamily:Fonts.regular
    },
    calculateBanner:{
        flexDirection:'row',
        marginTop:20,
        backgroundColor:'#EDF8F5',
        // justifyContent:'space-between',
        alignItems:'center'
    },
    memberContainer:{
        flexDirection:'column',
        justifyContent:'center',
        paddingTop:20
    },
    memberText:{
        fontSize:15,
        lineHeight:21.94,
        color:Colors.SECONDARY,
        fontFamily:Fonts.regular,
        textAlign:'center'
    },
    slideContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:10,
        marginBottom:10
    },
    IncomeContainer:{
        alignItems: 'center',
    },
    tabsContainer: {
        paddingVertical:10,
        width: '100%',
    },
    tabStyle: {
        borderColor: 'transparent',
        backgroundColor: '#E0E0E0',
        paddingVertical: 10,
    },
    activeTabStyle: {
        backgroundColor: '#7BA986',
        // borderRadius:10
    },
    tabTextStyle: {
        color: '#000',
        fontSize:16,
        lineHeight:25.01,
        color:Colors.OFFBLACK,
        fontFamily:Fonts.medium
        // fontWeight: 'bold',
    },
    activeTabTextStyle: {
        color: '#fff',
    },
    selectedText: {
        marginTop: 16,
        fontSize: 16,
        lineHeight:25.01,
        color:Colors.OFFBLACK,
        fontFamily:Fonts.medium
    },
    continueButtonWrapper:{
        paddingTop:20,
        paddingBottom:20
    },
    labelLeft: {
        marginRight: 10,
        fontSize:14,
        lineHeight:17.12,
        color: Colors.OFFBLACK,
        fontFamily:Fonts.regular
    },
    progressBar: {
        flex: 1,
        marginHorizontal: 10,
    },
    progressText: {
        position: 'absolute',
        left: '47%',
        transform: [{ translateX: -10 }],
        fontSize:14,
        lineHeight:17.12,
        color: Colors.white,    
        fontFamily:Fonts.medium
    },
    labelRight: {
        marginLeft: 10,
        fontSize:14,
        lineHeight:17.12,
        color: Colors.OFFBLACK,
        fontFamily:Fonts.regular
    },
    totalCarbonsText:{
        fontSize:32,
        lineHeight:37.54,
        color: Colors.OFFBLACK,
        fontFamily:Fonts.medium,
        marginRight:10
    },
    annualText:{
        fontSize:15,
        lineHeight:21.94,
        color: Colors.OFFBLACK,
        fontFamily:Fonts.regular
    },
    carbonTextRow:{
        flexDirection:'row',
        justifyContent:'flex-start',
        paddingVertical:28
    },
    carbonRowLeft:{
        width:'40%',
        justifyContent:'center',
        alignItems:'flex-end'
    },
    carbonRowRight:{
        width:'60%'
    },
    carbonRowAdjustment:{
        position:'absolute',
        top:0,
        left:0,
        right:0
    },
    flexContainer:{
        // padding: 20,
        alignItems: 'center',
        marginBottom:10
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        color: '#757575',
    },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
      },
      sliderWrapper: {
        flex: 1,
        justifyContent: 'center',
        position: 'relative',
        height: 40,
      },
      slider: {
        width: "100%", height: 40,
        position:'relative'
      },
      sliderLabel: {
        fontSize:14,
        lineHeight:17.12,
        color: Colors.OFFBLACK,
        fontFamily:Fonts.regular,
        width: 30,
        textAlign: 'center',
      },
      thumb: {
        position: 'absolute',
        top: '40%',
        transform: [{ translateY: -10 }],
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8FB297',
        borderRadius: 20,
        // elevation: 3, // For shadow in Android
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.3,
        // shadowRadius: 2,
      },
      thumbText: {
        fontSize:14,
        lineHeight:17.12,
        color: Colors.OFFBLACK,
        fontFamily:Fonts.regular,
      },
      rowWrapper:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:-10
      }
   
   
});
