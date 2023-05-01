import { Box, Spinner, Text } from "native-base";
import React from "react";
import Colors from "../shared/theme/Colors";

const Loading = () => {
  return (
    <Box
      bg="white"
      flex={1}
      justifyContent={"center"}
      alignItems={"center"}
    >
        <Spinner size={'lg'} color={Colors.primary}/>
        <Text fontFamily={'Poppins_600SemiBold'} mt={4}>Setting up..</Text>
    </Box>
  );
};

export default Loading;
