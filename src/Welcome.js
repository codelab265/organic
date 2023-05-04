import { useAuthContext } from "./context/AuthContext";
import Loading from "./screens/Loading";
import { useEffect } from "react";

const Welcome = ({ navigation }) => {
  const { authLoading, isLogged, userDetails } = useAuthContext();

  useEffect(() => {
    if (!authLoading) {
      if (isLogged == "true") {
        if (userDetails.role == 2) {
          navigation.navigate("SellerTabs");
        } else {
          navigation.navigate("BuyerTabs");
        }
      } else {
        navigation.navigate("UserTypeScreen");
      }
    }
  }, [authLoading, isLogged, userDetails, navigation]);

  if (authLoading) {
    return <Loading />;
  }

  return null;
};

export default Welcome;

