import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const quizData = [
  {
    id: '1',
    title: 'Dasar-dasar K3',
    description: 'Uji pemahaman dasar tentang keselamatan kerja.',
  },
  {
    id: '2',
    title: 'Prosedur Evakuasi Darurat',
    description: 'Kenali langkah-langkah dalam situasi darurat.',
  },
  {
    id: '3',
    title: 'Alat Pelindung Diri (APD)',
    description: 'Evaluasi pemahaman tentang penggunaan APD.',
  },
  {
    id: '4',
    title: 'Bahaya di Tempat Kerja',
    description: 'Identifikasi dan mitigasi bahaya di lingkungan kerja.',
  },
];

export default function QuizScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kuis Keselamatan dan Kesehatan Kerja (K3)</Text>
      <FlatList
        data={quizData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.quizItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('QuizDetailScreen', { quizId: item.id })}
            >
              <Text style={styles.buttonText}>Mulai</Text>
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  quizItem: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#222',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#28A745',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
