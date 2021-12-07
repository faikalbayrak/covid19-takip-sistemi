import React from "react";
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';


const Card = (props) => {
    
    return(
        <View style={[styles.container,{backgroundColor:props.color} ]}>
            <Image style={styles.image} source={props.image}/>

            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.description}>{props.description}</Text>
        </View>
    )
}
const deviceWidth = Math.round(Dimensions.get("window").width);
const deviceHeight = Math.round(Dimensions.get("window").height);
const styles = StyleSheet.create({
    container:{
        width:deviceWidth -25,
        marginTop:20,
        marginBottom:20,
        
        height:170,
        borderRadius: 20,
        shadowColor:'#000',
        shadowOffset:{
            width:5,
            height:5,
        },
        shadowOpacity:0.75,
        shadowRadius:5,
        elevation:9,
    },
    image:{
        height: 120,
        width: deviceWidth - 25,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        opacity: 0.9,
    },
    title:{
        fontSize:20,
        fontWeight: '800',
        paddingTop:10,
        paddingLeft:20,
        color:'#fff',
    },
    description:{
        fontSize:30,
        paddingLeft:200,
        paddingTop:125,
        position:"absolute",
        color:'#fff',
    }
})

export default Card;