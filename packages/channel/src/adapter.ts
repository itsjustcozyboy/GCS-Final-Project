export interface SendParams {
  to: string;
  templateId: string;
  variables: Record<string, string>;
  channel: 'app' | 'kakao' | 'sms';
}

export interface SendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface ChannelAdapter {
  send(params: SendParams): Promise<SendResult>;
  name: string;
}
