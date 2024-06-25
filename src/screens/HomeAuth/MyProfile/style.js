import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Colors } from '../../../theme/colors';
import { Fonts } from '../../../theme/fonts';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        paddingHorizontal: responsiveWidth(5),
    },
    logo: {
        width: responsiveWidth(30),
        height: responsiveHeight(10),
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: responsiveHeight(2),
    },
    headerText: {
        fontSize: responsiveFontSize(4),
        fontFamily: Fonts.medium,
        color: Colors.OFFBLACK,
        marginTop: responsiveHeight(2),
    },
    profileContainer: {
        alignItems: 'center',
        marginVertical: responsiveHeight(2),
        flexDirection: 'row',
        marginTop: responsiveHeight(4.5),

    },
    profileImage: {
        width: responsiveWidth(20),
        height: responsiveWidth(20),
        borderRadius: responsiveWidth(10),
        marginBottom: responsiveHeight(1),
    },
    profileName: {
        fontSize: responsiveFontSize(2.5),
        fontFamily: Fonts.medium,
        color: Colors.BLACK,
    },
    profileEmail: {
        fontSize: responsiveFontSize(2),
        fontFamily: Fonts.regular,
        color: Colors.GREY,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: responsiveHeight(5)
    },
    menuItemText: {
        fontSize: responsiveFontSize(2.2),
        fontFamily: Fonts.medium,
        color: Colors.BLACK,
        marginLeft: responsiveWidth(3),
        flex: 1,
    },
    badge: {
        width: responsiveWidth(6),
        height: responsiveWidth(6),
        borderRadius: responsiveWidth(3),
        backgroundColor: Colors.OFFBLACK,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        fontSize: responsiveFontSize(1.8),
        fontFamily: Fonts.medium,
        color: Colors.WHITE,
    },
    plusIcon: {
        fontSize: responsiveFontSize(5),
        fontFamily: Fonts.medium,
        color: Colors.WHITE,
    },
    floatingButton: {
        position: 'absolute',
        bottom: responsiveHeight(2),
        width: responsiveWidth(15),
        height: responsiveWidth(15),
        borderRadius: responsiveWidth(7.5),
        backgroundColor: Colors.OFFBLACK,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        right: responsiveWidth(5),
    },
    profileInfo: {
        width: responsiveWidth(70),
        paddingHorizontal: responsiveWidth(5),
    },
});
