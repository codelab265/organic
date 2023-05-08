import React, { createContext, useContext, useState, useEffect } from "react";
import { Keyboard } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState(null);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [granted, setGranted] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLogged, setIsLogged] = useState('');
  const [userDetails, setUserDetails] = useState([]);
  

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      } else {
        setGranted(true);
      }
    })();
  }, [location]);

  useEffect(() => {
    (async () => {
      const getLogin = await AsyncStorage.getItem("login");
      if (getLogin=="true") {
        setIsLogged('true');
        const data = await AsyncStorage.getItem("user");
        setUserDetails(JSON.parse(data));
        console.log('done');
      }
      
    })();
    getCategories();
  }, [isLogged]);

  useEffect(() => {
    (async () => {
      if (!granted) return;
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, [granted]);

  const getCategories = () => {
    axios
      .get(`${BASE_URL}/buyer/categories`)
      .then((response) => {
        setCategories(response.data);
        console.log(response.data);
        setAuthLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setAuthLoading(false);
      });
  };
  // signOut(auth);
  const handleError = (err) => {
    switch (err.code) {
      case "auth/invalid-email":
        setError("Invalid email address.");
        break;
      case "auth/wrong-password":
        setError("Invalid password.");
        break;
      case "auth/user-not-found":
        setError("Account not found.");
        break;
      default:
        setError("Something went wrong, please try again.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 3000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  const login = (email, password) => {
    // setAuthLoading(true);
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     // ...
    //   })
    //   .catch((error) => {
    //     handleError(error);
    //     setAuthLoading(false);
    //   });
  };

  const logout = () => {
    AsyncStorage.removeItem("user");
    AsyncStorage.removeItem("login");
    console.log(user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        isLogged,
        userDetails,
        error,
        location,
        categories,
        login,
        logout,
        setIsLogged
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
