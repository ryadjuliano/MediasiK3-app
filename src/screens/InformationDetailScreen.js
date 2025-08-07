import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function InformationDetailScreen({ route }) {
  const { title, description, image, time, readTime, tags } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.time}>{time} • {readTime}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        <View style={styles.tagContainer}>
          {tags.map((tag, idx) => (
            <View key={idx} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.longText}>
          {`Ini adalah penjelasan lengkap mengenai "${title}". Kamu bisa menggunakan informasi ini untuk memperdalam pemahaman tentang K3, termasuk prinsip dasar, strategi implementasi, dan pendekatan mediasi dalam menyelesaikan konflik di tempat kerja.`}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 220,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: {
    padding: 16,
  },
  time: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#555',
    marginBottom: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#444',
  },
  longText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
});
