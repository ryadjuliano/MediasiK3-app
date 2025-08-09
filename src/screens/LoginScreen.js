import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      dispatch(
        loginSuccess({
          user: { name: 'John Doe', email },
          token: 'dummy-token-123',
        })
      );
      setIsLoading(false);
    }, 1500);
  };

  const isFormValid = email.length > 0 && password.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {/* Hero Section */}
            <View style={styles.heroSection}>
              {/* Logo/Brand */}
              <View style={styles.brandContainer}>
                <View style={styles.logoContainer}>
                  <Icon name="security" size={40} color="#fff" />
                </View>
                <Text style={styles.brandTitle}>MediasiK3</Text>
                <Text style={styles.brandSubtitle}>Safety Education Platform</Text>
              </View>

              {/* Welcome Text */}
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeTitle}>Selamat Datang Kembali</Text>
                <Text style={styles.welcomeSubtitle}>
                  Masuk ke akun Anda untuk melanjutkan pembelajaran keselamatan kerja
                </Text>
              </View>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              <View style={styles.formContainer}>
                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <View style={styles.inputContainer}>
                    <Icon
                      name="email"
                      size={20}
                      color="#94a3b8"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Masukkan email Anda"
                      placeholderTextColor="#94a3b8"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </View>

                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <View style={styles.inputContainer}>
                    <Icon
                      name="lock"
                      size={20}
                      color="#94a3b8"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Masukkan password Anda"
                      placeholderTextColor="#94a3b8"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      style={styles.eyeButton}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Icon
                        name={showPassword ? 'visibility' : 'visibility-off'}
                        size={20}
                        color="#94a3b8"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Forgot Password */}
                <TouchableOpacity style={styles.forgotPasswordContainer}>
                  <Text style={styles.forgotPasswordText}>Lupa Password?</Text>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity
                  style={[
                    styles.loginButton,
                    isFormValid && styles.loginButtonActive,
                    isLoading && styles.loginButtonLoading
                  ]}
                  onPress={handleLogin}
                  disabled={!isFormValid || isLoading}
                  activeOpacity={0.8}
                >
                  {isLoading ? (
                    <View style={styles.loadingContainer}>
                      <View style={styles.loadingSpinner} />
                      <Text style={styles.loginButtonText}>Memverifikasi...</Text>
                    </View>
                  ) : (
                    <>
                      <Text style={[
                        styles.loginButtonText,
                        isFormValid && styles.loginButtonTextActive
                      ]}>
                        Masuk
                      </Text>
                      <Icon
                        name="arrow-forward"
                        size={20}
                        color={isFormValid ? '#fff' : '#94a3b8'}
                        style={styles.loginButtonIcon}
                      />
                    </>
                  )}
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.dividerContainer}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>atau</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Social Login Placeholder */}
                <TouchableOpacity style={styles.socialButton}>
                  <Icon name="fingerprint" size={24} color="#667eea" />
                  <Text style={styles.socialButtonText}>Masuk dengan Biometrik</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Belum punya akun?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={styles.registerButton}
              >
                <Text style={styles.registerButtonText}>Daftar Sekarang</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Info */}
            <View style={styles.bottomInfo}>
              <Text style={styles.infoText}>
                Dengan masuk, Anda menyetujui{' '}
                <Text style={styles.linkText}>Syarat & Ketentuan</Text>
                {' '}dan{' '}
                <Text style={styles.linkText}>Kebijakan Privasi</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },

  // Hero Section
  heroSection: {
    paddingTop: Platform.OS === 'ios' ? 40 : 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 8,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '400',
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },

  // Form Section
  formSection: {
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 32,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1a202c',
    fontWeight: '400',
  },
  eyeButton: {
    padding: 4,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 32,
  },
  forgotPasswordText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '500',
  },

  // Login Button
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e2e8f0',
    borderRadius: 16,
    height: 56,
    marginBottom: 24,
  },
  loginButtonActive: {
    backgroundColor: '#667eea',
    elevation: 4,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  loginButtonLoading: {
    backgroundColor: '#94a3b8',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94a3b8',
  },
  loginButtonTextActive: {
    color: '#fff',
  },
  loginButtonIcon: {
    marginLeft: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingSpinner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    borderTopColor: 'transparent',
    marginRight: 8,
  },

  // Divider
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },

  // Social Button
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    height: 56,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#667eea',
    marginLeft: 8,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  footerText: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '400',
  },
  registerButton: {
    marginLeft: 4,
  },
  registerButtonText: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '600',
  },

  // Bottom Info
  bottomInfo: {
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  infoText: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 18,
  },
  linkText: {
    color: '#667eea',
    fontWeight: '500',
  },
});