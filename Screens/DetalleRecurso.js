import { useEffect, useState } from 'react';
import { Alert, Button, Image, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { deleteRecurso, getRecurso } from '../services/api';

export default function DetalleRecurso({ route, navigation }) {
  const { id } = route.params;
  const [recurso, setRecurso] = useState(null);

  useEffect(() => {
    getRecurso(id)
      .then(resp => setRecurso(resp.data))
      .catch(() => Alert.alert("Error", "No se pudo cargar el recurso."));
  }, [id]);

  if (!recurso) return <Text style={{ textAlign: 'center', marginTop: 50 }}>Cargando...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: recurso.imagen }} style={styles.imagen} />
      <Text style={styles.titulo}>{recurso.titulo}</Text>
      <Text style={styles.tipo}>{recurso.tipo}</Text>
      <Text style={styles.descripcion}>{recurso.descripcion}</Text>
      <Text
        style={styles.enlace}
        onPress={() => Linking.openURL(recurso.enlace)}
      >
        {recurso.enlace}
      </Text>
      <View style={styles.botones}>
        <Button
          title="Editar"
          onPress={() => navigation.navigate('Editar', { recurso })}
        />
        <Button
          title="Eliminar"
          color="red"
          onPress={() => {
            Alert.alert(
              "¿Eliminar recurso?",
              "¿Seguro que deseas eliminar este recurso?",
              [
                { text: "Cancelar", style: "cancel" },
                {
                  text: "Eliminar",
                  style: "destructive",
                  onPress: () => {
                    deleteRecurso(id).then(() => navigation.navigate('Lista'));
                  },
                },
              ]
            );
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 20 },
  imagen: { width: 200, height: 200, borderRadius: 16, marginBottom: 12 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  tipo: { color: 'gray', marginBottom: 8 },
  descripcion: { textAlign: 'center', marginBottom: 8 },
  enlace: { color: '#0066cc', marginBottom: 12, textDecorationLine: 'underline' },
  botones: { flexDirection: 'row', gap: 16, justifyContent: 'center' },
});
