import OpenAI from 'openai';
import { getMeetings } from '@/lib/meetings';
import { Meetings } from '@/types/meetings';

const client = new OpenAI({
  apiKey: process.env.AI_API_KEY,
});

export async function POST(request: Request) {
  const body = await request.json();
  const { answers } = body;

  const categories = ['운동', '요리 / 제조', '문화 / 공연 / 축제', '게임 / 오락'];

  // AI에게 카테고리 추천 요청
  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: `사용자 정보:
- 나이대: ${answers.age}
- 성별: ${answers.gender}
- 선호1: ${answers.preference1}
- 선호2: ${answers.preference2}
- 선호3: ${answers.preference3}

카테고리 목록: ${categories.join(', ')}

위 사용자 정보를 바탕으로 카테고리 목록에서 이 사용자에게 가장 어울리는 카테고리 3개를 추천해주세요.
응답 형식: 카테고리명만 콤마로 구분해서 답변해주세요. (예: 운동, 게임 / 오락, 요리 / 제조)`,
      },
    ],
  });

  const aiMessage = response.choices[0].message.content || '';
  console.log('AI 추천 카테고리:', aiMessage);

  // AI 응답에서 카테고리 추출
  const recommendedCategories = aiMessage.split(',').map((cat) => cat.trim());

  // 백엔드에서 모임 목록 가져오기
  const meetingsData = await getMeetings();

  // 추천 카테고리에 맞는 모임 필터링 (각 카테고리별 1개씩)
  const recommendedMeetings: Meetings[] = [];

  if ('item' in meetingsData) {
    for (const category of recommendedCategories) {
      const matchingMeetings = meetingsData.item?.filter((meeting: Meetings) => meeting.extra?.category === category);
      if (matchingMeetings && matchingMeetings.length > 0) {
        // 랜덤으로 1개 선택
        const randomIndex = Math.floor(Math.random() * matchingMeetings.length);
        recommendedMeetings.push(matchingMeetings[randomIndex]);
      }
    }
  }

  return Response.json({
    categories: recommendedCategories,
    meetings: recommendedMeetings,
  });
}
