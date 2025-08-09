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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegister = async () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert('Error', 'Mohon lengkapi semua field yang diperlukan');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Password dan konfirmasi password tidak cocok');
      return;
    }

    if (!acceptTerms) {
      Alert.alert('Error', 'Mohon setujui syarat dan ketentuan');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Registrasi Berhasil',
        'Akun Anda telah berhasil dibuat. Silakan login untuk melanjutkan.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    }, 1500);
  };

  const isFormValid = formData.fullName && formData.email && formData.password && 
                     formData.confirmPassword && acceptTerms && 
                     formData.password === formData.confirmPassword;

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
            {/* Header Section */}
            <View style={styles.headerSection}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Icon name="arrow-back" size={24} color="#667eea" />
              </TouchableOpacity>

              {/* Brand */}
              <View style={styles.brandContainer}>
                <View style={styles.logoContainer}>
                  <Icon name="person-add" size={40} color="#fff" />
                </View>
                <Text style={styles.brandTitle}>Bergabung dengan MediasiK3</Text>
                <Text style={styles.brandSubtitle}>Mulai perjalanan keselamatan kerja Anda</Text>
              </View>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              <View style={styles.formContainer}>
                <Text style={styles.formTitle}>Buat Akun Baru</Text>
                <Text style={styles.formSubtitle}>
                  Daftar untuk mengakses platform edukasi keselamatan kerja
                </Text>

                {/* Full Name Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Nama Lengkap *</Text>
                  <View style={styles.inputContainer}>
                    <Icon
                      name="person"
                      size={20}
                      color="#94a3b8"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Masukkan nama lengkap Anda"
                      placeholderTextColor="#94a3b8"
                      value={formData.fullName}
                      onChangeText={(value) => handleInputChange('fullName', value)}
                      autoCapitalize="words"
                    />
                  </View>
                </View>

                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email *</Text>
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
                      value={formData.email}
                      onChangeText={(value) => handleInputChange('email', value)}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </View>

                {/* Phone Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Nomor Telepon</Text>
                  <View style={styles.inputContainer}>
                    <Icon
                      name="phone"
                      size={20}
                      color="#94a3b8"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Masukkan nomor telepon (opsional)"
                      placeholderTextColor="#94a3b8"
                      value={formData.phone}
                      onChangeText={(value) => handleInputChange('phone', value)}
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>

                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Password *</Text>
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
                      value={formData.password}
                      onChangeText={(value) => handleInputChange('password', value)}
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

                {/* Confirm Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Konfirmasi Password *</Text>
                  <View style={styles.inputContainer}>
                    <Icon
                      name="lock-outline"
                      size={20}
                      color="#94a3b8"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Ulangi password Anda"
                      placeholderTextColor="#94a3b8"
                      value={formData.confirmPassword}
                      onChangeText={(value) => handleInputChange('confirmPassword', value)}
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      style={styles.eyeButton}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <Icon
                        name={showConfirmPassword ? 'visibility' : 'visibility-off'}
                        size={20}
                        color="#94a3b8"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Password Strength Indicator */}
                {formData.password.length > 0 && (
                  <View style={styles.passwordStrengthContainer}>
                    <Text style={styles.passwordStrengthLabel}>Kekuatan Password:</Text>
                    <View style={styles.passwordStrengthBar}>
                      <View style={[
                        styles.passwordStrengthFill,
                        {
                          width: `${Math.min((formData.password.length / 8) * 100, 100)}%`,
                          backgroundColor: formData.password.length < 6 ? '#ef4444' : 
                                          formData.password.length < 8 ? '#f59e0b' : '#10b981'
                        }
                      ]} />
                    </View>
                    <Text style={styles.passwordStrengthText}>
                      {formData.password.length < 6 ? 'Lemah' : 
                       formData.password.length < 8 ? 'Sedang' : 'Kuat'}
                    </Text>
                  </View>
                )}

                {/* Terms and Conditions */}
                <TouchableOpacity 
                  style={styles.termsContainer}
                  onPress={() => setAcceptTerms(!acceptTerms)}
                >
                  <View style={[styles.checkbox, acceptTerms && styles.checkboxChecked]}>
                    {acceptTerms && <Icon name="check" size={16} color="#fff" />}
                  </View>
                  <Text style={styles.termsText}>
                    Saya menyetujui{' '}
                    <Text style={styles.linkText}>Syarat & Ketentuan</Text>
                    {' '}dan{' '}
                    <Text style={styles.linkText}>Kebijakan Privasi</Text>
                  </Text>
                </TouchableOpacity>

                {/* Register Button */}
                <TouchableOpacity
                  style={[
                    styles.registerButton,
                    isFormValid && styles.registerButtonActive,
                    isLoading && styles.registerButtonLoading
                  ]}
                  onPress={handleRegister}
                  disabled={!isFormValid || isLoading}
                  activeOpacity={0.8}
                >
                  {isLoading ? (
                    <View style={styles.loadingContainer}>
                      <View style={styles.loadingSpinner} />
                      <Text style={styles.registerButtonText}>Mendaftarkan...</Text>
                    </View>
                  ) : (
                    <>
                      <Text style={[
                        styles.registerButtonText,
                        isFormValid && styles.registerButtonTextActive
                      ]}>
                        Daftar Sekarang
                      </Text>
                      <Icon
                        name="person-add"
                        size={20}
                        color={isFormValid ? '#fff' : '#94a3b8'}
                        style={styles.registerButtonIcon}
                      />
                    </>
                  )}
                </TouchableOpacity>

                {/* Login Link */}
                <View style={styles.loginLinkContainer}>
                  <Text style={styles.loginLinkText}>Sudah punya akun?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.loginButton}
                  >
                    <Text style={styles.loginButtonText}>Masuk di sini</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Bottom Info */}
            <View style={styles.bottomInfo}>
              <View style={styles.securityInfo}>
                <Icon name="security" size={16} color="#10b981" />
                <Text style={styles.securityText}>
                  Data Anda aman dan terenkripsi
                </Text>
              </View>
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

  // Header Section
  headerSection: {
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  brandContainer: {
    alignItems: 'center',
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
    fontSize: 28,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '400',
  },

  // Form Section
  formSection: {
    flex: 1,
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
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 8,
    textAlign: 'center',
  },
  formSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  inputGroup: {
    marginBottom: 20,
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

  // Password Strength
  passwordStrengthContainer: {
    marginBottom: 20,
  },
  passwordStrengthLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 6,
  },
  passwordStrengthBar: {
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    marginBottom: 4,
  },
  passwordStrengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  passwordStrengthText: {
    fontSize: 12,
    color: '#64748b',
  },

  // Terms
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  linkText: {
    color: '#667eea',
    fontWeight: '500',
  },

  // Register Button
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e2e8f0',
    borderRadius: 16,
    height: 56,
    marginBottom: 24,
  },
  registerButtonActive: {
    backgroundColor: '#667eea',
    elevation: 4,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  registerButtonLoading: {
    backgroundColor: '#94a3b8',
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94a3b8',
  },
  registerButtonTextActive: {
    color: '#fff',
  },
  registerButtonIcon: {
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

  // Login Link
  loginLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginLinkText: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '400',
  },
  loginButton: {
    marginLeft: 4,
  },
  loginButtonText: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '600',
  },

  // Bottom Info
  bottomInfo: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  securityText: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '500',
    marginLeft: 6,
  },
});