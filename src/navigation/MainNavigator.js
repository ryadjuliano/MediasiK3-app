import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Stack navigator
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import AbsensiScreen from '../screens/AbsensiScreen';
import VideoScreen from '../screens/VideoScreen';
import LaporanScreen from '../screens/LaporanScreen';
import ProfileScreen from '../screens/ProfileScreen';
import VideoShowScreen from '../screens/VideoShowScreen'; 
import RegulasiScreen from '../screens/RegulasiScreen';
import ForumScreen from '../screens/ForumScreen';
import TambahLaporanScreen from '../screens/TambahLaporanScreen';
import QuizScreen from '../screens/QuizScreen';
import QuizDetailScreen from '../screens/QuizDetailScreen';
import InformationScreen from '../screens/InformationScreen';
import InformationDetailScreen from '../screens/InformationDetailScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Absensi') iconName = 'check-circle';
        //   else if (route.name === 'Video') iconName = 'play-circle';
        //   else if (route.name === 'Laporan') iconName = 'file-document';
          else if (route.name === 'Profile') iconName = 'account';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        gestureEnabled: true,
        headerShadowVisible: false,
        headerBackVisible: false,
        headerShown: false,
      }} />
      <Tab.Screen name="Absensi" component={AbsensiScreen} />
      {/* <Tab.Screen name="Video" component={VideoScreen} /> */}
      {/* <Tab.Screen name="Laporan" component={LaporanScreen} /> */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      {/* Bottom Tabs sebagai screen utama */}
      <Stack.Screen
        name="MainTabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />

      {/* Modal Screen */}
      <Stack.Screen
        name="VideoShow"
        component={VideoShowScreen}
        options={{
          presentation: 'modal', // modal style (slide up)
          headerShown: true,    // header bisa disesuaikan
        }}
      />
       <Stack.Screen
        name="InformationDetail"
        component={InformationDetailScreen}
        options={{
          presentation: 'modal', // modal style (slide up)
          headerShown: true,    // header bisa disesuaikan
        }}
      />

      
       <Stack.Screen
        name="Video"
        component={VideoScreen}
        options={{
          headerShown: true, 
          title: 'Kenalan Yuk', // Judul header
          headerTitleAlign: 'center', // Judul di tengah
          headerStyle: { backgroundColor: '#2E7D32' }, // Warna latar belakang header
          headerTintColor: '#fff', // Warna teks header
          headerRight: () => (
            <Icon name="account-multiple-check" size={24} color="#fff" style={{ marginRight: 10 }} />
          ), // Ikon di kanan header   
        }}
      />
       <Stack.Screen
        name="Regulasi"
        component={RegulasiScreen}
        options={{
          headerShown: true, 
          title: 'Regulasi', // Judul header
          headerTitleAlign: 'center', // Judul di tengah
          headerStyle: { backgroundColor: '#2E7D32' }, // Warna latar belakang header
          headerTintColor: '#fff', // Warna teks header   
        }}
      />
       <Stack.Screen
        name="Forum"
        component={ForumScreen}
        options={{
          headerShown: true,    
            title: 'Forum', // Judul header
            headerTitleAlign: 'center', // Judul di tengah
            headerStyle: { backgroundColor: '#2E7D32' }, // Warna latar belakang header
            headerTintColor: '#fff', // Warna teks header
            headerRight: () => (
              <Icon name="account-star" size={24} color="#fff" style={{ marginRight: 10 }} />
            ), // Ikon di kanan header
            
        }}
      />
      <Stack.Screen
        name="Laporan"
        component={LaporanScreen}
        options={{
          headerShown: true,    
            title: 'Laporan', // Judul header
            headerTitleAlign: 'center', // Judul di tengah
            headerStyle: { backgroundColor: '#2E7D32' }, // Warna latar belakang header
            headerTintColor: '#fff', // Warna teks header
           
        }}
      />

      <Stack.Screen
        name="TambahLaporan"
        component={TambahLaporanScreen}
        options={{
          headerShown: true,    
            title: 'Detail Laporan ', // Judul header
            headerTitleAlign: 'center', // Judul di tengah
            headerStyle: { backgroundColor: '#2E7D32' }, // Warna latar belakang header
            headerTintColor: '#fff', // Warna teks header
            
            
        }}
      />

       <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          headerShown: true,    
            title: 'Quiz K3', // Judul header
            headerTitleAlign: 'center', // Judul di tengah
            headerStyle: { backgroundColor: '#2E7D32' }, // Warna latar belakang header
            headerTintColor: '#fff', // Warna teks header
            
            
        }}
      />
       <Stack.Screen
        name="QuizDetailScreen"
        component={QuizDetailScreen}
        options={{
          headerShown: true,    
            title: 'Quiz K3', // Judul header
            headerTitleAlign: 'center', // Judul di tengah
            headerStyle: { backgroundColor: '#2E7D32' }, // Warna latar belakang header
            headerTintColor: '#fff', // Warna teks header
            
            
        }}
      />
       <Stack.Screen
        name="Informasi"
        component={InformationScreen}
        options={{
          headerShown: true,    
            title: 'Informasi', // Judul header
            headerTitleAlign: 'center', // Judul di tengah
            headerStyle: { backgroundColor: '#2E7D32' }, // Warna latar belakang header
            headerTintColor: '#fff', // Warna teks header
            
            
        }}
      />
       
    </Stack.Navigator>
  );
}
