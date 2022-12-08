import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const navigation = useNavigation();

  const [input, setInput] = useState();
  const [nome, setNome] = useState();

  useEffect(()=>{
    async function pegarNomeStorage(){
      const value = await AsyncStorage.getItem('nome');
      if(value !== null){
        setNome(value);
      }
    }
    pegarNomeStorage();
  },[]);

  useEffect(()=>{
    async function gravaNomeStorage(){
      await AsyncStorage.setItem('nome', nome);
    }
    gravaNomeStorage();
  },[nome]);

  function gravaNome(){
    setNome(input);
    alert("Nome Registrado");
  }

  function limparNome(){
    setNome('');
  }
  if(nome == null || nome == ''){
    return(
      <View style={styles.container}> 
          <Text style={styles.titulo}>Digite seu nome gajo:</Text>

          <TextInput 
            style={styles.input}
            value={input}
            onChangeText={(texto)=>setInput(texto)}
          />
          <TouchableOpacity style={styles.botao}
              onPress={gravaNome}
          >
              <Text style={styles.textoBotao}> Salvar </Text>
          </TouchableOpacity>

          
      </View>
    );
  }else{
  return (

    <View style={styles.container}>

        <Text style={styles.titulo}>Seja Bem Vindo {nome}! </Text>
            <Text style={styles.titulo}>Escolha uma opção abaixo:</Text>
        <TouchableOpacity style={styles.botao}
              onPress={limparNome}
          >
              <Text style={styles.textoBotao}> MUDAR </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao}
            onPress={()=>navigation.navigate('Cadastro')}
        >
            <Text style={styles.textoBotao}> CADASTRO </Text>
        </TouchableOpacity>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titulo:{
      fontSize:30,
      textAlign:'center',
      marginTop:20,
      color: '#0072FF'
  },
  botao:{
    backgroundColor: '#0294E8',
    marginTop: 20,
    width: '80%',
    height: 40,
    marginLeft: '10%',
    borderBottomLeftRadius: 13,
    borderTopRightRadius: 13
  },
  textoBotao:{
      fontSize: 25,
      textAlign:'center',
      color: '#fff'
  },
  input:{
    marginTop: 25,
    borderBottomWidth: 2,
    width: 325,
    height: 35,
    fontSize: 20,
    borderColor: '#4281F5',
    marginLeft: 40
  },
  img: {
    width: 400,
        height: 230,
        margin: 5,
        textAlign: 'center',
        borderRadius: 20,
        alignSelf: 'center'
  }

});
