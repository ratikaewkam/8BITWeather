import React, { useState } from "react";
import { View, ImageBackground, Text, TextInput, Pressable, Image, StyleSheet } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

const bg = { uri: "https://raw.githubusercontent.com/ratikaewkam/8BITWeather/main/BITWeather/assets/background.png" };

const App = () => {
  const [text, setText] = useState('');
  const [data, setData] = useState({
    location: {
      name: "City",
      country: "Country",
    },
    current: {
      temp_c: 0,
      condition: {
        text: "Undefined",
        icon: "Undefined",
      },
      wind_kph: 0,
      pressure_mb: 0,
      humidity: 0,
      cloud: 0,
      feelslike_c: 0,
      uv: 0,
    }
  });

  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
    params: { q: text },
    headers: {
      'X-RapidAPI-Key': 'KEY',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  async function fechData() {
    let res = await axios.request(options);
    setData(res.data);
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.bg}>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>{data.location.name}, {data.location.country}</Text>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchRow}>
            <TextInput onChangeText={setText} value={text} placeholder={"Search"} placeholderTextColor={"#5D5D5D"} style={styles.searchBar} />
            <Pressable onPress={fechData} style={styles.searchBtn}>
              <EvilIcons name="search" size={30} />
            </Pressable>
          </View>
        </View>
        <View style={styles.dataContainerI}>
          <View style={styles.dataRowI}>
            <Image source={{ uri: `https:${data.current.condition.icon}` }} style={styles.icon} />
            <View style={styles.dataColI}>
              <Text style={styles.textDes}>{data.current.condition.text}</Text>
              <Text style={styles.temp}>{data.current.temp_c} °C</Text>
            </View>
          </View>
        </View>
        <View style={styles.dataContainerII}>
          <View style={styles.dataRowII}>
            <View>
              <View style={styles.object}>
                <FontAwesome6 name="temperature-three-quarters" size={20} color={"#007FFF"} />
                <Text style={styles.value}>{data.current.feelslike_c} °C</Text>
                <Text style={styles.title}>Feels like</Text>
              </View>
              <View style={styles.object}>
                <Ionicons name="water" size={20} color={"#007FFF"} />
                <Text style={styles.value}>{data.current.humidity}</Text>
                <Text style={styles.title}>Humidity</Text>
              </View>
              <View style={styles.object}>
                <FontAwesome6 name="cloud" size={20} color={"#007FFF"} />
                <Text style={styles.value}>{data.current.cloud}</Text>
                <Text style={styles.title}>Cloud</Text>
              </View>
            </View>
            <View>
              <View style={styles.object}>
                <FontAwesome6 name="fan" size={18} color={"#007FFF"} />
                <Text style={styles.value}>{data.current.wind_kph} km/h</Text>
                <Text style={styles.title}>Wind</Text>
              </View>
              <View style={styles.object}>
                <FontAwesome6 name="sun" size={20} color={"#007FFF"} />
                <Text style={styles.value}>{data.current.uv}</Text>
                <Text style={styles.title}>UV</Text>
              </View>
              <View style={styles.object}>
                <Ionicons name="speedometer" size={20} color={"#007FFF"} />
                <Text style={styles.value}>{data.current.pressure_mb} hPa</Text>
                <Text style={styles.title}>Air pressure</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
  },
  locationContainer: {
    paddingTop: 60,
    paddingLeft: 25,
    paddingRight: 25
  },
  locationText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold"
  },
  searchContainer: {
    margin: 25,
    width: "auto",
    borderRadius: 25,
    backgroundColor: "#282828",
  },
  searchRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  searchBar: {
    width: "75%",
    height: "auto",
    paddingLeft: 25,
    borderRadius: 25,
    color: "#FFFFFF",
    backgroundColor: "#282828",
    fontSize: 16
  },
  searchBtn: {
    width: "23.5%",
    height: 40,
    borderRadius: 25,
    backgroundColor: "#007FFF",
    justifyContent: "center",
    paddingBottom: 5,
    alignItems: "center"
  },
  dataContainerI: {
    margin: 25,
    width: "auto",
    height: 140,
    borderRadius: 25,
    backgroundColor: "#282828",
  },
  dataRowI: {
    margin: 25,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  dataColI: {
    flexDirection: 'col',
    flexWrap: 'wrap'
  },
  icon: {
    width: 80,
    height: 80,
    marginRight: 50
  },
  textDes: {
    color: "white",
    fontSize: 18,
    fontWeight: "500"
  },
  temp: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold"
  },
  dataContainerII: {
    margin: 25,
    width: "auto",
    height: 375,
    borderRadius: 25,
    backgroundColor: "#282828",
  },
  dataRowII: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  object: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  value: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    marginTop: 10
  },
  title: {
    color: "white",
    fontSize: 14,
    marginTop: 5
  }
});

export default App;