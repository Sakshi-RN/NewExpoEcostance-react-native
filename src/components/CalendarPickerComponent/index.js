import React, { useState } from "react";
import { Modal, View, TouchableWithoutFeedback } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import styles from "../../screens/HomeAuth/EditProfile/style";
import MainButton from "../MainButton";

const CalendarPickerComponent = ({
  isCalendarModalVisible,
  closeCalendarModal,
  onDateChange,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isCalendarModalVisible}
      onRequestClose={closeCalendarModal}
    >
      <TouchableWithoutFeedback onPress={closeCalendarModal}>
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
          <View style={{ padding: 20 }}>
            <MainButton title="Close" onPress={closeCalendarModal} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CalendarPickerComponent;
