import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Stack, useGlobalSearchParams } from "expo-router";

const ProductDetails = ({ route }) => {
  const { id } = useGlobalSearchParams();

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "Product details",
        }}
      />

      <View>
        <Text>{id}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;
