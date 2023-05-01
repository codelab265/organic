import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  HStack,
  Input,
  Spinner,
  Text,
  VStack,
  Image,
  Center,
  FlatList,
  Flex,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { useAuthContext } from "../../../../context/AuthContext";
import { ScrollView } from "react-native";
import Colors from "../../../../shared/theme/Colors";
import { StatusBar } from "react-native";
import axios from "axios";
import EmptyImage from "../../../../assets/img/empty.png";
import ShopItem from "../../../components/buyer/ShopItem";

const Shops = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const Width = Dimensions.get("screen").width;
  const width = Width / 3 - 20;
  const [item, setItem] = useState("all");
  const [active, setActive] = useState(0);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getShops();
  }, [item]);


  const { categories } = useAuthContext();

  const getShops = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/buyer/shops?category_id=${item}`)
      .then((response) => {
        setLoading(false);
        setShops(response.data);
      })
      .catch((error) => {
        Alert.alert("Error", "Something went wrong");
      });
  };
  const handleClick = (id, index) => {
    setItem(id);
    setActive(index);
    console.log(index);
  };

  return (
    <Box flex={1} safeAreaTop>

      {/* search section */}
      <Box>
        <Box px={4} pt={2} bg={Colors.primary} roundedBottom={20}>
          {/*   */}

          <HStack mt={4}>
            <Box>
              <Box flexDirection={"row"}>
                <Text
                  fontSize={16}
                  fontFamily={"Poppins_400Regular"}
                  color={"white"}
                >
                  Hello Mphatso{" "}
                </Text>
              </Box>
              <Text
                fontSize={20}
                fontFamily={"Poppins_600SemiBold"}
                color={"white"}
              >
                What do you want today?
              </Text>
            </Box>
          </HStack>

          <HStack my={4}>
            <Box w={"full"}>
              <Input
                width="full"
                rounded={20}
                bg={"white"}
                paddingLeft={4}
                borderRadius={"lg"}
                placeholder={"Search for shop"}
                placeholderTextColor={"gray.400"}
                fontFamily={"Poppins_400Regular"}
                fontSize={"md"}
                value={search}
                onChangeText={(e) => setSearch(e)}
                InputRightElement={
                  <Box mr={3}>
                    <FontAwesome5 name="search" size={18} color="#86B084" />
                  </Box>
                }
              ></Input>
            </Box>
          </HStack>
        </Box>
      </Box>

      {/* category section */}
      <Box my={4} px={4}>
        <Text fontFamily={"Poppins_500Medium"} fontSize={"md"} mb={3}>
          Categories
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              handleClick("all", 0);
            }}
          >
            <Box
              rounded={10}
              h={39}
              w={39}
              backgroundColor={`${active === 0 ? "#70A57B" : "white"}`}
              justifyContent="center"
              alignItems={"center"}
              marginRight={2}
              style={{ elevation: 0.5 }}
            >
              <Text
                color={`${active === 0 ? "white" : "gray.500"}`}
                fontFamily={"Poppins_400Regular"}
              >
                All
              </Text>
            </Box>
          </TouchableOpacity>

          {categories.map((item, index) => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  handleClick(item.id, index + 1);
                }}
              >
                <Box
                  flex={"1"}
                  flexWrap="nowrap"
                  w={width}
                  h={100}
                  bg={`${active === index + 1 ? "#70A57B" : "white"}`}
                  px={2}
                  justifyContent="center"
                  rounded={"lg"}
                  marginRight={3}
                  style={{ elevation: 0.5 }}
                  overflow={"hidden"}
                >
                  <Text
                    color={`${active === index + 1 ? "white" : "gray.500"}`}
                    fontFamily={"Poppins_400Regular"}
                    isTruncated
                  >
                    {item.name}
                  </Text>
                </Box>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Box>

      {/* shops section */}
      <Box>
        <HStack
          px={4}
          justifyContent={"space-between"}
          mt={4}
          alignItems={"center"}
        >
          <Text
            fontFamily={"Poppins_500Medium"}
            color={Colors.primaryBlue}
            fontSize={"md"}
          >
            Available shops
          </Text>
          <TouchableOpacity>
            <Text fontFamily={"Poppins_400Regular"} color={Colors.primaryDark}>
              See all
            </Text>
          </TouchableOpacity>
        </HStack>
      </Box>
      <Box px={4} mt={3} flex={1} mb={85}>
        {loading && <Spinner size={"lg"} color={Colors.primaryDark} />}

        {!loading && shops.length === 0 ? (
          <Center p={10}>
            <Image
              source={EmptyImage}
              w={200}
              height={200}
              alt={"empty shop"}
            />
            <Text fontFamily={"Poppins_400Regular"} color={Colors.primary}>
              No shops available!!
            </Text>
          </Center>
        ) : (
          <Flex>
            <FlatList
              numColumns={2}
              renderItem={({item}) => <ShopItem item={item}  link={navigation} />}
              data={shops}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            
              
            />
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Shops;
