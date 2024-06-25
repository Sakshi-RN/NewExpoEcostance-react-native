import {StyleSheet} from "react-native";
import { Colors } from "../../../theme/colors";
import { Fonts } from "../../../theme/fonts";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
 
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND,
        padding:20
    },
    headerText: {
        fontFamily: Fonts.regular,
        fontSize: responsiveFontSize(2.5),
        color: Colors.OFFBLACK,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
  
});
