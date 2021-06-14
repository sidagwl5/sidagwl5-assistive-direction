import React from "react";
import FileUpload from "../assets/images/upload.png";
import Result from "../assets/images/result.png";

// import all the components we are going to use
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";

//import AppIntroSlider to use it
import AppIntroSlider from "react-native-app-intro-slider";

const { width, height } = Dimensions.get("screen");
const App = ({ navigation }) => {
  const onDone = () => {
    navigation.push("upload");
  };
  const onSkip = () => {
    navigation.push("upload");
  };

  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: "center",
          justifyContent: "space-around",
          paddingBottom: 100,
        }}
      >
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        <Image style={styles.introImageStyle} source={item.image} />
        <View style={styles.introTextStyle}>
          <Text style={{ fontSize: 18 }}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const renderSkipButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={{ color: "#1b1b1b" }}>Skip</Text>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={{ color: "#1b1b1b" }}>Done</Text>
      </View>
    );
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={RenderItem}
      onDone={onDone}
      showSkipButton={true}
      onSkip={onSkip}
      renderNextButton={null}
      renderPrevButton={null}
      renderSkipButton={renderSkipButton}
      renderDoneButton={renderDoneButton}
    />
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, .1)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  titleStyle: {
    padding: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  paragraphStyle: {
    padding: 20,
    textAlign: "center",
    fontSize: 16,
  },
  introImageStyle: {
    width: width,
    flex: 3,
  },
  introTextStyle: {
    fontSize: 23,
    color: "black",
    textAlign: "center",
    paddingVertical: 30,
    flex: 1,
  },
  introTitleStyle: {
    flex: 2,
    justifyContent: "center",
    alignContent: "center",
    fontSize: 30,
    fontFamily: "sans-serif",
    top: 70,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
});

const slides = [
  {
    key: "s1",
    text: "Welcome!",
    title: "Road Assist",
    image: {
      uri: "https://cgaxisimages.fra1.cdn.digitaloceanspaces.com/2019/08/cgaxis_models_113_14a.jpg",
    },
    backgroundColor: "white",
  },
  {
    key: "s2",
    title: "Recognize",
    text: "Upload a File",
    image: FileUpload,
    backgroundColor: "white",
  },
  {
    key: "s3",
    title: "Classification",
    text: "Get Results",
    image: Result,
    backgroundColor: "white",
  },
];
