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
        fontSize:28,
        lineHeight:37.54,
        color:Colors.OFFBLACK,
        fontFamily:Fonts.medium
    },
    calculateVectorCenter:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:20
    },
    productSelectedColumn:{
        flexDirection:'column',
        alignItems:'center',
        paddingTop:50
    },
    productSelectedText:{
        fontSize:18,
        lineHeight:22.01,
        color:Colors.OFFBLACK,
        fontFamily:Fonts.medium,
        marginBottom:10
    },
    productDescText:{
        fontSize:16,
        lineHeight:23.73,
        color:Colors.SECONDARY,
        fontFamily:Fonts.regular
    },
    bottomButtonRow:{
        flexDirection:'row',
        width:'100%',
        paddingTop:50
    },
    bottomRowLeft:{
        width:'49%'
    },
    bottomRowRight:{
        width:'49%'
    },
    chooseProductButton:{
        borderWidth:1,
        borderColor:Colors.OFFBLACK,
        padding:18,
        justifyContent:'center',
        alignItems:'center',
        marginRight:10
    },
    chooseProductText:{
        fontSize:14,
        lineHeight:22.01,
        color:Colors.OFFBLACK,
        fontFamily:Fonts.medium
    },
    buynowButton:{
        padding:18,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.BLACK
    },
    buyNowText:{
        fontSize:14,
        lineHeight:22.01,
        color:Colors.WHITE,
        fontFamily:Fonts.medium,
        borderWidth:1,
        borderColor:"transparent"
    }
   
   
});
