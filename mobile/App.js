import { ExpoRoot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

export function Layout({ children }) {
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />
      {children}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1628',
  },
});

export default function App() {
  return (
    <ExpoRoot context={require.context('../src/app')} />
  );
}
