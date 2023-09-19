import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: 500,
    height: 500,
    backgroundColor: "#fff",
  },
  camera: {
    flex: 1,
    zIndex: 1,
  },
  viewDetected: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  viewData: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
    marginTop: 10,
  },
  textDetected: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 10,
    marginRight: 85,
    marginTop: 10,
  },
  textDefault: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000",
    padding: 10,
    marginTop: 10,
  },
});
