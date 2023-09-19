import { Camera, CameraType, FaceDetectionResult } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { styles } from "./styles";

import { useEffect, useState } from "react";

export function Home() {
  const [faceDetected, setFaceDetected] = useState(false);
  const [permission, requestePermision] = Camera.useCameraPermissions();
  const [faces, setFaces] = useState<any>();

  const faceValues = useSharedValue({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    requestePermision();
  }, []);

  const handleFAceDetected = ({ faces }: FaceDetectionResult) => {
    const face = faces[0] as any;

    if (face) {
      setFaces(face);
      const { size, origin } = face.bounds;

      faceValues.value = {
        width: size.width,
        height: size.height,
        x: origin.x,
        y: origin.y,
      };
      setFaceDetected(true);
    } else {
      setFaceDetected(false);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    position: "absolute",
    zIndex: 1,
    width: 10,
    height: 10,
    transform: [
      { translateX: faceValues.value.x },
      { translateY: faceValues.value.y },
    ],
    borderColor: "red",
    borderWidth: 3,
  }));

  return (
    <View style={styles.container}>
      {faceDetected && <Animated.View style={animatedStyle} />}
      <Camera
        style={styles.camera}
        type={CameraType.front}
        onFacesDetected={handleFAceDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detecLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 100,
          tracking: true,
        }}
      />
      <View style={styles.viewDetected}>
        <Text style={styles.textDetected}>
          {faceDetected ? "Detectado" : "Não encontrado"}
        </Text>
      </View>
      <View style={styles.viewData}>
        <Text>X: {faces?.bounds.origin.x}</Text>
        <Text>Y: {faces?.bounds.origin.y}</Text>
        <Text>Width: {faces?.bounds.size.width}</Text>
        <Text>Height: {faces?.bounds.size.height}</Text>
      </View>
    </View>
  );
}
