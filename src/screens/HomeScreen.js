import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen({ navigation }) {  // Terima props navigation
  const today = new Date().toLocaleDateString();

  const infoMenu = [
    { name: 'Kenalan Yuk', icon: 'account-multiple-check', screen: 'Video' },
    { name: 'Regulasi', icon: 'alert', screen: 'Regulasi' },
    { name: 'Forum', icon: 'account-star', screen: 'Forum' },
    { name: 'Informasi', icon: 'file-document', screen: 'Informasi' },
    { name: 'Kuis', icon: 'file-edit', screen: 'Quiz' },
    { name: 'Laporan', icon: 'file-edit-outline', screen: 'Laporan' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Avatar.Image size={50} source={{ uri: 'https://picsum.photos/100' }} />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.greeting}>Hi, Iamindonesia 👋</Text>
            <Text style={styles.subGreeting}>Selamat Datang!</Text>
          </View>
        </View>
        {/* <Text style={styles.date}>{today}</Text> */}
      </View>

      {/* Banner */}
      <Image
        source={{ uri: 'https://picsum.photos/300' }}  // pasang gambar beasiswa kamu di sini
        style={styles.banner}
      />

      {/* SKS Info */}
      <View style={styles.sksContainer}>
        <Card style={styles.sksCard}>
          <Card.Content>
            <Text style={styles.sksTitle}>Office Project</Text>
            <Text style={styles.sksValue}>Media K3 </Text>
          </Card.Content>
        </Card>
        <Card style={styles.sksCard}>
          <Card.Content>
            <Text style={styles.sksTitle}>Informstion</Text>
            <Text style={styles.sksValue}>3 SKS</Text>
          </Card.Content>
        </Card>
          <Card style={styles.sksCard}>
          <Card.Content>
            <Text style={styles.sksTitle}>Informstion</Text>
            <Text style={styles.sksValue}>3 SKS</Text>
          </Card.Content>
        </Card>
      </View>

      {/* Informasi Grid */}
      <View style={styles.infoContainer}>
        {infoMenu.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.infoButton}
            onPress={() => navigation.navigate(item.screen)}  // Navigasi ke screen sesuai item
          >
            <Icon name={item.icon} size={28} color="#388E3C" />
            <Text style={styles.infoText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    backgroundColor: '#2E7D32',
    padding: 16,
    marginBottom: 16,  // typo diperbaiki
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  subGreeting: { color: '#fff', fontSize: 14 },
  date: { color: '#fff', textAlign: 'right', marginTop: 8 },
  banner: {
    width: '90%',
    height: 150,
    alignSelf: 'center',
    marginVertical: 16,
    borderRadius: 12,
    resizeMode: 'cover',
    backgroundColor: '#F5F5F5',
    // borderWidth: 1,
    // borderColor: '#2E7D32',
  },
  sksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 12,
    
  },
  sksCard: {
    width: '40%',
    elevation: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  sksTitle: {
    fontSize: 14,
    color: 'black',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  sksValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  infoButton: {
    backgroundColor: '#EEEEEE',
    width: '28%',
    height: 90,
    marginVertical: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    color: '#212121',
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
});
