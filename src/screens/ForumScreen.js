import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const data = [
  {
    id: '1',
    title: '9 Juli Palembang Terapkan PPKM Mikro',
    date: '07 Juli 2021',
    thumbnail: 'https://picsum.photos/200', // Ganti dengan URL thumbnail sebenarnya
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Ganti dengan URL video sebenarnya
  },
  {
    id: '2',
    title: 'Wawako Fitrianti Pantau Kesiapan Posko PPKM',
    date: '06 Juli 2021',
    thumbnail: 'https://picsum.photos/200',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  // Tambahkan item lainnya sesuai kebutuhan
];

export default function ForumScreen({ navigation }) {
  return (
    <View style={styles.container}>
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('VideoShow', { videoUrl: item.videoUrl, title: item.title })}
        >
          <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
  flex: 1,
  padding: 10,
  backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 4,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  date: {
    color: '#666',
  },
});
