import { useState } from "react";
import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { useRouter, Stack } from "expo-router";

const saveProduct = async ({ title, price, description }) => {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify({
        title,
        price,
        description,
        image: "https://i.pravatar.cc",
        category: "electronic",
      }),
    });
    const json = response.json();

    console.log(json);
  } catch (error) {
    console.error();
  } finally {
  }
};

export default function NewProduct() {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
  });
  const router = useRouter();

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "New Product",
          headerRight: () => (
            <Button
              title="Save"
              onPress={() => {
                saveProduct({
                  title: product.title,
                  price: product.price,
                  description: product.description,
                }).then(() => router.back());
              }}
            />
          ),
        }}
      />

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={product.title}
          onChangeText={(title) => setProduct({ ...product, title })}
          placeholder="Title"
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={product.price.toString()}
          onChangeText={(price) => setProduct({ ...product, price })}
          placeholder="Price"
        />
        <TextInput
          style={{ ...styles.input, height: 200 }}
          value={product.description}
          onChangeText={(description) =>
            setProduct({ ...product, description })
          }
          multiline={true}
          placeholder="Description"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  input: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
  },
});
