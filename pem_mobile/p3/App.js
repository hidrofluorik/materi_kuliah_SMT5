import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SectionList,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Switch,
  Modal,
  ActivityIndicator,
  StatusBar,
  SafeAreaViewBase,
  StyleSheet,
  Platform,
  SafeAreaView,
  Alert,
} from 'react-native';

// ==========================================
// DATA PROFILE (Data Pribadi Sabbicarel)
// ==========================================
const PROFILE = {
  name: 'Sabbicarel Edward Piris',
  title: 'Mobile & Software Developer',
  email: 'sabbicarel@example.com',
  phone: '08xx-xxxx-xxxx',
  location: 'Cirebon, West Java',
  bio: 'Mahasiswa Teknik Informatika yang antusias dalam pengembangan aplikasi mobile, machine learning, dan arsitektur data modern.',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
  avatarOffline: '../assets/favicon.png',
};

// ==========================================
// DATA SKILLSS (Sesuai Tugas Wajib Modul)
// ==========================================
const SKILLSS = [
  { id: '1', name: 'React Native', level: 90, color: '#61DAFB' },
  { id: '2', name: 'Flutter', level: 75, color: '#02569C' },
  { id: '3', name: 'Javascript', level: 88, color: '#F7DF1E' },
  { id: '4', name: 'Kotlin', level: 80, color: '#7F52FF' },
  { id: '5', name: 'Python', level: 85, color: '#3776AB' },
  { id: '6', name: 'Struktur Data & Kriptografi', level: 78, color: '#FF5722' },
  { id: '7', name: 'Tailwind CSS', level: 92, color: '#06B6D4' },
];

// ==========================================
// DATA SECTIONS (Riwayat Pengalaman & Pendidikan)
// ==========================================
const SECTIONS = [
  {
    title: '💼 Pengalaman Kerja & Proyek',
    data: [
      {
        id: 'e1',
        role: 'Peserta Pelatihan AI & Mobile Development',
        company: 'Dicoding & Tech Certification',
        period: '2025-Sekarang',
        desc: 'Mendalami arsitektur pengembangan mobile modern, integrasi machine learning, dan manajemen data.',
      },
      {
        id: 'e2',
        role: 'Pengembang Aplikasi CV Mobile',
        company: 'Laboratorium Informatika UIN Siber Syekh Nurjati Cirebon',
        period: '2026',
        desc: 'Mengembangkan portofolio interaktif berbasis React Native memanfaatkan 16 Core Components dan styling modular.',
      },
    ],
  },
  {
    title: '🎓 Pendidikan',
    data: [
      {
        id: 'd1',
        role: 'S1 Informatika',
        company: 'Universitas Islam Negeri Siber Syekh Nurjati Cirebon',
        period: '2024-Sekarang',
        desc: 'Fokus studi pada Algoritma & Struktur Data, Kriptografi, Pemrograman Mobile, dan IoT.',
      },
    ],
  },
];

