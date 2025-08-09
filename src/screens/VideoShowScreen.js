import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Alert,
  Share,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

export default function VideoShowScreen({ route, navigation }) {
  const { videoUrl, title, videoData } = route.params;
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [quality, setQuality] = useState('Auto');

  // Mock related videos
  const relatedVideos = [
    {
      id: 'r1',
      title: 'Teknik Pengelasan yang Aman dan Efektif',
      duration: '8:45',
      views: 1245,
      author: 'Safety Expert',
      thumbnail: 'https://picsum.photos/200/112?random=10',
    },
    {
      id: 'r2',
      title: 'Pemeliharaan APD untuk Pekerja Las',
      duration: '6:30',
      views: 987,
      author: 'Equipment Specialist',
      thumbnail: 'https://picsum.photos/200/112?random=11',
    },
    {
      id: 'r3',
      title: 'Standar Keselamatan Ruang Terbatas',
      duration: '12:15',
      views: 2103,
      author: 'K3 Inspector',
      thumbnail: 'https://picsum.photos/200/112?random=12',
    },
  ];

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // In real app, send to backend
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    Alert.alert(
      isSaved ? 'Dihapus dari Playlist' : 'Disimpan ke Playlist',
      isSaved ? 'Video telah dihapus dari playlist Anda' : 'Video telah disimpan ke playlist Anda'
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Tonton video edukasi K3: ${title}`,
        url: videoUrl,
        title: title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleDownload = () => {
    Alert.alert(
      'Download Video',
      'Fitur download akan segera tersedia untuk member premium.',
      [{ text: 'OK' }]
    );
  };

  const handlePlaybackSpeed = () => {
    const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    const currentIndex = speeds.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackRate(speeds[nextIndex]);
  };

  const handleQuality = () => {
    const qualities = ['Auto', '480p', '720p', '1080p'];
    const currentIndex = qualities.indexOf(quality);
    const nextIndex = (currentIndex + 1) % qualities.length;
    setQuality(qualities[nextIndex]);
  };

  const onLoad = (data) => {
    setDuration(data.duration);
  };

  const onProgress = (data) => {
    setCurrentTime(data.currentTime);
  };

  const renderVideoPlayer = () => (
    <View style={styles.videoContainer}>
      <Video
        source={{ uri: videoUrl }}
        style={styles.video}
        controls={false}
        resizeMode="contain"
        onLoad={onLoad}
        onProgress={onProgress}
        paused={!isPlaying}
        rate={playbackRate}
        onError={(error) => console.error('Video Error:', error)}
      />
      
      {/* Custom Controls Overlay */}
      <View style={styles.videoOverlay}>
        {/* Play/Pause Button */}
        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          <Icon 
            name={isPlaying ? 'pause' : 'play-arrow'} 
            size={40} 
            color="rgba(255,255,255,0.9)" 
          />
        </TouchableOpacity>
        
        {/* Top Controls */}
        <View style={styles.topControls}>
          <TouchableOpacity style={styles.controlButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="rgba(255,255,255,0.9)" />
          </TouchableOpacity>
          <View style={styles.topControlsRight}>
            <TouchableOpacity style={styles.controlButton} onPress={handleQuality}>
              <Text style={styles.qualityText}>{quality}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={handlePlaybackSpeed}>
              <Text style={styles.speedText}>{playbackRate}x</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(currentTime / duration) * 100}%` }
                ]} 
              />
            </View>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </Text>
            <TouchableOpacity onPress={() => setIsFullscreen(!isFullscreen)}>
              <Icon 
                name={isFullscreen ? 'fullscreen-exit' : 'fullscreen'} 
                size={20} 
                color="rgba(255,255,255,0.9)" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const renderVideoInfo = () => (
    <View style={styles.videoInfoContainer}>
      <Text style={styles.videoTitle}>{title}</Text>
      
      <View style={styles.videoMeta}>
        <View style={styles.metaLeft}>
          <Text style={styles.videoViews}>
            {formatNumber(videoData?.views || 1234)} views • {videoData?.publishDate || 'Hari ini'}
          </Text>
          <View style={styles.videoStats}>
            <View style={styles.statItem}>
              <Icon name="thumb-up" size={16} color="#64748b" />
              <Text style={styles.statText}>{videoData?.likes || 89}</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="star" size={16} color="#f59e0b" />
              <Text style={styles.statText}>{videoData?.rating || 4.8}</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, isLiked && styles.actionButtonActive]} 
          onPress={handleLike}
        >
          <Icon 
            name={isLiked ? 'thumb-up' : 'thumb-up'} 
            size={20} 
            color={isLiked ? '#667eea' : '#64748b'} 
          />
          <Text style={[styles.actionText, isLiked && styles.actionTextActive]}>
            {isLiked ? 'Disukai' : 'Suka'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, isSaved && styles.actionButtonActive]} 
          onPress={handleSave}
        >
          <Icon 
            name={isSaved ? 'bookmark' : 'bookmark-border'} 
            size={20} 
            color={isSaved ? '#667eea' : '#64748b'} 
          />
          <Text style={[styles.actionText, isSaved && styles.actionTextActive]}>
            {isSaved ? 'Tersimpan' : 'Simpan'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Icon name="share" size={20} color="#64748b" />
          <Text style={styles.actionText}>Bagikan</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
          <Icon name="download" size={20} color="#64748b" />
          <Text style={styles.actionText}>Download</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderVideoDescription = () => (
    <View style={styles.descriptionContainer}>
      <View style={styles.authorSection}>
        <View style={styles.authorAvatar}>
          <Icon name="person" size={24} color="#667eea" />
        </View>
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{videoData?.author || 'Tim K3 MediasiK3'}</Text>
          <Text style={styles.authorStats}>25.4K subscribers • 150 videos</Text>
        </View>
        <TouchableOpacity style={styles.subscribeButton}>
          <Text style={styles.subscribeText}>Subscribe</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.descriptionText}>
        {videoData?.description || 'Video tutorial komprehensif tentang keselamatan dan kesehatan kerja yang wajib diketahui oleh semua pekerja.'}
      </Text>
      
      {videoData?.tags && (
        <View style={styles.tagsContainer}>
          <Text style={styles.tagsLabel}>Tags:</Text>
          <View style={styles.tagsList}>
            {videoData.tags.map((tag, index) => (
              <TouchableOpacity key={index} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );

  const renderRelatedVideos = () => (
    <View style={styles.relatedContainer}>
      <Text style={styles.relatedTitle}>Video Terkait</Text>
      {relatedVideos.map((video) => (
        <TouchableOpacity key={video.id} style={styles.relatedVideo}>
          <View style={styles.relatedThumbnail}>
            <Icon name="play-circle-filled" size={24} color="rgba(255,255,255,0.9)" />
          </View>
          <View style={styles.relatedInfo}>
            <Text style={styles.relatedVideoTitle} numberOfLines={2}>
              {video.title}
            </Text>
            <Text style={styles.relatedVideoMeta}>
              {video.author} • {formatNumber(video.views)} views
            </Text>
            <Text style={styles.relatedVideoDuration}>{video.duration}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {renderVideoPlayer()}
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderVideoInfo()}
        {renderVideoDescription()}
        {/* {renderRelatedVideos()} */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },

  // Video Player
  videoContainer: {
    width: width,
    height: width * (9/16), // 16:9 aspect ratio
    backgroundColor: '#000',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -40 }, { translateY: -40 }],
  },
  topControls: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topControlsRight: {
    flexDirection: 'row',
    gap: 12,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qualityText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
  },
  speedText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#667eea',
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },

  // Video Info
  videoInfoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a202c',
    lineHeight: 28,
    marginBottom: 12,
  },
  videoMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  metaLeft: {
    flex: 1,
  },
  videoViews: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  videoStats: {
    flexDirection: 'row',
    gap: 16,
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  actionButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionButtonActive: {
    backgroundColor: '#f0f4ff',
  },
  actionText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    fontWeight: '500',
  },
  actionTextActive: {
    color: '#667eea',
  },

  // Description
  descriptionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 8,
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 2,
  },
  authorStats: {
    fontSize: 12,
    color: '#64748b',
  },
  subscribeButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  subscribeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  descriptionText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  tagsContainer: {
    marginTop: 8,
  },
  tagsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 8,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '500',
  },

  // Related Videos
  relatedContainer: {
    backgroundColor: '#fff',
    padding: 20,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 16,
  },
  relatedVideo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  relatedThumbnail: {
    width: 120,
    height: 68,
    borderRadius: 8,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  relatedInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  relatedVideoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a202c',
    lineHeight: 18,
    marginBottom: 4,
  },
  relatedVideoMeta: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  relatedVideoDuration: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '500',
  },
});