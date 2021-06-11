import * as tf from "@tensorflow/tfjs";
import {
  fetch,
  decodeJpeg,
  bundleResourceIO,
} from "@tensorflow/tfjs-react-native";
import * as FileSystem from "expo-file-system";

// Get reference to bundled model assets
const modelJson = require("../assets/model/model.json");
const modelWeights = require("../assets/model/group1-shard1of1.bin");

// Use the bundleResorceIO IOHandler to load the model
const ml = async (uri) => {
  await tf.ready();
  const model = await tf.loadLayersModel(
    bundleResourceIO(modelJson, modelWeights)
  );

  const imgB64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;
  const raw = new Uint8Array(imgBuffer);

  let imageTensor = decodeJpeg(raw, 3);
  
  imageTensor = imageTensor.resizeNearestNeighbor([30,30]).toInt().expandDims();  
  const prediction = (await model.predict(imageTensor));
  
  console.log("boom");
  console.log("prediction: ", prediction);
  return prediction[0];
};

export default ml;

// const rgb = tf.tensor1d([0.2989, 0.587, 0.114]);
// const response = await fetch(uri, {}, { isBinary: true });
// const imageDataArrayBuffer = await response.arrayBuffer();
// const imageData = new Uint8Array(imageDataArrayBuffer);

// const imageTensor = decodeJpeg(imageData);

// imageTensor = tf
//   .sum(imageTensor.mul(rgb), 2)
//   .expandDims(2)
//   .expandDims()
//   .reshape([-1, 679, 451, 1]);