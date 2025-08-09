import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  ScrollView, 
  Alert,
  Platform,
  PermissionsAndroid 
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';

const incidentTypes = [
  { label: 'Kecelakaan Kerja', value: 'accident', icon: 'warning', color: '#F44336' },
  { label: 'Kecelakaan Lalu Lintas', value: 'work_accident', icon: 'car-crash', color: '#FF9800' },
  { label: 'Sakit/Cedera', value: 'sick', icon: 'local-hospital', color: '#2196F3' },
  { label: 'Lainnya', value: 'other', icon: 'report-problem', color: '#9C27B0' },
];

const severityLevels = [
  { label: 'Rendah', value: 'low', color: '#4CAF50' },
  { label: 'Sedang', value: 'medium', color: '#FF9800' },
  { label: 'Tinggi', value: 'high', color: '#F44336' },
  { label: 'Kritis', value: 'critical', color: '#9C27B0' },
];

export default function TambahLaporanScreen({ navigation }) {
  const [reporterName, setReporterName] = useState('');
  const [incidentType, setIncidentType] = useState(null);
  const [severity, setSeverity] = useState(null);
  const [description, setDescription] = useState('');
  const [incidentDate, setIncidentDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    requestLocationPermission();
    getCurrentLocation();
  }, []);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const getCurrentLocation = () => {
    setLoadingLocation(true);
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoadingLocation(false);
      },
      (error) => {
        console.log(error);
        Alert.alert('Error', 'Gagal mengambil lokasi');
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleDateConfirm = (date) => {
    setIncidentDate(date);
    hideDatePicker();
  };

  const takePhoto = () => {
    Alert.alert(
      'Tambah Foto',
      'Pilih sumber foto',
      [
        { text: 'Kamera', onPress: () => openCamera() },
        { text: 'Galeri', onPress: () => openGallery() },
        { text: 'Batal', style: 'cancel' },
      ]
    );
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
    };

    launchCamera(options, (response) => {
      if (response.didCancel || response.errorCode) {
        return;
      }
      if (response.assets && response.assets[0]) {
        setPhotos([...photos, response.assets[0].uri]);
      }
    });
  };

  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel || response.errorCode) {
        return;
      }
      if (response.assets && response.assets[0]) {
        setPhotos([...photos, response.assets[0].uri]);
      }
    });
  };

  const removePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
  };

  const handleSubmit = () => {
    if (!reporterName || !incidentType || !description) {
      Alert.alert('Error', 'Harap lengkapi semua field yang wajib diisi');
      return;
    }

    const reportData = {
      reporterName,
      incidentType,
      severity,
      description,
      incidentDate,
      photos,
      location,
      createdAt: new Date(),
    };

    console.log('Report Data:', reportData);
    Alert.alert(
      'Sukses', 
      'Laporan insiden berhasil dikirim!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>LAPOR SEGERA</Text>
        <View style={styles.placeholder} />
      </View> */}

      <View style={styles.form}>
        {/* <Text style={styles.subtitle}>Laporkan Insiden Keselamatan</Text> */}

        <Text style={styles.label}>Nama Pelapor *</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan nama Anda"
          value={reporterName}
          onChangeText={setReporterName}
        />

        <Text style={styles.label}>Jenis Insiden *</Text>
        <Dropdown
          style={styles.dropdown}
          data={incidentTypes}
          labelField="label"
          valueField="value"
          value={incidentType}
          onChange={item => setIncidentType(item.value)}
          placeholder="Pilih jenis insiden"
          renderLeftIcon={() => (
            incidentType && (
              <Icon 
                name={incidentTypes.find(type => type.value === incidentType)?.icon || 'report-problem'} 
                size={20} 
                color="#666" 
                style={styles.dropdownIcon}
              />
            )
          )}
        />

        <Text style={styles.label}>Tingkat Keparahan</Text>
        <Dropdown
          style={styles.dropdown}
          data={severityLevels}
          labelField="label"
          valueField="value"
          value={severity}
          onChange={item => setSeverity(item.value)}
          placeholder="Pilih tingkat keparahan"
          renderLeftIcon={() => (
            severity && (
              <View style={[
                styles.severityIndicator, 
                { backgroundColor: severityLevels.find(level => level.value === severity)?.color }
              ]} />
            )
          )}
        />

        <Text style={styles.label}>Tanggal & Waktu Kejadian</Text>
        <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
          <Icon name="schedule" size={20} color="#666" />
          <Text style={styles.dateText}>
            {incidentDate.toLocaleDateString('id-ID')} {incidentDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />

        <Text style={styles.label}>Deskripsi Kejadian *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Jelaskan detail kejadian, penyebab, dan dampak yang terjadi..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Lokasi Kejadian</Text>
        <View style={styles.locationContainer}>
          <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation}>
            <Icon name="location-on" size={20} color="#2E7D32" />
            <Text style={styles.locationButtonText}>
              {loadingLocation ? 'Mengambil Lokasi...' : 'Ambil Lokasi Saat Ini'}
            </Text>
          </TouchableOpacity>
          {location && (
            <View style={styles.locationInfo}>
              <Text style={styles.locationText}>
                Lat: {location.latitude.toFixed(6)}, Lng: {location.longitude.toFixed(6)}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.label}>Foto Kejadian</Text>
        <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
          <Icon name="camera-alt" size={24} color="#2E7D32" />
          <Text style={styles.photoButtonText}>Tambah Foto</Text>
        </TouchableOpacity>

        {photos.length > 0 && (
          <View style={styles.photosContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {photos.map((photo, index) => (
                <View key={index} style={styles.photoWrapper}>
                  <Image source={{ uri: photo }} style={styles.photo} />
                  <TouchableOpacity 
                    style={styles.removePhotoButton}
                    onPress={() => removePhoto(index)}
                  >
                    <Icon name="close" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Icon name="send" size={20} color="#fff" style={styles.submitIcon} />
          <Text style={styles.submitButtonText}>Kirim Laporan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#F44336',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 34,
  },
  form: {
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dropdownIcon: {
    marginRight: 10,
  },
  severityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  locationContainer: {
    marginBottom: 10,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2E7D32',
    borderRadius: 12,
    padding: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  locationButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '500',
  },
  locationInfo: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#E8F5E8',
    borderRadius: 8,
  },
  locationText: {
    fontSize: 12,
    color: '#2E7D32',
    fontFamily: 'monospace',
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2E7D32',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  photoButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '500',
  },
  photosContainer: {
    marginTop: 15,
  },
  photoWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removePhotoButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#F44336',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#F44336',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  submitIcon: {
    marginRight: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
