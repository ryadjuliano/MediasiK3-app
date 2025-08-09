import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Platform, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AbsensiScreen from '../screens/AbsensiScreen';
import VideoScreen from '../screens/VideoScreen';
import LaporanScreen from '../screens/LaporanScreen';
import VideoShowScreen from '../screens/VideoShowScreen'; 
import RegulasiScreen from '../screens/RegulasiScreen';
import ForumScreen from '../screens/ForumScreen';
import TambahLaporanScreen from '../screens/TambahLaporanScreen';
import QuizScreen from '../screens/QuizScreen';
import QuizDetailScreen from '../screens/QuizDetailScreen';
import InformationScreen from '../screens/InformationScreen';
import InformationDetailScreen from '../screens/InformationDetailScreen';
import BriefingScreen from '../screens/BriefingScreen';

const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Custom Tab Bar Label Component
const TabLabel = ({ focused, title }) => (
  <Text style={{
    fontSize: 12,
    fontWeight: focused ? '600' : '500',
    color: focused ? '#667eea' : '#94a3b8',
    marginTop: 4,
    textAlign: 'center',
  }}>
    {title}
  </Text>
);

// Custom Tab Icon Component
const TabIcon = ({ focused, iconName, size = 24 }) => (
  <View style={{
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: focused ? 'rgba(102, 126, 234, 0.15)' : 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  }}>
    <Icon 
      name={iconName} 
      size={size} 
      color={focused ? '#667eea' : '#94a3b8'} 
    />
  </View>
);

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'home';
          }

          return <TabIcon focused={focused} iconName={iconName} size={size} />;
        },
        tabBarLabel: ({ focused }) => {
          let title;
          
          switch (route.name) {
            case 'Home':
              title = 'Beranda';
              break;
            case 'Profile':
              title = 'Profil';
              break;
            default:
              title = route.name;
          }

          return <TabLabel focused={focused} title={title} />;
        },
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 90 : 70,
          // paddingTop: 10,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          paddingHorizontal: 20,
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f1f5f9',
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarItemStyle: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 8,
          borderRadius: 16,
          marginHorizontal: 8,
        },
        tabBarActiveTintColor: '#667eea',
        tabBarInactiveTintColor: '#94a3b8',
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarAccessibilityLabel: 'Beranda',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarAccessibilityLabel: 'Profil Pengguna',
        }}
      />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#667eea',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        gestureEnabled: true,
        animation: 'slide_from_right',
      }}
    >
      {/* Bottom Tabs as Main Screen */}
      <Stack.Screen
        name="MainTabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />

      {/* Video & Education Screens */}
      <Stack.Screen
        name="Video"
        component={VideoScreen}
        options={{
          title: 'KENALAN YUK!',
          headerRight: () => (
            <View style={{ marginRight: 4 }}>
              <Icon name="school" size={24} color="#ffffff" />
            </View>
          ),
        }}
      />
      
      <Stack.Screen
        name="VideoShow"
        component={VideoShowScreen}
        options={{
          presentation: 'modal',
          title: 'Video Edukasi',
          headerStyle: {
            backgroundColor: '#1a202c',
          },
        }}
      />

      {/* Regulation & Compliance */}
      <Stack.Screen
        name="Regulasi"
        component={RegulasiScreen}
        options={{
          title: 'REGULASI K3',
          headerRight: () => (
            <View style={{ marginRight: 4 }}>
              <Icon name="gavel" size={24} color="#ffffff" />
            </View>
          ),
        }}
      />

      {/* Forum & Discussion */}
      <Stack.Screen
        name="Forum"
        component={ForumScreen}
        options={{
          title: 'DIALOG FORUM',
          headerRight: () => (
            <View style={{ marginRight: 4 }}>
              <Icon name="forum" size={24} color="#ffffff" />
            </View>
          ),
        }}
      />

      {/* Reports & Incidents */}
      <Stack.Screen
        name="Laporan"
        component={LaporanScreen}
        options={{
          title: 'RIWAYAT LAPORAN',
          headerRight: () => (
            <View style={{ marginRight: 4 }}>
              <Icon name="history" size={24} color="#ffffff" />
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="TambahLaporan"
        component={TambahLaporanScreen}
        options={{
          title: 'LAPOR SEGERA',
          headerRight: () => (
            <View style={{ marginRight: 4 }}>
              <Icon name="report-problem" size={24} color="#ffffff" />
            </View>
          ),
        }}
      />

      {/* Attendance */}
      <Stack.Screen
        name="Absensi"
        component={AbsensiScreen}
        options={{
          title: 'ABSENSI DIGITAL',
          headerRight: () => (
            <View style={{ marginRight: 4 }}>
              <Icon name="fingerprint" size={24} color="#ffffff" />
            </View>
          ),
        }}
      />

      {/* Quiz & Assessment */}
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          title: 'QUIZ K3',
          headerRight: () => (
            <View style={{ marginRight: 4 }}>
              <Icon name="quiz" size={24} color="#ffffff" />
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="QuizDetailScreen"
        component={QuizDetailScreen}
        options={{
          title: 'QUIZ DETAIL',
          headerStyle: {
            backgroundColor: '#f59e0b',
          },
          headerRight: () => (
            <View style={{ marginRight: 4 }}>
              <Icon name="assignment" size={24} color="#ffffff" />
            </View>
          ),
        }}
      />

      {/* Information */}
      <Stack.Screen
        name="Informasi"
        component={InformationScreen}
        options={{
          title: 'INFORMASI K3',
          headerRight: () => (
            <View style={{ marginRight: 4 }}>
              <Icon name="info" size={24} color="#ffffff" />
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="InformationDetail"
        component={InformationDetailScreen}
        options={{
          presentation: 'modal',
          title: 'Detail Informasi',
          headerStyle: {
            backgroundColor: '#06b6d4',
          },
        }}
      />

      {/* Briefing */}
      <Stack.Screen
        name="Briefing"
        component={BriefingScreen}
        options={{
          title: 'BRIEFING K3',
          headerRight: () => (
            <View style={{ marginRight: 4 }}>
              <Icon name="campaign" size={24} color="#ffffff" />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}