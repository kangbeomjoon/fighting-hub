// 데이터베이스 시드 및 데이터 수집 함수
import { db } from '@/lib/db';
import { fighters, fights, articles } from '@/lib/db/schema';
import { fightingTomatoesAPI, formatFightData, type FightingTomatoesResponse } from '@/lib/api/fighting-tomatoes';

export interface SeedProgress {
  step: string;
  progress: number;
  total: number;
  message: string;
}

/**
 * Fighting Tomatoes API에서 데이터를 가져와 데이터베이스에 저장
 */
export async function seedFromFightingTomatoes(
  onProgress?: (progress: SeedProgress) => void
): Promise<void> {
  try {
    onProgress?.({ step: '시작', progress: 0, total: 100, message: 'Fighting Tomatoes API 연결 중...' });

    // 1. 최근 2년간의 UFC 데이터 수집
    onProgress?.({ step: 'UFC 데이터', progress: 10, total: 100, message: '2023-2024 UFC 경기 데이터 수집 중...' });
    
    const ufc2023 = await fightingTomatoesAPI.getUFCFights(2023);
    const ufc2024 = await fightingTomatoesAPI.getUFCFights(2024);
    const allUFCFights = [...ufc2023, ...ufc2024];

    onProgress?.({ step: '선수 데이터', progress: 30, total: 100, message: `${allUFCFights.length}개 UFC 경기에서 선수 정보 추출 중...` });

    // 2. 선수 데이터 추출 및 저장
    const fighterNames = new Set<string>();
    allUFCFights.forEach(fight => {
      fighterNames.add(fight.fighter_1);
      fighterNames.add(fight.fighter_2);
    });

    const fighterData = Array.from(fighterNames).map(name => ({
      name,
      nameKr: getKoreanName(name), // 한국어 이름 매핑
      nationality: getNationality(name), // 국적 추정
      weightClass: 'Unknown', // 체급은 별도로 업데이트 필요
      recordWins: 0,
      recordLosses: 0,
      recordDraws: 0,
      imageUrl: null,
      reach: null,
      height: null,
      weight: null,
      stance: null,
    }));

    onProgress?.({ step: '선수 저장', progress: 50, total: 100, message: `${fighterData.length}명의 선수 정보 저장 중...` });

    // 선수 데이터 배치 저장
    const batchSize = 50;
    for (let i = 0; i < fighterData.length; i += batchSize) {
      const batch = fighterData.slice(i, i + batchSize);
      await db.insert(fighters).values(batch).onConflictDoNothing();
    }

    onProgress?.({ step: '경기 데이터', progress: 70, total: 100, message: '경기 정보 변환 및 저장 중...' });

    // 3. 경기 데이터 변환 및 저장
    const savedFighters = await db.select().from(fighters);
    const fighterMap = new Map(savedFighters.map(f => [f.name, f.id]));

    const fightData = allUFCFights.map(fight => {
      const formattedFight = formatFightData(fight);
      
      return {
        fighter1Id: fighterMap.get(fight.fighter_1) || null,
        fighter2Id: fighterMap.get(fight.fighter_2) || null,
        eventName: `UFC ${fight.event}`,
        eventNameKr: `UFC ${fight.event}`,
        fightDate: formattedFight.date,
        venue: 'TBD', // 장소 정보는 별도 수집 필요
        venueKr: 'TBD',
        weightClass: 'Unknown', // 체급 정보는 별도 수집 필요
        result: null,
        method: null,
        round: null,
        time: null,
        organization: 'UFC',
        status: formattedFight.date > new Date() ? 'upcoming' : 'completed',
        isMainEvent: formattedFight.cardPosition === 1,
      };
    });

    // 경기 데이터 배치 저장
    for (let i = 0; i < fightData.length; i += batchSize) {
      const batch = fightData.slice(i, i + batchSize);
      await db.insert(fights).values(batch).onConflictDoNothing();
    }

    onProgress?.({ step: '완료', progress: 100, total: 100, message: `데이터 수집 완료! ${fighterData.length}명 선수, ${fightData.length}개 경기` });

  } catch (error) {
    console.error('데이터 시드 과정에서 오류 발생:', error);
    throw error;
  }
}

/**
 * 샘플 데이터로 데이터베이스 초기화
 */
