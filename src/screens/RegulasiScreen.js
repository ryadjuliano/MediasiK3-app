import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Ionicons from 'react-native-vector-icons/Ionicons'; // FIXED: No destructuring

const faqs = [
  {
    question: 'Apa itu regulasi PPKM?',
    answer:
      'Regulasi PPKM adalah peraturan terkait pembatasan kegiatan masyarakat dalam masa pandemi.',
  },
  {
    question: 'Kapan regulasi ini berlaku?',
    answer:
      'Regulasi ini berlaku mulai tanggal yang ditentukan pemerintah pusat hingga waktu yang belum ditentukan.',
  },
  {
    question: 'Siapa yang wajib mematuhi regulasi ini?',
    answer:
      'Seluruh warga negara yang berada di wilayah yang terdampak PPKM.',
  },
];

export default function RegulasiScreen() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleCollapse = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>How can we{'\n'}Help you today?</Text>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
        <TextInput placeholder="Search Location" style={styles.input} />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="mail-outline" size={16} color="#28A745" />
          <Text style={styles.buttonText}>Email Support</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button}>
          <Ionicons name="chatbubble-ellipses-outline" size={16} color="#28A745" />
          <Text style={styles.buttonText}>Live Chat</Text>
        </TouchableOpacity> */}
      </View>

      <Text style={styles.faqHeading}>Frequent Question</Text>

      {faqs.map((item, index) => (
        <View key={index}>
          <TouchableOpacity
            onPress={() => toggleCollapse(index)}
            style={styles.faqItem}
          >
            <Text style={styles.question}>{item.question}</Text>
            <Ionicons
              name={activeIndex === index ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#000"
            />
          </TouchableOpacity>
          <Collapsible collapsed={activeIndex !== index}>
            <Text style={styles.answer}>{item.answer}</Text>
          </Collapsible>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#28A745',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
  },
  buttonText: {
    color: '#28A745',
    fontWeight: '500',
    marginLeft: 6,
  },
  faqHeading: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  question: {
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
  },
  answer: {
    paddingVertical: 10,
    color: '#555',
    fontSize: 14,
  },
});
