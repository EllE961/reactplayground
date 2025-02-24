import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

const FLEX_DIRECTION_OPTIONS = ['row', 'column', 'row-reverse', 'column-reverse'];
const JUSTIFY_CONTENT_OPTIONS = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
];
const ALIGN_ITEMS_OPTIONS = [
  'flex-start',
  'flex-end',
  'center',
  'stretch',
  'baseline',
];
const FLEX_WRAP_OPTIONS = ['nowrap', 'wrap', 'wrap-reverse'];
const ALIGN_CONTENT_OPTIONS = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'stretch',
];

const PROPERTY_DESCRIPTIONS = {
  boxCount: 'Number of boxes rendered in the container.',
  flexDirection: 'Row or Column? Also row-reverse / column-reverse if needed.',
  justifyContent: 'Distribution along the main axis (space-around, center, etc).',
  alignItems: 'Alignment along the cross axis (center, stretch, etc).',
  flexWrap: 'Allow items to wrap onto new lines if container is too small.',
  alignContent: 'Align multiple lines (when wrapping) along the cross axis.',
  flexGrow: 'How much each box grows if extra space is available.',
  flexShrink: 'How much each box shrinks if not enough space is available.',
  flexBasis: 'Initial size of each box before grow/shrink logic.',
};

const BOX_COLORS = [
  '#4285F4', '#DB4437', '#F4B400', '#0F9D58',
  '#AB47BC', '#FF6D00', '#26C6DA', '#9E9D24',
];

