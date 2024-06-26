import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, Modal, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import styles from "../../screens/HomeAuth/EditProfile/style";
import images from "../../theme/Images";

const ImagePickerComponent = ({ selectedImage, setSelectedImage }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openImageModal = () => setIsModalVisible(true);
  const closeImageModal = () => setIsModalVisible(false);

  useEffect(() => {
    (async () => {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (
        cameraPermission.status !== "granted" ||
        mediaLibraryPermission.status !== "granted"
      ) {
        alert("Permission to access camera or media library is required!");
      }
    })();
  }, []);

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const croppedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 400, height: 400 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );

      const file = {
        uri: croppedImage.uri,
        type: "image/jpeg",
        name: croppedImage.uri.split("/").pop(),
      };

      setSelectedImage(file);
    }
  };

  const handleTakePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const croppedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 400, height: 400 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );

      const file = {
        uri: croppedImage.uri,
        type: "image/jpeg",
        name: croppedImage.uri.split("/").pop(),
      };

      setSelectedImage(file);
    }
  };

  return (
    <TouchableOpacity onPress={openImageModal}>
      <Image
        source={
          selectedImage && selectedImage.uri
            ? { uri: selectedImage.uri }
            : images.uploadPic
        }
        style={{
          width: 100,
          height: 100,
          alignSelf: "center",
          borderRadius: 50,
        }}
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
