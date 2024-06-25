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
    haveAnAccountWrapper:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop:40
    },
    accountText:{
        fontSize:16,
        lineHeight:23.73,
        color:Colors.SECONDARY,
        fontFamily:Fonts.regular,
        marginRight:10
    },
    registrationText:{
        fontSize:16,
        lineHeight:23.73,
        color:Colors.OFFBLACK,
        fontFamily:Fonts.medium
    },
    bottomLoginVector:{
        flexDirection:'column',
        marginTop:Platform.OS == "ios" ? 0 : -40
    },
    loginButtonWrapper:{
        paddingHorizontal: dynamicSize(12, true)
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
    error:{
        fontSize:15,
        lineHeight:23,
        color:Colors.RED,
        fontFamily:Fonts.medium,
        marginTop:5
    }
});
