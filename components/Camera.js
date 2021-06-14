import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";

export default function App({ setCamera, setImage }) {
  const ref = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const getPermissions = async () => {
    const { status } = await Camera.getPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const takePicture = async () => {
    if (ref.current) {
      let photo = await ref.current.takePictureAsync();

      if (photo) {
        setImage(photo.uri);
        setCamera();
      }
    }
  };

  const showContent = () => {
    switch (hasPermission) {
      case null:
      case false:
        return (
          <>
            <Text>No access to camera</Text>
            <TouchableOpacity
              style={{
                position: "relative",
                marginTop: 20,
                width: "70%",
                height: 60,
                backgroundColor: "#FF7F2D",
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={getPermissions}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                }}
              >
                GET PERMISSION
              </Text>
            </TouchableOpacity>
          </>
        );

      case true:
        return (
          <Camera ref={ref} style={styles.camera} type={type}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Text style={styles.text}> Flip </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  position: "relative",
                  width: "40%",
                  height: 50,
                  backgroundColor: "#FF7F2D",
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={takePicture}
              >
                <Text> CAPTURE </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        );
    }
  };
  return <View style={styles.container}>{showContent()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "90%",
    alignItems: "center",
    flexDirection: "row",
    margin: 20,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
