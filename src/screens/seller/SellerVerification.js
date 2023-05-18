import React, { useState } from "react";
import { Box, Button, Circle, Image, Text } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, Alert, ToastAndroid } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Colors from "../../shared/theme/Colors";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";

const SellerVerification = ({ navigation }) => {
  const [image, setImage] = useState("");
  const { userDetails } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("seller_id", userDetails.id);
      formData.append("seller_image", {
        uri: image[0].uri,
        type: "image/jpeg",
        name: "image.jpg",
      });

      const response = await axios.post(`${BASE_URL}/seller/verify`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        transformRequest: (data, headers) => {
          return formData;
        },
      });

      // Handle the response from the server
      console.log(response.data);
      setLoading(false);
      ToastAndroid.show(
        "Registered successfully. Please wait for the administrator to activate your account",
        ToastAndroid.LONG
      );
      navigation.reset({ index: 0, routes: [{ name: "SellerPendingScreen" }] });
    } catch (error) {
      // Handle error
      setLoading(false);
      console.error(error);
      Alert.alert("Error", "Failed to upload image.");
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      //   allowsEditing: false,
      //   allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets);
    }
  };

  return (
    <Box flex={1} px={4} pt={8}>
      {!image ? (
        <TouchableOpacity onPress={pickImage}>
          <Box
            w={"90%"}
            borderWidth={2}
            borderStyle={"dashed"}
            h={"50%"}
            rounded={"lg"}
            borderColor={"gray.400"}
            justifyContent={"center"}
            alignItems={"center"}
            mx={"auto"}
          >
            <FontAwesome name="file-image-o" color={"gray"} size={40} />
            <Text mt={4} fontFamily={"Poppins_500Medium"} color={"gray.500"}>
              Upload your credentials here
            </Text>
          </Box>
        </TouchableOpacity>
      ) : (
        <Box w={"full"} h={"1/2"} position="relative">
          <TouchableOpacity onPress={pickImage}>
            <Image
              resizeMode="contain"
              source={{ uri: image[0].uri }}
              alt="image"
              w={"full"}
              h={"full"}
            />
          </TouchableOpacity>
          <Button
            bg={"white"}
            shadow={"md"}
            position="absolute"
            rounded={"full"}
            right={2}
            top={2}
            borderWidth={1}
            borderColor={"gray.400"}
            onPress={() => setImage("")}
          >
            <FontAwesome name="times" size={24} color={Colors.secondary} />
          </Button>
        </Box>
      )}
      <Button
        rounded={"full"}
        bg={Colors.secondary}
        isDisabled={!image}
        isLoading={loading}
        isLoadingText={"Uploading....."}
        onPress={handleSubmit}
      >
        <Text fontFamily={"Poppins_500Medium"} color={"white"}>
          Upload
        </Text>
      </Button>
    </Box>
  );
};

export default SellerVerification;
