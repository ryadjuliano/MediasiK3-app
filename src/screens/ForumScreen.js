import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  StyleSheet,
  Alert,
  Modal
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Department configurations
const departments = [
  {
    id: 'hse',
    name: 'HSE (Health, Safety & Environment)',
    icon: 'security',
    color: '#F44336',
    description: 'Kesehatan, Keselamatan & Lingkungan Kerja'
  },
  {
    id: 'disnaker',
    name: 'DISNAKER',
    icon: 'work',
    color: '#2196F3',
    description: 'Dinas Tenaga Kerja'
  },
  {
    id: 'kemnaker',
    name: 'KEMNAKER',
    icon: 'account-balance',
    color: '#4CAF50',
    description: 'Kementerian Ketenagakerjaan'
  }
];

// HSE specific questions
const hseQuestions = [
  {
    id: 'hse_1',
    question: 'Apakah terdapat kecelakaan kerja di tempat Anda?',
    type: 'dropdown',
    options: [
      { label: 'Ya, sering terjadi', value: 'frequent' },
      { label: 'Kadang-kadang', value: 'sometimes' },
      { label: 'Jarang terjadi', value: 'rare' },
      { label: 'Tidak pernah', value: 'never' }
    ]
  },
  {
    id: 'hse_2',
    question: 'Bagaimana kondisi Alat Pelindung Diri (APD) di tempat kerja Anda?',
    type: 'dropdown',
    options: [
      { label: 'Sangat baik dan lengkap', value: 'excellent' },
      { label: 'Baik tapi kurang lengkap', value: 'good' },
      { label: 'Buruk dan tidak lengkap', value: 'poor' },
      { label: 'Tidak tersedia sama sekali', value: 'none' }
    ]
  },
  {
    id: 'hse_3',
    question: 'Apakah ada program pelatihan K3 di perusahaan Anda?',
    type: 'dropdown',
    options: [
      { label: 'Ya, rutin dilaksanakan', value: 'regular' },
      { label: 'Kadang-kadang ada', value: 'occasional' },
      { label: 'Jarang sekali', value: 'rare' },
      { label: 'Tidak ada sama sekali', value: 'none' }
    ]
  },
  {
    id: 'hse_4',
    question: 'Jelaskan kondisi lingkungan kerja dan masalah K3 yang Anda hadapi:',
    type: 'text',
    placeholder: 'Ceritakan kondisi keselamatan, kesehatan, dan lingkungan di tempat kerja Anda...'
  }
];

// DISNAKER specific questions
const disnakerQuestions = [
  {
    id: 'disnaker_1',
    question: 'Apakah perusahaan Anda memiliki kontrak kerja yang jelas?',
    type: 'dropdown',
    options: [
      { label: 'Ya, kontrak sangat jelas', value: 'clear' },
      { label: 'Ada tapi kurang jelas', value: 'unclear' },
      { label: 'Kontrak lisan saja', value: 'verbal' },
      { label: 'Tidak ada kontrak', value: 'none' }
    ]
  },
  {
    id: 'disnaker_2',
    question: 'Bagaimana pembayaran upah di tempat kerja Anda?',
    type: 'dropdown',
    options: [
      { label: 'Selalu tepat waktu sesuai UMK', value: 'ontime_umk' },
      { label: 'Tepat waktu tapi di bawah UMK', value: 'ontime_below' },
      { label: 'Sering terlambat', value: 'late' },
      { label: 'Sangat tidak teratur', value: 'irregular' }
    ]
  },
  {
    id: 'disnaker_3',
    question: 'Apakah Anda mendapat jaminan sosial ketenagakerjaan (BPJS)?',
    type: 'dropdown',
    options: [
      { label: 'Ya, lengkap (BPJS Kesehatan + Ketenagakerjaan)', value: 'complete' },
      { label: 'Hanya BPJS Kesehatan', value: 'health_only' },
      { label: 'Hanya BPJS Ketenagakerjaan', value: 'employment_only' },
      { label: 'Tidak ada jaminan', value: 'none' }
    ]
  },
  {
    id: 'disnaker_4',
    question: 'Jelaskan masalah ketenagakerjaan yang Anda hadapi:',
    type: 'text',
    placeholder: 'Ceritakan masalah terkait kontrak, upah, jam kerja, atau hubungan industrial...'
  }
];

