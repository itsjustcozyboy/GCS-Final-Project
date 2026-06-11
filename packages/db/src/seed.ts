import { prisma } from './index';

const CURATED_QUESTIONS = [
  // Depth 1 — 사실·감각 (워밍업)
  { depth: 1, chapterTag: '유년기', body: '어릴 때 제일 좋아한 반찬은 뭐였어요?' },
  { depth: 1, chapterTag: '유년기', body: '학교 다닐 때 제일 친했던 친구 이름이 뭐예요?' },
  { depth: 1, chapterTag: '유년기', body: '어릴 때 동네 이름이 어디예요? 그 동네에서 제일 기억에 남는 곳은?' },
  { depth: 1, chapterTag: '지금의 나', body: '요즘 가장 자주 듣는 노래가 있어요?' },
  { depth: 1, chapterTag: '지금의 나', body: '요즘 즐겨 마시는 음료가 있어요?' },
  { depth: 1, chapterTag: '지금의 나', body: '요즘 제일 재미있게 보는 TV 프로그램이 있어요?' },
  { depth: 1, chapterTag: '일과 삶', body: '지금까지 해본 일 중에 제일 기억에 남는 일터가 어디예요?' },
  { depth: 1, chapterTag: '유년기', body: '어릴 때 제일 좋아했던 계절은 뭐예요? 왜요?' },
  { depth: 1, chapterTag: '지금의 나', body: '가장 좋아하는 음식은 지금도 어릴 때랑 같아요?' },
  { depth: 1, chapterTag: '유년기', body: '처음으로 스스로 돈 벌어서 뭔가 샀던 게 기억나요? 뭘 샀어요?' },
  { depth: 1, chapterTag: '부모의 부모', body: '할머니, 할아버지 댁에 자주 놀러 갔었어요?' },
  { depth: 1, chapterTag: '유년기', body: '어릴 때 좋아했던 과목이 있어요? 싫어했던 과목은요?' },
  { depth: 1, chapterTag: '지금의 나', body: '아침에 일어나면 제일 먼저 하는 일이 뭐예요?' },
  { depth: 1, chapterTag: '유년기', body: '어릴 때 갖고 싶었던 장난감이나 물건이 있었어요?' },
  { depth: 1, chapterTag: '일과 삶', body: '지금까지 살면서 가장 인상 깊었던 여행지가 어디예요?' },

  // Depth 2 — 일상·취향 (사진 유도)
  { depth: 2, chapterTag: '지금의 나', body: '지금 제일 아끼는 물건을 하나 사진 찍어 보내줄 수 있어요? 왜 그게 소중해요?', personTag: undefined },
  { depth: 2, chapterTag: '유년기', body: '어릴 때 살던 집 사진이 있어요? 그 집에서 제일 좋아했던 공간이 어디예요?' },
  { depth: 2, chapterTag: '지금의 나', body: '오늘 하루 어떻게 보냈어요? 기억에 남는 순간이 있어요?' },
  { depth: 2, chapterTag: '일과 삶', body: '일할 때 제일 힘들었던 때가 언제예요? 어떻게 버텼어요?' },
  { depth: 2, chapterTag: '유년기', body: '어릴 때 즐겨 읽던 책이나 잡지가 있었어요?' },
  { depth: 2, chapterTag: '지금의 나', body: '요즘 즐거움을 느끼는 순간이 언제예요?' },
  { depth: 2, chapterTag: '유년기', body: '초등학교 때 어떤 아이였어요? 조용한 편이었나요, 활발한 편이었나요?' },
  { depth: 2, chapterTag: '일과 삶', body: '지금까지 해온 일 중에 제일 보람 있었던 게 뭐예요?' },
  { depth: 2, chapterTag: '유년기', body: '어릴 때 방과 후에 주로 뭘 했어요? 그 시간이 즐거웠나요?' },
  { depth: 2, chapterTag: '지금의 나', body: '요즘 꼭 챙겨 먹는 음식이 있어요? 건강을 위해서든, 그냥 좋아서든.' },
  { depth: 2, chapterTag: '부모의 부모', body: '할머니나 할아버지께 배운 것 중에 지금도 기억나는 게 있어요?' },
  { depth: 2, chapterTag: '일과 삶', body: '퇴근 후나 쉬는 날에 혼자만의 시간이 생기면 주로 뭘 해요?' },
  { depth: 2, chapterTag: '유년기', body: '어릴 때 방학이 되면 제일 먼저 하고 싶었던 게 뭐였어요?' },
  { depth: 2, chapterTag: '지금의 나', body: '요즘 몸은 어때요? 특별히 챙기고 있는 게 있어요?' },
  { depth: 2, chapterTag: '일과 삶', body: '지금까지 직장 동료 중에 제일 고마웠던 사람이 있어요?' },

  // Depth 3 — 관계·장면 (스토리 유도)
  { depth: 3, chapterTag: '연애·결혼', body: '배우자를 처음 만났을 때 기억나요? 첫인상이 어땠어요?' },
  { depth: 3, chapterTag: '자식을 키우며', body: '내가 태어났을 때 어땠어요? 처음 안아봤을 때 기분이 어떠셨어요?' },
  { depth: 3, chapterTag: '유년기', body: '부모님이 제일 무섭게 혼냈던 기억이 있어요? 무슨 일이 있었어요?' },
  { depth: 3, chapterTag: '부모의 부모', body: '아버지, 어머니는 어떤 분이셨어요? 닮고 싶었던 점이 있어요?' },
  { depth: 3, chapterTag: '연애·결혼', body: '결혼을 결심했을 때 어떤 마음이었어요? 망설임은 없었어요?' },
  { depth: 3, chapterTag: '자식을 키우며', body: '내가 어릴 때 가장 걱정됐던 순간이 언제예요?' },
  { depth: 3, chapterTag: '일과 삶', body: '지금까지 일하면서 제일 힘든 고비가 있었어요? 어떻게 넘겼어요?' },
  { depth: 3, chapterTag: '유년기', body: '어릴 때 제일 친한 친구와 어떤 일이 있었어요? 지금도 연락해요?' },
  { depth: 3, chapterTag: '연애·결혼', body: '신혼 때 제일 기억에 남는 일이 있어요?' },
  { depth: 3, chapterTag: '자식을 키우며', body: '내가 처음 학교 들어가던 날 기억나요? 어떤 마음이셨어요?' },
  { depth: 3, chapterTag: '부모의 부모', body: '부모님이 제일 힘드셨을 때가 언제인 것 같아요? 옆에서 보면서 어떤 마음이었어요?' },
  { depth: 3, chapterTag: '일과 삶', body: '지금 하는 일을 시작하게 된 계기가 뭐예요?' },
  { depth: 3, chapterTag: '연애·결혼', body: '결혼식 날 제일 기억에 남는 장면이 뭐예요?' },
  { depth: 3, chapterTag: '자식을 키우며', body: '내가 중학교, 고등학교 다닐 때 부모님 눈에는 어떻게 보였어요?' },
  { depth: 3, chapterTag: '유년기', body: '형제자매와 제일 재미있었던 기억이 뭐예요? 싸웠던 기억도 있어요?' },

  // Depth 4 — 가치관·인생관
  { depth: 4, chapterTag: '지금의 나', body: '살면서 제일 잘한 선택이 뭐라고 생각해요?' },
  { depth: 4, chapterTag: '지금의 나', body: '다시 태어난다면 똑같은 삶을 살고 싶어요? 바꾸고 싶은 게 있어요?' },
  { depth: 4, chapterTag: '일과 삶', body: '일과 가정 중에서 균형을 맞추는 게 쉬웠어요? 어렵게 느낀 적이 있어요?' },
  { depth: 4, chapterTag: '지금의 나', body: '지금 가장 소중히 여기는 것이 뭐예요?' },
  { depth: 4, chapterTag: '부모의 부모', body: '부모님이 해주신 말씀 중에 지금도 마음에 남는 게 있어요?' },
  { depth: 4, chapterTag: '지금의 나', body: '나이 들면서 마음이 바뀐 게 있어요? 젊을 때와 지금이 다른 점이요.' },
  { depth: 4, chapterTag: '일과 삶', body: '돈보다 중요하다고 생각하는 것이 있어요?' },
  { depth: 4, chapterTag: '자식을 키우며', body: '자식을 키우면서 제일 깨달은 게 뭐예요?' },
  { depth: 4, chapterTag: '지금의 나', body: '지금 이 나이가 되고 보니, 젊을 때 더 했으면 좋았을 게 있어요?' },
  { depth: 4, chapterTag: '일과 삶', body: '인생에서 가장 큰 실수나 후회가 있어요? 이야기해줄 수 있어요?' },
  { depth: 4, chapterTag: '지금의 나', body: '행복하다고 느끼는 순간이 언제예요?' },
  { depth: 4, chapterTag: '부모의 부모', body: '부모님처럼 되고 싶다고 느낀 적 있어요? 반대로 달라지고 싶었던 것도요?' },
  { depth: 4, chapterTag: '지금의 나', body: '지금 나에게 용기가 필요한 일이 있어요?' },
  { depth: 4, chapterTag: '자식을 키우며', body: '내가 어른이 된 걸 보면서 어떤 마음이에요?' },
  { depth: 4, chapterTag: '일과 삶', body: '살면서 누군가에게 가장 고마웠던 순간이 언제예요?' },

  // Depth 5 — 마음·전언 (드물게)
  { depth: 5, chapterTag: '너에게', body: '나한테 꼭 해주고 싶은 말이 있어요? 평소에 하기 어려웠던 것도요.' },
  { depth: 5, chapterTag: '너에게', body: '내가 잘 살고 있다고 생각해요? 걱정되는 것도 솔직하게 말해줘요.' },
  { depth: 5, chapterTag: '너에게', body: '내 어릴 때 모습 중에 제일 기억에 남는 장면이 있어요?' },
  { depth: 5, chapterTag: '지금의 나', body: '지금 이 순간, 제일 감사한 게 뭐예요?' },
  { depth: 5, chapterTag: '너에게', body: '내 자식에게 물려주고 싶은 게 있어요? 물건이 아니어도 돼요.' },
  { depth: 5, chapterTag: '너에게', body: '내가 어른이 되는 걸 보면서 제일 뿌듯했던 때가 언제예요?' },
  { depth: 5, chapterTag: '지금의 나', body: '지금 내 마음속에 오래 담아뒀던 이야기가 있어요?' },
  { depth: 5, chapterTag: '너에게', body: '나한테 미처 전하지 못한 사랑 표현이 있어요? 지금 해줄 수 있어요?' },
  { depth: 5, chapterTag: '지금의 나', body: '오랫동안 간직해온 꿈이나 바람이 있어요?' },
  { depth: 5, chapterTag: '너에게', body: '내가 기억해줬으면 하는 것이 있어요? 어떤 사람으로 기억되고 싶어요?' },
  { depth: 5, chapterTag: '너에게', body: '나한테 부탁하고 싶은 게 있어요? 지금이라도 말해줘요.' },
  { depth: 5, chapterTag: '지금의 나', body: '살면서 제일 힘들었던 때를 어떻게 이겨냈어요? 그 힘이 어디서 나왔어요?' },
  { depth: 5, chapterTag: '너에게', body: '나를 낳고 키우면서 가장 행복했던 순간 하나만 말해줄 수 있어요?' },
  { depth: 5, chapterTag: '너에게', body: '나에게 가장 바라는 게 뭐예요?' },
  { depth: 5, chapterTag: '지금의 나', body: '지금 이 대화를 하면서 어떤 마음이에요?' },
];

async function main() {
  console.log('🌱 Seeding curated questions...');

  await prisma.curatedQuestion.deleteMany();
  await prisma.curatedQuestion.createMany({
    data: CURATED_QUESTIONS.map((q) => ({
      ...q,
      language: 'ko',
    })),
  });

  console.log(`✅ Seeded ${CURATED_QUESTIONS.length} curated questions`);

  // Demo users for local development
  if (process.env.NODE_ENV !== 'production') {
    const child = await prisma.user.upsert({
      where: { email: 'child@demo.local' },
      update: {},
      create: {
        email: 'child@demo.local',
        name: '김지훈',
        role: 'child',
      },
    });

    const parent = await prisma.user.upsert({
      where: { email: 'parent@demo.local' },
      update: {},
      create: {
        email: 'parent@demo.local',
        name: '김영수',
        role: 'parent',
      },
    });

    await prisma.connection.upsert({
      where: { inviteCode: 'DEMO0001' },
      update: {},
      create: {
        fromUserId: parent.id,
        toUserId: child.id,
        inviteCode: 'DEMO0001',
        intimacy: 3,
        tone: 'light',
        sensitiveStatus: 'active',
        currentDepth: 1,
      },
    });

    console.log('✅ Demo users and connection created');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
