import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

const headerImage = require('./assets/Barriguinha-mole.png');

export default function App() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [raiz1, setRaiz1] = useState('0');
  const [raiz2, setRaiz2] = useState('0');
  const [mensagemInfo, setMensagemInfo] = useState('');

  const validarEntradas = () => {
    if (a.trim() === '' || b.trim() === '' || c.trim() === '') {
      Alert.alert('Erro', 'Todos os campos (a, b, c) devem ser preenchidos.');
      return false;
    }
    const numA = parseFloat(a.replace(',', '.')); 
    const numB = parseFloat(b.replace(',', '.'));
    const numC = parseFloat(c.replace(',', '.'));

    if (isNaN(numA) || isNaN(numB) || isNaN(numC)) {
      Alert.alert('Erro', 'Por favor, insira números válidos para a, b e c.');
      return false;
    }
    if (numA === 0) {
      Alert.alert(
        'Erro',
        'O coeficiente "a" não pode ser zero em uma equação de 2º grau.'
      );
      return false;
    }
    return true;
  };

  const calcularRaizes = () => {
    if (!validarEntradas()) {
      setRaiz1('0');
      setRaiz2('0');
      setMensagemInfo('');
      return;
    }

    const valA = parseFloat(a.replace(',', '.'));
    const valB = parseFloat(b.replace(',', '.'));
    const valC = parseFloat(c.replace(',', '.'));


    const delta = valB * valB - 4 * valA * valC;

    if (delta < 0) {
      setRaiz1('N/A');
      setRaiz2('N/A');
    } else if (delta === 0) {
      const x = -valB / (2 * valA);
      setRaiz1(x.toFixed(2).replace('.', ','));
      setRaiz2(x.toFixed(2).replace('.', ','));
    } else {
      const x1 = (-valB + Math.sqrt(delta)) / (2 * valA);
      const x2 = (-valB - Math.sqrt(delta)) / (2 * valA);
      setRaiz1(x1.toFixed(2).replace('.', ','));
      setRaiz2(x2.toFixed(2).replace('.', ','));
    }
  };

  const limparCampos = () => {
    setA('');
    setB('');
    setC('');
    setRaiz1('0');
    setRaiz2('0');
    setMensagemInfo('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.safeArea}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image source={headerImage} style={styles.headerImage} resizeMode="contain" />
          <Text style={styles.headerTitle}>App Equação de 2º Grau</Text>
        </View>

        <Text style={styles.instructionText}>
          Entre com os valores nos campos abaixo:
        </Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#555"
            value={a}
            onChangeText={setA}
          />
          <Text style={styles.inputLabel}> X² + </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#555"
            value={b}
            onChangeText={setB}
          />
          <Text style={styles.inputLabel}> X + </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#555"
            value={c}
            onChangeText={setC}
          />
          <Text style={styles.inputLabel}> = 0</Text>
        </View>

        {mensagemInfo ? <Text style={styles.infoMessage}>{mensagemInfo}</Text> : null}

        <View style={styles.resultSection}>
          <Text style={styles.resultTextRaiz}>Raiz 1: {raiz1} </Text>
          <Text style={styles.resultTextRaiz}>Raiz 2: {raiz2}</Text>
        </View>

        <View style={styles.formulaSection}>
          <Text style={styles.formulaLabel}>Fórmula de Bhaskara</Text>
          <Text style={styles.formulaText}>$x = (-b \pm \sqrt(b^2 - 4ac)) / (2a)$</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.calcularButton]}
            onPress={calcularRaizes}
          >
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.limparButton]}
            onPress={limparCampos}
          >
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          copyright 2024 - Desenvolvido por Vitor Ferst Wosniak
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,   
  },
  container: {
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center', 
  },

  header: {
    backgroundColor: '#E57C24',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',

    width: '100%',
    marginBottom: 25,
    minHeight: 200,
  },
  headerImage: {
    width: 70, 
    height: 70, 
    marginRight: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20, 
    fontWeight: 'bold',
    flexShrink: 1,
  },
  instructionText: {
    color: '#000', 
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    width: '100%',
  },
  input: {
    backgroundColor: '#D9D9D9',
    color: '#000000',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 18,
    textAlign: 'center',
    width: 55,
    marginHorizontal: 3,
  },
  inputLabel: {
    color: '#000', 
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 4,
  },
  infoMessage: {
    color: '#FFD700', 
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 5,
  },
  resultSection: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    alignItems: 'center', 
    backgroundColor: '#FDE4BE',
    padding: 55, 
    width: '100%',
    marginBottom: 20,
  },
  resultTextRaiz: {
    color: '#333333',
    fontSize: 24,
    fontWeight: 'bold',

  },
  formulaSection: {
    backgroundColor: '#FDE4BE',
    width: '100%',
    padding: 55, 
    alignItems: 'center',
    marginBottom: 25,
  },
  formulaLabel: {
    color: '#E57C24',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  formulaText: {
    color: '#D66B13',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    width: '100%', 
    marginBottom: 30,
    paddingHorizontal: 10, 
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, 
    marginHorizontal: 5,
  },
  calcularButton: {
    backgroundColor: '#3478F6',
  },
  limparButton: {
    backgroundColor: '#E57C24',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#A0A0A0',
    fontSize: 12,
    textAlign: 'center',
    paddingBottom: 10, 
  },
});