import React, { useState, useEffect } from 'react';
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
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

export default function BriefingScreen({ navigation }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeBriefing, setActiveBriefing] = useState(null);
  const [upcomingBriefings, setUpcomingBriefings] = useState([]);
  const [briefingHistory, setBriefingHistory] = useState([]);
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [alarmAnimation] = useState(new Animated.Value(0));

  // Mock data - in real app, this would come from backend
  const mockBriefings = [
    {
      id: '1',
      title: 'Safety Briefing Pagi',
      description: 'Briefing keselamatan kerja sebelum memulai shift pagi',
      scheduledTime: new Date(2024, 0, 15, 7, 0, 0),
      location: 'Area Konstruksi A',
      type: 'scheduled',
      priority: 'high',
      hseOfficer: 'Budi Santoso',
      attendees: 25,
      status: 'upcoming',
      duration: 15,
      topics: ['Penggunaan APD', 'Prosedur Keselamatan', 'Target Harian']
    },
    {
      id: '2',
      title: 'Emergency Briefing',
      description: 'Briefing darurat terkait prosedur evakuasi',
      scheduledTime: new Date(2024, 0, 15, 14, 30, 0),
      location: 'Ruang Pertemuan Utama',
      type: 'emergency',
      priority: 'critical',
      hseOfficer: 'Sari Dewi',
      attendees: 50,
      status: 'active',
      duration: 30,
      topics: ['Prosedur Evakuasi', 'Titik Kumpul', 'Kontak Darurat']
    },
    {
      id: '3',
      title: 'Weekly Safety Review',
      description: 'Review mingguan performa keselamatan kerja',
      scheduledTime: new Date(2024, 0, 12, 16, 0, 0),
      location: 'Area Konstruksi B',
      type: 'scheduled',
      priority: 'medium',
      hseOfficer: 'Ahmad Ridwan',
      attendees: 30,
      status: 'completed',
      duration: 20,
      topics: ['Review Insiden', 'Evaluasi APD', 'Perbaikan Proses']
    }
  ];

  useEffect(() => {
    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Mock data setup
    const now = new Date();
    const upcoming = mockBriefings.filter(b => b.status === 'upcoming');
    const active = mockBriefings.find(b => b.status === 'active');
    const history = mockBriefings.filter(b => b.status === 'completed');

    setUpcomingBriefings(upcoming);
    setActiveBriefing(active);
    setBriefingHistory(history);

    // Check for active alarm
    if (active) {
      setIsAlarmActive(true);
      startAlarmAnimation();
    }

    return () => clearInterval(timer);
  }, []);

  const startAlarmAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(alarmAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(alarmAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getTimeUntilBriefing = (scheduledTime) => {
    const now = new Date();
    const diff = scheduledTime.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diff < 0) return 'Sudah berlalu';
    if (hours > 0) return `${hours} jam ${minutes} menit lagi`;
    return `${minutes} menit lagi`;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#ca8a04';
      case 'low': return '#16a34a';
      default: return '#6b7280';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'emergency': return 'emergency';
      case 'scheduled': return 'schedule';
      default: return 'campaign';
    }
  };

  const handleAcknowledgeBriefing = (briefingId) => {
    Alert.alert(
      'Konfirmasi Kehadiran',
      'Apakah Anda akan menghadiri briefing ini?',
      [
        { text: 'Tidak', style: 'cancel' },
        { 
          text: 'Ya, Saya Hadir', 
          onPress: () => {
            Alert.alert('Konfirmasi', 'Kehadiran Anda telah dicatat');
            // In real app, send confirmation to backend
          }
        }
      ]
    );
  };

  const renderActiveBriefing = () => {
    if (!activeBriefing) return null;

    return (
      <Animated.View style={[
        styles.activeBriefingCard,
        {
          transform: [{
            scale: alarmAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.02]
            })
          }]
        }
      ]}>
        <View style={styles.alarmHeader}>
          <View style={styles.alarmIconContainer}>
            <Icon name="campaign" size={32} color="#fff" />
          </View>
          <View style={styles.alarmContent}>
            <Text style={styles.alarmTitle}>BRIEFING AKTIF</Text>
            <Text style={styles.alarmSubtitle}>Segera kumpul untuk briefing</Text>
          </View>
          <Animated.View style={[
            styles.alarmIndicator,
            {
              opacity: alarmAnimation
            }
          ]} />
        </View>

        <View style={styles.briefingDetails}>
          <Text style={styles.briefingTitle}>{activeBriefing.title}</Text>
          <Text style={styles.briefingDescription}>{activeBriefing.description}</Text>
          
          <View style={styles.briefingMeta}>
            <View style={styles.metaRow}>
              <Icon name="access-time" size={16} color="#ef4444" />
              <Text style={styles.metaText}>
                {formatTime(activeBriefing.scheduledTime)} ({activeBriefing.duration} menit)
              </Text>
            </View>
            <View style={styles.metaRow}>
              <Icon name="location-on" size={16} color="#ef4444" />
              <Text style={styles.metaText}>{activeBriefing.location}</Text>
            </View>
            <View style={styles.metaRow}>
              <Icon name="person" size={16} color="#ef4444" />
              <Text style={styles.metaText}>HSE: {activeBriefing.hseOfficer}</Text>
            </View>
          </View>

          <View style={styles.topicsContainer}>
            <Text style={styles.topicsLabel}>Topik Briefing:</Text>
            {activeBriefing.topics.map((topic, index) => (
              <Text key={index} style={styles.topicItem}>• {topic}</Text>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.acknowledgeButton}
          onPress={() => handleAcknowledgeBriefing(activeBriefing.id)}
        >
          <Icon name="check-circle" size={20} color="#fff" />
          <Text style={styles.acknowledgeButtonText}>Konfirmasi Kehadiran</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderUpcomingBriefing = (briefing) => (
    <View key={briefing.id} style={styles.briefingCard}>
      <View style={styles.briefingHeader}>
        <View style={[styles.typeIcon, { backgroundColor: getPriorityColor(briefing.priority) }]}>
          <Icon name={getTypeIcon(briefing.type)} size={20} color="#fff" />
        </View>
        <View style={styles.briefingInfo}>
          <Text style={styles.briefingCardTitle}>{briefing.title}</Text>
          <Text style={styles.timeUntil}>{getTimeUntilBriefing(briefing.scheduledTime)}</Text>
        </View>
        <View style={styles.priorityBadge}>
          <Text style={[styles.priorityText, { color: getPriorityColor(briefing.priority) }]}>
            {briefing.priority.toUpperCase()}
          </Text>
        </View>
      </View>

      <Text style={styles.briefingCardDescription}>{briefing.description}</Text>

      <View style={styles.briefingCardMeta}>
        <View style={styles.metaItem}>
          <Icon name="schedule" size={14} color="#64748b" />
          <Text style={styles.metaItemText}>
            {formatTime(briefing.scheduledTime)}
          </Text>
        </View>
        <View style={styles.metaItem}>
          <Icon name="location-on" size={14} color="#64748b" />
          <Text style={styles.metaItemText}>{briefing.location}</Text>
        </View>
        <View style={styles.metaItem}>
          <Icon name="people" size={14} color="#64748b" />
          <Text style={styles.metaItemText}>{briefing.attendees} peserta</Text>
        </View>
      </View>
    </View>
  );

  const renderHistoryItem = (briefing) => (
    <View key={briefing.id} style={styles.historyCard}>
      <View style={styles.historyHeader}>
        <View style={styles.historyIcon}>
          <Icon name="check-circle" size={16} color="#10b981" />
        </View>
        <View style={styles.historyInfo}>
          <Text style={styles.historyTitle}>{briefing.title}</Text>
          <Text style={styles.historyDate}>
            {formatDate(briefing.scheduledTime)} • {formatTime(briefing.scheduledTime)}
          </Text>
        </View>
      </View>
      <Text style={styles.historyDescription}>{briefing.description}</Text>
    </View>
  );

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
            <Text style={styles.headerTitle}>BRIEFING</Text>
            <Text style={styles.headerSubtitle}>Sistem Alarm & Jadwal Briefing K3</Text>
          </View>
          <View style={styles.clockContainer}>
            <Text style={styles.clockTime}>{formatTime(currentTime)}</Text>
            <Text style={styles.clockDate}>{formatDate(currentTime).split(',')[0]}</Text>
          </View>
        </View>

        {/* Active Briefing Alarm */}
        {activeBriefing && (
          <View style={styles.activeSection}>
            {renderActiveBriefing()}
          </View>
        )}

        {/* Status Overview */}
        <View style={styles.statusSection}>
          <View style={styles.statusCard}>
            <View style={styles.statusGrid}>
              <View style={styles.statusItem}>
                <Text style={styles.statusNumber}>{upcomingBriefings.length}</Text>
                <Text style={styles.statusLabel}>Mendatang</Text>
              </View>
              <View style={styles.statusDivider} />
              <View style={styles.statusItem}>
                <Text style={styles.statusNumber}>{activeBriefing ? 1 : 0}</Text>
                <Text style={styles.statusLabel}>Aktif</Text>
              </View>
              <View style={styles.statusDivider} />
              <View style={styles.statusItem}>
                <Text style={styles.statusNumber}>{briefingHistory.length}</Text>
                <Text style={styles.statusLabel}>Selesai</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Upcoming Briefings */}
        {upcomingBriefings.length > 0 && (
          <View style={styles.upcomingSection}>
            <Text style={styles.sectionTitle}>Briefing Mendatang</Text>
            {upcomingBriefings.map(renderUpcomingBriefing)}
          </View>
        )}

        {/* Briefing History */}
        {briefingHistory.length > 0 && (
          <View style={styles.historySection}>
            <Text style={styles.sectionTitle}>Riwayat Briefing</Text>
            {briefingHistory.map(renderHistoryItem)}
          </View>
        )}

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Icon name="info" size={20} color="#667eea" />
              <Text style={styles.infoTitle}>Informasi Briefing</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoItem}>• Briefing dijadwalkan otomatis oleh tim HSE</Text>
              <Text style={styles.infoItem}>• Alarm akan berbunyi saat briefing dimulai</Text>
              <Text style={styles.infoItem}>• Konfirmasi kehadiran wajib untuk semua peserta</Text>
              <Text style={styles.infoItem}>• Briefing darurat dapat diaktifkan sewaktu-waktu</Text>
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
  clockContainer: {
    alignItems: 'flex-end',
  },
  clockTime: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  clockDate: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },

  // Active Briefing
  activeSection: {
    paddingHorizontal: 24,
    marginTop: -16,
    marginBottom: 24,
  },
  activeBriefingCard: {
    backgroundColor: '#dc2626',
    borderRadius: 20,
    padding: 24,
    elevation: 8,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  alarmHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  alarmIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  alarmContent: {
    flex: 1,
  },
  alarmTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  alarmSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  alarmIndicator: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  briefingDetails: {
    marginBottom: 20,
  },
  briefingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  briefingDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 16,
    lineHeight: 20,
  },
  briefingMeta: {
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginLeft: 8,
  },
  topicsContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
  },
  topicsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  topicItem: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 4,
  },
  acknowledgeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16a34a',
    borderRadius: 12,
    paddingVertical: 16,
  },
  acknowledgeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },

  // Status
  statusSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statusGrid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusItem: {
    flex: 1,
    alignItems: 'center',
  },
  statusNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#667eea',
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  statusDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#f1f5f9',
    marginHorizontal: 12,
  },

  // Sections
  upcomingSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  historySection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 16,
  },

  // Briefing Cards
  briefingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  briefingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  briefingInfo: {
    flex: 1,
  },
  briefingCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 4,
  },
  timeUntil: {
    fontSize: 12,
    color: '#ea580c',
    fontWeight: '500',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  briefingCardDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
    lineHeight: 20,
  },
  briefingCardMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItemText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },

  // History Cards
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyIcon: {
    marginRight: 12,
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 2,
  },
  historyDate: {
    fontSize: 12,
    color: '#64748b',
  },
  historyDescription: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
    marginLeft: 28,
  },

  // Info Section
  infoSection: {
    paddingHorizontal: 24,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
    marginLeft: 8,
  },
  infoContent: {
    gap: 8,
  },
  infoItem: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});
