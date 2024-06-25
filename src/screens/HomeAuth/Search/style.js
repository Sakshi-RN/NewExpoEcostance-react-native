import {StyleSheet} from "react-native";
import { Fonts } from "../../../theme/fonts";
import { responsiveFontSize, responsiveHeight,responsiveWidth } from 'react-native-responsive-dimensions';
import { Colors } from "../../../theme/colors";


export default StyleSheet.create({
  container: {
      flex: 1,
  },
  searchInput: {
marginHorizontal:responsiveWidth(5),
    height: responsiveHeight(6),
    borderColor: Colors.GREY,
    borderBottomWidth:1.5,
    fontSize: responsiveFontSize(2.2),
    fontFamily: Fonts.medium,
    color: Colors.BLACK,
    paddingHorizontal: responsiveWidth(2),
},

});
