import {StyleSheet} from "react-native";
import { Colors } from "../../../theme/colors";
import { Fonts } from "../../../theme/fonts";
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

export default StyleSheet.create({

    container: {
        flex: 1,
        // backgroundColor:Colors.WHITE
    },
    headerText: {
        fontFamily: Fonts.regular,
        fontSize: responsiveFontSize(2),
        marginTop: responsiveHeight(1),
        alignSelf: 'center'
    },
    metricContainer: {
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
        paddingVertical: responsiveHeight(4),
        marginTop: responsiveHeight(2),
    },
    metricValue: {
        color: Colors.OFFBLACK,
        fontFamily: Fonts.medium,
    },
    metricCaption: {
        color: Colors.SECONDARY,
        marginTop: responsiveHeight(3),
    },

});