// KEMNAKER specific questions
const kemnakerQuestions = [
  {
    id: 'kemnaker_1',
    question: 'Apakah jam kerja di perusahaan Anda sesuai peraturan (maksimal 8 jam/hari)?',
    type: 'dropdown',
    options: [
      { label: 'Ya, sesuai peraturan', value: 'compliant' },
      { label: 'Kadang-kadang lembur', value: 'occasional_overtime' },
      { label: 'Sering lembur tanpa kompensasi', value: 'frequent_unpaid' },
      { label: 'Selalu melebihi 8 jam', value: 'always_exceed' }
    ]
  },
  {
    id: 'kemnaker_2',
    question: 'Bagaimana penerapan hak cuti di tempat kerja Anda?',
    type: 'dropdown',
    options: [
      { label: 'Hak cuti diberikan sepenuhnya', value: 'full_rights' },
      { label: 'Cuti dibatasi perusahaan', value: 'limited' },
      { label: 'Sulit mengambil cuti', value: 'difficult' },
      { label: 'Tidak ada hak cuti', value: 'no_rights' }
    ]
  },
  {
    id: 'kemnaker_3',
    question: 'Apakah ada diskriminasi atau pelecehan di tempat kerja?',
    type: 'dropdown',
    options: [
      { label: 'Tidak ada sama sekali', value: 'none' },
      { label: 'Jarang terjadi', value: 'rare' },
      { label: 'Kadang-kadang terjadi', value: 'sometimes' },
      { label: 'Sering terjadi', value: 'frequent' }
    ]
  },
  {
    id: 'kemnaker_4',
    question: 'Jelaskan masalah ketenagakerjaan yang perlu ditindaklanjuti Kemnaker:',
    type: 'text',
    placeholder: 'Ceritakan masalah terkait pelanggaran UU Ketenagakerjaan, diskriminasi, atau hak pekerja...'
  }
];

