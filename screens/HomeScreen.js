import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the ReactPlayground</Text>
      <Text style={styles.subtitle}>
        Explore different React Native topics below.
      </Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('NavigationOverview')}
      >
        <Text style={styles.cardTitle}>Navigation Basics</Text>
        <Text style={styles.cardDescription}>
          Learn about moving between screens using React Navigation.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('FlexboxDemo')}
      >
        <Text style={styles.cardTitle}>Flexbox Demo</Text>
        <Text style={styles.cardDescription}>
          Experiment with boxes to learn about flexGrow, flexShrink, & more.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#EEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#212121',
  },
  cardDescription: {
    fontSize: 14,
    color: '#424242',
  },
});
