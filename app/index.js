import { useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter, Stack, useFocusEffect } from "expo-router";

export default function App() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    setLoading(true);

    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const products = await response.json();

      setProducts(products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  // useEffect(() => {
  //   loadProducts();
  // }, []);

  return (
    <SafeAreaView edges={["right", "top", "left"]}>
      <StatusBar style="auto" />
      <Stack.Screen
        options={{
          headerTitle: "Products",
          headerRight: () => (
            <Button
              title="Add"
              onPress={() => {
                router.push(`/products/new`);
              }}
            />
          ),
        }}
      />

      <View style={styles.body}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={products}
            refreshing={loading}
            onRefresh={() => loadProducts()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  router.push(`/products/${item.id}`);
                }}
              >
                <View style={styles.card}>
                  <Image style={styles.image} source={{ uri: item.image }} />
                  <View style={styles.textContainer}>
                    <Text
                      style={styles.title}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {item.title}
                    </Text>
                    <Text style={styles.description} numberOfLines={5}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
  },
  card: {
    margin: 8,
    padding: 16,
    flex: 1,
    backgroundColor: "#F8F8FF",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    margin: 8,
    borderRadius: 20,
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  textContainer: {
    marginStart: 16,
    width: "60%",
  },
  title: {
    fontSize: 16,
  },
  description: {
    marginTop: 8,
    fontSize: 12,
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
