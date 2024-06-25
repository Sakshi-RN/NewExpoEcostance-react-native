import {Platform, StyleSheet} from "react-native";
import { Colors } from "../../../theme/colors";
import { Fonts } from "../../../theme/fonts";
import { dynamicSize } from "../../../utilities/helpers";
export default StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection:'column',
        backgroundColor:Colors.white,
        // alignItems:'center',
        // justifyContent:'center',
        // paddingHorizontal: dynamicSize(15, true)
    },
    welcomeContainer:{
        flex:1, 
        flexDirection:'column', 
        justifyContent:'space-between'
    },
    centerWelcomeWrapper:{
        flexDirection:'column',
        alignItems:'center'
    },
    btnWrapper:{
        width:'100%',
        marginVertical:10,
        paddingBottom:Platform.OS =="ios" ? 20: 0,
        paddingHorizontal: dynamicSize(12, true),
    },
    titleText:{
        fontSize:32,
        lineHeight:40,
        color:Colors.OFFBLACK,
        fontFamily:Fonts.medium
    },
    subTitleText:{
        fontSize:16,
        lineHeight:23.73,
        color:Colors.SECONDARY,
        fontFamily:Fonts.regular,
        marginTop:Platform.OS =="ios"  ? 20 :5
    },
    logoWrapper:{
        position:'absolute',
        top:Platform.OS =="ios" ? 60:20,
        left:0,
        right:0
    },
    titleWrapper:{
        paddingHorizontal: dynamicSize(10, true),
    },
    carouselIconWrapper:{
        paddingTop:Platform.OS =="ios" ? 50 :40
    },
    headerRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal: dynamicSize(10, true),
    },
    onethreeText:{
        fontSize:16,
        lineHeight:23.73,
        color:Colors.OFFBLACK,
        fontFamily:Fonts.regular
    },
    skipText:{
        fontSize:16,
        lineHeight:23.73,
        color:Colors.OFFBLACK,
        fontFamily:Fonts.regular
    }
});
