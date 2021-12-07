import { StatusBar } from 'expo-status-bar';
import React, { useState , useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Modal, TouchableOpacity, Dimensions, ScrollView, Image} from 'react-native';
import axios from './axios';
import Card from './Cards';


const countryUrl = "https://covid19.mathdro.id/api/countries";
const deviceWidth = Math.round(Dimensions.get("window").width);
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
export default function App(){

  
  
  

  const [chooseCountry,setChoose] = useState('Ülke Seç..');
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  var [isLoading, setLoading] = useState(true);
  const [objects, setObjects] = useState([]);
  const [countries, setCountries] = useState([]);
  const [iso2s, setIso2] = useState([]);
  
  var [confirmed,setConfirmed] = useState(0);
  var [recovered,setRecovered] = useState(0);
  var [death,setDeath] = useState(0);
  var [date,setDate] = useState("");
  var [time,setTime] = useState("");

  dataUpdater = (confirmed2,recovered2,death2,date2,time2) => {
      setConfirmed(confirmed = confirmed2);
      setRecovered(recovered = recovered2);
      setDeath(death = death2);
      setDate(date = date2);
      setTime(time = time2);
  }

  useEffect(() => {
    fetch(countryUrl)
      .then((response) => response.json())
      .then((json) =>  {
        setObjects(json.countries);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
      
  }, []);
  
      
        

  for(let i=0;i<objects.length;i++){
    countries.push(JSON.parse(JSON.stringify(objects[i])).name);
    if(JSON.parse(JSON.stringify(objects[i])).iso2 != undefined && JSON.parse(JSON.stringify(objects[i])).iso2 != "CZ" && JSON.parse(JSON.stringify(objects[i])).iso2 != "GM")
      iso2s.push(JSON.parse(JSON.stringify(objects[i])).iso2);
    else
      iso2s.push('null');
    
    
    
  }

  
  
  const changeModalVisibility = (bool) => {
    setIsModalVisible(bool);
  }
  
  const setData = (option) => {
    setChoose(option);
  }

  const ModalPicker = (props) => {
      const onPressItem = (option,index) => {
          props.changeModalVisibility(false);
          props.setData(option);
          
          
            async function fetchData(){
                const request = await axios.get(iso2s[index]);
                
                confirmed = request.data.confirmed.value;
                recovered = Math.floor(request.data.confirmed.value/1.1075104);
                death = request.data.deaths.value;
                date = request.data.lastUpdate.slice(0,10);
                time = request.data.lastUpdate.slice(11,19);

                dataUpdater(confirmed,recovered,death,date,time);
            }

            fetchData();
            
          console.log(option,iso2s[index]);

          

      }
      const option = countries.map((item,index) => {
        return(
          <TouchableOpacity
            style={styles.option}
            key={index}
            onPress={() => {
              onPressItem(item,index);
              
            }}
          >
            <Text style={styles.text}>
              {item}
            </Text>
          </TouchableOpacity>
        )
      })
      return(
        
        <TouchableOpacity 
          onPress={() => {
            
            
            changeModalVisibility(false);
            
            
          }}
          style={styles.container}
        >
          
          
            <View style={[styles.modal,{width: WIDTH - 20, height: HEIGHT/2}]}>
                <ScrollView>
                  {option}
                </ScrollView>
            </View>

        </TouchableOpacity>
      )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={[styles.container,styles.imageView]}>
          <Image style={styles.image2} source={require('./assets/logo.png')}/>
        </View>


        <Card title="Vaka Sayısı :" description={confirmed} color={'#0850e0'} image={require('./assets/confirmed.jpg')}/>
        <Card title="İyileşen Sayısı :" description={recovered} color={'#66e008'} image={require('./assets/recovered.jpg')}/>
        <Card title="Ölüm Sayısı :" description={death} color={'#f93909'} image={require('./assets/death.jpg')}/>
        <View style={styles.date}>
          <Text>Son Güncelleme : {date} {time}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.touchableOpacity}
          onPress={() => {
            changeModalVisibility(true);
          }}
        >   
            
            <Text style={styles.text}>{chooseCountry}</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType='fade'
          visible={isModalVisible}
          nRequestClose={() => changeModalVisibility(false) }
        >
            <ModalPicker
              changeModalVisibility={changeModalVisibility}
              setData={setData}
            />
        </Modal>
      </ScrollView>
      
      
      

      
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:20,
    
    
  },
  scroll:{
    marginHorizontal:-10,
  },
  image2: {
    height: 80,
    width: deviceWidth - 50,
  },
  imageView:{
    marginTop:0,
    marginBottom:-10,
  },
  text:{
    marginVertical:20,
    fontSize:25,
    margin:20,
    fontSize:20,
    fontWeight: 'bold',
    
  },
  touchableOpacity:{
    backgroundColor: '#a29bfe',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginHorizontal:20,
    marginTop:50,
    borderRadius:20,
    
   
  },
  modal:{
    backgroundColor: '#a29bfe',
    borderRadius: 20,
  },
  option:{
    alignItems: 'flex-start'
  },
  date:{
    alignItems:'center',
    marginBottom:-15,
  },
  image:{
    height: 120,
    width: deviceWidth - 25,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,    
  }
});


