import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, Alert  } from 'react-native';
import firebase from '../config/firebase';

export default function Cadastro() {
    const [nome, setNome] = useState();
    const [cargo, setCargo] = useState();
    const [key, setKey] = useState();

    async function cadastrar(){
        if(nome !== '' && cargo !== ''){
            let usuarios = await firebase.database().ref('usuarios');
            let chave = usuarios.push().key;

            usuarios.child(chave).set({
                nome: nome,
                cargo: cargo
            });

            setNome('');
            setCargo('');

            Alert.alert("CADASTRO REALIZADO", "INFORMAÇÕES CADASTRADAS COM SUCESSO", [
                
                { text: "OK" },
              ]);
        }
    }

    async function buscar(){
        if(nome !== ''){
            await firebase.database().ref('usuarios').on('value', (snapshot)=>{
                snapshot.forEach((childItem)=>{
                    if(childItem.val().nome == nome){
                        setCargo(childItem.val().cargo);
                        setKey(childItem.key);
                    }
                })
            });
        }
    }

    async function alterar(){
        if(nome !== '' && cargo !== '' && key !== ''){
           await firebase.database().ref('usuarios').child(key).set({
                nome: nome,
                cargo: cargo
            });

            setNome('');
            setCargo('');
            setKey('');

            Alert.alert("CADASTRO ALTERADO", "INFORMAÇÕES ALTERADAS COM SUCESSO", [
                
                { text: "OK" },
              ]);
        }
    }

    async function deletar(){
        if(key !== ''){
            await firebase.database().ref('usuarios').child(key).remove();
            setNome('');
            setCargo('');
            setKey('');

            Alert.alert("CADASTRO DELETADO", "INFORMAÇÕES DELETADAS COM SUCESSO", [
                
                { text: "OK" },
              ]);
        }
    }

  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>CADASTRO</Text>

        <Text style={styles.texto}>NOME:</Text>
        <TextInput 
            style={styles.input}
            value={nome}
            onChangeText={(texto)=>setNome(texto)}
        />   

        <Text style={styles.texto}>CARGO:</Text>
        <TextInput 
            style={styles.input}
            value={cargo}
            onChangeText={(texto)=>setCargo(texto)}
        />  

        <TouchableOpacity style={styles.botao} onPress={cadastrar}>
            <Text style={styles.textoBotao}>INSERIR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={buscar}>
            <Text style={styles.textoBotao}>BUSCAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={alterar}>
            <Text style={styles.textoBotao}>ALTERAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={deletar}>
            <Text style={styles.textoBotao}>DELETAR</Text>
        </TouchableOpacity>



    </View>
  );
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
      color: '#4281F5'
  },
  botao:{
    backgroundColor: '#4281F5',
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
        
        borderBottomWidth: 2,
        width: 325,
        height: 35,
        fontSize: 20,
        borderColor: '#4281F5',
        marginLeft: 40
      },
    texto:{
        marginTop: 10,
        fontSize:20,
        marginLeft: 40,
        color: '#4281F5'
    }

});