import React, {useEffect} from 'react';
import {useDispatch, useSelector } from 'react-redux'
import { View, Text, ActivityIndicator } from 'react-native';
import CommonHeader from '../../../components/HomeHeaders/CommonHeader';
import styles from './style';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { showErrorMessage } from '../../../utilities/helpers';
import { carbon } from '../../../redux/features/carbonReducer';

const MyDashboard = ({navigation}) => {
    const {metricsData, metricsLoading} = useSelector(state => state.carbon);
    const dispatch = useDispatch();
    useEffect(() => {
        getMetrics()
    }, []);

    const getMetrics = ()=>{
        dispatch(carbon.getCarbonMetricsThread())
        .then((responseJson) => {
            if(responseJson?.payload?.success == true){
    
            }else if(responseJson?.payload?.success == true){
                showErrorMessage(responseJson?.payload?.message)
            }
        })
        .catch((error) => {
            console.error(error);
            showErrorMessage(error.message)
        });
    }
 
    const handleBackPress = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.container}>
            <CommonHeader onBackPress={handleBackPress} />
            {metricsLoading ?
                <ActivityIndicator  size={"small"} color='#7BA986'/>
            :
            <>
                <Text style={styles.headerText}>
                    My Dashboard
                </Text>
                {metricsData?.ghgReduced == 0 ?
                    <MetricBlock value={`0 Metric Tons`} caption="Carbon Offsets Bought" fontSize={4} />
                :
                    <MetricBlock value={`${metricsData?.ghgReduced} Metric Tons`} caption="Carbon Offsets Bought" fontSize={4} />
                }

                {metricsData?.treesPlanted == 0 ?
                    <MetricBlock value={`0`} caption="Number of Trees" />
                :
                    <MetricBlock value={`${metricsData?.treesPlanted}`} caption="Number of Trees" />
                }

                {metricsData?.projectsSupportedCount == 0 ?
                    <MetricBlock value={`0`} caption="Number of Projects Supported" />
                :
                    <MetricBlock value={`${metricsData?.projectsSupportedCount}`} caption="Number of Projects Supported" />
                }
            </>
            }
        </View>
    );
};

const MetricBlock = ({ value, caption, fontSize }) => (
    <View style={styles.metricContainer}>
        <Text style={[styles.metricValue, { fontSize: responsiveFontSize(fontSize || 3) }]}>{value}</Text>
        <Text style={styles.metricCaption}>{caption}</Text>
    </View>
);



export default MyDashboard;
