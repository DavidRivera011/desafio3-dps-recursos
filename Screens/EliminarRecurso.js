import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { deleteRecurso } from '../service/api';

export default function EliminarRecurso({ route, navigation }) {
  const { recurso } = route.params;

  const handleEliminar = async () => {
    try {
      await deleteRecurso(recurso.id);
      Alert.alert('Eliminado', 'Recurso eliminado correctamente');
      navigation.navigate('Lista');
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el recurso');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        ¿Estás seguro que deseas eliminar este recurso?
      </Text>
      <Text style={styles.nombre}>{recurso.titulo}</Text>
      <Button
        title="Eliminar"
        color="red"
        onPress={handleEliminar}
      />
      <Button
        title="Cancelar"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 18, marginBottom: 12 },
  nombre: { fontSize: 22, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
});
