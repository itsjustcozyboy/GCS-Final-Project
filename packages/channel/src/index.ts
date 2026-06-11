export * from './adapter';
export * from './mock';
export * from './kakao';
export * from './sms';

import { MockChannelAdapter } from './mock';
import { KakaoChannelAdapter } from './kakao';
import { SmsChannelAdapter } from './sms';
import type { ChannelAdapter } from './adapter';

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
