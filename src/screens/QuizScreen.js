import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

export default function QuizScreen({ navigation }) {
  const [completedQuizzes, setCompletedQuizzes] = useState(['1', '3']); // Mock completed quizzes

  const quizCategories = [
    {
      id: 'basic',
      title: 'Dasar K3',
      description: 'Pemahaman fundamental keselamatan kerja',
      icon: 'school',
      color: '#667eea',
      quizCount: 4,
      completedCount: 2,
    },
    {
      id: 'advanced',
      title: 'Lanjutan K3',
      description: 'Topik keselamatan tingkat lanjut',
      icon: 'trending-up',
      color: '#10b981',
      quizCount: 3,
      completedCount: 1,
    },
    {
      id: 'emergency',
      title: 'Prosedur Darurat',
      description: 'Penanganan situasi darurat',
      icon: 'emergency',
      color: '#ef4444',
      quizCount: 2,
      completedCount: 0,
    },
  ];

  const quizData = [
    {
      id: '1',
      title: 'Dasar-dasar Keselamatan Kerja',
      description: 'Uji pemahaman dasar tentang prinsip-prinsip keselamatan dan kesehatan kerja di tempat kerja.',
      category: 'basic',
      difficulty: 'Mudah',
      duration: '15 menit',
      questions: 20,
      points: 100,
      isCompleted: true,
      score: 85,
      attempts: 2,
      lastAttempt: '12 Jan 2024',
      prerequisites: [],
    },
    {
      id: '2',
      title: 'Prosedur Evakuasi Darurat',
      description: 'Kenali langkah-langkah yang harus diambil dalam situasi darurat dan prosedur evakuasi yang benar.',
      category: 'emergency',
      difficulty: 'Sedang',
      duration: '20 menit',
      questions: 15,
      points: 150,
      isCompleted: false,
      score: null,
      attempts: 0,
      lastAttempt: null,
      prerequisites: ['1'],
    },
    {
      id: '3',
      title: 'Alat Pelindung Diri (APD)',
      description: 'Evaluasi pemahaman tentang jenis, penggunaan, dan perawatan Alat Pelindung Diri yang tepat.',
      category: 'basic',
      difficulty: 'Mudah',
      duration: '12 menit',
      questions: 18,
      points: 90,
      isCompleted: true,
      score: 92,
      attempts: 1,
      lastAttempt: '10 Jan 2024',
      prerequisites: [],
    },
    {
      id: '4',
      title: 'Identifikasi Bahaya di Tempat Kerja',
      description: 'Pelajari cara mengidentifikasi, mengevaluasi, dan mengendalikan bahaya di lingkungan kerja.',
      category: 'advanced',
      difficulty: 'Sulit',
      duration: '25 menit',
      questions: 25,
      points: 200,
      isCompleted: false,
      score: null,
      attempts: 0,
      lastAttempt: null,
      prerequisites: ['1', '3'],
    },
    {
      id: '5',
      title: 'Manajemen Risiko K3',
      description: 'Pahami konsep manajemen risiko dan implementasinya dalam sistem keselamatan kerja.',
      category: 'advanced',
      difficulty: 'Sulit',
      duration: '30 menit',
      questions: 30,
      points: 250,
      isCompleted: false,
      score: null,
      attempts: 0,
      lastAttempt: null,
      prerequisites: ['1', '2', '4'],
    },
    {
      id: '6',
      title: 'Pertolongan Pertama di Tempat Kerja',
      description: 'Ketahui teknik pertolongan pertama yang penting untuk menangani kecelakaan kerja.',
      category: 'emergency',
      difficulty: 'Sedang',
      duration: '18 menit',
      questions: 22,
      points: 120,
      isCompleted: false,
      score: null,
      attempts: 0,
      lastAttempt: null,
      prerequisites: ['2'],
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Mudah': return '#10b981';
      case 'Sedang': return '#f59e0b';
      case 'Sulit': return '#ef4444';
      default: return '#94a3b8';
    }
  };

  const getCategoryInfo = (categoryId) => {
    return quizCategories.find(cat => cat.id === categoryId);
  };

  const canStartQuiz = (quiz) => {
    if (quiz.prerequisites.length === 0) return true;
    return quiz.prerequisites.every(prereqId => completedQuizzes.includes(prereqId));
  };

  const handleStartQuiz = (quiz) => {
    if (!canStartQuiz(quiz)) {
      Alert.alert(
        'Persyaratan Belum Terpenuhi',
        'Anda harus menyelesaikan quiz prasyarat terlebih dahulu sebelum memulai quiz ini.',
        [{ text: 'OK' }]
      );
      return;
    }

    navigation.navigate('QuizDetailScreen', { 
      quizId: quiz.id,
      quizData: quiz
    });
  };

  const getTotalStats = () => {
    const completed = quizData.filter(q => q.isCompleted).length;
    const totalPoints = quizData.filter(q => q.isCompleted).reduce((sum, q) => sum + (q.score || 0), 0);
    const avgScore = completed > 0 ? Math.round(totalPoints / completed) : 0;
    
    return {
      completed,
      total: quizData.length,
      totalPoints,
      avgScore
    };
  };

  const stats = getTotalStats();

  const renderCategoryCard = (category) => (
    <View key={category.id} style={[styles.categoryCard, { borderLeftColor: category.color }]}>
      <View style={styles.categoryHeader}>
        <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
          <Icon name={category.icon} size={24} color="#fff" />
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <Text style={styles.categoryDescription}>{category.description}</Text>
        </View>
      </View>
      <View style={styles.categoryStats}>
        <Text style={styles.categoryProgress}>
          {category.completedCount}/{category.quizCount} Quiz Selesai
        </Text>
        <View style={styles.progressBar}>
          <View style={[
            styles.progressFill,
            { 
              width: `${(category.completedCount / category.quizCount) * 100}%`,
              backgroundColor: category.color 
            }
          ]} />
        </View>
      </View>
    </View>
  );

  const renderQuizCard = (quiz) => {
    const categoryInfo = getCategoryInfo(quiz.category);
    const isAccessible = canStartQuiz(quiz);

    return (
      <TouchableOpacity
        key={quiz.id}
        style={[
          styles.quizCard,
          !isAccessible && styles.quizCardDisabled
        ]}
        onPress={() => handleStartQuiz(quiz)}
        activeOpacity={isAccessible ? 0.8 : 1}
      >
        <View style={styles.quizHeader}>
          <View style={styles.quizStatus}>
            {quiz.isCompleted ? (
              <View style={styles.completedBadge}>
                <Icon name="check-circle" size={16} color="#10b981" />
                <Text style={styles.completedText}>Selesai</Text>
              </View>
            ) : !isAccessible ? (
              <View style={styles.lockedBadge}>
                <Icon name="lock" size={16} color="#94a3b8" />
                <Text style={styles.lockedText}>Terkunci</Text>
              </View>
            ) : (
              <View style={styles.availableBadge}>
                <Icon name="play-circle-filled" size={16} color="#667eea" />
                <Text style={styles.availableText}>Tersedia</Text>
              </View>
            )}
          </View>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(quiz.difficulty) }]}>
            <Text style={styles.difficultyText}>{quiz.difficulty}</Text>
          </View>
        </View>

        <Text style={styles.quizTitle}>{quiz.title}</Text>
        <Text style={styles.quizDescription}>{quiz.description}</Text>

        <View style={styles.quizMeta}>
          <View style={styles.metaItem}>
            <Icon name="schedule" size={16} color="#64748b" />
            <Text style={styles.metaText}>{quiz.duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <Icon name="quiz" size={16} color="#64748b" />
            <Text style={styles.metaText}>{quiz.questions} soal</Text>
          </View>
          <View style={styles.metaItem}>
            <Icon name="stars" size={16} color="#64748b" />
            <Text style={styles.metaText}>{quiz.points} poin</Text>
          </View>
        </View>

        {quiz.isCompleted && (
          <View style={styles.scoreContainer}>
            <View style={styles.scoreItem}>
              <Text style={styles.scoreLabel}>Skor Terakhir</Text>
              <Text style={styles.scoreValue}>{quiz.score}/100</Text>
            </View>
            <View style={styles.scoreItem}>
              <Text style={styles.scoreLabel}>Percobaan</Text>
              <Text style={styles.scoreValue}>{quiz.attempts}x</Text>
            </View>
            <View style={styles.scoreItem}>
              <Text style={styles.scoreLabel}>Terakhir</Text>
              <Text style={styles.scoreValue}>{quiz.lastAttempt}</Text>
            </View>
          </View>
        )}

        {quiz.prerequisites.length > 0 && !quiz.isCompleted && (
          <View style={styles.prerequisitesContainer}>
            <Text style={styles.prerequisitesLabel}>Prasyarat:</Text>
            <Text style={styles.prerequisitesText}>
              Selesaikan quiz #{quiz.prerequisites.join(', #')} terlebih dahulu
            </Text>
          </View>
        )}

        <View style={styles.quizFooter}>
          <View style={styles.categoryTag}>
            <View style={[styles.categoryDot, { backgroundColor: categoryInfo?.color }]} />
            <Text style={styles.categoryTagText}>{categoryInfo?.title}</Text>
          </View>
          <Icon 
            name={isAccessible ? "arrow-forward" : "lock"} 
            size={20} 
            color={isAccessible ? "#667eea" : "#94a3b8"} 
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>QUIZ K3</Text>
            <Text style={styles.headerSubtitle}>Uji Kemampuan Keselamatan & Kesehatan Kerja</Text>
          </View>
          <TouchableOpacity style={styles.helpButton}>
            <Icon name="help" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Stats Summary */}
        {/* <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.completed}</Text>
                <Text style={styles.statLabel}>Selesai</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.total}</Text>
                <Text style={styles.statLabel}>Total Quiz</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.avgScore}</Text>
                <Text style={styles.statLabel}>Rata-rata</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.totalPoints}</Text>
                <Text style={styles.statLabel}>Total Poin</Text>
              </View>
            </View>
          </View>
        </View> */}

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Kategori Quiz</Text>
          {quizCategories.map(renderCategoryCard)}
        </View>

        {/* Quiz List */}
        <View style={styles.quizzesSection}>
          <Text style={styles.sectionTitle}>Daftar Quiz</Text>
          <Text style={styles.sectionSubtitle}>
            Pilih quiz sesuai dengan tingkat kemampuan dan kebutuhan pembelajaran Anda
          </Text>
          {quizData.map(renderQuizCard)}
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <View style={styles.tipsCard}>
            <View style={styles.tipsHeader}>
              <Icon name="lightbulb" size={20} color="#f59e0b" />
              <Text style={styles.tipsTitle}>Tips Mengerjakan Quiz</Text>
            </View>
            <View style={styles.tipsList}>
              <Text style={styles.tipItem}>• Baca soal dengan teliti sebelum menjawab</Text>
              <Text style={styles.tipItem}>• Manfaatkan waktu yang tersedia dengan baik</Text>
              <Text style={styles.tipItem}>• Selesaikan quiz prasyarat untuk membuka quiz lanjutan</Text>
              <Text style={styles.tipItem}>• Ulangi quiz untuk meningkatkan skor Anda</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },

  // Header
  header: {
    backgroundColor: '#667eea',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '400',
  },
  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Stats
  statsContainer: {
    paddingHorizontal: 24,
    marginTop: -16,
    marginBottom: 24,
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#667eea',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#f1f5f9',
    marginHorizontal: 12,
  },

  // Sections
  categoriesSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  quizzesSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 20,
    lineHeight: 20,
  },

  // Category Cards
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 2,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  categoryStats: {
    marginTop: 4,
  },
  categoryProgress: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#f1f5f9',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },

  // Quiz Cards
  quizCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  quizCardDisabled: {
    opacity: 0.6,
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  quizStatus: {
    flex: 1,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  completedText: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '500',
    marginLeft: 4,
  },
  lockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  lockedText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
    marginLeft: 4,
  },
  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f4ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  availableText: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '500',
    marginLeft: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 8,
  },
  quizDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  quizMeta: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  scoreContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    gap: 16,
  },
  scoreItem: {
    flex: 1,
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a202c',
  },
  prerequisitesContainer: {
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  prerequisitesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 4,
  },
  prerequisitesText: {
    fontSize: 12,
    color: '#92400e',
  },
  quizFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  categoryTagText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },

  // Tips Section
  tipsSection: {
    paddingHorizontal: 24,
  },
  tipsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f59e0b',
    marginLeft: 8,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});