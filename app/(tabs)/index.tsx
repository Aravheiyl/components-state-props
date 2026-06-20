import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Counter from '@/components/Counter';


const INITIAL_COUNT = 100;


export default function HomeScreen() {


  const [count, setCount] = useState<number>(INITIAL_COUNT);


  const handleIncrement = () => setCount(prev => prev + 1);
  const handleDecrement = () => setCount(prev => prev - 1);
  const handleReset = () => setCount(INITIAL_COUNT);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.label}>Parent Screen</Text>
          <Text style={styles.title}>Counter App</Text>
        </View>

        {}
        <View style={styles.stateBox}>
          <Text style={styles.stateBoxLabel}>Parent Component State</Text>
          <View style={styles.stateRow}>
            <Text style={styles.stateKey}>count</Text>
            <Text style={styles.stateEquals}>=</Text>
            {}
            <Text style={styles.stateValue}>{count}</Text>
          </View>
          <View style={styles.stateRow}>
            <Text style={styles.stateKey}>initial</Text>
            <Text style={styles.stateEquals}>=</Text>
            <Text style={styles.stateValue}>{INITIAL_COUNT}</Text>
          </View>
        </View>

        {}
        <Counter
          count={count}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onReset={handleReset}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0D1F4C',
  },
  scroll: {
    padding: 24,
    paddingTop: 20,
    paddingBottom: 48,
    gap: 20,
  },
  header: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#C8960C',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FEF9E4',
    letterSpacing: -0.5,
  },
  stateBox: {
    backgroundColor: '#162A5E',
    borderRadius: 16,
    padding: 20,
    gap: 10,
    borderWidth: 1,
    borderColor: '#C8960C',
  },
  stateBoxLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#C8960C',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  stateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stateKey: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8BA0C8',
    fontFamily: 'monospace',
    width: 52,
  },
  stateEquals: {
    fontSize: 14,
    color: '#C8960C',
    fontWeight: '700',
  },
  stateValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FEF9E4',
    fontFamily: 'monospace',
  },
});
