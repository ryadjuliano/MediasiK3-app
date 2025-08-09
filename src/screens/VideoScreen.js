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
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

export default function VideoScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Semua', icon: 'video-library', color: '#667eea' },
    { id: 'safety', name: 'Keselamatan', icon: 'security', color: '#ef4444' },
    { id: 'health', name: 'Kesehatan', icon: 'local-hospital', color: '#10b981' },
    { id: 'training', name: 'Pelatihan', icon: 'school', color: '#f59e0b' },
    { id: 'equipment', name: 'APD', icon: 'construction', color: '#8b5cf6' },
  ];

  const educationData = [
    {
      id: '1',
      title: 'Panduan Lengkap Penggunaan APD untuk Pekerja Las',
      description: 'Video tutorial komprehensif tentang cara menggunakan Alat Pelindung Diri yang benar untuk kegiatan pengelasan.',
      category: 'equipment',
      duration: '12:45',
      publishDate: '15 Januari 2024',
      author: 'Tim K3 MediasiK3',
      views: 2456,
      likes: 189,
      thumbnail: 'https://picsum.photos/400/225?random=1',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      tags: ['APD', 'Pengelasan', 'Tutorial'],
      difficulty: 'Pemula',
      isPopular: true,
      rating: 4.8,
    },
    {
      id: '2',
      title: 'Teknik Keselamatan Kerja di Ketinggian',
      description: 'Pelajari prosedur keselamatan yang harus diterapkan saat bekerja di ketinggian untuk mencegah kecelakaan kerja.',
      category: 'safety',
      duration: '18:30',
      publishDate: '12 Januari 2024',
      author: 'Safety Expert Indonesia',
      views: 3204,
      likes: 256,
      thumbnail: 'https://picsum.photos/400/225?random=2',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      tags: ['Ketinggian', 'Keselamatan', 'Prosedur'],
      difficulty: 'Menengah',
      isPopular: true,
      rating: 4.9,
    },
    {
      id: '3',
      title: 'Manajemen Stres dan Kesehatan Mental Pekerja',
      description: 'Tips dan strategi untuk menjaga kesehatan mental di lingkungan kerja yang menantang.',
      category: 'health',
      duration: '15:20',
      publishDate: '10 Januari 2024',
      author: 'Psikolog Industri',
      views: 1876,
      likes: 142,
      thumbnail: 'https://picsum.photos/400/225?random=3',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      tags: ['Mental Health', 'Stres', 'Wellbeing'],
      difficulty: 'Pemula',
      isPopular: false,
      rating: 4.6,
    },
    {
      id: '4',
      title: 'Sertifikasi K3 untuk Supervisor Lapangan',
      description: 'Program pelatihan intensif untuk supervisor yang ingin mendapatkan sertifikasi keselamatan kerja.',
      category: 'training',
      duration: '45:15',
      publishDate: '8 Januari 2024',
      author: 'Institut Pelatihan K3',
      views: 987,
      likes: 78,
      thumbnail: 'https://picsum.photos/400/225?random=4',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      tags: ['Sertifikasi', 'Supervisor', 'Pelatihan'],
      difficulty: 'Lanjutan',
      isPopular: false,
      rating: 4.7,
    },
    {
      id: '5',
      title: 'Identifikasi dan Penanganan Bahaya Kimia',
      description: 'Panduan lengkap mengidentifikasi dan menangani bahaya kimia di tempat kerja dengan aman.',
      category: 'safety',
      duration: '22:40',
      publishDate: '5 Januari 2024',
      author: 'Chemical Safety Expert',
      views: 1543,
      likes: 118,
      thumbnail: 'https://picsum.photos/400/225?random=5',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      tags: ['Kimia', 'Bahaya', 'Penanganan'],
      difficulty: 'Menengah',
      isPopular: false,
      rating: 4.5,
    },
    {
      id: '6',
      title: 'Ergonomi dan Pencegahan Cedera Tulang Belakang',
      description: 'Tips ergonomi untuk mencegah cedera tulang belakang dan menjaga postur yang baik saat bekerja.',
      category: 'health',
      duration: '14:10',
      publishDate: '3 Januari 2024',
      author: 'Fisioterapis Okupasi',
      views: 2102,
      likes: 167,
      thumbnail: 'https://picsum.photos/400/225?random=6',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      tags: ['Ergonomi', 'Postur', 'Pencegahan'],
      difficulty: 'Pemula',
      isPopular: true,
      rating: 4.8,
    },
  ];

  const filteredData = educationData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Pemula': return '#10b981';
      case 'Menengah': return '#f59e0b';
      case 'Lanjutan': return '#ef4444';
      default: return '#94a3b8';
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

  const renderVideoCard = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.videoCard}
      onPress={() => navigation.navigate('VideoShow', { 
        videoUrl: item.videoUrl, 
        title: item.title,
        videoData: item
      })}
      activeOpacity={0.8}
    >
      <View style={styles.videoThumbnailContainer}>
        <Image source={{ uri: item.thumbnail }} style={styles.videoThumbnail} />
        <View style={styles.playButton}>
          <Icon name="play-arrow" size={32} color="#fff" />
        </View>
        <View style={styles.videoDuration}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
        {item.isPopular && (
          <View style={styles.popularBadge}>
            <Icon name="trending-up" size={14} color="#fff" />
            <Text style={styles.popularText}>Populer</Text>
          </View>
        )}
      </View>
      
      <View style={styles.videoContent}>
        <View style={styles.videoHeader}>
          <Text style={styles.videoTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
            <Text style={styles.difficultyText}>{item.difficulty}</Text>
          </View>
        </View>
        
        <Text style={styles.videoDescription} numberOfLines={3}>
          {item.description}
        </Text>
        
        <View style={styles.videoMeta}>
          <View style={styles.metaRow}>
            <Icon name="person" size={14} color="#64748b" />
            <Text style={styles.metaText}>{item.author}</Text>
          </View>
          <View style={styles.metaRow}>
            <Icon name="calendar-today" size={14} color="#64748b" />
            <Text style={styles.metaText}>{item.publishDate}</Text>
          </View>
        </View>
        
        <View style={styles.videoStats}>
          <View style={styles.statItem}>
            <Icon name="visibility" size={16} color="#64748b" />
            <Text style={styles.statText}>{item.views.toLocaleString()}</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="thumb-up" size={16} color="#64748b" />
            <Text style={styles.statText}>{item.likes}</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="star" size={16} color="#f59e0b" />
            <Text style={styles.statText}>{item.rating}</Text>
          </View>
        </View>
        
        <View style={styles.videoTags}>
          {item.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFeaturedVideo = () => {
    const featured = educationData.find(item => item.isPopular);
    if (!featured) return null;

    return (
      <TouchableOpacity
        style={styles.featuredCard}
        onPress={() => navigation.navigate('VideoShow', { 
          videoUrl: featured.videoUrl, 
          title: featured.title,
          videoData: featured
        })}
        activeOpacity={0.8}
      >
        <Image source={{ uri: featured.thumbnail }} style={styles.featuredImage} />
        <View style={styles.featuredOverlay}>
          <View style={styles.featuredPlayButton}>
            <Icon name="play-arrow" size={40} color="#fff" />
          </View>
          <View style={styles.featuredContent}>
            <View style={styles.featuredBadge}>
              <Icon name="star" size={16} color="#fff" />
              <Text style={styles.featuredBadgeText}>Video Pilihan</Text>
            </View>
            <Text style={styles.featuredTitle}>{featured.title}</Text>
            <View style={styles.featuredMeta}>
              <Text style={styles.featuredDuration}>{featured.duration}</Text>
              <Text style={styles.featuredViews}>{featured.views.toLocaleString()} views</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>KENALAN YUK!</Text>
            <Text style={styles.headerSubtitle}>Video Edukasi Keselamatan & Kesehatan Kerja</Text>
          </View>
          <TouchableOpacity style={styles.searchHeaderButton}>
            <Icon name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color="#94a3b8" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari video edukasi K3..."
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

        {/* Featured Video */}
        {/* <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Video Pilihan</Text>
          {renderFeaturedVideo()}
        </View> */}

        {/* Categories */}
        {/* <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Kategori</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          >
            {categories.map((category, index) => renderCategoryItem({ item: category, index }))}
          </ScrollView>
        </View> */}

        {/* Video Library */}
        <View style={styles.videosSection}>
          {/* <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'all' ? 'Semua Video' : categories.find(c => c.id === selectedCategory)?.name}
            </Text>
            <Text style={styles.resultCount}>
              {filteredData.length} video
            </Text>
          </View> */}
          
          <View style={styles.videosGrid}>
            {filteredData.map(renderVideoCard)}
          </View>
        </View>

        {/* Learning Tips */}
        <View style={styles.tipsSection}>
          <View style={styles.tipsCard}>
            <View style={styles.tipsHeader}>
              <Icon name="lightbulb" size={20} color="#f59e0b" />
              <Text style={styles.tipsTitle}>Tips Belajar Efektif</Text>
            </View>
            <View style={styles.tipsList}>
              <Text style={styles.tipItem}>• Tonton video dengan konsentrasi penuh</Text>
              <Text style={styles.tipItem}>• Catat poin-poin penting selama menonton</Text>
              <Text style={styles.tipItem}>• Diskusikan materi dengan rekan kerja</Text>
              <Text style={styles.tipItem}>• Praktikkan langsung di lapangan dengan pengawasan</Text>
            </View>
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
  searchHeaderButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
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

  // Sections
  featuredSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  categoriesSection: {
    marginBottom: 32,
  },
  videosSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  tipsSection: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 16,
    paddingHorizontal: 24,
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

  // Featured Video
  featuredCard: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  featuredImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#e2e8f0',
  },
  featuredOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredPlayButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  featuredContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f59e0b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  featuredBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 4,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  featuredMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  featuredDuration: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  featuredViews: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },

  // Categories
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

  // Video Cards
  videosGrid: {
    gap: 20,
  },
  videoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  videoThumbnailContainer: {
    position: 'relative',
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: '#e2e8f0',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -30 }, { translateY: -30 }],
  },
  videoDuration: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  durationText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  popularBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 4,
  },
  videoContent: {
    padding: 16,
  },
  videoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  videoTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#1a202c',
    lineHeight: 24,
    marginRight: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  videoDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  videoMeta: {
    gap: 8,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 6,
  },
  videoStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
    fontWeight: '500',
  },
  videoTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '500',
  },

  // Tips Section
  tipsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f59e0b',
    marginLeft: 8,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});