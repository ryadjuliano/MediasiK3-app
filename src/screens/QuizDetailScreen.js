import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Alert,
  Animated,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const quizQuestions = {
  '1': [
    {
      id: 1,
      question: 'Apa kepanjangan dari K3?',
      options: [
        'Keselamatan Karyawan Kerja',
        'Kesehatan dan Keselamatan Kerja',
        'Kinerja dan Keselamatan Karyawan',
        'Kerja, Kesehatan dan Keamanan'
      ],
      answer: 'Kesehatan dan Keselamatan Kerja',
      explanation: 'K3 adalah singkatan dari Keselamatan dan Kesehatan Kerja, yang merupakan upaya untuk menciptakan lingkungan kerja yang aman dan sehat.',
      category: 'Dasar K3',
      difficulty: 'Mudah'
    },
    {
      id: 2,
      question: 'Siapa yang bertanggung jawab atas K3 di tempat kerja?',
      options: [
        'Hanya manajer',
        'Karyawan saja',
        'Semua pihak',
        'Tim HRD'
      ],
      answer: 'Semua pihak',
      explanation: 'Keselamatan dan kesehatan kerja adalah tanggung jawab bersama semua pihak, mulai dari manajemen hingga pekerja.',
      category: 'Tanggung Jawab',
      difficulty: 'Mudah'
    },
    {
      id: 3,
      question: 'Apa tujuan utama dari penerapan K3?',
      options: [
        'Meningkatkan produktivitas saja',
        'Mencegah kecelakaan dan penyakit akibat kerja',
        'Menghemat biaya operasional',
        'Memenuhi persyaratan administratif'
      ],
      answer: 'Mencegah kecelakaan dan penyakit akibat kerja',
      explanation: 'Tujuan utama K3 adalah melindungi pekerja dari risiko kecelakaan dan penyakit akibat kerja.',
      category: 'Tujuan K3',
      difficulty: 'Mudah'
    }
  ],
  '2': [
    {
      id: 1,
      question: 'Langkah pertama dalam evakuasi darurat?',
      options: [
        'Lari tanpa arah',
        'Menjaga barang pribadi',
        'Tetap tenang dan ikuti jalur evakuasi',
        'Tunggu perintah tertulis'
      ],
      answer: 'Tetap tenang dan ikuti jalur evakuasi',
      explanation: 'Dalam situasi darurat, langkah pertama adalah tetap tenang dan mengikuti jalur evakuasi yang telah ditentukan.',
      category: 'Prosedur Darurat',
      difficulty: 'Sedang'
    }
  ],
  '3': [
    {
      id: 1,
      question: 'Alat Pelindung Diri (APD) digunakan untuk?',
      options: [
        'Tampil rapi',
        'Meningkatkan efisiensi kerja',
        'Melindungi dari potensi bahaya',
        'Mematuhi mode kerja'
      ],
      answer: 'Melindungi dari potensi bahaya',
      explanation: 'APD adalah peralatan yang dirancang khusus untuk melindungi pekerja dari berbagai potensi bahaya di tempat kerja.',
      category: 'APD',
      difficulty: 'Mudah'
    }
  ],
  '4': [
    {
      id: 1,
      question: 'Contoh bahaya fisik di tempat kerja?',
      options: [
        'Kabel listrik terbuka',
        'Stres kerja',
        'Gangguan jam kerja',
        'Manajemen konflik'
      ],
      answer: 'Kabel listrik terbuka',
      explanation: 'Kabel listrik terbuka merupakan contoh bahaya fisik yang dapat menyebabkan risiko sengatan listrik atau kebakaran.',
      category: 'Identifikasi Bahaya',
      difficulty: 'Sedang'
    }
  ]
};

