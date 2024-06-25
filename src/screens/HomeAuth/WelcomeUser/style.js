import {Platform, StyleSheet} from "react-native";
import { Colors } from "../../../theme/colors";
import { Fonts } from "../../../theme/fonts";
import { dynamicSize } from "../../../utilities/helpers";
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Colors.white
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
        fontFamily:Fonts.medium,
        paddingLeft:20
    },
    subTitleText:{
        fontSize:16,
        lineHeight:23.73,
        color:Colors.OFFBLACK,
        fontFamily:Fonts.regular,
        marginTop:Platform.OS =="ios"  ? 20 :5,
        marginBottom:20,
        paddingLeft:20
    },
    logoWrapper:{
        position:'absolute',
        top:Platform.OS =="ios" ? 60:20,
        left:0,
        right:0
    },
    titleWrapper:{
        paddingHorizontal: dynamicSize(8, true),
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
    headerRowAdjust:{
        position:'absolute',
        top:0,
        left:0,
        right:0
    },
    rowbannerFirst:{
        flexDirection:'row',
        paddingBottom:20,
        paddingTop:30
    },
    rowbannerSecond:{
        flexDirection:'row',
        paddingBottom:20,
        paddingTop:10
    },
    ImageUploadRow:{
        flexDirection:'row',
        paddingLeft:15,
        marginTop:Platform.OS =="ios" ? -25 :-40
    },
    CameraUploadIconBox:{
        width:58,
        height:58,
        borderRadius:29,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:Colors.SECONDARY
    }
});
