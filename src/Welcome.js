import { useAuthContext } from "./context/AuthContext";
import Loading from "./screens/Loading";
import { useEffect } from "react";
import axios from "axios";

const Welcome = ({ navigation }) => {
  const { authLoading, isLogged, userDetails } = useAuthContext();

  useEffect(() => {
    if (!authLoading) {
      console.log(userDetails);
      if (isLogged == "true") {
        if (userDetails?.role == 2) {
          const { is_verified, is_active } = userDetails;
          if (is_verified && is_active) {
            navigation.reset({ index: 0, routes: [{ name: "SellerTabs" }] });
          } else if (!is_verified) {
            navigation.reset({
              index: 0,
              routes: [{ name: "SellerVerificationScreen" }],
            });
          } else if (is_verified && !is_active) {
            navigation.reset({
              index: 0,
              routes: [{ name: "SellerPendingScreen" }],
            });
          }
        } else {
          navigation.reset({ index: 0, routes: [{ name: "BuyerTabs" }] });
          // navigation.replace("BuyerTabs");
        }
      } else {
        navigation.reset({ index: 0, routes: [{ name: "UserTypeScreen" }] });
        // navigation.navigate("UserTypeScreen");
      }
    }
  }, [authLoading]);

  if (authLoading) {
    return <Loading />;
  }

  return null;
};

export default Welcome;
