import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  Image,
  Alert,
  Switch,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi Logout',
      'Apakah Anda yakin ingin keluar dari aplikasi?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            dispatch(logout());
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      id: 'edit-profile',
      title: 'Edit Profil',
      subtitle: 'Ubah informasi pribadi Anda',
      icon: 'edit',
      color: '#667eea',
      onPress: () => navigation.navigate('EditProfile'),
    },
    // {
    //   id: 'certificates',
    //   title: 'Sertifikat K3',
    //   subtitle: 'Lihat sertifikat yang telah diperoleh',
    //   icon: 'workspace-premium',
    //   color: '#f59e0b',
    //   onPress: () => navigation.navigate('Certificates'),
    // },
    // {
    //   id: 'learning-progress',
    //   title: 'Progress Belajar',
    //   subtitle: 'Pantau kemajuan pembelajaran Anda',
    //   icon: 'trending-up',
    //   color: '#10b981',
    //   onPress: () => navigation.navigate('LearningProgress'),
    // },
    {
      id: 'attendance-history',
      title: 'Riwayat Absensi',
      subtitle: 'Lihat catatan kehadiran Anda',
      icon: 'history',
      color: '#06b6d4',
      onPress: () => navigation.navigate('AttendanceHistory'),
    },
    {
      id: 'incident-reports',
      title: 'Laporan Saya',
      subtitle: 'Riwayat laporan insiden yang dibuat',
      icon: 'report',
      color: '#ef4444',
      onPress: () => navigation.navigate('MyReports'),
    },
  ];

  const settingsItems = [
    {
      id: 'notifications',
      title: 'Notifikasi',
      subtitle: 'Kelola pengaturan notifikasi',
      icon: 'notifications',
      type: 'switch',
      value: notificationsEnabled,
      onToggle: setNotificationsEnabled,
    },
    {
      id: 'dark-mode',
      title: 'Mode Gelap',
      subtitle: 'Aktifkan tema gelap',
      icon: 'dark-mode',
      type: 'switch',
      value: darkModeEnabled,
      onToggle: setDarkModeEnabled,
    },
    {
      id: 'language',
      title: 'Bahasa',
      subtitle: 'Indonesia',
      icon: 'language',
      type: 'navigation',
      onPress: () => navigation.navigate('LanguageSettings'),
    },
    {
      id: 'privacy',
      title: 'Privasi & Keamanan',
      subtitle: 'Kelola pengaturan privasi',
      icon: 'security',
      type: 'navigation',
      onPress: () => navigation.navigate('PrivacySettings'),
    },
  ];

  const supportItems = [
    {
      id: 'help',
      title: 'Bantuan & FAQ',
      subtitle: 'Dapatkan bantuan dan jawaban',
      icon: 'help',
      onPress: () => navigation.navigate('Help'),
    },
    {
      id: 'contact',
      title: 'Hubungi Kami',
      subtitle: 'Kirim masukan atau keluhan',
      icon: 'contact-support',
      onPress: () => navigation.navigate('Contact'),
    },
    {
      id: 'about',
      title: 'Tentang Aplikasi',
      subtitle: 'Versi 1.0.0',
      icon: 'info',
      onPress: () => navigation.navigate('About'),
    },
  ];

  const renderMenuItem = (item, section = 'menu') => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <View style={[
          styles.menuIcon,
          { backgroundColor: section === 'menu' ? item.color : '#64748b' }
        ]}>
          <Icon name={item.icon} size={20} color="#fff" />
        </View>
        <View style={styles.menuContent}>
          <Text style={styles.menuTitle}>{item.title}</Text>
          <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
      
      {item.type === 'switch' ? (
        <Switch
          value={item.value}
          onValueChange={item.onToggle}
          trackColor={{ false: '#e2e8f0', true: '#667eea' }}
          thumbColor={item.value ? '#fff' : '#f4f3f4'}
        />
      ) : (
        <Icon name="chevron-right" size={20} color="#94a3b8" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#667eea" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profil</Text>
          <TouchableOpacity style={styles.editButton}>
            <Icon name="edit" size={20} color="#667eea" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: 'https://picsum.photos/100/100?random=1' }}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.cameraButton}>
                <Icon name="camera-alt" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user?.name || 'John Doe'}</Text>
              <Text style={styles.userEmail}>{user?.email || 'john.doe@example.com'}</Text>
              <View style={styles.statusContainer}>
                <View style={styles.statusBadge}>
                  <Icon name="verified" size={14} color="#10b981" />
                  <Text style={styles.statusText}>Verified</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Stats Row */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Laporan</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>85%</Text>
              <Text style={styles.statLabel}>Progress</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Hari Aktif</Text>
            </View>
          </View>
        </View>

        {/* Main Menu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Menu Utama</Text>
          <View style={styles.menuContainer}>
            {menuItems.map(item => renderMenuItem(item, 'menu'))}
          </View>
        </View>

        {/* Settings */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pengaturan</Text>
          <View style={styles.menuContainer}>
            {settingsItems.map(item => renderMenuItem(item, 'settings'))}
          </View>
        </View> */}

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bantuan & Dukungan</Text>
          <View style={styles.menuContainer}>
            {supportItems.map(item => renderMenuItem(item, 'support'))}
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Icon name="logout" size={20} color="#ef4444" />
            <Text style={styles.logoutText}>Keluar dari Akun</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>MediasiK3 v1.0.0</Text>
          <Text style={styles.versionSubtext}>© 2024 Safety Education Platform</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a202c',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  // Profile Card
  profileCard: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e2e8f0',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '500',
    marginLeft: 4,
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
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
    marginHorizontal: 16,
  },

  // Sections
  section: {
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 16,
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },

  // Menu Items
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },

  // Logout
  logoutSection: {
    paddingHorizontal: 24,
    marginTop: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#fee2e2',
    elevation: 2,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
    marginLeft: 8,
  },

  // Version
  versionContainer: {
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  versionText: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    color: '#cbd5e1',
  },
});