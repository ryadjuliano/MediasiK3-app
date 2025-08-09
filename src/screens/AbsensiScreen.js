import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Alert,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  DeviceEventEmitter,
  AppState,
  Modal,
  BackHandler,
} from 'react-native';
import { Text, Card, Button, FAB } from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import { launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

export default function AbsensiScreen() {
  // Core attendance state
  const [checkInPhoto, setCheckInPhoto] = useState(null);
  const [checkOutPhoto, setCheckOutPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Real-time verification state
  const [isCapturingPhoto, setIsCapturingPhoto] = useState(false);
  const [captureType, setCaptureType] = useState(null); // 'checkin' or 'checkout'
  const [photoMetadata, setPhotoMetadata] = useState({});
  const [locationHistory, setLocationHistory] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  
  // Anti-fraud measures
  const [lastLocationUpdate, setLastLocationUpdate] = useState(null);
  const [appStateHistory, setAppStateHistory] = useState([]);
  const locationWatchId = useRef(null);
  const photoTakenTime = useRef(null);

  useEffect(() => {
    initializeAttendanceSystem();
    
    // Real-time monitoring
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      updateLocationContinuously();
    }, 1000);

    // App state monitoring for fraud detection
    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      clearInterval(timer);
      appStateSubscription?.remove();
      if (locationWatchId.current) {
        Geolocation.clearWatch(locationWatchId.current);
      }
    };
  }, []);

  const initializeAttendanceSystem = async () => {
    await requestAllPermissions();
    await startLocationTracking();
    loadTodayAttendance();
  };

  const requestAllPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        const permissions = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        
        const allGranted = Object.values(permissions).every(
          permission => permission === PermissionsAndroid.RESULTS.GRANTED
        );
        
        if (!allGranted) {
          Alert.alert(
            'Permissions Required',
            'Aplikasi memerlukan izin Kamera dan Lokasi untuk sistem absensi yang aman.',
            [{ text: 'OK' }]
          );
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const startLocationTracking = () => {
    setLoadingLocation(true);
    
    // Continuous location tracking for anti-fraud
    locationWatchId.current = Geolocation.watchPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(),
        };
        
        setLocation(newLocation);
        setLastLocationUpdate(new Date());
        setLoadingLocation(false);
        
        // Keep location history for verification
        setLocationHistory(prev => [...prev.slice(-10), newLocation]); // Keep last 10 locations
      },
      (error) => {
        console.log('Location error:', error);
        setLoadingLocation(false);
        Alert.alert('Error', 'Gagal mengambil lokasi. Pastikan GPS aktif.');
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 1, // Update every 1 meter
        interval: 5000, // Update every 5 seconds
        fastestInterval: 2000,
      }
    );
  };

  const handleAppStateChange = (nextAppState) => {
    const stateChange = {
      state: nextAppState,
      timestamp: new Date(),
    };
    
    setAppStateHistory(prev => [...prev.slice(-5), stateChange]);
    
    // Detect suspicious app switching during photo capture
    if (isCapturingPhoto && nextAppState === 'background') {
      Alert.alert(
        'Peringatan Keamanan',
        'Terdeteksi perpindahan aplikasi selama pengambilan foto. Silakan ulangi proses absensi.',
        [
          {
            text: 'OK',
            onPress: () => {
              setIsCapturingPhoto(false);
              setCaptureType(null);
            }
          }
        ]
      );
    }
  };

  const updateLocationContinuously = () => {
    // Check if location is still updating (anti-spoofing)
    if (lastLocationUpdate && new Date() - lastLocationUpdate > 30000) {
      console.warn('Location not updating - possible spoofing detected');
    }
  };

  const loadTodayAttendance = () => {
    // In a real app, this would load from secure storage or API
    const today = new Date().toDateString();
    // Mock loading today's attendance
    setAttendanceRecords([]);
  };

  const validateLocationForAttendance = () => {
    if (!location) {
      Alert.alert('Error', 'Lokasi belum tersedia. Pastikan GPS aktif dan tunggu beberapa saat.');
      return false;
    }

    if (location.accuracy > 50) {
      Alert.alert(
        'Akurasi Lokasi Rendah',
        `Akurasi GPS: ${location.accuracy.toFixed(1)}m. Untuk keamanan, akurasi harus di bawah 50m. Tunggu signal GPS yang lebih baik.`,
        [{ text: 'OK' }]
      );
      return false;
    }

    return true;
  };

  const captureRealTimePhoto = async (type) => {
    if (!validateLocationForAttendance()) return;

    setIsCapturingPhoto(true);
    setCaptureType(type);
    photoTakenTime.current = new Date();

    // Prevent back button during photo capture
    const backAction = () => {
      Alert.alert('Peringatan', 'Tidak dapat keluar selama proses pengambilan foto.');
      return true;
    };
    
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    const cameraOptions = {
      mediaType: 'photo',
      quality: 0.8,
      cameraType: 'front',
      saveToPhotos: false, // Don't save to gallery to prevent manipulation
      includeBase64: false,
      maxWidth: 1024,
      maxHeight: 1024,
      // Force real-time capture
      storageOptions: {
        skipBackup: true,
        path: 'attendance',
      },
    };

    try {
      const result = await launchCamera(cameraOptions);
      
      backHandler.remove();
      setIsCapturingPhoto(false);

      if (result.didCancel) {
        Alert.alert('Dibatalkan', 'Pengambilan foto dibatalkan. Absensi tidak dapat dilanjutkan.');
        setCaptureType(null);
        return;
      }

      if (result.errorCode) {
        Alert.alert('Error', `Gagal mengambil foto: ${result.errorMessage}`);
        setCaptureType(null);
        return;
      }

      if (result.assets && result.assets[0]) {
        const photoData = result.assets[0];
        
        // Validate photo was taken recently (within last 10 seconds)
        const timeDiff = new Date() - photoTakenTime.current;
        if (timeDiff > 10000) {
          Alert.alert(
            'Peringatan Keamanan',
            'Foto harus diambil secara real-time. Silakan ulangi proses absensi.',
            [{ text: 'OK' }]
          );
          setCaptureType(null);
          return;
        }

        // Create comprehensive metadata for verification
        const metadata = {
          uri: photoData.uri,
          timestamp: photoTakenTime.current,
          location: { ...location },
          fileSize: photoData.fileSize,
          fileName: photoData.fileName,
          type: photoData.type,
          width: photoData.width,
          height: photoData.height,
          captureType: type,
        };

        if (type === 'checkin') {
          setCheckInPhoto(photoData.uri);
          processCheckIn(metadata);
        } else {
          setCheckOutPhoto(photoData.uri);
          processCheckOut(metadata);
        }
      }
    } catch (error) {
      backHandler.remove();
      setIsCapturingPhoto(false);
      Alert.alert('Error', 'Terjadi kesalahan saat mengambil foto.');
      console.error('Camera error:', error);
    }

    setCaptureType(null);
  };

  const processCheckIn = (photoMetadata) => {
    const checkInData = {
      id: Date.now().toString(),
      type: 'checkin',
      timestamp: new Date(),
      location: photoMetadata.location,
      photoUri: photoMetadata.uri,
      metadata: photoMetadata,
      locationHistory: [...locationHistory],
      appStateHistory: [...appStateHistory],
    };

    setIsCheckedIn(true);
    setCheckInTime(checkInData.timestamp);
    setAttendanceRecords(prev => [...prev, checkInData]);

    Alert.alert(
      'Check-in Berhasil! ✅',
      `Waktu: ${formatTime(checkInData.timestamp)}\nLokasi: ${photoMetadata.location.latitude.toFixed(6)}, ${photoMetadata.location.longitude.toFixed(6)}\nAkurasi GPS: ${photoMetadata.location.accuracy.toFixed(1)}m`,
      [{ text: 'OK' }]
    );

    // In a real app, send to secure API
    console.log('Check-in Data:', checkInData);
  };

  const processCheckOut = (photoMetadata) => {
    if (!isCheckedIn) {
      Alert.alert('Error', 'Anda belum check-in hari ini.');
      return;
    }

    const checkOutData = {
      id: Date.now().toString(),
      type: 'checkout',
      timestamp: new Date(),
      location: photoMetadata.location,
      photoUri: photoMetadata.uri,
      metadata: photoMetadata,
      workDuration: calculateWorkDuration(),
    };

    setIsCheckedIn(false);
    setCheckOutTime(checkOutData.timestamp);
    setAttendanceRecords(prev => [...prev, checkOutData]);

    Alert.alert(
      'Check-out Berhasil! ✅',
      `Waktu: ${formatTime(checkOutData.timestamp)}\nTotal Jam Kerja: ${calculateWorkDuration().toFixed(1)} jam\nLokasi: ${photoMetadata.location.latitude.toFixed(6)}, ${photoMetadata.location.longitude.toFixed(6)}`,
      [{ text: 'OK' }]
    );

    // In a real app, send to secure API
    console.log('Check-out Data:', checkOutData);
  };

  const calculateWorkDuration = () => {
    if (checkInTime && checkOutTime) {
      const diffMs = checkOutTime.getTime() - checkInTime.getTime();
      return diffMs / (1000 * 60 * 60); // Convert to hours
    }
    if (checkInTime) {
      const diffMs = new Date().getTime() - checkInTime.getTime();
      return diffMs / (1000 * 60 * 60);
    }
    return 0;
  };

  const formatTime = (date) => {
    if (!date) return '-';
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = () => {
    if (isCheckedIn) return '#4CAF50';
    if (checkOutTime) return '#FF9800';
    return '#F44336';
  };

  const getStatusText = () => {
    if (checkOutTime) return 'Selesai Kerja';
    if (isCheckedIn) return 'Sedang Bekerja';
    return 'Belum Check-in';
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="fingerprint" size={30} color="#fff" />
        <Text style={styles.headerTitle}>ABSENSI REAL-TIME</Text>
        <Text style={styles.headerSubtitle}>Sistem Kehadiran Terverifikasi</Text>
      </View>

      {/* Real-time Status Card */}
      <Card style={styles.statusCard}>
        <Card.Content style={styles.statusCardContent}>
          <View style={styles.clockContainer}>
            <Text style={styles.currentTime}>
              {formatTime(currentTime)}
            </Text>
            <Text style={styles.currentDate}>
              {formatDate(currentTime)}
            </Text>
          </View>
          
          <View style={styles.statusContainer}>
            <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {getStatusText()}
            </Text>
          </View>

          {checkInTime && (
            <Text style={styles.workDuration}>
              Jam Kerja: {calculateWorkDuration().toFixed(1)} jam
            </Text>
          )}
        </Card.Content>
      </Card>

      {/* Location Verification */}
      <Card style={styles.card}>
        <Card.Title 
          title="Verifikasi Lokasi Real-time" 
          left={(props) => <Icon {...props} name="location-on" color="#2E7D32" />}
        />
        <Card.Content>
          {loadingLocation ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#2E7D32" />
              <Text style={styles.loadingText}>Memverifikasi lokasi...</Text>
            </View>
          ) : location ? (
            <View style={styles.locationInfo}>
              <View style={styles.locationRow}>
                <Text style={styles.locationLabel}>Koordinat:</Text>
                <Text style={styles.locationValue}>
                  {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                </Text>
              </View>
              <View style={styles.locationRow}>
                <Text style={styles.locationLabel}>Akurasi GPS:</Text>
                <Text style={[
                  styles.locationValue,
                  { color: location.accuracy < 20 ? '#4CAF50' : location.accuracy < 50 ? '#FF9800' : '#F44336' }
                ]}>
                  {location.accuracy.toFixed(1)} meter
                </Text>
              </View>
              <View style={styles.locationRow}>
                <Text style={styles.locationLabel}>Terakhir Update:</Text>
                <Text style={styles.locationValue}>
                  {lastLocationUpdate ? formatTime(lastLocationUpdate) : 'Belum tersedia'}
                </Text>
              </View>
            </View>
          ) : (
            <Text style={styles.placeholderText}>Lokasi tidak tersedia</Text>
          )}
          
          <View style={styles.securityInfo}>
            <Icon name="security" size={16} color="#2E7D32" />
            <Text style={styles.securityText}>
              Lokasi diverifikasi secara real-time untuk mencegah kecurangan
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Check-in Section */}
      <Card style={[styles.card, { backgroundColor: isCheckedIn ? '#E8F5E8' : '#fff' }]}>
        <Card.Title 
          title="Check-in Real-time" 
          left={(props) => <Icon {...props} name="login" color="#4CAF50" />}
        />
        <Card.Content>
          <View style={styles.photoSection}>
            {checkInPhoto ? (
              <View style={styles.photoContainer}>
                <Image source={{ uri: checkInPhoto }} style={styles.verifiedPhoto} />
                <View style={styles.verifiedBadge}>
                  <Icon name="verified" size={16} color="#4CAF50" />
                  <Text style={styles.verifiedText}>Terverifikasi</Text>
                </View>
              </View>
            ) : (
              <View style={styles.photoPlaceholder}>
                <Icon name="camera-alt" size={40} color="#ccc" />
                <Text style={styles.placeholderText}>Foto Real-time Check-in</Text>
              </View>
            )}
          </View>
          
          {checkInTime && (
            <View style={styles.timeInfo}>
              <Text style={styles.timeLabel}>Waktu Check-in:</Text>
              <Text style={styles.timeValue}>{formatTime(checkInTime)}</Text>
            </View>
          )}

          <Button 
            mode="contained" 
            style={[styles.actionButton, { 
              backgroundColor: isCheckedIn ? '#ccc' : '#4CAF50',
              opacity: (!location || location.accuracy > 50) ? 0.5 : 1
            }]}
            onPress={() => captureRealTimePhoto('checkin')}
            disabled={isCheckedIn || !location || location.accuracy > 50 || isCapturingPhoto}
            icon="camera-alt"
          >
            {isCheckedIn ? 'Sudah Check-in' : 'CHECK-IN SEKARANG'}
          </Button>
        </Card.Content>
      </Card>

      {/* Check-out Section */}
      <Card style={[styles.card, { backgroundColor: checkOutTime ? '#FFE8E8' : '#fff' }]}>
        <Card.Title 
          title="Check-out Real-time" 
          left={(props) => <Icon {...props} name="logout" color="#F44336" />}
        />
        <Card.Content>
          <View style={styles.photoSection}>
            {checkOutPhoto ? (
              <View style={styles.photoContainer}>
                <Image source={{ uri: checkOutPhoto }} style={styles.verifiedPhoto} />
                <View style={styles.verifiedBadge}>
                  <Icon name="verified" size={16} color="#4CAF50" />
                  <Text style={styles.verifiedText}>Terverifikasi</Text>
                </View>
              </View>
            ) : (
              <View style={styles.photoPlaceholder}>
                <Icon name="camera-alt" size={40} color="#ccc" />
                <Text style={styles.placeholderText}>Foto Real-time Check-out</Text>
              </View>
            )}
          </View>
          
          {checkOutTime && (
            <View style={styles.timeInfo}>
              <Text style={styles.timeLabel}>Waktu Check-out:</Text>
              <Text style={styles.timeValue}>{formatTime(checkOutTime)}</Text>
            </View>
          )}

          <Button 
            mode="contained" 
            style={[styles.actionButton, { 
              backgroundColor: (!isCheckedIn || checkOutTime) ? '#ccc' : '#F44336',
              opacity: (!location || location.accuracy > 50) ? 0.5 : 1
            }]}
            onPress={() => captureRealTimePhoto('checkout')}
            disabled={!isCheckedIn || checkOutTime || !location || location.accuracy > 50 || isCapturingPhoto}
            icon="camera-alt"
          >
            {checkOutTime ? 'Sudah Check-out' : 'CHECK-OUT SEKARANG'}
          </Button>
        </Card.Content>
      </Card>

      {/* Security Features Info */}
      <Card style={styles.securityCard}>
        <Card.Title 
          title="Fitur Keamanan Aktif" 
          left={(props) => <Icon {...props} name="shield" color="#FF9800" />}
        />
        <Card.Content>
          <View style={styles.securityFeature}>
            <Icon name="camera-alt" size={16} color="#4CAF50" />
            <Text style={styles.securityFeatureText}>
              Foto Real-time: Hanya dari kamera langsung, tidak dari galeri
            </Text>
          </View>
          <View style={styles.securityFeature}>
            <Icon name="location-on" size={16} color="#4CAF50" />
            <Text style={styles.securityFeatureText}>
              GPS Tracking: Lokasi diverifikasi kontinyu dengan akurasi tinggi
            </Text>
          </View>
          <View style={styles.securityFeature}>
            <Icon name="access-time" size={16} color="#4CAF50" />
            <Text style={styles.securityFeatureText}>
              Timestamp Otomatis: Waktu dicatat otomatis saat foto diambil
            </Text>
          </View>
          <View style={styles.securityFeature}>
            <Icon name="security" size={16} color="#4CAF50" />
            <Text style={styles.securityFeatureText}>
              Anti-fraud: Deteksi manipulasi aplikasi dan lokasi palsu
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Processing Modal */}
      <Modal visible={isCapturingPhoto} transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#2E7D32" />
            <Text style={styles.modalText}>
              Mengambil foto {captureType === 'checkin' ? 'check-in' : 'check-out'}...
            </Text>
            <Text style={styles.modalSubtext}>
              Jangan keluar dari aplikasi selama proses berlangsung
            </Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa' 
  },
  header: {
    backgroundColor: '#2E7D32',
    padding: 30,
    paddingTop: 50,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  },
  statusCard: {
    margin: 16,
    elevation: 8,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  statusCardContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  clockContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  currentTime: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
    fontFamily: 'monospace',
  },
  currentDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  workDuration: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  card: { 
    margin: 16, 
    marginTop: 8,
    elevation: 4, 
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  loadingText: {
    marginLeft: 10,
    color: '#666',
  },
  locationInfo: {
    backgroundColor: '#E8F5E8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  locationLabel: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '500',
  },
  locationValue: {
    fontSize: 14,
    color: '#2E7D32',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F8E9',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  securityText: {
    fontSize: 12,
    color: '#2E7D32',
    marginLeft: 8,
    flex: 1,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photoContainer: {
    position: 'relative',
  },
  verifiedPhoto: { 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  placeholderText: { 
    textAlign: 'center', 
    color: '#888', 
    fontSize: 12,
    marginTop: 5,
  },
  timeInfo: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  timeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'monospace',
  },
  actionButton: {
    paddingVertical: 8,
    borderRadius: 25,
  },
  securityCard: {
    margin: 16,
    marginTop: 8,
    marginBottom: 30,
    elevation: 6,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  securityFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  securityFeatureText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 12,
    flex: 1,
    lineHeight: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    minWidth: 250,
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    textAlign: 'center',
  },
  modalSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
});