export default function FlexboxDemoScreen() {
  // Flexbox properties
  const [boxCount, setBoxCount] = useState(5);
  const [flexDirection, setFlexDirection] = useState('row');
  const [justifyContent, setJustifyContent] = useState('center');
  const [alignItems, setAlignItems] = useState('center');
  const [flexWrap, setFlexWrap] = useState('wrap');
  const [alignContent, setAlignContent] = useState('flex-start');

  // Box behavior
  const [flexGrow, setFlexGrow] = useState(0);
  const [flexShrink, setFlexShrink] = useState(0);
  const [flexBasis, setFlexBasis] = useState(50);

  // Modal help
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const showDescription = (propName) => {
    setModalContent(PROPERTY_DESCRIPTIONS[propName] || '');
    setModalVisible(true);
  };

  // Generate squares
  const renderBoxes = () => {
    return Array.from({ length: boxCount }, (_, i) => {
      const color = BOX_COLORS[i % BOX_COLORS.length];
      return (
        <View
          key={i}
          style={[
            styles.box,
            {
              backgroundColor: color,
              flexGrow,
              flexShrink,
              flexBasis,
              aspectRatio: 1,
            },
          ]}
        >
          <Text style={styles.boxText}>{i + 1}</Text>
        </View>
      );
    });
  };

  // Axis info
  const primaryAxis = flexDirection.includes('row')
    ? 'Horizontal (left to right)'
    : 'Vertical (top to bottom)';
  const crossAxis = flexDirection.includes('row')
    ? 'Vertical (top to bottom)'
    : 'Horizontal (left to right)';

  return (
    <SafeAreaView style={styles.outerContainer}>
      {/* Top container (demo area) */}
      <View style={styles.demoContainer}>
        <Text style={styles.demoContainerTitle}>Flexbox Demo Container</Text>
        <View
          style={[
            styles.flexArea,
            { flexDirection, justifyContent, alignItems, flexWrap, alignContent },
          ]}
        >
          {renderBoxes()}
        </View>
      </View>

      {/* Scrollable controls */}
      <ScrollView style={styles.controlsContainer}>
        <Text style={styles.headerTitle}>Interactive Flexbox Demo</Text>
        <Text style={styles.headerSubtitle}>
          Adjust sliders and pickers to see how your Flexbox layout changes.
        </Text>

        {/* boxCount */}
        <View style={styles.controlBlock}>
          <View style={styles.controlHeader}>
            <Text style={styles.controlLabel}>boxCount</Text>
            <TouchableOpacity onPress={() => showDescription('boxCount')}>
              <Text style={styles.infoIcon}>?</Text>
            </TouchableOpacity>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={100}
            step={1}
            value={boxCount}
            onValueChange={setBoxCount}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#ccc"
          />
          <Text style={styles.sliderValue}>Count: {boxCount}</Text>
        </View>

        {/* flexDirection */}
        <View style={styles.controlBlock}>
          <View style={styles.controlHeader}>
            <Text style={styles.controlLabel}>flexDirection</Text>
            <TouchableOpacity onPress={() => showDescription('flexDirection')}>
              <Text style={styles.infoIcon}>?</Text>
            </TouchableOpacity>
          </View>
          <Picker
            selectedValue={flexDirection}
            // For iOS, use 'dialog' so the picker is full-screen
            mode={Platform.select({ ios: 'dialog', android: 'dropdown' })}
            style={styles.picker}
            onValueChange={setFlexDirection}
          >
            {FLEX_DIRECTION_OPTIONS.map((opt) => (
              <Picker.Item key={opt} label={opt} value={opt} />
            ))}
          </Picker>
        </View>

        {/* justifyContent */}
        <View style={styles.controlBlock}>
          <View style={styles.controlHeader}>
            <Text style={styles.controlLabel}>justifyContent</Text>
            <TouchableOpacity onPress={() => showDescription('justifyContent')}>
              <Text style={styles.infoIcon}>?</Text>
            </TouchableOpacity>
          </View>
          <Picker
            selectedValue={justifyContent}
            mode={Platform.select({ ios: 'dialog', android: 'dropdown' })}
            style={styles.picker}
            onValueChange={setJustifyContent}
          >
            {JUSTIFY_CONTENT_OPTIONS.map((opt) => (
              <Picker.Item key={opt} label={opt} value={opt} />
            ))}
          </Picker>
        </View>

        {/* alignItems */}
        <View style={styles.controlBlock}>
          <View style={styles.controlHeader}>
            <Text style={styles.controlLabel}>alignItems</Text>
            <TouchableOpacity onPress={() => showDescription('alignItems')}>
              <Text style={styles.infoIcon}>?</Text>
            </TouchableOpacity>
          </View>
          <Picker
            selectedValue={alignItems}
            mode={Platform.select({ ios: 'dialog', android: 'dropdown' })}
            style={styles.picker}
            onValueChange={setAlignItems}
          >
            {ALIGN_ITEMS_OPTIONS.map((opt) => (
              <Picker.Item key={opt} label={opt} value={opt} />
            ))}
          </Picker>
        </View>

        {/* flexWrap */}
        <View style={styles.controlBlock}>
          <View style={styles.controlHeader}>
            <Text style={styles.controlLabel}>flexWrap</Text>
            <TouchableOpacity onPress={() => showDescription('flexWrap')}>
              <Text style={styles.infoIcon}>?</Text>
            </TouchableOpacity>
          </View>
          <Picker
            selectedValue={flexWrap}
            mode={Platform.select({ ios: 'dialog', android: 'dropdown' })}
            style={styles.picker}
            onValueChange={setFlexWrap}
          >
            {FLEX_WRAP_OPTIONS.map((opt) => (
              <Picker.Item key={opt} label={opt} value={opt} />
            ))}
          </Picker>
        </View>

        {/* alignContent */}
        <View style={styles.controlBlock}>
          <View style={styles.controlHeader}>
            <Text style={styles.controlLabel}>alignContent</Text>
            <TouchableOpacity onPress={() => showDescription('alignContent')}>
              <Text style={styles.infoIcon}>?</Text>
            </TouchableOpacity>
          </View>
          <Picker
            selectedValue={alignContent}
            mode={Platform.select({ ios: 'dialog', android: 'dropdown' })}
            style={styles.picker}
            onValueChange={setAlignContent}
          >
            {ALIGN_CONTENT_OPTIONS.map((opt) => (
              <Picker.Item key={opt} label={opt} value={opt} />
            ))}
          </Picker>
        </View>

        {/* flexGrow */}
        <View style={styles.controlBlock}>
          <View style={styles.controlHeader}>
            <Text style={styles.controlLabel}>flexGrow (per box)</Text>
            <TouchableOpacity onPress={() => showDescription('flexGrow')}>
              <Text style={styles.infoIcon}>?</Text>
            </TouchableOpacity>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={5}
            step={1}
            value={flexGrow}
            onValueChange={setFlexGrow}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#ccc"
          />
          <Text style={styles.sliderValue}>Grow: {flexGrow}</Text>
        </View>

        {/* flexShrink */}
        <View style={styles.controlBlock}>
          <View style={styles.controlHeader}>
            <Text style={styles.controlLabel}>flexShrink (per box)</Text>
            <TouchableOpacity onPress={() => showDescription('flexShrink')}>
              <Text style={styles.infoIcon}>?</Text>
            </TouchableOpacity>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={5}
            step={1}
            value={flexShrink}
            onValueChange={setFlexShrink}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#ccc"
          />
          <Text style={styles.sliderValue}>Shrink: {flexShrink}</Text>
        </View>

        {/* flexBasis */}
        <View style={styles.controlBlock}>
          <View style={styles.controlHeader}>
            <Text style={styles.controlLabel}>flexBasis (per box)</Text>
            <TouchableOpacity onPress={() => showDescription('flexBasis')}>
              <Text style={styles.infoIcon}>?</Text>
            </TouchableOpacity>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={50}
            maximumValue={300}
            step={10}
            value={flexBasis}
            onValueChange={setFlexBasis}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#ccc"
          />
          <Text style={styles.sliderValue}>Basis: {flexBasis}px</Text>
        </View>

        {/* Current Values */}
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Layout Axes</Text>
          <Text style={styles.statusText}>Primary Axis: {primaryAxis}</Text>
          <Text style={styles.statusText}>Cross Axis: {crossAxis}</Text>

          <Text style={[styles.statusTitle, { marginTop: 10 }]}>
            Current Flexbox Values
          </Text>
          <Text style={styles.statusText}>
            • flexDirection: <Text style={styles.highlight}>{flexDirection}</Text>
          </Text>
          <Text style={styles.statusText}>
            • justifyContent: <Text style={styles.highlight}>{justifyContent}</Text>
          </Text>
          <Text style={styles.statusText}>
            • alignItems: <Text style={styles.highlight}>{alignItems}</Text>
          </Text>
          <Text style={styles.statusText}>
            • flexWrap: <Text style={styles.highlight}>{flexWrap}</Text>
          </Text>
          <Text style={styles.statusText}>
            • alignContent: <Text style={styles.highlight}>{alignContent}</Text>
          </Text>
          <Text style={styles.statusText}>
            • flexGrow (boxes): <Text style={styles.highlight}>{flexGrow}</Text>
          </Text>
          <Text style={styles.statusText}>
            • flexShrink (boxes): <Text style={styles.highlight}>{flexShrink}</Text>
          </Text>
          <Text style={styles.statusText}>
            • flexBasis (boxes): <Text style={styles.highlight}>{flexBasis}px</Text>
          </Text>
          <Text style={styles.statusText}>
            • boxCount: <Text style={styles.highlight}>{boxCount}</Text>
          </Text>
        </View>
      </ScrollView>

      {/* Help Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalContent}>{modalContent}</Text>
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
  demoContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    // If 200 is still too tall, reduce further
    height: 200,
  },
  demoContainerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  flexArea: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    backgroundColor: '#ECEFF1',
    padding: 10,
    overflow: 'hidden', // clip overflow
  },
  box: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  boxText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  controlsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#212121',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#616161',
    marginBottom: 10,
    lineHeight: 20,
  },
  controlBlock: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  controlHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  controlLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#424242',
  },
  infoIcon: {
    fontSize: 18,
    color: '#007AFF',
    marginLeft: 8,
  },
  picker: {
    width: '100%',
    marginTop: 5,
    // Force a full-screen "dialog" on iOS
    ...Platform.select({
      android: {
        height: 50,
      },
      default: {
        height: 50,
      },
    }),
  },
  slider: {
    marginTop: 5,
  },
  sliderValue: {
    fontSize: 13,
    marginTop: 5,
    color: '#424242',
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    padding: 15,
    borderWidth: 1,
    borderColor: '#EEE',
    marginBottom: 80,
  },
  statusTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 5,
    color: '#212121',
  },
  statusText: {
    fontSize: 13,
    color: '#424242',
    marginBottom: 3,
    lineHeight: 18,
  },
  highlight: {
    color: '#007AFF',
    fontWeight: '600',
  },
  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalContent: {
    fontSize: 15,
    color: '#333',
    marginBottom: 20,
    lineHeight: 22,
    textAlign: 'center',
  },
  closeModalButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 6,
  },
  closeModalButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
