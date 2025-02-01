import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

// Add icon imports
const icons = {
  period: require('@/assets/images/hourglass.png'),
  time: require('@/assets/images/time.png'),
  desire: require('@/assets/images/greed.png'),
  lifeImpact: require('@/assets/images/desire.png'),
  sideEffects: require('@/assets/images/medicine.png'),
  money: require('@/assets/images/money.png'),
};

// Define the type for individual result
type ResultItem = {
  label: string;
  status: 'safe' | 'danger' | 'average';
};

// Define the type for the route params
type ResultsParams = {
  data: string;
};

export default function Results() {
  const { data } = useLocalSearchParams<ResultsParams>();
  
  if (!data) {
    return null;
  }

  const parsedData = JSON.parse(data) as {
    results: {
      period: ResultItem;
      time: ResultItem;
      desire: ResultItem;
      lifeImpact: ResultItem;
      sideEffects: ResultItem;
      money: ResultItem;
    };
    severity: 'strong' | 'moderate' | 'mild';
  };

  const { results, severity } = parsedData;

  const getCircleColor = (status: ResultItem['status']) => {
    switch (status) {
      case 'safe':
        return 'rgba(34, 197, 94, 0.1)';
      case 'danger':
        return 'rgba(239, 68, 68, 0.1)';
      case 'average':
        return 'rgba(59, 130, 246, 0.1)';
    }
  };

  const ResultCircle = ({ item, iconKey }: { item: ResultItem; iconKey: keyof typeof icons }) => (
    <View style={styles.resultItem}>
      <View style={[styles.circle, { backgroundColor: getCircleColor(item.status) }]}>
        <Image 
          source={icons[iconKey]} 
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.label}>{item.label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <Text style={styles.subtitle}>
        Based on your answers, there is a <Text style={styles.highlight}>{severity}</Text> indication
        that you are addicted to gambling
      </Text>

      <View style={styles.resultsGrid}>
        <ResultCircle item={results.period} iconKey="period" />
        <ResultCircle item={results.time} iconKey="time" />
        <ResultCircle item={results.desire} iconKey="desire" />
        <ResultCircle item={results.lifeImpact} iconKey="lifeImpact" />
        <ResultCircle item={results.sideEffects} iconKey="sideEffects" />
        <ResultCircle item={results.money} iconKey="money" />
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: '#3B82F6' }]} />
          <Text style={styles.legendText}>Average</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: '#22C55E' }]} />
          <Text style={styles.legendText}>Safe</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: '#EF4444' }]} />
          <Text style={styles.legendText}>Danger</Text>
        </View>
      </View>

      <Pressable 
        style={({ pressed }) => [
          styles.button,
          pressed && { opacity: 0.8 }
        ]}
        onPress={() => router.replace('/')}
      >
        <Text style={styles.buttonText}>Let's fix that together 🙌</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginTop: 40,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 40,
  },
  highlight: {
    color: '#3B82F6',
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  resultItem: {
    width: '33%',
    alignItems: 'center',
    marginBottom: 20,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    textAlign: 'center',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    width: '100%',
    position: 'absolute',
    bottom: 40,
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: '#3B82F6', // This will color the icons blue - adjust color as needed
  },
});
