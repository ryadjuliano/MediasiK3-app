import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Set dynamic greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Selamat Pagi');
    else if (hour < 17) setGreeting('Selamat Siang');
    else setGreeting('Selamat Malam');

    return () => clearInterval(timer);
  }, []);

  const mainFeatures = [
    {
      id: 'kenalan',
      title: 'Edukasi',
      subtitle: 'Kenalan Yuk!',
      icon: 'school',
      gradient: ['#667eea', '#764ba2'],
      screen: 'Video',
      description: 'Pelajari K3'
    },
    {
      id: 'lapor',
      title: 'Lapor',
      subtitle: 'Segera',
      icon: 'report-problem',
      gradient: ['#f093fb', '#f5576c'],
      screen: 'TambahLaporan',
      description: 'Laporkan Insiden'
    },
    {
      id: 'absensi',
      title: 'Absensi',
      subtitle: 'Digital',
      icon: 'fingerprint',
      gradient: ['#4facfe', '#00f2fe'],
      screen: 'Absensi',
      description: 'Check In/Out'
    },
    {
      id: 'dialog',
      title: 'Dialog',
      subtitle: 'Forum',
      icon: 'forum',
      gradient: ['#43e97b', '#38f9d7'],
      screen: 'Forum',
      description: 'Konsultasi Ahli'
    }
  ];

  const quickAccess = [
    { 
      id: 'regulasi', 
      title: 'Regulasi', 
      icon: 'gavel', 
      screen: 'Regulasi',
      color: '#FF6B6B'
    },
    { 
      id: 'info', 
      title: 'Informasi', 
      icon: 'info', 
      screen: 'Informasi',
      color: '#4ECDC4'
    },
    { 
      id: 'quiz', 
      title: 'Quiz K3', 
      icon: 'quiz', 
      screen: 'Quiz',
      color: '#45B7D1'
    },
    { 
      id: 'briefing', 
      title: 'Briefing', 
      icon: 'campaign', 
      screen: 'Briefing',
      color: '#96CEB4'
    }
  ];

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
      month: 'long'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Header */}
        <View style={styles.heroHeader}>
          {/* Floating elements for visual interest */}
          <View style={[styles.floatingElement, styles.element1]} />
          <View style={[styles.floatingElement, styles.element2]} />
          <View style={[styles.floatingElement, styles.element3]} />
          
          <View style={styles.headerContent}>
            {/* Time Display */}
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
              <Text style={styles.dateText}>{formatDate(currentTime)}</Text>
            </View>

            {/* Greeting */}
            <View style={styles.greetingContainer}>
              <Text style={styles.greetingText}>{greeting}</Text>
              <Text style={styles.userText}>Safety First! 🛡️</Text>
            </View>

            {/* Quick Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Icon name="security" size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.statText}>Aman</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Icon name="verified-user" size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.statText}>Terpercaya</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Icon name="trending-up" size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.statText}>Aktif</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Main Features Grid */}
        <View style={styles.mainSection}>
          <View style={styles.sectionHeader}>
            {/* <Text style={styles.sectionTitle}>Fitur Utama</Text> */}
            {/* <Text style={styles.sectionSubtitle}>Kelola keselamatan kerja dengan mudah</Text> */}
          </View>

          <View style={styles.featuresGrid}>
            {mainFeatures.map((feature, index) => (
              <TouchableOpacity
                key={feature.id}
                style={[styles.featureCard, { 
                  marginLeft: index % 2 === 1 ? 8 : 0,
                  marginRight: index % 2 === 0 ? 8 : 0,
                }]}
                onPress={() => navigation.navigate(feature.screen)}
                activeOpacity={0.8}
              >
                <View style={[styles.featureGradient, { backgroundColor: feature.gradient[0] }]}>
                  <View style={styles.featureIconContainer}>
                    <Icon name={feature.icon} size={28} color="#fff" />
                  </View>
                  
                  <View style={styles.featureContent}>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
                    <Text style={styles.featureDescription}>{feature.description}</Text>
                  </View>

                  <View style={styles.featureArrow}>
                    <Icon name="arrow-forward" size={18} color="rgba(255,255,255,0.7)" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Access Section */}
        <View style={styles.quickSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Akses Cepat</Text>
            <Text style={styles.sectionSubtitle}>Fitur tambahan untuk produktivitas</Text>
          </View>

          <View style={styles.quickGrid}>
            {quickAccess.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.quickItem}
                onPress={() => navigation.navigate(item.screen)}
                activeOpacity={0.7}
              >
                <View style={[styles.quickIcon, { backgroundColor: item.color }]}>
                  <Icon name={item.icon} size={20} color="#fff" />
                </View>
                <Text style={styles.quickTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Emergency Section */}
        <View style={styles.emergencySection}>
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={() => navigation.navigate('TambahLaporan')}
            activeOpacity={0.9}
          >
            <View style={styles.emergencyGradient}>
              <Icon name="emergency" size={24} color="#fff" />
              <View style={styles.emergencyContent}>
                <Text style={styles.emergencyTitle}>Darurat K3</Text>
                <Text style={styles.emergencySubtitle}>Laporkan segera jika terjadi kecelakaan</Text>
              </View>
              <Icon name="chevron-right" size={24} color="rgba(255,255,255,0.8)" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Safety Tip */}
        <View style={styles.tipSection}>
          <View style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <View style={styles.tipIcon}>
                <Icon name="lightbulb" size={16} color="#FF9800" />
              </View>
              <Text style={styles.tipTitle}>Tips Keselamatan</Text>
            </View>
            <Text style={styles.tipText}>
              "Selalu periksa kondisi APD sebelum memulai pekerjaan. Keselamatan adalah tanggung jawab bersama."
            </Text>
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
    paddingBottom: 100,
  },
  
  // Hero Header Styles
  heroHeader: {
    height: height * 0.35,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#667eea',
  },
  floatingElement: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 50,
  },
  element1: {
    width: 80,
    height: 80,
    top: 60,
    right: 30,
  },
  element2: {
    width: 60,
    height: 60,
    top: 120,
    left: 40,
  },
  element3: {
    width: 40,
    height: 40,
    bottom: 80,
    right: 100,
  },
  headerContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 40 : 60,
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  timeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timeText: {
    fontSize: 48,
    fontWeight: '300',
    color: '#fff',
    letterSpacing: -1,
  },
  dateText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  greetingContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  userText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  statDivider: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 20,
  },

  // Main Section Styles
  mainSection: {
    paddingHorizontal: 24,
    // marginTop: -10,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  featureCard: {
    width: (width - 64) / 2,
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  featureGradient: {
    padding: 20,
    minHeight: 140,
    position: 'relative',
  },
  featureIconContainer: {
    marginBottom: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  featureSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  featureArrow: {
    position: 'absolute',
    top: 20,
    right: 20,
  },

  // Quick Access Styles
  quickSection: {
    paddingHorizontal: 24,
    marginTop: 40,
  },
  quickGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  quickItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickTitle: {
    fontSize: 12,
    color: '#4a5568',
    fontWeight: '600',
    textAlign: 'center',
  },

  // Emergency Section Styles
  emergencySection: {
    paddingHorizontal: 24,
    marginTop: 30,
  },
  emergencyButton: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#FF416C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  emergencyGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FF416C',
  },
  emergencyContent: {
    flex: 1,
    marginLeft: 15,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  emergencySubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },

  // Tip Section Styles
  tipSection: {
    paddingHorizontal: 24,
    marginTop: 30,
  },
  tipCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF9800',
  },
  tipText: {
    fontSize: 14,
    color: '#4a5568',
    lineHeight: 20,
    fontStyle: 'italic',
  },
});