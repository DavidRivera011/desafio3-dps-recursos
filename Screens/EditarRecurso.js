import { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, TextInput } from 'react-native';
import { updateRecurso } from '../services/api';

export default function EditarRecurso({ route, navigation }) {
  const recurso = route.params?.recurso;
  const [form, setForm] = useState({ ...recurso });

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleEditar = () => {
    if (!form.titulo || !form.descripcion || !form.tipo || !form.enlace || !form.imagen) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    updateRecurso(form.id, form)
      .then(() => {
        Alert.alert('¡Recurso actualizado!', 'El recurso se actualizó correctamente');
        navigation.navigate('Detalle', { id: form.id });
      })
      .catch(() => {
        Alert.alert('Error', 'No se pudo actualizar el recurso');
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
      <Button title="Actualizar Recurso" onPress={handleEditar} />
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
