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
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

export default function InformationScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Semua', icon: 'apps', color: '#667eea' },
    { id: 'safety', name: 'Keselamatan', icon: 'security', color: '#ef4444' },
    { id: 'health', name: 'Kesehatan', icon: 'local-hospital', color: '#10b981' },
    { id: 'regulation', name: 'Regulasi', icon: 'gavel', color: '#f59e0b' },
    { id: 'training', name: 'Pelatihan', icon: 'school', color: '#8b5cf6' },
  ];

  const informationData = [
    {
      id: '1',
      title: 'Panduan Lengkap Penggunaan APD di Tempat Kerja',
      description: 'Pelajari cara yang benar menggunakan Alat Pelindung Diri untuk menjamin keselamatan Anda di area kerja.',
      category: 'safety',
      readTime: '8 menit',
      publishDate: '15 Januari 2024',
      author: 'Tim K3 MediasiK3',
      tags: ['APD', 'Keselamatan', 'Prosedur'],
      image: 'https://picsum.photos/400/250?random=1',
      priority: 'high',
      views: 1245,
    },
    {
      id: '2',
      title: 'Identifikasi dan Penanganan Bahaya di Area Konstruksi',
      description: 'Panduan komprehensif untuk mengidentifikasi potensi bahaya dan cara penanganan yang tepat.',
      category: 'safety',
      readTime: '12 menit',
      publishDate: '12 Januari 2024',
      author: 'Dr. Safety Expert',
      tags: ['Konstruksi', 'Bahaya', 'Identifikasi'],
      image: 'https://picsum.photos/400/250?random=2',
      priority: 'high',
      views: 987,
    },
    {
      id: '3',
      title: 'Protokol Kesehatan Kerja Terbaru 2024',
      description: 'Update terbaru mengenai protokol kesehatan kerja yang wajib diterapkan di semua industri.',
      category: 'health',
      readTime: '6 menit',
      publishDate: '10 Januari 2024',
      author: 'Kementerian Kesehatan',
      tags: ['Protokol', 'Kesehatan', '2024'],
      image: 'https://picsum.photos/400/250?random=3',
      priority: 'medium',
      views: 756,
    },
    {
      id: '4',
      title: 'Peraturan Baru UU Ketenagakerjaan tentang K3',
      description: 'Ringkasan lengkap peraturan terbaru yang mengatur keselamatan dan kesehatan kerja.',
      category: 'regulation',
      readTime: '15 menit',
      publishDate: '8 Januari 2024',
      author: 'Tim Legal K3',
      tags: ['UU', 'Ketenagakerjaan', 'Regulasi'],
      image: 'https://picsum.photos/400/250?random=4',
      priority: 'high',
      views: 1432,
    },
    {
      id: '5',
      title: 'Program Pelatihan K3 untuk Supervisor',
      description: 'Informasi lengkap tentang program pelatihan khusus untuk supervisor dan pengawas lapangan.',
      category: 'training',
      readTime: '10 menit',
      publishDate: '5 Januari 2024',
      author: 'Institut Pelatihan K3',
      tags: ['Pelatihan', 'Supervisor', 'Sertifikasi'],
      image: 'https://picsum.photos/400/250?random=5',
      priority: 'medium',
      views: 634,
    },
    {
      id: '6',
      title: 'Tips Menjaga Kesehatan Mental di Tempat Kerja',
      description: 'Panduan praktis untuk menjaga kesehatan mental dan mengatasi stress di lingkungan kerja.',
      category: 'health',
      readTime: '7 menit',
      publishDate: '3 Januari 2024',
      author: 'Psikolog Industri',
      tags: ['Mental Health', 'Stress', 'Wellbeing'],
      image: 'https://picsum.photos/400/250?random=6',
      priority: 'medium',
      views: 892,
    },
  ];

  const filteredData = informationData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#94a3b8';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return 'Penting';
      case 'medium': return 'Sedang';
      case 'low': return 'Biasa';
      default: return '';
    }
  };

  const renderCategoryItem = ({ item, index }) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.categoryChip,
        selectedCategory === item.id && [styles.categoryChipActive, { backgroundColor: item.color }]
      ]}
      onPress={() => setSelectedCategory(item.id)}
      activeOpacity={0.7}
    >
      <Icon
        name={item.icon}
        size={16}
        color={selectedCategory === item.id ? '#fff' : item.color}
        style={styles.categoryIcon}
      />
      <Text style={[
        styles.categoryText,
        selectedCategory === item.id && styles.categoryTextActive
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderInformationCard = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.informationCard}
      onPress={() => navigation.navigate('InformationDetail', { ...item })}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.priorityBadge}>
          <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(item.priority) }]} />
          <Text style={styles.priorityText}>{getPriorityText(item.priority)}</Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.cardMeta}>
          <View style={styles.metaItem}>
            <Icon name="schedule" size={14} color="#94a3b8" />
            <Text style={styles.metaText}>{item.readTime}</Text>
          </View>
          <View style={styles.metaItem}>
            <Icon name="visibility" size={14} color="#94a3b8" />
            <Text style={styles.metaText}>{item.views}</Text>
          </View>
          <View style={styles.metaItem}>
            <Icon name="calendar-today" size={14} color="#94a3b8" />
            <Text style={styles.metaText}>{item.publishDate}</Text>
          </View>
        </View>
        
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        
        <Text style={styles.cardDescription} numberOfLines={3}>
          {item.description}
        </Text>
        
        <View style={styles.cardTags}>
          {item.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.cardFooter}>
          <View style={styles.authorInfo}>
            <Icon name="person" size={16} color="#64748b" />
            <Text style={styles.authorText}>{item.author}</Text>
          </View>
          <Icon name="arrow-forward" size={20} color="#667eea" />
        </View>
      </View>
    </TouchableOpacity>
  );

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
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>INFORMASI K3</Text>
            <Text style={styles.headerSubtitle}>Update Terbaru Keselamatan & Kesehatan Kerja</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications" size={24} color="#fff" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color="#94a3b8" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari informasi K3..."
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery('')}
                style={styles.clearButton}
              >
                <Icon name="close" size={18} color="#94a3b8" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Kategori</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          >
            {categories.map((category, index) => renderCategoryItem({ item: category, index }))}
          </ScrollView>
        </View>

        {/* Information Cards */}
        <View style={styles.informationSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'all' ? 'Semua Informasi' : categories.find(c => c.id === selectedCategory)?.name}
            </Text>
            <Text style={styles.resultCount}>
              {filteredData.length} artikel
            </Text>
          </View>
          
          <View style={styles.informationGrid}>
            {filteredData.map(renderInformationCard)}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Akses Cepat</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#ef4444' }]}>
                <Icon name="emergency" size={24} color="#fff" />
              </View>
              <Text style={styles.quickActionText}>Prosedur Darurat</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#10b981' }]}>
                <Icon name="local-hospital" size={24} color="#fff" />
              </View>
              <Text style={styles.quickActionText}>P3K</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#f59e0b' }]}>
                <Icon name="contact-phone" size={24} color="#fff" />
              </View>
              <Text style={styles.quickActionText}>Kontak Darurat</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#8b5cf6' }]}>
                <Icon name="library-books" size={24} color="#fff" />
              </View>
              <Text style={styles.quickActionText}>Manual K3</Text>
            </TouchableOpacity>
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
    justifyContent: 'space-between',
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
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },

  // Search
  searchSection: {
    paddingHorizontal: 24,
    marginTop: -16,
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 48,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1a202c',
  },
  clearButton: {
    padding: 4,
  },

  // Categories
  categoriesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  categoryChipActive: {
    elevation: 4,
    shadowOpacity: 0.2,
  },
  categoryIcon: {
    marginRight: 6,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  categoryTextActive: {
    color: '#fff',
  },

  // Information Section
  informationSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultCount: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  informationGrid: {
    gap: 16,
  },

  // Information Card
  informationCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 16,
  },
  cardHeader: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#e2e8f0',
  },
  priorityBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  priorityText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  cardContent: {
    padding: 16,
  },
  cardMeta: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#94a3b8',
    marginLeft: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 8,
    lineHeight: 24,
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 6,
  },
  tag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 6,
  },

  // Quick Actions
  quickActionsSection: {
    paddingHorizontal: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
    textAlign: 'center',
  },
});