import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const quizQuestions = {
  '1': [
    {
      question: 'Apa kepanjangan dari K3?',
      options: ['Keselamatan Karyawan Kerja', 'Kesehatan dan Keselamatan Kerja', 'Kinerja dan Keselamatan Karyawan', 'Kerja, Kesehatan dan Keamanan'],
      answer: 'Kesehatan dan Keselamatan Kerja',
    },
    {
      question: 'Siapa yang bertanggung jawab atas K3 di tempat kerja?',
      options: ['Hanya manajer', 'Karyawan saja', 'Semua pihak', 'Tim HRD'],
      answer: 'Semua pihak',
    },
  ],
  '2': [
    {
      question: 'Langkah pertama dalam evakuasi darurat?',
      options: ['Lari tanpa arah', 'Menjaga barang pribadi', 'Tetap tenang dan ikuti jalur evakuasi', 'Tunggu perintah tertulis'],
      answer: 'Tetap tenang dan ikuti jalur evakuasi',
    },
  ],
  '3': [
    {
      question: 'Alat Pelindung Diri (APD) digunakan untuk?',
      options: ['Tampil rapi', 'Meningkatkan efisiensi kerja', 'Melindungi dari potensi bahaya', 'Mematuhi mode kerja'],
      answer: 'Melindungi dari potensi bahaya',
    },
  ],
  '4': [
    {
      question: 'Contoh bahaya fisik di tempat kerja?',
      options: ['Kabel listrik terbuka', 'Stres kerja', 'Gangguan jam kerja', 'Manajemen konflik'],
      answer: 'Kabel listrik terbuka',
    },
  ],
};

export default function QuizDetailScreen({ route, navigation }) {
  const { quizId } = route.params;
  const questions = quizQuestions[quizId] || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];

  const handleOptionPress = (option) => {
    const isCorrect = option === currentQuestion.answer;
    if (isCorrect) setScore(score + 1);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert(
        'Kuis Selesai',
        `Skor kamu: ${isCorrect ? score + 1 : score} dari ${questions.length}`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {currentIndex + 1}. {currentQuestion.question}
      </Text>
      {currentQuestion.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionButton}
          onPress={() => handleOptionPress(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.progress}>
        Soal {currentIndex + 1} dari {questions.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  optionButton: {
    backgroundColor: '#f1f1f1',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  progress: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
  },
});
