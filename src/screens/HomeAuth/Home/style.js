import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../../theme/colors";
import { Fonts } from "../../../theme/fonts";
import { dynamicSize } from "../../../utilities/helpers";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    topBanner: {
        backgroundColor: Colors.white,
        flex: 1
    },
    loginContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: Platform.OS == "ios" ? responsiveHeight(2) : 0
    },
    shoppingCartRow: {
        flexDirection: 'row',
        width:responsiveWidth(18),
        alignItems:'center',
        justifyContent:'center'

    },
    backgroundStyle: {
        height: responsiveHeight(10),
        paddingTop: responsiveHeight(2),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:responsiveWidth(5)


    },
    CartButton: {
        marginTop: responsiveHeight(3),
   
    },
    wishlistCartButton: {
        marginTop: responsiveHeight(3),
        marginRight:5

    },
    bottomRowAdjust: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
        // backgroundColor:Colors.OFFBLACK,
        // opacity:0.3
    },
    bottomButtonAdjust: {
        position: 'absolute',
        bottom: 30,
        right: 0
    },
    bottomRow: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        paddingHorizontal: dynamicSize(8, true),
    },
    plusIconWrapper: {
        width: 70,
        height: 70,
        backgroundColor: Colors.black,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35
    },
    percentIconButton: {
        width: 70,
        height: 70,
        backgroundColor: Colors.WHITE,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    crossIconButton: {
        width: 70,
        height: 70,
        backgroundColor: "#75B1DC",
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    }


});