export async function seedSampleData(): Promise<void> {
  try {
    // 샘플 선수 데이터
    const sampleFighters = [
      {
        name: 'Ilia Topuria',
        nameKr: '일리아 토파우리아',
        nationality: 'Spain',
        weightClass: 'Featherweight',
        recordWins: 15,
        recordLosses: 0,
        recordDraws: 0,
        imageUrl: null,
        reach: 183,
        height: 170,
        weight: 66,
        stance: 'Orthodox',
      },
      {
        name: 'Max Holloway',
        nameKr: '맥스 홀로웨이',
        nationality: 'USA',
        weightClass: 'Featherweight',
        recordWins: 25,
        recordLosses: 7,
        recordDraws: 0,
        imageUrl: null,
        reach: 175,
        height: 180,
        weight: 66,
        stance: 'Southpaw',
      },
      {
        name: 'Kim Min-woo',
        nameKr: '김민우',
        nationality: 'South Korea',
        weightClass: 'Lightweight',
        recordWins: 12,
        recordLosses: 3,
        recordDraws: 0,
        imageUrl: null,
        reach: 178,
        height: 175,
        weight: 70,
        stance: 'Orthodox',
      },
      {
        name: 'Lee Seung-woo',
        nameKr: '이승우',
        nationality: 'South Korea',
        weightClass: 'Welterweight',
        recordWins: 9,
        recordLosses: 1,
        recordDraws: 0,
        imageUrl: null,
        reach: 180,
        height: 178,
        weight: 77,
        stance: 'Southpaw',
      }
    ];

    await db.insert(fighters).values(sampleFighters).onConflictDoNothing();

    // 샘플 경기 데이터
    const savedFighters = await db.select().from(fighters);
    const topuria = savedFighters.find(f => f.name === 'Ilia Topuria');
    const holloway = savedFighters.find(f => f.name === 'Max Holloway');
    const kimMinwoo = savedFighters.find(f => f.name === 'Kim Min-woo');
    const leeSeungwoo = savedFighters.find(f => f.name === 'Lee Seung-woo');

    const sampleFights = [
      {
        fighter1Id: topuria?.id || null,
        fighter2Id: holloway?.id || null,
        eventName: 'UFC 308: Topuria vs Holloway',
        eventNameKr: 'UFC 308: 토파우리아 vs 홀로웨이',
        fightDate: new Date('2024-10-26T18:00:00Z'),
        venue: 'Etihad Arena, Abu Dhabi',
        venueKr: '에티하드 아레나, 아부다비',
        weightClass: 'Featherweight',
        result: null,
        method: null,
        round: null,
        time: null,
        organization: 'UFC',
        status: 'upcoming',
        isMainEvent: true,
      },
      {
        fighter1Id: kimMinwoo?.id || null,
        fighter2Id: null, // 임시로 null (상대방 선수 데이터 없음)
        eventName: 'ROAD FC 70',
        eventNameKr: '로드FC 70',
        fightDate: new Date('2024-10-28T19:00:00Z'),
        venue: 'Seoul Olympic Gymnasium',
        venueKr: '서울 올림픽체조경기장',
        weightClass: 'Lightweight',
        result: null,
        method: null,
        round: null,
        time: null,
        organization: 'ROAD FC',
        status: 'upcoming',
        isMainEvent: true,
      }
    ];

    await db.insert(fights).values(sampleFights).onConflictDoNothing();

    // 샘플 기사 데이터
    const sampleArticles = [
      {
        title: 'UFC 308 프리뷰: 토파우리아의 첫 방어전',
        content: '일리아 토파우리아가 맥스 홀로웨이를 상대로 첫 번째 타이틀 방어전을 치른다...',
        summary: '일리아 토파우리아가 맥스 홀로웨이를 상대로 첫 타이틀 방어전을 치른다.',
        authorId: 'system',
        fightId: savedFighters.length > 0 ? (await db.select().from(fights).limit(1))[0]?.id || null : null,
        tags: 'UFC,토파우리아,홀로웨이,페더급',
        isPublished: true,
        publishedAt: new Date(),
      },
      {
        title: '로드FC, 새로운 한국인 유망주 계약',
        content: '아마추어 무패 기록의 김현준이 로드FC와 계약을 체결했다...',
        summary: '아마추어 무패 기록의 김현준이 로드FC와 계약을 체결했다.',
        authorId: 'system',
        fightId: null,
        tags: '로드FC,김현준,한국,신인',
        isPublished: true,
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6시간 전
      }
    ];

    await db.insert(articles).values(sampleArticles).onConflictDoNothing();

    console.log('샘플 데이터 시드 완료');
  } catch (error) {
    console.error('샘플 데이터 시드 중 오류:', error);
    throw error;
  }
}

// 유틸리티 함수들
function getKoreanName(englishName: string): string | null {
  // 한국어 이름 매핑 (확장 가능)
  const nameMap: Record<string, string> = {
    'Ilia Topuria': '일리아 토파우리아',
    'Max Holloway': '맥스 홀로웨이',
    'Kim Min-woo': '김민우',
    'Lee Seung-woo': '이승우',
    'Park Jin-sung': '박진성',
    'Jung Chan-sung': '정찬성',
    'Korean Zombie': '코리안 좀비',
    // 더 많은 매핑 추가 가능
  };
  
  return nameMap[englishName] || null;
}

function getNationality(fighterName: string): string {
  // 국적 추정 로직 (이름 기반, 확장 가능)
  const koreanNames = ['Kim', 'Lee', 'Park', 'Jung', 'Choi', 'Yoon', 'Kang'];
  const hasKoreanName = koreanNames.some(korean => fighterName.includes(korean));
  
  if (hasKoreanName) return 'South Korea';
  
  // 기본값은 미국 (UFC 선수 대부분)
  return 'USA';
}