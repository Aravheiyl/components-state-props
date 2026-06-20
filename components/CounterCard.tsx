import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

// These are the PROPS this component expects to receive from its parent (Counter.tsx).
// Think of props like function parameters — the parent sends values, the child uses them.
type CounterCardProps = {
  count: number;           // the current number to display
  onIncrement: () => void; // function to add 1
  onDecrement: () => void; // function to subtract 1
  onReset: () => void;     // function to reset to starting value
};

// CounterCard is the CHILD component — it only displays UI.
// It does NOT manage state. It just uses what it receives through props.
export default function CounterCard({ count, onIncrement, onDecrement, onReset }: CounterCardProps) {

  // useRef creates a value that persists between renders but does NOT trigger re-renders.
  // "scaleAnim" holds an Animated value starting at 1 (normal size).
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // intervalRef stores a reference to a setInterval timer (used for long press).
  // We store it in a ref so we can cancel it later.
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // useEffect runs AFTER the component renders.
  // This one watches "count" — whenever count changes, it plays a quick bounce animation.
  useEffect(() => {
    Animated.sequence([
      // Scale up to 1.1x size over 80ms
      Animated.timing(scaleAnim, { toValue: 1.1, duration: 80, useNativeDriver: true }),
      // Then scale back to normal size over 80ms
      Animated.timing(scaleAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start(); // .start() actually runs the animation
  }, [count]); // the [] means "only re-run this when count changes"

  // useEffect for cleanup — when the component is removed from the screen,
  // this clears any running interval to avoid memory leaks.
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []); // empty [] means "only run once when the component is removed"

  // Stops the long-press interval timer when the user lifts their finger.
  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <View style={styles.card}>

      {}
      <View style={styles.accentBar} />

      <View style={styles.body}>

        <Text style={styles.cardLabel}>Child Component</Text>

        {}
        <View style={styles.countBox}>

          {}
          <Animated.Text style={[styles.countNumber, { transform: [{ scale: scaleAnim }] }]}>
            {count}
            {}
          </Animated.Text>

          <Text style={styles.countCaption}>via props from parent</Text>
        </View>

        {/* Visual separator line */}
        <View style={styles.divider} />

        {/* Buttons section */}
        <View style={styles.buttonsGroup}>

          {}
          <Pressable
            style={({ pressed }) => [styles.btn, styles.btnAdd, pressed && styles.btnPressed]}
            onPressIn={stopInterval}
            onPress={onIncrement}
            onLongPress={() => { intervalRef.current = setInterval(onIncrement, 100); }}
            onPressOut={stopInterval}
          >
            <Text style={styles.btnText}>Add</Text>
          </Pressable>

          {}
          <Pressable
            style={({ pressed }) => [styles.btn, styles.btnMinus, pressed && styles.btnPressed]}
            onPressIn={stopInterval}
            onPress={onDecrement}
            onLongPress={() => { intervalRef.current = setInterval(onDecrement, 100); }}
            onPressOut={stopInterval}
          >
            <Text style={[styles.btnText, styles.btnMinusText]}>Minus</Text>
          </Pressable>

          {}
          <Pressable
            style={({ pressed }) => [styles.btn, styles.btnReset, pressed && styles.btnPressed]}
            onPress={onReset}
          >
            <Text style={[styles.btnText, styles.btnResetText]}>Reset</Text>
          </Pressable>

        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FEF9E4', // butter yellow card
    borderRadius: 20,
    overflow: 'hidden', // clips the accentBar corners to match the card's border radius
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 24,
    elevation: 10,
  },
  accentBar: {
    height: 6,
    backgroundColor: '#C8960C', // mustard yellow stripe at the top
  },
  body: {
    padding: 28,
    gap: 22,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#C8960C',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  countBox: {
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  countNumber: {
    fontSize: 108,
    fontWeight: '900',
    color: '#0D1F4C', // navy — stands out against the butter yellow card
    lineHeight: 116,
    letterSpacing: -4,
  },
  countCaption: {
    fontSize: 12,
    color: '#9B8B4E',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  divider: {
    height: 2,
    backgroundColor: '#F5D76E', // light mustard divider
    borderRadius: 999,
  },
  buttonsGroup: {
    gap: 10,
  },
  btn: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnAdd: {
    backgroundColor: '#0D1F4C', // navy
  },
  btnMinus: {
    backgroundColor: '#C8960C', // mustard
  },
  btnReset: {
    borderWidth: 2,
    borderColor: '#0D1F4C', // outlined navy — no fill
  },
  btnPressed: {
    opacity: 0.72, // dims the button slightly when pressed
  },
  btnText: {
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.3,
    color: '#FEF9E4', // butter yellow text on dark buttons
  },
  btnMinusText: {
    color: '#FEF9E4',
  },
  btnResetText: {
    color: '#0D1F4C', // navy text on the outlined reset button
  },
});
