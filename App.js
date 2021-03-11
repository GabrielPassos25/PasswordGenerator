import React , {useState} from 'react';
import {Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, Alert} from 'react-native';
import Slider from '@react-native-community/slider'
import Clipboard from 'expo-clipboard'

let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890(@#"!^+%&/()=?_-<>#{[]}\|.:,;")'

export default function App() {
  const [password, setPassword] = useState('');
  const [size, setSize] = useState(5);
  
  function generatePass(){
    let pass = '';
    for(let i = 0, n = charset.length; i < size; i++){
        pass += charset.charAt(Math.floor(Math.random() * n))
    }

    setPassword(pass);
  }

  function copyPass(){
    if(password == ''){
      Alert.alert('Falha ao copiar!','Nenhuma senha gerada.')
    }
    else{
      Clipboard.setString(password)
      Alert.alert('Copiado com sucesso!','Texto copiado para área de transferência.')
    }
  }

  return (
      <View style = {styles.container}> 
        <View>
            <View style = {styles.navbar}>
              <Image
                source= {require('./src/assets/icon.png')}
                style={styles.logo}
              />
              <Text style={styles.title}>
                Gerador de Senhas
              </Text>
            </View>
            <Text style={styles.title2}>
              Escolha a quantidade de Caracteres
            </Text>
            <View style= {styles.screen}>
              <View style ={styles.area}>
                <Text style={styles.title3}>
                  Caracteres Mínimos: {size}
                </Text>
                <Slider
                  style={{height:50}}
                  minimumValue={5}
                  maximumValue={20}
                  minimumTrackTintColor = "#e8b92c"
                  value = {size}
                  onValueChange = {(valor) => setSize(valor.toFixed(0))}
                  />
              </View>
            </View>
            <View style={styles.screen}>
            <TouchableOpacity style= {styles.buttom} onPress={generatePass}>
              <Text style={styles.buttomText}>Gerar senha</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.screen}>
            {password !== '' && (
              <View style={styles.area}>
                <Text style={styles.title3}>
                  Senha gerada:
                </Text>
                <Text style={styles.password} onLongPress ={copyPass}> {password}</Text>
              </View>
            )}
          </View>
          <View>
            <Text style={{textAlign:'center', color:'#FFFCF0', marginTop:10}}>Para salvar a senha, basta apertar o botão abaixo</Text>
          </View>
          <View style = {{backgroundColor:"#e8b92c", alignItems:'center', width:'10%', height: '10%', justifyContent:'center', borderRadius:5, position:'absolute', bottom:'-15%', right:'45%'}}> 
          <TouchableOpacity onPress = {copyPass}>
            <Image 
              source = {require('./src/assets/save.png')}        
              style = {styles.save}
            />
          </TouchableOpacity>
        </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height*1.2,
    backgroundColor: '#434242',
  },
  navbar:{
    backgroundColor: '#343434',
    paddingTop:40,
    flexDirection:'row',
    justifyContent:'center',
    paddingBottom:10
  },
  logo:{
    width:55,
    height:60
  },
  title:{
    fontSize:20,
    fontWeight: 'bold',
    paddingTop:20,
    marginLeft:10,
    justifyContent:'center',
    alignItems:'center'
  },
  title2:{
    fontSize:18,
    fontWeight: 'bold',
    paddingTop:60,
    textAlign:'center',
    color:'#FFFCF0',
  },
  title3:{
    fontSize:18,
    fontWeight: 'bold',
    paddingTop:20,
    textAlign:'center',
    color:'#FFFCF0',
  },
  area:{
    marginTop:15,
    marginBottom: 15,
    backgroundColor: '#333634',
    width:'90%',
    borderRadius:7
  },
  buttom:{
    backgroundColor: "#e8b92c",
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:7,
    marginTop:10,
    marginBottom: 10
  },
  buttomText:{
    fontSize:20,
    fontWeight:'bold'
  },
  password:{
    padding:10,
    textAlign: 'center',
    fontWeight:'bold',
    color:'green'
  },
  screen:{
    alignItems:'center'
  },
  save:{
    width:30,
    height:30,
  }
});