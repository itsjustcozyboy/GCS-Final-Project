import type { ChannelAdapter, SendParams, SendResult } from './adapter';

export class MockChannelAdapter implements ChannelAdapter {
  name = 'mock';

  async send(params: SendParams): Promise<SendResult> {
    const messageId = `mock_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    console.log('\n📨 [MockChannel] 메시지 발송 시뮬레이션');
    console.log(`  채널: ${params.channel}`);
    console.log(`  수신자: ${params.to}`);
    console.log(`  템플릿: ${params.templateId}`);
    console.log(`  변수:`, params.variables);
    console.log(`  메시지 ID: ${messageId}\n`);
    return { success: true, messageId };
  }
}