export default function ForumScreen({ navigation }) {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [reporterName, setReporterName] = useState('');

  const getQuestionsForDepartment = (deptId) => {
    switch (deptId) {
      case 'hse': return hseQuestions;
      case 'disnaker': return disnakerQuestions;
      case 'kemnaker': return kemnakerQuestions;
      default: return [];
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmitForm = () => {
    if (!reporterName.trim()) {
      Alert.alert('Error', 'Nama pelapor harus diisi');
      return;
    }

    const questions = getQuestionsForDepartment(selectedDepartment.id);
    const unansweredQuestions = questions.filter(q => !formData[q.id] || formData[q.id].trim() === '');
    
    if (unansweredQuestions.length > 0) {
      Alert.alert('Error', 'Mohon jawab semua pertanyaan');
      return;
    }

    const submissionData = {
      department: selectedDepartment.id,
      reporterName,
      answers: formData,
      submittedAt: new Date().toISOString()
    };

    console.log('Forum Submission:', submissionData);
    
    Alert.alert(
      'Berhasil Dikirim!',
      `Laporan Anda telah dikirim ke ${selectedDepartment.name}. Tim akan meninjau dan memberikan tanggapan segera.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setShowForm(false);
            setSelectedDepartment(null);
            setFormData({});
            setReporterName('');
          }
        }
      ]
    );
  };

  const renderQuestion = (question) => {
    if (question.type === 'dropdown') {
      return (
        <View key={question.id} style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.question}</Text>
          <Dropdown
            style={styles.dropdown}
            data={question.options}
            labelField="label"
            valueField="value"
            value={formData[question.id]}
            onChange={item => handleAnswerChange(question.id, item.value)}
            placeholder="Pilih jawaban..."
          />
        </View>
      );
    } else if (question.type === 'text') {
      return (
        <View key={question.id} style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.question}</Text>
          <TextInput
            style={styles.textInput}
            placeholder={question.placeholder}
            value={formData[question.id] || ''}
            onChangeText={value => handleAnswerChange(question.id, value)}
            multiline
            numberOfLines={4}
          />
        </View>
      );
    }
  };

  if (showForm && selectedDepartment) {
    const questions = getQuestionsForDepartment(selectedDepartment.id);
    
    return (
      <ScrollView style={styles.container}>
        {/* Form Header */}
        <View style={[styles.formHeader, { backgroundColor: selectedDepartment.color }]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => {
              setShowForm(false);
              setSelectedDepartment(null);
            }}
          >
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Icon name={selectedDepartment.icon} size={30} color="#fff" />
            <Text style={styles.formHeaderTitle}>{selectedDepartment.name}</Text>
            <Text style={styles.formHeaderSubtitle}>{selectedDepartment.description}</Text>
          </View>
        </View>

        <View style={styles.formContent}>
          <Text style={styles.formIntro}>
            Silakan isi formulir berikut untuk menyampaikan pertanyaan atau keluhan Anda kepada {selectedDepartment.name}
          </Text>

          {/* Reporter Name */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>Nama Pelapor *</Text>
            <TextInput
              style={styles.nameInput}
              placeholder="Masukkan nama lengkap Anda"
              value={reporterName}
              onChangeText={setReporterName}
            />
          </View>

          {/* Department Specific Questions */}
          {questions.map(renderQuestion)}

          {/* Submit Button */}
          <TouchableOpacity 
            style={[styles.submitButton, { backgroundColor: selectedDepartment.color }]}
            onPress={handleSubmitForm}
          >
            <Icon name="send" size={20} color="#fff" style={styles.submitIcon} />
            <Text style={styles.submitButtonText}>Kirim ke {selectedDepartment.name}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="forum" size={30} color="#fff" />
        <Text style={styles.headerTitle}>DIALOG FORUM</Text>
        <Text style={styles.headerSubtitle}>Konsultasi dengan Instansi Terkait</Text>
      </View>

      {/* Department Selection */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Pilih Instansi Tujuan</Text>
        <Text style={styles.sectionDescription}>
          Pilih instansi yang sesuai dengan pertanyaan atau keluhan Anda
        </Text>

        {departments.map((dept) => (
          <TouchableOpacity
            key={dept.id}
            style={[styles.departmentCard, { borderLeftColor: dept.color }]}
            onPress={() => {
              setSelectedDepartment(dept);
              setShowForm(true);
            }}
          >
            <View style={[styles.departmentIcon, { backgroundColor: dept.color }]}>
              <Icon name={dept.icon} size={24} color="#fff" />
            </View>
            <View style={styles.departmentInfo}>
              <Text style={styles.departmentName}>{dept.name}</Text>
              <Text style={styles.departmentDescription}>{dept.description}</Text>
              
              {/* Department specific info */}
              {dept.id === 'hse' && (
                <View style={styles.topicsList}>
                  <Text style={styles.topicsTitle}>Topik yang dapat dikonsultasikan:</Text>
                  <Text style={styles.topicsText}>• Kecelakaan kerja dan pencegahan</Text>
                  <Text style={styles.topicsText}>• Alat Pelindung Diri (APD)</Text>
                  <Text style={styles.topicsText}>• Pelatihan K3</Text>
                  <Text style={styles.topicsText}>• Lingkungan kerja yang aman</Text>
                </View>
              )}
              
              {dept.id === 'disnaker' && (
                <View style={styles.topicsList}>
                  <Text style={styles.topicsTitle}>Topik yang dapat dikonsultasikan:</Text>
                  <Text style={styles.topicsText}>• Kontrak kerja dan perjanjian</Text>
                  <Text style={styles.topicsText}>• Upah dan pembayaran</Text>
                  <Text style={styles.topicsText}>• Jaminan sosial (BPJS)</Text>
                  <Text style={styles.topicsText}>• Hubungan industrial</Text>
                </View>
              )}
              
              {dept.id === 'kemnaker' && (
                <View style={styles.topicsList}>
                  <Text style={styles.topicsTitle}>Topik yang dapat dikonsultasikan:</Text>
                  <Text style={styles.topicsText}>• Pelanggaran UU Ketenagakerjaan</Text>
                  <Text style={styles.topicsText}>• Jam kerja dan lembur</Text>
                  <Text style={styles.topicsText}>• Hak cuti dan istirahat</Text>
                  <Text style={styles.topicsText}>• Diskriminasi di tempat kerja</Text>
                </View>
              )}
            </View>
            <Icon name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
        ))}

        {/* Info Section */}
        <View style={styles.infoBox}>
          <Icon name="info" size={20} color="#2196F3" />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Informasi Penting</Text>
            <Text style={styles.infoText}>
              • Semua laporan akan ditangani dengan kerahasiaan
            </Text>
            <Text style={styles.infoText}>
              • Respons akan diberikan dalam 1-3 hari kerja
            </Text>
            <Text style={styles.infoText}>
              • Untuk kasus darurat, hubungi hotline terkait
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#9C27B0',
    padding: 30,
    paddingTop: 50,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 25,
    lineHeight: 20,
  },
  departmentCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
  },
  departmentIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  departmentInfo: {
    flex: 1,
  },
  departmentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  departmentDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  topicsList: {
    marginTop: 8,
  },
  topicsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  topicsText: {
    fontSize: 11,
    color: '#666',
    marginBottom: 2,
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    marginTop: 20,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 12,
    color: '#1976D2',
    marginBottom: 2,
  },
  // Form Styles
  formHeader: {
    padding: 30,
    paddingTop: 50,
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
    padding: 5,
  },
  headerContent: {
    alignItems: 'center',
  },
  formHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  formHeaderSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  },
  formContent: {
    padding: 20,
  },
  formIntro: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    lineHeight: 22,
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
  textInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  nameInput: {
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
  submitButton: {
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
