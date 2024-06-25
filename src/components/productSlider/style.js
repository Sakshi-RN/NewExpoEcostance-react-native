import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../../theme/colors'
import { Fonts } from '../../theme/fonts'
import { dynamicSize } from '../../utilities/helpers'
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    cardContainer:{
        flexDirection:'column',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },  
        elevation: 5,
        marginVertical:15,
        backgroundColor:Colors.WHITE
    },
    paginationActiveStyle:{
        width:30, 
        height:4,
        backgroundColor:Colors.WHITE
    },
    paginationInactiveStyle:{
        width:30, 
        height:4,
        backgroundColor:Colors.BLACK
    },
    productBrandBannerRow:{
        flexDirection:'row'
    },
    bannerAdjustment:{
        position:'absolute',
        bottom:35,
        right:10
    },
    headerAdjustment:{
        position:'absolute',
        top:0,
        left:0,
        right:0
    },
    standardWrapper:{
        width:50,
        height:50,
        marginLeft:5
    }
    
                    

    
})

export default styles
