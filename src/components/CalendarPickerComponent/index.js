import React from 'react';
import { Modal, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import styles from '../../screens/HomeAuth/EditProfile/style';


const CalendarPickerComponent = ({ isCalendarModalVisible, closeCalendarModal, onDateChange }) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isCalendarModalVisible}
      onRequestClose={closeCalendarModal}
    >
      <View style={styles.calendercContainer}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={false}
          minDate={new Date()}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={onDateChange}
        />
      </View>
    </Modal>
  );
};

export default CalendarPickerComponent;