export default function QuizDetailScreen({ route, navigation }) {
  const { quizId, quizData } = route.params;
  const questions = quizQuestions[quizId] || [];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes in seconds
  const [quizStarted, setQuizStarted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  
  // Animations
  const progressAnimation = new Animated.Value(0);
  const fadeAnimation = new Animated.Value(1);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  useEffect(() => {
    // Animate progress bar
    Animated.timing(progressAnimation, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentIndex]);

  useEffect(() => {
    // Start timer when quiz starts
    if (quizStarted && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      handleQuizComplete();
    }
  }, [timeRemaining, quizStarted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Mudah': return '#10b981';
      case 'Sedang': return '#f59e0b';
      case 'Sulit': return '#ef4444';
      default: return '#94a3b8';
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleOptionPress = (option, optionIndex) => {
    if (selectedOption !== null) return; // Prevent multiple selections
    
    setSelectedOption(optionIndex);
    const isCorrect = option === currentQuestion.answer;
    
    if (isCorrect) {
      setScore(score + 1);
      setCorrectAnswers([...correctAnswers, currentIndex]);
    }
    
    setUserAnswers([...userAnswers, { questionIndex: currentIndex, answer: option, isCorrect }]);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    Animated.sequence([
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    const finalScore = Math.round((score / questions.length) * 100);
    const grade = finalScore >= 80 ? 'Lulus' : 'Tidak Lulus';
    
    Alert.alert(
      'Quiz Selesai!',
      `Skor Anda: ${finalScore}/100\nStatus: ${grade}\n\nJawaban Benar: ${score} dari ${questions.length}`,
      [
        { text: 'Lihat Review', onPress: () => showReview() },
        { text: 'Selesai', onPress: () => navigation.goBack() }
      ]
    );
  };

  const showReview = () => {
    // Navigate to review screen or show review modal
    Alert.alert('Review', 'Fitur review akan segera tersedia');
  };

  const renderQuizStart = () => (
    <View style={styles.startContainer}>
      <View style={styles.startCard}>
        <View style={styles.startHeader}>
          <View style={styles.startIcon}>
            <Icon name="quiz" size={40} color="#667eea" />
          </View>
          <Text style={styles.startTitle}>{quizData?.title || 'Quiz K3'}</Text>
          <Text style={styles.startSubtitle}>{quizData?.description || 'Uji kemampuan K3 Anda'}</Text>
        </View>

        <View style={styles.quizInfo}>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Icon name="quiz" size={20} color="#64748b" />
              <Text style={styles.infoLabel}>Soal</Text>
              <Text style={styles.infoValue}>{questions.length}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="schedule" size={20} color="#64748b" />
              <Text style={styles.infoLabel}>Waktu</Text>
              <Text style={styles.infoValue}>{formatTime(timeRemaining)}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="stars" size={20} color="#64748b" />
              <Text style={styles.infoLabel}>Poin</Text>
              <Text style={styles.infoValue}>{questions.length * 10}</Text>
            </View>
          </View>
        </View>

        <View style={styles.instructions}>
          <Text style={styles.instructionsTitle}>Petunjuk Quiz:</Text>
          <Text style={styles.instructionItem}>• Baca setiap pertanyaan dengan teliti</Text>
          <Text style={styles.instructionItem}>• Pilih jawaban yang paling tepat</Text>
          <Text style={styles.instructionItem}>• Anda tidak dapat mengubah jawaban</Text>
          <Text style={styles.instructionItem}>• Minimum nilai lulus adalah 80</Text>
        </View>

        <TouchableOpacity style={styles.startButton} onPress={handleStartQuiz}>
          <Icon name="play-arrow" size={24} color="#fff" />
          <Text style={styles.startButtonText}>Mulai Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderQuestion = () => (
    <Animated.View style={[styles.questionContainer, { opacity: fadeAnimation }]}>
      {/* Progress Header */}
      <View style={styles.progressHeader}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            Soal {currentIndex + 1} dari {questions.length}
          </Text>
          <Text style={styles.timeText}>{formatTime(timeRemaining)}</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <Animated.View 
            style={[
              styles.progressBar,
              {
                width: progressAnimation.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                  extrapolate: 'clamp',
                })
              }
            ]} 
          />
        </View>
      </View>

      {/* Question Card */}
      <View style={styles.questionCard}>
        <View style={styles.questionHeader}>
          <View style={styles.questionMeta}>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(currentQuestion.difficulty) }]}>
              <Text style={styles.difficultyText}>{currentQuestion.difficulty}</Text>
            </View>
            <Text style={styles.categoryText}>{currentQuestion.category}</Text>
          </View>
        </View>

        <Text style={styles.questionText}>
          {currentIndex + 1}. {currentQuestion.question}
        </Text>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => {
            let optionStyle = [styles.optionButton];
            let textStyle = [styles.optionText];
            let iconName = null;

            if (selectedOption !== null) {
              const isCorrect = option === currentQuestion.answer;
              const isSelected = index === selectedOption;

              if (isSelected) {
                if (isCorrect) {
                  optionStyle.push(styles.optionCorrect);
                  textStyle.push(styles.optionTextCorrect);
                  iconName = 'check-circle';
                } else {
                  optionStyle.push(styles.optionIncorrect);
                  textStyle.push(styles.optionTextIncorrect);
                  iconName = 'cancel';
                }
              } else if (isCorrect) {
                optionStyle.push(styles.optionCorrect);
                textStyle.push(styles.optionTextCorrect);
                iconName = 'check-circle';
              }
            }

            return (
              <TouchableOpacity
                key={index}
                style={optionStyle}
                onPress={() => handleOptionPress(option, index)}
                disabled={selectedOption !== null}
                activeOpacity={0.7}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionLabel}>{String.fromCharCode(65 + index)}</Text>
                  <Text style={textStyle}>{option}</Text>
                  {iconName && (
                    <Icon 
                      name={iconName} 
                      size={24} 
                      color={iconName === 'check-circle' ? '#10b981' : '#ef4444'} 
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Explanation */}
        {showExplanation && (
          <View style={styles.explanationContainer}>
            <View style={styles.explanationHeader}>
              <Icon name="lightbulb" size={20} color="#f59e0b" />
              <Text style={styles.explanationTitle}>Penjelasan</Text>
            </View>
            <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
          </View>
        )}
      </View>

      {/* Next Button */}
      {showExplanation && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
          <Text style={styles.nextButtonText}>
            {currentIndex + 1 < questions.length ? 'Soal Selanjutnya' : 'Selesai Quiz'}
          </Text>
          <Icon 
            name={currentIndex + 1 < questions.length ? 'arrow-forward' : 'check'} 
            size={20} 
            color="#fff" 
          />
        </TouchableOpacity>
      )}
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>QUIZ K3</Text>
          <Text style={styles.headerSubtitle}>
            {quizStarted ? `${Math.round(progress)}% Selesai` : 'Siap untuk memulai?'}
          </Text>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{score}/{questions.length}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!quizStarted ? renderQuizStart() : renderQuestion()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#667eea',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  scoreContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },

  // Start Screen
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  startCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 32,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  startHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  startIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  startTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 8,
    textAlign: 'center',
  },
  startSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  quizInfo: {
    marginBottom: 32,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 8,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a202c',
  },
  instructions: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 12,
  },
  instructionItem: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
    lineHeight: 20,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#667eea',
    borderRadius: 16,
    paddingVertical: 16,
    elevation: 4,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },

  // Question Screen
  questionContainer: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  progressHeader: {
    marginBottom: 24,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a202c',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#667eea',
    borderRadius: 4,
  },
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  questionHeader: {
    marginBottom: 20,
  },
  questionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  categoryText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a202c',
    lineHeight: 28,
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  optionCorrect: {
    backgroundColor: '#f0fdf4',
    borderColor: '#10b981',
  },
  optionIncorrect: {
    backgroundColor: '#fef2f2',
    borderColor: '#ef4444',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#1a202c',
    lineHeight: 22,
  },
  optionTextCorrect: {
    color: '#10b981',
    fontWeight: '500',
  },
  optionTextIncorrect: {
    color: '#ef4444',
    fontWeight: '500',
  },
  explanationContainer: {
    marginTop: 20,
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    marginLeft: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#92400e',
    lineHeight: 20,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#667eea',
    borderRadius: 16,
    paddingVertical: 16,
    elevation: 4,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
});