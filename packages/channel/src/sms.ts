import type { ChannelAdapter, SendParams, SendResult } from './adapter.js';
import { MockChannelAdapter } from './mock.js';

export class SmsChannelAdapter implements ChannelAdapter {
  name = 'sms';
  private accountSid: string;
  private authToken: string;
  private from: string;
  private fallback = new MockChannelAdapter();

  constructor(accountSid: string, authToken: string, from: string) {
    this.accountSid = accountSid;
    this.authToken = authToken;
    this.from = from;
  }

  async send(params: SendParams): Promise<SendResult> {
    if (!this.accountSid || !this.authToken) {
      console.warn('[SmsAdapter] 키 미설정 → Mock으로 폴백');
      return this.fallback.send(params);
    }

    const body = Object.entries(params.variables)
      .map(([, v]) => v)
      .join('\n');

    try {
      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(`${this.accountSid}:${this.authToken}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ To: params.to, From: this.from, Body: body }),
        }
      );
      const data = (await response.json()) as { sid?: string; error_message?: string };
      if (data.sid) {
        return { success: true, messageId: data.sid };
      }
      return { success: false, error: data.error_message };
    } catch (e) {
      const err = e instanceof Error ? e.message : String(e);
      return { success: false, error: err };
    }
  }
}
