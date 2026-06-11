import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Alert, ActivityIndicator,
} from 'react-native';
import { trpc } from '../lib/trpc';
import { colors, fontSizes, spacing } from '@maeum/shared';

export default function TodayScreen({ connectionId }: { connectionId: string }) {
  const utils = trpc.useUtils();
  const todayQ = trpc.question.today.useQuery({ connectionId });
  const [answerText, setAnswerText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitAnswer = trpc.answer.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      utils.question.today.invalidate({ connectionId });
    },
    onError: (err) => Alert.alert('오류', err.message),
  });

  const skipAnswer = trpc.answer.skip.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      utils.question.today.invalidate({ connectionId });
    },
  });

  const sendQuestion = trpc.question.send.useMutation({
    onSuccess: () => utils.question.today.invalidate({ connectionId }),
  });

  if (todayQ.isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (submitted) {
    return (
      <View style={styles.center}>
        <Text style={styles.emoji}>🙏</Text>
        <Text style={styles.title}>고마워요!</Text>
        <Text style={styles.subtitle}>소중한 이야기가 잘 전달됐어요</Text>
      </View>
    );
  }

  const question = todayQ.data;

  if (!question) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.emoji}>🌤️</Text>
        <Text style={styles.title}>오늘의 질문이 아직 없어요</Text>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => sendQuestion.mutate({ connectionId })}
          disabled={sendQuestion.isPending}
        >
          <Text style={styles.primaryButtonText}>
            {sendQuestion.isPending ? '보내는 중...' : '오늘의 질문 보내기'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (question.answer) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.questionLabel}>오늘의 질문</Text>
        <Text style={styles.question}>{question.body}</Text>
        <View style={styles.answerBox}>
          {question.answer.skipped ? (
            <Text style={styles.skippedText}>건너뛰었어요</Text>
          ) : (
            <Text style={styles.answerText}>{question.answer.body}</Text>
          )}
        </View>
        <Text style={styles.doneText}>✅ 답변 완료</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.questionLabel}>오늘의 질문 · 깊이 {question.depth}단계</Text>
      <Text style={styles.question}>{question.body}</Text>

      <TextInput
        style={styles.textInput}
        value={answerText}
        onChangeText={setAnswerText}
        multiline
        placeholder="편하게 이야기해주세요..."
        placeholderTextColor={colors.textMuted}
        textAlignVertical="top"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => skipAnswer.mutate({ questionId: question.id })}
          disabled={skipAnswer.isPending}
        >
          <Text style={styles.skipButtonText}>다음에 할게요</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.submitButton, !answerText.trim() && styles.disabled]}
          onPress={() => submitAnswer.mutate({ questionId: question.id, format: 'text', body: answerText, receivedVia: 'app' })}
          disabled={!answerText.trim() || submitAnswer.isPending}
        >
          <Text style={styles.submitButtonText}>
            {submitAnswer.isPending ? '보내는 중...' : '답변 보내기'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  container: { padding: spacing.lg, gap: spacing.md },
  emoji: { fontSize: 56, textAlign: 'center', marginBottom: spacing.sm },
  title: { fontSize: fontSizes['2xl'], fontWeight: '700', color: colors.textPrimary, textAlign: 'center' },
  subtitle: { fontSize: fontSizes.md, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xs },
  questionLabel: { fontSize: fontSizes.xs, fontWeight: '600', color: colors.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  question: { fontSize: fontSizes['2xl'], fontWeight: '500', color: colors.textPrimary, lineHeight: fontSizes['2xl'] * 1.5, marginTop: spacing.xs },
  textInput: {
    borderWidth: 1, borderColor: colors.border, borderRadius: 16,
    padding: spacing.md, fontSize: fontSizes.lg, color: colors.textPrimary,
    minHeight: 150, marginTop: spacing.md,
  },
  buttonRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  skipButton: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: spacing.md, alignItems: 'center' },
  skipButtonText: { color: colors.textSecondary, fontWeight: '500' },
  submitButton: { flex: 2, backgroundColor: colors.primary, borderRadius: 16, padding: spacing.md, alignItems: 'center' },
  submitButtonText: { color: 'white', fontWeight: '600', fontSize: fontSizes.md },
  disabled: { opacity: 0.5 },
  primaryButton: { backgroundColor: colors.primary, borderRadius: 16, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg },
  primaryButtonText: { color: 'white', fontWeight: '600', fontSize: fontSizes.lg },
  answerBox: { backgroundColor: '#F9F9F6', borderRadius: 16, padding: spacing.md, marginTop: spacing.md },
  answerText: { fontSize: fontSizes.lg, color: colors.textPrimary, lineHeight: fontSizes.lg * 1.6 },
  skippedText: { fontSize: fontSizes.md, color: colors.textMuted, fontStyle: 'italic' },
  doneText: { fontSize: fontSizes.sm, color: colors.success, fontWeight: '500' },
});
