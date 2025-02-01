import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function SurveyWelcomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText style={styles.title}>
          Welcome! Take the survey to get your custom plan to quit gambling!
        </ThemedText>

        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardText}>
            Let's start by learning more about your habit
          </ThemedText>
          
          <ThemedView style={styles.timeContainer}>
            <ThemedText style={styles.timeText}>
              <ClockIcon /> takes 1 minute
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <Pressable 
          style={styles.button}
          onPress={() => router.push('/questions')}>
          <ThemedText style={styles.buttonText}>
            Take the Survey
          </ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    paddingTop: '20%',
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 42,
    color: '#1E2B3B',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    marginVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#1E2B3B',
    lineHeight: 32,
  },
  timeContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    color: '#4B9AF9',
  },
  button: {
    backgroundColor: '#4B9AF9',
    borderRadius: 100,
    padding: 18,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

// Simple Clock Icon component
function ClockIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="#4B9AF9">
      <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </Svg>
  );
} 