import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

// 1) Mini Navigators
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

/* --------------------------------
   NAVIGATION MODES & DESCRIPTIONS
-------------------------------- */
const NAVIGATION_MODES = ['Stack', 'Tabs', 'Drawer'];

const MODE_DESCRIPTIONS = {
  Stack: `Stack Navigator:
- New screens are "pushed" onto a stack (last-in, first-out).
- Going "back" pops the top screen, returning to the previous.
- Great for typical forward/back flows (e.g. "Details").`,
  Tabs: `Tab Navigator:
- A tab bar (top or bottom) to switch between screens instantly.
- Each tab is a "root" screen; switching tabs doesn't push or pop.
- Perfect for "Home", "Profile", "Settings" sections.`,
  Drawer: `Drawer Navigator:
- A hidden slide-out menu from the left or right.
- Tapping or swiping opens/closes the drawer, revealing links.
- Useful for multi-section apps or a side menu layout.`,
};

/* --------------------------------
   2) STACK PLAYGROUND
-------------------------------- */
const StackNav = createNativeStackNavigator();

function StackScreenA({ navigation }) {
  return (
    <View style={styles.demoScreenContainer}>
      <Text style={styles.demoScreenTitle}>[Stack] Screen A</Text>
      <Text style={styles.demoScreenSubtitle}>Try going to Screen B.</Text>

      <TouchableOpacity
        style={styles.demoButton}
        onPress={() => navigation.navigate('StackScreenB')}
      >
        <Text style={styles.demoButtonText}>Go to Screen B</Text>
      </TouchableOpacity>
    </View>
  );
}

function StackScreenB({ navigation }) {
  return (
    <View style={styles.demoScreenContainer}>
      <Text style={styles.demoScreenTitle}>[Stack] Screen B</Text>
      <Text style={styles.demoScreenSubtitle}>Use the back arrow to return.</Text>

      <TouchableOpacity style={styles.demoButton} onPress={() => navigation.goBack()}>
        <Text style={styles.demoButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

function StackPlayground() {
  return (
    <StackNav.Navigator>
      <StackNav.Screen
        name="StackScreenA"
        component={StackScreenA}
        options={{
          title: 'Stack A',
          headerBackVisible: false,
          headerLeft: () => null,
        }}
      />
      <StackNav.Screen
        name="StackScreenB"
        component={StackScreenB}
        options={{ title: 'Stack B' }}
      />
    </StackNav.Navigator>
  );
}

/* --------------------------------
   3) TABS PLAYGROUND
-------------------------------- */
const TabsNav = createBottomTabNavigator();

function TabScreenA() {
  return (
    <View style={styles.demoScreenContainer}>
      <Text style={styles.demoScreenTitle}>[Tab] Screen A</Text>
      <Text style={styles.demoScreenSubtitle}>
        Switch tabs instantly. No push/pop transitions here.
      </Text>
    </View>
  );
}

function TabScreenB() {
  return (
    <View style={styles.demoScreenContainer}>
      <Text style={styles.demoScreenTitle}>[Tab] Screen B</Text>
      <Text style={styles.demoScreenSubtitle}>
        Each tab is a "root" screen.
      </Text>
    </View>
  );
}

function TabsPlayground() {
  return (
    <TabsNav.Navigator>
      <TabsNav.Screen name="TabA" component={TabScreenA} options={{ title: 'Tab A' }} />
      <TabsNav.Screen name="TabB" component={TabScreenB} options={{ title: 'Tab B' }} />
    </TabsNav.Navigator>
  );
}

/* --------------------------------
   4) DRAWER PLAYGROUND
-------------------------------- */
const DrawerNav = createDrawerNavigator();

function DrawerScreenA() {
  return (
    <View style={styles.demoScreenContainer}>
      <Text style={styles.demoScreenTitle}>[Drawer] Screen A</Text>
      <Text style={styles.demoScreenSubtitle}>
        Swipe or tap the menu icon to open the drawer.
      </Text>
    </View>
  );
}

function DrawerScreenB() {
  return (
    <View style={styles.demoScreenContainer}>
      <Text style={styles.demoScreenTitle}>[Drawer] Screen B</Text>
      <Text style={styles.demoScreenSubtitle}>
        Another drawer-based screen.
      </Text>
    </View>
  );
}

function DrawerPlayground() {
  return (
    <DrawerNav.Navigator>
      <DrawerNav.Screen name="DrawerA" component={DrawerScreenA} options={{ title: 'Drawer A' }} />
      <DrawerNav.Screen name="DrawerB" component={DrawerScreenB} options={{ title: 'Drawer B' }} />
    </DrawerNav.Navigator>
  );
}

/* --------------------------------
   5) MAIN SCREEN
-------------------------------- */
export default function NavigationOverviewScreen() {
  const [navigationMode, setNavigationMode] = useState('Stack');
  const [modalVisible, setModalVisible] = useState(false);

  const renderPlayground = () => {
    if (navigationMode === 'Stack') return <StackPlayground />;
    if (navigationMode === 'Tabs') return <TabsPlayground />;
    if (navigationMode === 'Drawer') return <DrawerPlayground />;
    return null;
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerWrapper}>
          <Text style={styles.mainHeader}>Navigation Overview</Text>
          <Text style={styles.subHeader}>
            Experiment with Stack, Tabs, or Drawer and see them in action.
          </Text>
        </View>

        {/* Nav Mode Picker + Info Button */}
        <View style={styles.controlBlock}>
          <View style={styles.labelRow}>
            <Text style={styles.controlLabel}>Navigation Type</Text>
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.infoButtonText}>?</Text>
            </TouchableOpacity>
          </View>
          <Picker
            selectedValue={navigationMode}
            style={styles.picker}
            onValueChange={setNavigationMode}
          >
            {NAVIGATION_MODES.map((mode) => (
              <Picker.Item key={mode} label={mode} value={mode} />
            ))}
          </Picker>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Playground */}
        <Text style={styles.playgroundTitle}>Navigation Playground</Text>
        <View style={styles.playgroundBox}>{renderPlayground()}</View>
      </ScrollView>

      {/* Modal for Explanations */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <ScrollView style={styles.modalScroll}>
              <Text style={styles.modalTitle}>{navigationMode} Navigator</Text>
              <Text style={styles.modalContent}>
                {MODE_DESCRIPTIONS[navigationMode]}
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/* -------------------------
   STYLES
------------------------- */
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    padding: 15,
  },
  headerWrapper: {
    marginBottom: 10,
    alignItems: 'center',
  },
  mainHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 5,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 14,
    color: '#616161',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 20,
  },
  controlBlock: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  controlLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#424242',
  },
  infoButton: {
    backgroundColor: '#2196F3',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  picker: {
    marginTop: 5,
    ...Platform.select({
      ios: { height: 90 }, // shorter for iOS to look nicer
      android: { height: 50 },
      default: { height: 50 },
    }),
  },
  divider: {
    height: 1,
    backgroundColor: '#DDD',
    marginVertical: 10,
  },
  playgroundTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    color: '#424242',
  },
  playgroundBox: {
    minHeight: 300,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    overflow: 'hidden',
  },
  // Demo screens
  demoScreenContainer: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  demoScreenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  demoScreenSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 20,
  },
  demoButton: {
    backgroundColor: '#007AFF',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 5,
  },
  demoButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalScroll: {
    maxHeight: 200,
    width: '100%',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    textAlign: 'left',
  },
  closeModalButton: {
    backgroundColor: '#007AFF',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  closeModalButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
