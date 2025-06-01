import { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { deleteRecurso, getRecursos } from '../services/api';

export default function ListarRecursos({ navigation }) {
  const [recursos, setRecursos] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    cargarRecursos();
    const unsubscribe = navigation.addListener('focus', cargarRecursos);
    return unsubscribe;
  }, []);

  const cargarRecursos = () => {
    getRecursos()
      .then(resp => setRecursos(resp.data))
      .catch(() => Alert.alert("Error", "No se pudieron cargar los recursos."));
  };

  const buscarPorId = () => {
    if (!busqueda.trim()) return cargarRecursos();
    getRecursos()
      .then(resp => {
        const resultado = resp.data.filter(r => r.id === busqueda.trim());
        setRecursos(resultado);
      })
      .catch(() => Alert.alert("Error", "Error al buscar el recurso."));
  };

  const eliminar = (id) => {
    Alert.alert(
      "¿Eliminar recurso?",
      "¿Seguro que deseas eliminar este recurso?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: () => {
            deleteRecurso(id).then(cargarRecursos);
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Detalle', { id: item.id })}>
      <Image source={{ uri: item.imagen }} style={styles.imagen} />
      <View style={{ flex: 1 }}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.tipo}>{item.tipo}</Text>
        <Text numberOfLines={2} style={styles.descripcion}>{item.descripcion}</Text>
        <Text numberOfLines={1} style={styles.enlace}>{item.enlace}</Text>
      </View>
      <Button title="Eliminar" color="#d00" onPress={() => eliminar(item.id)} />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={styles.barraBusqueda}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por ID"
          value={busqueda}
          onChangeText={setBusqueda}
          keyboardType="numeric"
        />
        <Button title="Buscar" onPress={buscarPorId} />
        <Button title="Agregar" onPress={() => navigation.navigate('Agregar')} />
      </View>
      <FlatList
        data={recursos}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50 }}>No hay recursos</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  barraBusqueda: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    padding: 8,
    marginRight: 6,
    borderRadius: 5,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center',
    gap: 8,
  },
  imagen: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: '#EEE',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tipo: {
    fontStyle: 'italic',
    color: 'gray',
  },
  descripcion: {
    fontSize: 12,
  },
  enlace: {
    fontSize: 11,
    color: '#0066cc',
    marginTop: 4,
  },
});