// ==========================================
// DATA SOCIAL (Media Sosial Pribadi)
// ==========================================
const SOCIAL = [
  { id: 's1', label: 'Github', icon: '🎖️', url: 'https://github.com' },
  { id: 's2', label: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
  { id: 's3', label: 'Youtube', icon: '📹', url: 'https://youtube.com' },
];

// ==========================================
// SUB-COMPONENTS
// ==========================================
function SkillCard({ item }) {
  return (
    <View style={styles.skillCard}>
      <View style={styles.skillHeader}>
        <Text style={styles.skillName}>{item.name}</Text>
        <Text style={styles.skillPercent}>{item.level}%</Text>
      </View>
      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${item.level}%`, backgroundColor: item.color },
          ]}
        />
      </View>
    </View>
  );
}

function TimelineCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.timelineCard} onPress={() => onPress(item)}>
      <Text style={styles.timelineRole}>{item.role}</Text>
      <Text style={styles.timelineCompany}>{item.company}</Text>
      <Text style={styles.timelinePeriod}>{item.period}</Text>
      <Text style={styles.timelineDesc}>{item.desc}</Text>
      <Text style={styles.timelineTapHint}>Ketuk untuk detail ➔</Text>
    </TouchableOpacity>
  );
}

// ==========================================
// MAIN COMPONENT (App)
// ==========================================
export default function App() {
  const [isOpenToWork, setIsOpenToWork] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Helper fungsi untuk menampilkan notifikasi di Mobile maupun Web
  const showNotification = (title, message) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  // Handler Unduh CV Simulasi
  const handleDownloadCV = () => {
    if (isDownloading) return;
    setIsDownloading(true);

    showNotification('Mengunduh Berkas', 'Sedang memproses unduhan CV_Sabbicarel.pdf...');

    setTimeout(() => {
      setIsDownloading(false);
      showNotification(
        'Unduhan Berhasil ✅',
        'Berkas "CV_Sabbicarel_Piris.pdf" berhasil disimpan di folder Download perangkat.'
      );
    }, 1500);
  };

  // Handler Kirim Pesan
  const handleSendMessage = () => {
    if (!contactName.trim() || !contactMessage.trim()) {
      showNotification('Peringatan', 'Nama dan pesan tidak boleh kosong!');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showNotification('Sukses', `Terima kasih ${contactName}, pesan Anda berhasil dikirim!`);
      setContactName('');
      setContactMessage('');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0b0f19" />

      {/* Header Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerDocIcon}>📄</Text>
          <Text style={styles.headerTitle}>Curriculum Vitae</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.openIndicatorDot} />
          <Text style={styles.headerStatusText}>Open</Text>
          <Switch
            value={isOpenToWork}
            onValueChange={setIsOpenToWork}
            trackColor={{ false: '#374151', true: '#22c55e' }}
            thumbColor={'#ffffff'}
          />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <View style={styles.avatarBorder}>
            <Image source={{ uri: PROFILE.avatar }} style={styles.avatar} />
          </View>

          {isOpenToWork && (
            <View style={styles.badgeOpenToWork}>
              <Text style={styles.badgeText}>✅ Open to Work</Text>
            </View>
          )}

          <Text style={styles.name}>{PROFILE.name}</Text>
          <Text style={styles.title}>{PROFILE.title}</Text>
          <Text style={styles.bio}>{PROFILE.bio}</Text>

          {/* Contact Details */}
          <View style={styles.contactDetailsRow}>
            <Text style={styles.contactItem}>📧 {PROFILE.email}</Text>
            <Text style={styles.contactItem}>📍 {PROFILE.location}</Text>
          </View>
          <Text style={styles.phoneText}>📞 {PROFILE.phone}</Text>

          {/* Social Media Buttons */}
          <View style={styles.socialRow}>
            {SOCIAL.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.socialBox}
                activeOpacity={0.6}
                onPress={() =>
                  showNotification(`${item.label} Link`, `Membuka tautan profil:\n${item.url}`)
                }
              >
                <Text style={styles.socialIconText}>{item.icon}</Text>
                <Text style={styles.socialLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Download Button */}
          <Pressable
            style={({ pressed }) => [
              styles.downloadBtn,
              (pressed || isDownloading) && styles.downloadBtnPressed,
            ]}
            onPress={handleDownloadCV}
          >
            {isDownloading ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ActivityIndicator size="small" color="#ffffff" style={{ marginRight: 8 }} />
                <Text style={styles.downloadBtnText}>Mengunduh PDF...</Text>
              </View>
            ) : (
              <Text style={styles.downloadBtnText}>⬇️  Download CV (PDF)</Text>
            )}
          </Pressable>
        </View>

        {/* Divider Line */}
        <View style={styles.glowLine} />

        {/* Section Skills (FlatList) */}
        <View style={styles.cardBox}>
          <Text style={styles.cardHeading}>🛠️ Keahlian</Text>
          <Text style={styles.cardSubheading}>
            Komponen: FlatList - menampilkan daftar skill secara efisien
          </Text>

          <FlatList
            data={SKILLSS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <SkillCard item={item} />}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          />
        </View>

        {/* Section Riwayat (SectionList) */}
        <View style={styles.cardBox}>
          <Text style={styles.cardHeading}>📚 Pengalaman & Riwayat</Text>
          <Text style={styles.cardSubheading}>
            Komponen: SectionList - menampilkan data terkelompok
          </Text>

          <SectionList
            sections={SECTIONS}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionHeaderTitle}>{title}</Text>
            )}
            renderItem={({ item }) => (
              <TimelineCard
                item={item}
                onPress={(data) => {
                  setSelectedItem(data);
                  setIsModalVisible(true);
                }}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        </View>

        {/* Section Form Kontak */}
        <View style={styles.cardBox}>
          <Text style={styles.cardHeading}>📬 Kirim Pesan</Text>
          <Text style={styles.cardSubheading}>
            Komponen: TextInput, Button, ActivityIndicator
          </Text>

          <TextInput
            style={styles.darkInput}
            placeholder="Nama Anda"
            placeholderTextColor="#64748b"
            value={contactName}
            onChangeText={setContactName}
          />
          <TextInput
            style={[styles.darkInput, styles.darkTextArea]}
            placeholder="Tulis pesan..."
            placeholderTextColor="#64748b"
            value={contactMessage}
            onChangeText={setContactMessage}
            multiline
            numberOfLines={3}
          />

          {isLoading ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator size="small" color="#9333ea" />
              <Text style={styles.loadingText}>Mengirim pesan...</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Text style={styles.sendButtonText}>Kirim Pesan</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Modal Popup */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{selectedItem?.role}</Text>
            <Text style={styles.modalCompany}>{selectedItem?.company}</Text>
            <Text style={styles.modalPeriod}>{selectedItem?.period}</Text>
            <View style={styles.modalSeparator} />
            <Text style={styles.modalDesc}>{selectedItem?.desc}</Text>
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ==========================================
// STYLING
// ==========================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0b0f19',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0b0f19',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerDocIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  openIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
    marginRight: 6,
  },
  headerStatusText: {
    fontSize: 12,
    color: '#94a3b8',
    marginRight: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  avatarBorder: {
    width: 108,
    height: 108,
    borderRadius: 54,
    borderWidth: 2,
    borderColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  badgeOpenToWork: {
    backgroundColor: '#064e3b',
    borderColor: '#22c55e',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  badgeText: {
    color: '#4ade80',
    fontSize: 11,
    fontWeight: '600',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 12,
  },
  bio: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 14,
    paddingHorizontal: 10,
  },
  contactDetailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 4,
  },
  contactItem: {
    fontSize: 11,
    color: '#64748b',
  },
  phoneText: {
    fontSize: 11,
    color: '#64748b',
    marginBottom: 16,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    marginBottom: 18,
  },
  socialBox: {
    width: 80,
    height: 64,
    backgroundColor: '#161e2e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1e2937',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconText: {
    fontSize: 18,
    marginBottom: 4,
  },
  socialLabel: {
    fontSize: 10,
    color: '#94a3b8',
  },
  downloadBtn: {
    backgroundColor: '#8b5cf6',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 28,
    width: '90%',
    alignItems: 'center',
  },
  downloadBtnPressed: {
    backgroundColor: '#7c3aed',
    opacity: 0.9,
  },
  downloadBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  glowLine: {
    height: 1,
    backgroundColor: '#3b82f6',
    opacity: 0.3,
    marginVertical: 16,
  },
  cardBox: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginBottom: 16,
  },
  cardHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cardSubheading: {
    fontSize: 11,
    color: '#64748b',
    marginBottom: 16,
    marginTop: 2,
  },
  skillCard: {
    width: '100%',
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  skillName: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: '600',
  },
  skillPercent: {
    fontSize: 12,
    color: '#94a3b8',
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#1f2937',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  sectionHeaderTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#a855f7',
    marginTop: 10,
    marginBottom: 8,
  },
  timelineCard: {
    backgroundColor: '#161e2e',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  timelineRole: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  timelineCompany: {
    fontSize: 12,
    color: '#38bdf8',
    marginTop: 2,
  },
  timelinePeriod: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  timelineDesc: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
    lineHeight: 16,
  },
  timelineTapHint: {
    fontSize: 10,
    color: '#8b5cf6',
    marginTop: 6,
    textAlign: 'right',
  },
  darkInput: {
    backgroundColor: '#161e2e',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: '#ffffff',
    marginBottom: 10,
  },
  darkTextArea: {
    height: 70,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 8,
    paddingVertical: 11,
    alignItems: 'center',
    marginTop: 4,
  },
  sendButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  loadingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#94a3b8',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalBox: {
    backgroundColor: '#111827',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    borderTopWidth: 1,
    borderColor: '#374151',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  modalCompany: {
    fontSize: 13,
    color: '#38bdf8',
    marginTop: 4,
  },
  modalPeriod: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  modalSeparator: {
    height: 1,
    backgroundColor: '#1f2937',
    marginVertical: 12,
  },
  modalDesc: {
    fontSize: 13,
    color: '#cbd5e1',
    lineHeight: 20,
  },
  modalCloseBtn: {
    backgroundColor: '#ef4444',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  modalCloseText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});