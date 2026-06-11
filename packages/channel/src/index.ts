export * from './adapter.js';
export * from './mock.js';
export * from './kakao.js';
export * from './sms.js';

import { MockChannelAdapter } from './mock.js';
import { KakaoChannelAdapter } from './kakao.js';
import { SmsChannelAdapter } from './sms.js';
import type { ChannelAdapter } from './adapter.js';

export function createChannelAdapter(channel: 'app' | 'kakao' | 'sms'): ChannelAdapter {
  if (channel === 'kakao') {
    const apiKey = process.env.KAKAO_API_KEY ?? '';
    const senderKey = process.env.KAKAO_SENDER_KEY ?? '';
    if (apiKey && senderKey) return new KakaoChannelAdapter(apiKey, senderKey);
  }
  if (channel === 'sms') {
    const sid = process.env.TWILIO_ACCOUNT_SID ?? '';
    const token = process.env.TWILIO_AUTH_TOKEN ?? '';
    const from = process.env.TWILIO_FROM_NUMBER ?? '';
    if (sid && token && from) return new SmsChannelAdapter(sid, token, from);
  }
  return new MockChannelAdapter();
}
