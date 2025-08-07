import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const articles = [
  {
    id: '1',
    title: 'Key principles of user experience navigation',
    description: 'Dive into the fundamental principles of UX design that guide...',
    time: 'Today, 08:15 PM',
    readTime: '54 min read',
    tags: ['Interaction', 'Research'],
    image: 'https://picsum.photos/id/1015/200/200',
  },
  {
    id: '2',
    title: 'Metrics and Strategies for Effective Design',
    description: 'In the world of UX design, success is often measured by the impact...',
    time: 'Today, 08:15 PM',
    readTime: '65 min read',
    tags: ['Usability Testing', 'Interaction'],
    image: 'https://picsum.photos/id/1016/200/200',
  },
  {
    id: '3',
    title: 'Creating Memorable UX to Increase Engagement',
    description: 'Explore the art of crafting engaging experiences for users...',
    time: 'Today, 08:15 PM',
    readTime: '26 min read',
    tags: ['Design', 'Engagement'],
    image: 'https://picsum.photos/id/1019/200/200',
  },
];

export default function InformationScreen({ navigation }) {
  const renderTag = (tag, index) => (
    <View key={index} style={styles.tag}>
      <Text style={styles.tagText}>{tag}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity   onPress={() => navigation.navigate('InformationDetail', { ...item })} style={{ flex: 1 }}>
        <Text style={styles.time}>{item.time}   {item.readTime}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.tagContainer}>
          {item.tags.map(renderTag)}
        </View>
      </TouchableOpacity>
      <Image source={{ uri: item.image }} style={styles.thumbnail} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0000',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fdfdfd',
    borderRadius: 8,
    padding: 16,
    paddingHorizontal: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  time: {
    fontSize: 12,
    color: '#999',
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 12,
    color: '#444',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginLeft: 12,
  },
});
