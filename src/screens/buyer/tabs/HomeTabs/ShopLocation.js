import { View, Text, Dimensions } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { Marker, Circle, Callout } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Button } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "../../../../shared/theme/Colors";

const ShopLocation = ({navigation}) => {
  const route = useRoute();

  const { longitude, latitude, storeName } = route.params;
  const origin = { latitude: 37.3318456, longitude: -122.0296002 };
  const destination = { latitude: 37.771707, longitude: -122.4053769 };
  const GOOGLE_MAPS_API_KEY = "AIzaSyD5oupGUsRySJ3bcL2yX73oLA7akhI8S40";

  return (
    <View style={styles.container}>
      <Button
        rounded={"full"}
        position={"absolute"}
        zIndex={1}
        top={4}
        left={4}
        bg={Colors.primary}
        shadow={3}
        borderWidth={1}
        borderColor={'white'}
        onPress={()=>navigation.goBack()}
      >
        <FontAwesome5 name="arrow-left" size={24} color={"white"} />
      </Button>
      <MapView
        style={styles.map}
        provider={MapView.PROVIDER_GOOGLE}
        initialRegion={{
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          }}
        ></Marker>
        <Circle
          center={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          }}
          radius={500}
          strokeWidth={3}
          strokeColor={"red"}
        />
      </MapView>
    </View>
  );
};

export default ShopLocation;
const styles = StyleSheet.create({
  map: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    position: "relative",
  },
});
