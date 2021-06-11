import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import machineLearning from "../utils/ml";

const Upload = ({ navigation }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      const a = await machineLearning(result.uri);
      console.log(a);
    }
  };

  return (
    <View
      style={{
        position: "relative",
        flex: 1,
        backgroundColor: "#1D256E",
      }}
    >
      <View
        style={{
          position: "relative",
          flex: 7.5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            position: "relative",
            width: "90%",
            height: "86%",
            backgroundColor: "white",
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: "80%", height: "50%", aspectRatio: 1/1 }}
            />
          ) : (
            <Text style={{ color: "black" }}>Pick an image</Text>
          )}
          {image ? (
            <View
              style={{
                position: "absolute",
                width: "100%",
                flexDirection: "row",
                justifyContent: 'space-around',
                height: 60,
                bottom: -30,
              }}
            >
              <TouchableOpacity
                style={{
                  width: "40%",
                  height: 55,
                  backgroundColor: "#FF7F2D",
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={pickImage}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 17,
                  }}
                >
                  Recognize
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "40%",
                  height: 55,
                  backgroundColor: "red",
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={pickImage}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 17,
                  }}
                >
                  Re-Upload
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={{
                position: "absolute",
                width: "70%",
                height: 60,
                backgroundColor: "#FF7F2D",
                bottom: -30,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={pickImage}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                }}
              >
                Upload
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Upload;
