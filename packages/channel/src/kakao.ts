import type { ChannelAdapter, SendParams, SendResult } from './adapter';
import { MockChannelAdapter } from './mock';

export class KakaoChannelAdapter implements ChannelAdapter {
  name = 'kakao';
  private apiKey: string;
  private senderKey: string;
  private fallback = new MockChannelAdapter();

  constructor(apiKey: string, senderKey: string) {
    this.apiKey = apiKey;
    this.senderKey = senderKey;
  }

  async send(params: SendParams): Promise<SendResult> {
    if (!this.apiKey || !this.senderKey) {
      console.warn('[KakaoAdapter] 키 미설정 → Mock으로 폴백');
      return this.fallback.send(params);
    }

    // 실제 카카오 알림톡 API 연동 (키가 있을 때)
    try {
      const response = await fetch('https://kakaoapi.aligo.in/akv10/alimtalk/send/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          apikey: this.apiKey,
          userid: this.senderKey,
          senderkey: this.senderKey,
          tpl_code: params.templateId,
          receiver_1: params.to,
          ...Object.fromEntries(
            Object.entries(params.variables).map(([k, v]) => [`subject_1`, `${k}: ${v}`])
          ),
        }),
      });
      const data = (await response.json()) as { code: number; message: string; info?: { mid: string } };
      if (data.code === 0) {
        return { success: true, messageId: data.info?.mid };
      }
      return { success: false, error: data.message };
    } catch (e) {
      const err = e instanceof Error ? e.message : String(e);
      return { success: false, error: err };
    }
  }
}
