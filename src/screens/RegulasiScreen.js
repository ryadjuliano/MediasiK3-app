import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

export default function RegulasiScreen({ navigation }) {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const sopSections = [
    {
      id: 'kewajiban-aplikasi',
      title: '1. Kewajiban Penggunaan Aplikasi',
      icon: 'smartphone',
      color: '#667eea',
      items: [
        {
          title: 'Kewajiban menggunakan aplikasi',
          description: 'Setiap pekerja wajib menggunakan aplikasi MediasiK3 sebagai platform utama untuk pengelolaan keselamatan dan kesehatan kerja.',
          details: [
            'Instalasi aplikasi pada perangkat mobile pribadi',
            'Registrasi akun dengan data yang valid dan lengkap',
            'Pembaruan aplikasi secara berkala sesuai versi terbaru',
            'Penggunaan fitur-fitur aplikasi sesuai dengan prosedur yang ditetapkan'
          ]
        },
        {
          title: 'Kewajiban mengisi absensi',
          description: 'Pencatatan kehadiran harus dilakukan secara digital melalui fitur absensi aplikasi.',
          details: [
            'Check-in dan check-out harus dilakukan setiap hari kerja',
            'Pengambilan foto selfie sebagai verifikasi kehadiran',
            'Pencatatan lokasi GPS secara otomatis',
            'Laporan keterlambatan atau ketidakhadiran melalui aplikasi'
          ]
        },
        {
          title: 'Kewajiban melaporkan KK dan PAK',
          description: 'Pelaporan Kecelakaan Kerja (KK) dan Penyakit Akibat Kerja (PAK) wajib dilakukan segera.',
          details: [
            'Melaporkan insiden dalam waktu maksimal 24 jam',
            'Menyertakan dokumentasi foto dan deskripsi lengkap',
            'Mengisi formulir laporan dengan data yang akurat',
            'Follow-up laporan hingga penyelesaian kasus'
          ]
        }
      ]
    },
    {
      id: 'kewajiban-perusahaan',
      title: '2. Kewajiban Perusahaan',
      icon: 'business',
      color: '#10b981',
      items: [
        {
          title: 'Memberikan APD (Alat Pelindung Diri) secara cuma-cuma',
          description: 'Perusahaan berkewajiban menyediakan APD yang sesuai standar untuk semua pekerja tanpa dipungut biaya.',
          details: [
            'Penyediaan APD sesuai dengan jenis pekerjaan dan risiko',
            'APD harus memenuhi standar SNI atau standar internasional',
            'Penggantian APD yang rusak atau tidak layak pakai',
            'Pelatihan penggunaan APD yang benar dan aman',
            'Monitoring dan evaluasi penggunaan APD secara berkala'
          ]
        }
      ]
    },
    {
      id: 'sanksi',
      title: '3. Sanksi',
      icon: 'gavel',
      color: '#ef4444',
      items: [
        {
          title: 'Sanksi pelanggaran bagi perusahaan',
          description: 'Perusahaan yang melanggar ketentuan K3 akan dikenakan sanksi sesuai peraturan perundang-undangan.',
          details: [
            'Teguran tertulis untuk pelanggaran ringan',
            'Denda administratif sesuai tingkat pelanggaran',
            'Penghentian sementara kegiatan operasional',
            'Pencabutan izin usaha untuk pelanggaran berat',
            'Tuntutan pidana sesuai dengan ketentuan hukum yang berlaku'
          ]
        },
        {
          title: 'Sanksi pelanggaran bagi welder',
          description: 'Pekerja las yang melanggar prosedur K3 akan dikenakan sanksi sesuai tingkat pelanggaran.',
          details: [
            'Teguran lisan untuk pelanggaran ringan pertama kali',
            'Teguran tertulis untuk pelanggaran berulang',
            'Pemotongan insentif keselamatan kerja',
            'Penundaan kenaikan jabatan atau gaji',
            'Pemutusan hubungan kerja untuk pelanggaran berat yang membahayakan'
          ]
        }
      ]
    }
  ];

  const renderSectionHeader = (section) => (
    <TouchableOpacity
      key={section.id}
      style={[styles.sectionHeader, { borderLeftColor: section.color }]}
      onPress={() => toggleSection(section.id)}
      activeOpacity={0.7}
    >
      <View style={styles.sectionHeaderLeft}>
        <View style={[styles.sectionIcon, { backgroundColor: section.color }]}>
          <Icon name={section.icon} size={24} color="#fff" />
        </View>
        <Text style={styles.sectionTitle}>{section.title}</Text>
      </View>
      <Icon
        name={expandedSections[section.id] ? 'expand-less' : 'expand-more'}
        size={24}
        color="#64748b"
      />
    </TouchableOpacity>
  );

  const renderSectionContent = (section) => {
    if (!expandedSections[section.id]) return null;

    return (
      <View key={`${section.id}-content`} style={styles.sectionContent}>
        {section.items.map((item, index) => (
          <View key={index} style={styles.sopItem}>
            <View style={styles.sopHeader}>
              <View style={styles.bulletPoint}>
                <Text style={styles.bulletText}>{String.fromCharCode(65 + index)}</Text>
              </View>
              <View style={styles.sopHeaderContent}>
                <Text style={styles.sopTitle}>{item.title}</Text>
                <Text style={styles.sopDescription}>{item.description}</Text>
              </View>
            </View>
            
            <View style={styles.detailsList}>
              {item.details.map((detail, detailIndex) => (
                <View key={detailIndex} style={styles.detailItem}>
                  <View style={styles.detailBullet} />
                  <Text style={styles.detailText}>{detail}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
                {/* Header */}
        <View style={styles.header}>
          {/* <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity> */}
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>REGULASI K3</Text>
            <Text style={styles.headerSubtitle}>Standard Operating Procedure</Text>
          </View>
        </View>

        {/* Document Info */}
        <View style={styles.documentInfo}>
          <View style={styles.documentHeader}>
            <View style={styles.documentIcon}>
              <Icon name="description" size={32} color="#667eea" />
            </View>
            <View style={styles.documentMeta}>
              <Text style={styles.documentTitle}>SOP Keselamatan & Kesehatan Kerja</Text>
              <Text style={styles.documentSubtitle}>MediasiK3 Platform</Text>
              <View style={styles.documentTags}>
                <View style={styles.tag}>
                  <Icon name="verified" size={14} color="#10b981" />
                  <Text style={styles.tagText}>Verified</Text>
                </View>
                <View style={[styles.tag, { backgroundColor: '#fef3c7' }]}>
                  <Icon name="update" size={14} color="#f59e0b" />
                  <Text style={[styles.tagText, { color: '#f59e0b' }]}>v1.0</Text>
                </View>
              </View>
            </View>
          </View>
          
          <Text style={styles.documentDescription}>
            Dokumen ini mengatur standar operasional prosedur keselamatan dan kesehatan kerja 
            yang wajib dipatuhi oleh seluruh pekerja dan perusahaan dalam menggunakan platform MediasiK3.
          </Text>
        </View>

        {/* SOP Content */}
        <View style={styles.sopContainer}>
          <Text style={styles.sopMainTitle}>Ketentuan & Prosedur</Text>
          
          {sopSections.map((section) => (
            <View key={section.id} style={styles.section}>
              {renderSectionHeader(section)}
              {renderSectionContent(section)}
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerInfo}>
            <Icon name="info" size={20} color="#64748b" />
            <Text style={styles.footerText}>
              Dokumen ini berlaku efektif sejak tanggal dikeluarkan dan wajib dipatuhi oleh semua pihak terkait.
            </Text>
          </View>
          
          <View style={styles.signature}>
            <Text style={styles.signatureTitle}>Disetujui oleh:</Text>
            <Text style={styles.signatureName}>Tim Manajemen K3</Text>
            <Text style={styles.signatureDate}>MediasiK3 Platform • 2024</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },

  // Header
  header: {
    backgroundColor: '#667eea',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '400',
  },

  // Document Info
  documentInfo: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginTop: -16,
    borderRadius: 20,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  documentHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  documentIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  documentMeta: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 4,
  },
  documentSubtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 8,
  },
  documentTags: {
    flexDirection: 'row',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '500',
    marginLeft: 4,
  },
  documentDescription: {
    fontSize: 16,
    color: '#4a5568',
    lineHeight: 24,
    textAlign: 'justify',
  },

  // SOP Container
  sopContainer: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  sopMainTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 20,
  },

  // Section
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a202c',
    flex: 1,
  },

  // Section Content
  sectionContent: {
    backgroundColor: '#fff',
    marginTop: 8,
    borderRadius: 16,
    padding: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  sopItem: {
    marginBottom: 24,
  },
  sopHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  bulletPoint: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  bulletText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  sopHeaderContent: {
    flex: 1,
  },
  sopTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 8,
  },
  sopDescription: {
    fontSize: 16,
    color: '#4a5568',
    lineHeight: 24,
  },

  // Details List
  detailsList: {
    marginLeft: 48,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  detailBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#94a3b8',
    marginRight: 12,
    marginTop: 8,
  },
  detailText: {
    flex: 1,
    fontSize: 15,
    color: '#64748b',
    lineHeight: 22,
  },

  // Footer
  footer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#06b6d4',
  },
  footerText: {
    flex: 1,
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginLeft: 12,
  },
  signature: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  signatureTitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  signatureName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 4,
  },
  signatureDate: {
    fontSize: 14,
    color: '#94a3b8',
  },
});