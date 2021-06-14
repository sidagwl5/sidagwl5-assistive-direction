import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import machineLearning from "../utils/ml";
import Dialog from "./Modal";
import Camera from "./Camera";

const Upload = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [camera, setCamera] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const getCamera = async () => {
    setCamera(true);
  };

  const getResults = async () => {
    setLoading(true);
    try {
      const a = await machineLearning(image);

      console.log(a);
      setResult(a);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (camera) {
    return (
      <Camera setImage={setImage} setCamera={setCamera.bind(this, null)} />
    );
  }

  return (
    <View
      style={{
        position: "relative",
        flex: 1,
        backgroundColor: "#1D256E",
      }}
    >
      {result ? (
        <Dialog result={result} setResult={setResult.bind(this, null)} />
      ) : (
        <>
          {loading && (
            <ActivityIndicator
              style={{
                width: "100%",
                height: "100%",
                zIndex: 4000,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                position: "absolute",
              }}
              size='large'
              color='orange'
            />
          )}
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
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 20,
                  top: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={getCamera}
              >
                <Text
                  style={{
                    color: "blue",
                    fontSize: 17,
                  }}
                >
                  Camera
                </Text>
              </TouchableOpacity>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: "80%", height: "50%", aspectRatio: 1 / 1 }}
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
                    justifyContent: "space-around",
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
                    onPress={getResults}
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
        </>
      )}
    </View>
  );
};

export default Upload;
