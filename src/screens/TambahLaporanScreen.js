import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import * as ImagePicker from 'expo-image-picker'; // pakai expo-image-picker untuk ambil logo (bisa pakai react-native-image-picker kalau non-Expo)

const taskGroups = [
  { label: 'Pelanggaran', value: 'pelanggaran' },
  { label: 'Kecelakaan Kerja', value: 'kecelakaan' },
  { label: 'Observasi K3', value: 'observasi' },
];

export default function TambahLaporanScreen() {
  const [taskGroup, setTaskGroup] = useState(null);
  const [judulLaporan, setJudulLaporan] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [logoUri, setLogoUri] = useState(null);

  const showStartDatePicker = () => setStartDatePickerVisibility(true);
  const hideStartDatePicker = () => setStartDatePickerVisibility(false);

  const showEndDatePicker = () => setEndDatePickerVisibility(true);
  const hideEndDatePicker = () => setEndDatePickerVisibility(false);

  const handleStartDateConfirm = (date) => {
    setStartDate(date);
    hideStartDatePicker();
  };

  const handleEndDateConfirm = (date) => {
    setEndDate(date);
    hideEndDatePicker();
  };

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       setLogoUri(result.uri);
//     }
//   };

  const handleSubmit = () => {
    console.log({
      taskGroup,
      judulLaporan,
      deskripsi,
      startDate,
      endDate,
      logoUri,
    });
    alert('Laporan berhasil ditambahkan!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tambah Laporan</Text>

      <Text style={styles.label}>Kategori Laporan</Text>
      <Dropdown
        style={styles.dropdown}
        data={taskGroups}
        labelField="label"
        valueField="value"
        value={taskGroup}
        onChange={item => setTaskGroup(item.value)}
        placeholder="Pilih Kategori"
      />

      <Text style={styles.label}>Judul Laporan</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Judul Laporan"
        value={judulLaporan}
        onChangeText={setJudulLaporan}
      />

      <Text style={styles.label}>Deskripsi</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Masukkan Deskripsi"
        value={deskripsi}
        onChangeText={setDeskripsi}
        multiline
      />

      <Text style={styles.label}>Tanggal Mulai</Text>
      <TouchableOpacity style={styles.dateButton} onPress={showStartDatePicker}>
        <Text>{startDate ? startDate.toDateString() : 'Pilih Tanggal Mulai'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={handleStartDateConfirm}
        onCancel={hideStartDatePicker}
      />

      <Text style={styles.label}>Tanggal Selesai</Text>
      <TouchableOpacity style={styles.dateButton} onPress={showEndDatePicker}>
        <Text>{endDate ? endDate.toDateString() : 'Pilih Tanggal Selesai'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={handleEndDateConfirm}
        onCancel={hideEndDatePicker}
      />

      <Text style={styles.label}>Logo</Text>
      <TouchableOpacity style={styles.logoButton} onPress={() => {console.log('Pilih Logo'); /* pickImage() */}}>
        {logoUri ? (
          <Image source={{ uri: logoUri }} style={styles.logo} />
        ) : (
          <Text>Pilih Logo</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Tambah Laporan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#fff',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#fff',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  logoButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  submitButton: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
