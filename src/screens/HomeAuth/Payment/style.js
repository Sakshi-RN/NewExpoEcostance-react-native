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
    loginContainer:{
        flex:1,
        flexDirection:'column',
        paddingHorizontal: dynamicSize(12, true),
        paddingTop:Platform.OS =="ios" ? 30 :0
    },
    loginText:{
        fontSize:18,
        lineHeight:22.01,
        color:Colors.OFFBLACK,
        fontFamily:Fonts.medium
    },
    loginDescText:{
        fontSize:16,
        lineHeight:23.73,
        color:Colors.SECONDARY,
        fontFamily:Fonts.regular
    },
    labelText:{
        fontSize:16,
        lineHeight:25.01,
        color:Colors.OFFBLACK,
        fontFamily:Fonts.medium,
        marginBottom:10
    },
    inputWrapper:{
        paddingTop:30
    },
    loginButtonWrapper:{
        paddingHorizontal: dynamicSize(12, true),
        paddingTop:10,
        paddingBottom:10
    },
    loginButtonAdjustment:{
        position:'absolute',
        left:0,
        right:0,
        bottom:80
    },
    headerRowAdjust:{
        position:'absolute',
        top:0,
        left:0,
        right:0
    },
    termsRow:{
        flexDirection:'row',
        width:'100%',
        paddingTop:20,
        paddingBottom:20
    },
    termsLeft:{
        width:'20%',
        // justifyContent:'center',
        justifyContent:'flex-start',
        paddingTop:5
    },
    termsRight:{
        width:'80%',
        flexDirection:'column',
        justifyContent:'flex-end',
        alignItems:'flex-start'
    },
    termsText:{
        fontSize:16,
        lineHeight:25.01,
        color:Colors.OFFBLACK,
        fontFamily:Fonts.medium,
        marginTop:2,
        marginBottom:10
    },
    termsDescText:{
        fontSize:15,
        lineHeight:21.94,
        color:Colors.SECONDARY,
        fontFamily:Fonts.regular,
    },
    passwordStrengthRow:{
        paddingTop:15
    },
    cancelButtonText:{
        fontSize:18,
        lineHeight:22.01,
        color:Colors.OFFBLACK,
        fontFamily:Fonts.medium
    },
    checkoutCount:{
        fontSize:14,
        lineHeight:22.01,
        color:Colors.OFFBLACK,
        fontFamily:Fonts.medium
    },
    bottomSlideContainer:{
        flexDirection:'column',
        backgroundColor:'#F2F2F2',
        paddingHorizontal: dynamicSize(12, true),
        paddingTop:20,
        paddingBottom:10
    },
    couponRow:{
        flexDirection:'row',
        width:'100%'
    },
    couponInputWrapper:{
        width:'50%'
    },
    discountWrapper:{
        width:'50%',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:10
    },
    addCouponText:{
        fontSize:16,
        lineHeight:25.01,
        color:Colors.OFFBLACK,
        fontFamily:Fonts.medium
    },
    changeCurrencyButton:{
        flexDirection:'column',
        marginBottom:10
    },
    totalItemCountText:{
        fontSize:15,
        lineHeight:21.94,
        color:Colors.OFFBLACK,
        fontFamily:Fonts.medium,
        marginBottom:5
    },
    orderTotalText:{
        fontSize:15,
        lineHeight:21.94,
        color:Colors.OFFBLACK,
        fontFamily:Fonts.medium,
        marginBottom:10
    },
    discountText:{
        fontSize:15,
        lineHeight:21.94,
        color:'#7BA986',
        fontFamily:Fonts.medium,
        marginRight:10
    },
    deleteIcon:{
        width:45,
        height:45,
        backgroundColor:Colors.white,
        borderWidth:1,
        borderColor:"#B7323B",
        justifyContent:'center',
        alignItems:'center'
    },
    cartTotalText:{
        fontSize:15,
        lineHeight:21.94,
        color:Colors.OFFBLACK,
        fontFamily:Fonts.regular,
        marginBottom:5,
        marginTop:5
    },
    dotContainer:{
        flexDirection:'row',
        justifyContent:'center'
    },
    circleDot:{
        width:20,
        height:20,
        backgroundColor:Colors.OFFBLACK,
        borderRadius:10,
        marginRight:10
    },
    radioContainer: {
        marginBottom: 10
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.LIGHTGREYOFF
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.BLACK,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:Colors.WHITE
    },
    selectedCircle: {
        backgroundColor: Colors.BLACK,
        borderWidth: 4,
        borderColor: Colors.SECONDARY,
    },
    radioTextContainer: {
        flex: 1,
    },
    optionText: {
        fontSize: 15,
        lineHeight:21.94,
        color:Colors.SECONDARY,
        fontFamily:Fonts.regular
    },
    optionAmount: {
        fontSize: 16,
        lineHeight:25.01,
        color:Colors.OFFBLACK,
        fontFamily:Fonts.medium
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backButton: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        borderColor: Colors.BLACK,
        borderWidth: 1,
        paddingVertical: 15,
        alignItems: 'center',
        marginRight: 10,
    },
    payButton: {
        flex: 1,
        backgroundColor: Colors.BLACK,
        paddingVertical: 15,
        alignItems: 'center',
        marginLeft: 10,
    },
    buttonText: {
        color:Colors.WHITE,
        fontSize: 18,
        lineHeight:22.01,
        fontFamily:Fonts.medium
    },
    buttonWhiteText:{
        color:Colors.BLACK,
        fontSize: 18,
        lineHeight:22.01,
        fontFamily:Fonts.medium
    }
});
