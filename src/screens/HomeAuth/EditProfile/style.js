import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Colors } from "../../../theme/colors";
import { Fonts } from "../../../theme/fonts";


export default StyleSheet.create({
    container: {
        flex: 1,
    },
    modalWrapper:
    {
        padding: 20,
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: 'row',
        backgroundColor: Colors.WHITE,
        paddingVertical: responsiveHeight(5)
    },

    content: {
        marginHorizontal: responsiveWidth(5),
        paddingBottom: responsiveHeight(10),
    },
    icon: {
        alignSelf: 'center',
        width: 100,
        height: 100,
        marginTop: responsiveHeight(2),
        borderRadius: 50,
        resizeMode:'contain'
    },
    dropdown: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
        height: responsiveHeight(8),
        marginVertical: 10,
        borderColor: Colors.lightgrey,
        borderWidth: 1.3,
    },
    placeholderStyle: {
        fontSize: 15,
        lineHeight: 21,
        fontFamily: Fonts.regular,
        color: Colors.DARKGREY
    },
    selectedTextStyle: {
        fontSize: 18,
        lineHeight: 21,
        fontFamily: Fonts.regular,
        color: Colors.OFFBLACK,

    },
    inputSearchStyle: {
        height: 40,
        fontSize: 15,
        lineHeight: 21,
        fontFamily: Fonts.regular,
        color: Colors.OFFBLACK
    },
    iconStyle: {
        marginRight: 5
    },
    inputContainer: {
        marginTop: responsiveHeight(2.5),
    },
    buttonContainer: {
        position: 'absolute',
        bottom: responsiveHeight(3),
        width: '100%',
        paddingHorizontal: responsiveWidth(5),
    },
    inputParent: {
        paddingVertical: responsiveHeight(5)
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    containerModal: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },

    label: {
        marginBottom: 5,
        fontSize: responsiveFontSize(2),
        color: Colors.OFFBLACK,
    },
    calendercContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});
