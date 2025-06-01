import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Ajusta los nombres según tus archivos en /Screens:
import AgregarRecurso from './Screens/AgregarRecurso';
import DetalleRecurso from './Screens/DetalleRecurso';
import EditarRecurso from './Screens/EditarRecurso';
import ListarRecursos from './Screens/ListarRecursos';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lista">
        <Stack.Screen
          name="Lista"
          component={ListarRecursos}
          options={{ title: 'Recursos Educativos' }}
        />
        <Stack.Screen
          name="Detalle"
          component={DetalleRecurso}
          options={{ title: 'Detalle del Recurso' }}
        />
        <Stack.Screen
          name="Agregar"
          component={AgregarRecurso}
          options={{ title: 'Agregar Recurso' }}
        />
        <Stack.Screen
          name="Editar"
          component={EditarRecurso}
          options={{ title: 'Editar Recurso' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
