import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TextInput,
  FlatList /* include other react native components here as needed */,
} from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
// FixMe: implement other components and functions used in SearchScreen here (don't just put all the JSX in SearchScreen below)
function SearchBar({ state, onChange, onSubmit }) {
  return (
    <View style={styles.background}>
      <Ionicons name="ios-search" style={styles.iconStyle} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder="Search"
        value={state.symbol}
        keyExtractor={state.symbol}
        onChangeText={onChange}
        onEndEditing={onSubmit}
      />
    </View>
  );
}

export default function SearchScreen({ navigation }) {
  const { ServerURL, addToWatchlist } = useStocksContext();
  const [state, setState] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(ServerURL)
      .then((res) => res.json())
      .then((state) => setState(state))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

    // FixMe: fetch symbol names from the server and save in local SearchScreen state
  }, [state]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.inp}>search for stocks</Text>
        {
          <SearchBar
            state={state}
            onChange={setState}
            onSubmit={() => setState(state)}
          />
        }

        <FlatList
          data={state}
          keyExtractor={(item) => item.symbol}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.inp}>
                {item.symbol}, {item.name}
              </Text>
            </View>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  // FixMe: add styles here ...
  // use scaleSize(x) to adjust sizes for small/large screens
  container: {
    flex: 1,
    marginTop: scaleSize.fontSize,
  },
  row: {
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  background: {
    marginTop: 10,
    backgroundColor: "#FFF",
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: "row",
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 15,
  },
  inp: {
    color: "#FFF",
    marginHorizontal: 15,
    marginTop: 10,
  },
});
