import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';
// import { Button } from '@/components/Button';

export default function SpendScreen() {
  const params = useLocalSearchParams<{ selectedAnswer: string }>();
  console.log('Received params:', params); // Debug log

  const calculateYearlySpend = (weeklySpend: string): number => {
    if (!weeklySpend) return 0;
    const weeklyAmount = parseFloat(weeklySpend);
    return weeklyAmount * 52; // Multiply by 52 weeks
  };

  const yearlySpend = calculateYearlySpend(params.selectedAnswer);

  const handleNavigateToResults = () => {
    const resultsData = {
      results: {
        period: { label: 'Period', status: 'safe' },
        time: { label: 'Time', status: 'danger' },
        desire: { label: 'Desire', status: 'danger' },
        lifeImpact: { label: 'Life impact', status: 'danger' },
        sideEffects: { label: 'Side effects', status: 'danger' },
        money: { 
          label: 'Money', 
          status: yearlySpend > 26000 ? 'danger' : yearlySpend > 13000 ? 'average' : 'safe' 
        },
      },
      severity: yearlySpend > 26000 ? 'strong' : yearlySpend > 13000 ? 'moderate' : 'mild',
    };

    router.push({
      pathname: '/results',
      params: {
        data: JSON.stringify(resultsData)
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.shield}>
          <Text style={styles.xMark}>✕</Text>
        </View>
      </View>
      <Text style={styles.title}>
        Your average yearly spend on gambling is
      </Text>
      <Text style={styles.amount}>
        ${yearlySpend.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Text>
      <Pressable 
        style={({ pressed }) => [
          styles.button,
          pressed && { opacity: 0.8 }
        ]}
        onPress={handleNavigateToResults}
      >
        <Text style={styles.buttonText}>Results Here 🔍</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  shield: {
    width: 60,
    height: 60,
    backgroundColor: '#EF4444',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
    color: '#1F2937',
  },
  amount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#EF4444',
    marginBottom: 40,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    width: '90%',
    backgroundColor: '#60A5FA',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  xMark: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
