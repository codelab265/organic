
import { useAuthContext } from "./context/AuthContext";
import Loading from "./screens/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import SellerTab from "./screens/seller/SellerTab";
import UserType from "./UserType";

const getScreen = (isLogged)=>{
  if (isLogged=="true") {
    return <SellerTab/>
  } else {
    return <UserType/>
  }
}

const Welcome = ({ navigation }) => {
  
  const { authLoading,isLogged } = useAuthContext();

  if (authLoading) {
    return <Loading />;
  }

  return getScreen(isLogged);

};

export default Welcome;
