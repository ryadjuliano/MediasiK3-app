import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Alert,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Text, Card, Button, FAB } from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import { launchCamera } from 'react-native-image-picker';

export default function AbsensiScreen() {
  const [photoUri, setPhotoUri] = useState(null);
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
        } else {
          console.log('Location permission denied');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleAmbilFoto = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      saveToPhotos: true,
    });

    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.errorCode) {
      console.log('ImagePicker Error: ', result.errorMessage);
    } else {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleAmbilLokasi = () => {
    setLoadingLocation(true);
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setLocation(position.coords);
        setLoadingLocation(false);
      },
      (error) => {
        console.log(error.code, error.message);
        Alert.alert('Error', 'Gagal mengambil lokasi');
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Absensi</Text>

      <Card style={styles.card}>
        <Card.Title title="Foto Absensi" />
        <Card.Content>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.image} />
          ) : (
            <Text style={styles.placeholderText}>Belum ada foto</Text>
          )}
          <Button mode="contained" style={styles.button} onPress={handleAmbilFoto}>
            Ambil Foto
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Lokasi Saat Ini" />
        <Card.Content>
          {loadingLocation ? (
            <ActivityIndicator size="small" color="#2E7D32" />
          ) : location ? (
            <Text style={styles.locationText}>
              Latitude: {location.latitude}{'\n'}
              Longitude: {location.longitude}
            </Text>
          ) : (
            <Text style={styles.placeholderText}>Belum ada lokasi</Text>
          )}
          <Button mode="contained" style={styles.button} onPress={handleAmbilLokasi}>
            Ambil Lokasi
          </Button>
        </Card.Content>
      </Card>

      <FAB
        style={styles.fab}
        icon="check"
        label="Simpan Absensi"
        onPress={() => {
          if (photoUri && location) {
            Alert.alert('Sukses', 'Data Absensi Disimpan!');
            // di sini kamu bisa panggil API untuk submit ke server
          } else {
            Alert.alert('Lengkapi Data', 'Harap ambil foto dan lokasi terlebih dahulu');
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 16 },
  title: { marginBottom: 16, textAlign: 'center', fontWeight: 'bold' },
  card: { marginBottom: 16, elevation: 4, borderRadius: 8 },
  image: { width: '100%', height: 200, borderRadius: 8, marginBottom: 8 },
  placeholderText: { textAlign: 'center', color: '#888', marginBottom: 8 },
  button: { marginTop: 8, backgroundColor: '#2E7D32' },
  locationText: { textAlign: 'center', color: '#333', marginBottom: 8 },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2E7D32',
  },
});
