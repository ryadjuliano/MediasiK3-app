import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit profile</Text>

      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://picsum.photos/id/1005/200/200' }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>Iam indonesia</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Biography</Text>
        <Text style={styles.value}>
          I’m a huge fan of Star Trek and coffee. My dog’s name is Marcus and I love traveling all around the world :)
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Birthday</Text>
        <Text style={styles.value}>11/09/94</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>App version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#000',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 6,
  },
  value: {
    fontSize: 14,
    color: '#555',
  },
  logoutButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  versionText: {
    marginTop: 20,
    fontSize: 12,
    color: '#aaa',
    alignSelf: 'center',
  },
});
