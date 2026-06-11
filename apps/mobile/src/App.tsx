import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc, API_URL } from './lib/trpc';
import TodayScreen from './screens/TodayScreen';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@maeum/shared';

const DEMO_CONNECTION_ID = 'demo'; // 개발용; 실제로는 로그인 후 session에서

function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💌 마음 잇기</Text>
      </View>
      <TodayScreen connectionId={DEMO_CONNECTION_ID} />
    </View>
  );
}

export default function Root() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: `${API_URL}/api/trpc` })],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF7' },
  header: {
    paddingTop: 56, paddingBottom: 12, paddingHorizontal: 20,
    backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E5E5E5',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: colors.primaryDark },
});
