import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';

export default function VideoShowScreen({ route }) {
  const { videoUrl, title } = route.params;

  console.log('Video URL:', videoUrl);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Video
        source={{ uri: videoUrl }}
        style={styles.video}
        controls
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  video: {
    width: Dimensions.get('window').width - 20,
    height: 200,
  },
});
