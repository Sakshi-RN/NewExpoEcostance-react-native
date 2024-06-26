import React, { useState } from 'react';
import { TouchableOpacity, Image, Modal, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../../screens/HomeAuth/EditProfile/style';
import images from '../../theme/Images';



const ImagePickerComponent = ({ selectedImage, setSelectedImage }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openImageModal = () => setIsModalVisible(true);
  const closeImageModal = () => setIsModalVisible(false);

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result);
    }
    closeImageModal();
  };

  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result);
    }
    closeImageModal();
  };

  return (
    <TouchableOpacity onPress={openImageModal}>
      <Image
        source={
          selectedImage && selectedImage.uri
            ? { uri: selectedImage.uri }
            : images.uploadPic
        }
        style={{width:100,height:100,alignSelf:'center',borderRadius:50}}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeImageModal}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPressOut={closeImageModal}
        >
          <View style={styles.modalWrapper}>
            <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
              <Image source={images.CaptureImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
              <Image source={images.selectImage} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </TouchableOpacity>
  );
};

export default ImagePickerComponent;
