import { useState } from 'react';
import { StyleSheet, Pressable, TextInput } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';

type QuestionOption = {
  id: string;
  text: string;
  type?: never;
  placeholder?: never;
} | {
  type: 'text';
  placeholder: string;
  id?: never;
  text?: never;
};

type Question = {
  id: string;
  text: string;
  tooltip?: string;
  options: QuestionOption[];
};

// Example question data - you can move this to a separate file later
const questions: Question[] = [
  {
    id: '1',
    text: 'Who is your role model?',
    tooltip: 'For example: "Michelle Obama", "My older sister", "Elon Musk"',
    options: [{
      type: 'text',
      placeholder: 'Enter your role model\'s name'
    }]
  },
  {
    id: '2',
    text: 'Which of your role model\'s accomplishments do you hope to achieve yourself?',
    tooltip: 'For example: "Starting a successful business", "Making a positive impact on others"',
    options: [{
      type: 'text',
      placeholder: 'Describe the accomplishments'
    }]
  },
  {
    id: '3',
    text: 'What do you want to be better at?',
    tooltip: 'For example: "Public speaking", "Time management", "Being more patient"',
    options: [{
      type: 'text',
      placeholder: 'Enter what you want to improve'
    }]
  }
];

export default function QuestionsScreen() {
  const insets = useSafeAreaInsets();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionSelect = (optionId: string) => {
    if (questions[currentQuestion].multiSelect) {
      setSelectedOptions(prev => 
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      setSelectedOptions([optionId]);
      // For the last question, wait until we have the selection before navigating
      if (currentQuestion === questions.length - 1) {
        setTimeout(() => {
          router.push({
            pathname: '/spend',
            params: { selectedAnswer: optionId }
          });
        }, 500);
      } else {
        // Auto-advance to next question after short delay for non-last questions
        setTimeout(() => handleNext(), 500);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOptions([]);
    } else {
      // Only navigate if we have a selected answer
      if (selectedOptions.length > 0) {
        const spendingAnswer = selectedOptions[0];
        console.log('Sending answer:', spendingAnswer); // Debug log
        router.push({
          pathname: '/spend',
          params: { selectedAnswer: spendingAnswer }
        });
      } else {
        // If no answer selected, either show an alert or set a default
        console.log('No answer selected');
        // Optionally: Alert.alert('Please select an option');
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedOptions([]);
    }
  };

  const isSliderQuestion = (question: Question) => 
    question.options.some(option => 'type' in option && option.type === 'slider');

  return (
    <ThemedView style={styles.container}>
      {/* Progress bar */}
      <ThemedView style={styles.progressBar}>
        <ThemedView 
          style={[
            styles.progressFill, 
            { width: `${((currentQuestion + 1) / questions.length) * 100}%` }
          ]} 
        />
      </ThemedView>

      {/* Add Back button */}
      <Pressable 
        style={[
          styles.backButton, 
          { top: insets.top + 16 }
        ]} 
        hitSlop={10}
        onPress={handleBack}
      >
        <ThemedText style={styles.backText}>Back</ThemedText>
      </Pressable>

      <Pressable 
        style={[
          styles.skipButton, 
          { top: insets.top + 16 }
        ]} 
        hitSlop={10}
        onPress={handleNext}
      >
        <ThemedText style={styles.skipText}>Skip</ThemedText>
      </Pressable>

      <ThemedView style={styles.content}>
        <ThemedText style={styles.question}>
          {questions[currentQuestion].text}
        </ThemedText>

        {questions[currentQuestion].tooltip && (
          <ThemedText style={styles.tooltip}>
            {questions[currentQuestion].tooltip}
          </ThemedText>
        )}

        <ThemedView style={styles.optionsContainer}>
          {questions[currentQuestion].options.map((option) => (
            'type' in option && option.type === 'text' ? (
              <ThemedView key="text" style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder={option.placeholder}
                  placeholderTextColor="#6B7280"
                  value={selectedOptions[0] || ''}
                  onChangeText={(text) => setSelectedOptions([text])}
                />
              </ThemedView>
            ) : (
              <Pressable
                key={option.id}
                style={[
                  styles.optionButton,
                  selectedOptions.includes(option.id) && styles.selectedOption,
                ]}
                onPress={() => handleOptionSelect(option.id)}
              >
                <ThemedText style={[
                  styles.optionText,
                  selectedOptions.includes(option.id) && styles.selectedOptionText,
                ]}>
                  {option.text}
                </ThemedText>
              </Pressable>
            )
          ))}
        </ThemedView>

        <Pressable
          style={[
            styles.nextButton,
            (!selectedOptions[0] || selectedOptions[0].trim() === '') && styles.nextButtonDisabled
          ]}
          onPress={handleNext}
          disabled={!selectedOptions[0] || selectedOptions[0].trim() === ''}
        >
          <ThemedText style={[
            styles.nextButtonText,
            (!selectedOptions[0] || selectedOptions[0].trim() === '') && styles.nextButtonTextDisabled
          ]}>
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
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
  progressBar: {
    height: 4,
    backgroundColor: '#E8EDF4',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4B9AF9',
  },
  skipButton: {
    position: 'absolute',
    right: 16,
    padding: 4,
    zIndex: 1,
  },
  skipText: {
    color: '#4B9AF9',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: '20%',
  },
  question: {
    paddingTop: 20,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E2B3B',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 42,
  },
  optionsContainer: {
    gap: 16,
  },
  optionButton: {
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E8EDF4',
  },
  selectedOption: {
    backgroundColor: '#4B9AF9',
    borderColor: '#4B9AF9',
  },
  optionText: {
    fontSize: 18,
    color: '#1E2B3B',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#fff',
  },
  nextButton: {
    backgroundColor: '#4B9AF9',
    borderRadius: 100,
    padding: 16,
    marginTop: 24,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#E8EDF4',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButtonTextDisabled: {
    color: '#1E2B3B',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    padding: 4,
    zIndex: 1,
  },
  backText: {
    color: '#4B9AF9',
    fontSize: 16,
  },
  tooltip: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    fontStyle: 'italic',
  },
  textInputContainer: {
    width: '100%',
    marginTop: 16,
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E8EDF4',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    color: '#1E2B3B',
    minHeight: 56,
  },
});
