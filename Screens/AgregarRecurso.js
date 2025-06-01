import { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, TextInput } from 'react-native';
import { addRecurso } from '../services/api';

export default function AgregarRecurso({ navigation }) {
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    tipo: '',
    enlace: '',
    imagen: '',
  });

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleAgregar = () => {
    if (!form.titulo || !form.descripcion || !form.tipo || !form.enlace || !form.imagen) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    addRecurso(form)
      .then(() => {
        Alert.alert('¡Recurso agregado!', 'El recurso se agregó correctamente');
        navigation.navigate('Lista');
      })
      .catch(() => {
        Alert.alert('Error', 'No se pudo agregar el recurso');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Título"
        style={styles.input}
        value={form.titulo}
        onChangeText={text => handleChange('titulo', text)}
      />
      <TextInput
        placeholder="Descripción"
        style={styles.input}
        value={form.descripcion}
        onChangeText={text => handleChange('descripcion', text)}
      />
      <TextInput
        placeholder="Tipo (ej: libro, video, tutorial)"
        style={styles.input}
        value={form.tipo}
        onChangeText={text => handleChange('tipo', text)}
      />
      <TextInput
        placeholder="Enlace (URL)"
        style={styles.input}
        value={form.enlace}
        onChangeText={text => handleChange('enlace', text)}
      />
      <TextInput
        placeholder="Imagen (URL)"
        style={styles.input}
        value={form.imagen}
        onChangeText={text => handleChange('imagen', text)}
      />
      <Button title="Agregar Recurso" onPress={handleAgregar} />
      <Button title="Cancelar" color="#888" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 12,
  },
});
