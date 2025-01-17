import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 50,
        fontWeight:'bold',
        padding: 20,
        fontFamily:'cursive',
        color: '#614444',
        backgroundColor: "#cffbff",
        borderWidth: 1
    },
    boxes: {
        borderWidth: 2,
        margin: 10,
        padding: 15,
        borderRadius: 10,
        borderColor: '#614444',
        backgroundColor: "#efd5d5"
    },
    textBox: {
        borderWidth: 1,
        padding: 12,
        backgroundColor: "white",
        borderColor: '#614444'
    }
});

let originalData =[];

const App = () => {
  const [mydata, setMydata] = useState([]);

  useEffect(() => {
    fetch("https://mysafeinfo.com/api/data?list=benandjerryflavors&format=json&case=default")
        .then((response)=>{
          return response.json();
        })
        .then((myJson)=>{
          if(originalData.length<1) {
            setMydata(myJson);
            originalData=myJson;
          }
        })
  }, []);

  const FilterData = (text) => {
    if(text!='') {
      let myFilteredData = originalData.filter((item) =>
          item.Flavor.toLowerCase().includes(text.toLowerCase()) ||
          item.Description.toLowerCase().includes(text.toLowerCase()));
      setMydata(myFilteredData);
    }
    else {
      setMydata(originalData);
    }
  }

  const renderItem = ({item, index}) => {
    return (
        <View style={styles.boxes}>
          <Text style={{fontSize: 16}}>{item.Flavor}</Text>
          <Text style={{fontSize: 12, paddingTop: 5}}>{item.Description}</Text>
        </View>
    );
  };

  return (
      <View style={{backgroundColor: "#d7ffc7", paddingBottom: 450}}>
        <Text style={styles.title}>Ben and Jerry</Text>
        <StatusBar/>
          <View style={{margin: 14}}>
            <Text style={{color: '#614444'}}>Search:</Text>
            <TextInput style={styles.textBox} placeholder="Search for your favorite flavors..." onChangeText={(text)=>{FilterData(text)}}/>
          </View>
        <FlatList data={mydata} renderItem={renderItem} />
      </View>
  );
}

export default App;
