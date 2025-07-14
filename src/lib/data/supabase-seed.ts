// Supabase 클라이언트를 사용한 데이터 시드
import { supabase } from '@/lib/supabase';
import { fightingTomatoesAPI, formatFightData, type FightingTomatoesResponse } from '@/lib/api/fighting-tomatoes';

export interface SeedProgress {
  step: string;
  progress: number;
  total: number;
  message: string;
}

/**
 * 샘플 데이터로 데이터베이스 초기화 (Supabase 클라이언트 사용)
 */
export async function seedSampleDataWithSupabase(): Promise<void> {
  try {
    // 1. 기존 데이터 확인
    const { data: existingFighters } = await supabase
      .from('fighters')
      .select('id')
      .limit(1);

    if (existingFighters && existingFighters.length > 0) {
      console.log('이미 데이터가 존재합니다. 추가 데이터만 삽입합니다.');
    }

    // 2. 샘플 선수 데이터
    const sampleFighters = [
      {
        name: 'Ilia Topuria',
        name_kr: '일리아 토파우리아',
        nationality: 'Spain',
        weight_class: 'Featherweight',
        record_wins: 15,
        record_losses: 0,
        record_draws: 0,
        reach: 183,
        height: 170,
        weight: 66,
        stance: 'Orthodox',
      },
      {
        name: 'Max Holloway',
        name_kr: '맥스 홀로웨이',
        nationality: 'USA',
        weight_class: 'Featherweight',
        record_wins: 25,
        record_losses: 7,
        record_draws: 0,
        reach: 175,
        height: 180,
        weight: 66,
        stance: 'Southpaw',
      },
      {
        name: 'Kim Min-woo',
        name_kr: '김민우',
        nationality: 'South Korea',
        weight_class: 'Lightweight',
        record_wins: 12,
        record_losses: 3,
        record_draws: 0,
        reach: 178,
        height: 175,
        weight: 70,
        stance: 'Orthodox',
      },
      {
        name: 'Lee Seung-woo',
        name_kr: '이승우',
        nationality: 'South Korea',
        weight_class: 'Welterweight',
        record_wins: 9,
        record_losses: 1,
        record_draws: 0,
        reach: 180,
        height: 178,
        weight: 77,
        stance: 'Southpaw',
      },
      {
        name: 'Park Jin-sung',
        name_kr: '박진성',
        nationality: 'South Korea',
        weight_class: 'Welterweight',
        record_wins: 7,
        record_losses: 2,
        record_draws: 0,
        reach: 175,
        height: 176,
        weight: 77,
        stance: 'Orthodox',
      }
    ];

    // 3. 선수 데이터 삽입 (중복 체크 후 삽입)
    let insertedFighters = [];
    for (const fighter of sampleFighters) {
      const { data: existing } = await supabase
        .from('fighters')
        .select('id')
        .eq('name', fighter.name)
        .single();

      if (!existing) {
        const { data, error } = await supabase
          .from('fighters')
          .insert(fighter)
          .select()
          .single();

        if (error) {
          console.warn(`선수 ${fighter.name} 삽입 실패:`, error.message);
        } else {
          insertedFighters.push(data);
        }
      }
    }

    console.log(`${insertedFighters?.length || 0}명의 선수 데이터가 삽입되었습니다.`);

    // 4. 선수 ID 매핑
    const { data: allFighters } = await supabase
      .from('fighters')
      .select('id, name');

    const fighterMap = new Map(allFighters?.map(f => [f.name, f.id]) || []);

    // 5. 샘플 경기 데이터
    const sampleFights = [
      {
        fighter1_id: fighterMap.get('Ilia Topuria') || null,
        fighter2_id: fighterMap.get('Max Holloway') || null,
        event_name: 'UFC 308: Topuria vs Holloway',
        event_name_kr: 'UFC 308: 토파우리아 vs 홀로웨이',
        fight_date: '2024-10-26T18:00:00Z',
        venue: 'Etihad Arena, Abu Dhabi',
        venue_kr: '에티하드 아레나, 아부다비',
        weight_class: 'Featherweight',
        organization: 'UFC',
        status: 'upcoming',
        is_main_event: true,
      },
      {
        fighter1_id: fighterMap.get('Kim Min-woo') || null,
        fighter2_id: null, // 상대방 데이터 없음
        event_name: 'ROAD FC 70',
        event_name_kr: '로드FC 70',
        fight_date: '2024-10-28T19:00:00Z',
        venue: 'Seoul Olympic Gymnasium',
        venue_kr: '서울 올림픽체조경기장',
        weight_class: 'Lightweight',
        organization: 'ROAD FC',
        status: 'upcoming',
        is_main_event: true,
      },
      {
        fighter1_id: fighterMap.get('Lee Seung-woo') || null,
        fighter2_id: fighterMap.get('Park Jin-sung') || null,
        event_name: 'Black Combat 15',
        event_name_kr: '블랙컴뱃 15',
        fight_date: '2024-11-02T20:00:00Z',
        venue: 'Sajik Arena, Busan',
        venue_kr: '사직체육관, 부산',
        weight_class: 'Welterweight',
        organization: 'Black Combat',
        status: 'upcoming',
        is_main_event: true,
      }
    ];

    // 6. 경기 데이터 삽입 (중복 체크 후 삽입)
    let insertedFights = [];
    for (const fight of sampleFights) {
      const { data: existing } = await supabase
        .from('fights')
        .select('id')
        .eq('event_name', fight.event_name)
        .single();

      if (!existing) {
        const { data, error } = await supabase
          .from('fights')
          .insert(fight)
          .select()
          .single();

        if (error) {
          console.warn(`경기 ${fight.event_name} 삽입 실패:`, error.message);
        } else {
          insertedFights.push(data);
        }
      }
    }

    console.log(`${insertedFights?.length || 0}개의 경기 데이터가 삽입되었습니다.`);

    // 7. 샘플 기사 데이터
    const sampleArticles = [
      {
        title: 'UFC 308 프리뷰: 토파우리아의 첫 방어전',
        content: '일리아 토파우리아가 맥스 홀로웨이를 상대로 첫 번째 타이틀 방어전을 치른다. 두 선수의 스타일 분석과 승부 포인트를 상세히 다뤄본다.',
        summary: '일리아 토파우리아가 맥스 홀로웨이를 상대로 첫 타이틀 방어전을 치른다.',
        author_id: 'system',
        fight_id: insertedFights?.[0]?.id || null,
        tags: 'UFC,토파우리아,홀로웨이,페더급',
        is_published: true,
        published_at: new Date().toISOString(),
      },
      {
        title: '로드FC, 새로운 한국인 유망주 계약',
        content: '아마추어 무패 기록의 김현준이 로드FC와 계약을 체결했다고 발표했다.',
        summary: '아마추어 무패 기록의 김현준이 로드FC와 계약을 체결했다.',
        author_id: 'system',
        tags: '로드FC,김현준,한국,신인',
        is_published: true,
        published_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6시간 전
      },
      {
        title: '블랙컴뱃 15: 한국 웰터급의 새로운 전설이 탄생할까?',
        content: '이승우와 박진성의 대결은 한국 웰터급의 미래를 가를 중요한 경기가 될 것이다.',
        summary: '이승우 vs 박진성, 한국 웰터급의 미래를 가를 중요한 경기',
        author_id: 'system',
        fight_id: insertedFights?.[2]?.id || null,
        tags: '블랙컴뱃,이승우,박진성,웰터급',
        is_published: true,
        published_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12시간 전
      }
    ];

    // 8. 기사 데이터 삽입 (중복 체크 후 삽입)
    let insertedArticles = [];
    for (const article of sampleArticles) {
      const { data: existing } = await supabase
        .from('articles')
        .select('id')
        .eq('title', article.title)
        .single();

      if (!existing) {
        const { data, error } = await supabase
          .from('articles')
          .insert(article)
          .select()
          .single();

        if (error) {
          console.warn(`기사 ${article.title} 삽입 실패:`, error.message);
        } else {
          insertedArticles.push(data);
        }
      }
    }

    console.log(`${insertedArticles?.length || 0}개의 기사 데이터가 삽입되었습니다.`);

    console.log('샘플 데이터 시드 완료!');
    
  } catch (error) {
    console.error('샘플 데이터 시드 중 오류:', error);
    throw error;
  }
}

/**
 * Fighting Tomatoes API에서 데이터를 가져와 Supabase에 저장
 */
export async function seedFromFightingTomatoesWithSupabase(
  onProgress?: (progress: SeedProgress) => void
): Promise<void> {
  try {
    onProgress?.({ step: '시작', progress: 0, total: 100, message: 'Fighting Tomatoes API 연결 중...' });

    // API 키 확인
    if (!process.env.FIGHTING_TOMATOES_API_KEY || process.env.FIGHTING_TOMATOES_API_KEY === 'your_fighting_tomatoes_api_key_here') {
      throw new Error('Fighting Tomatoes API 키가 설정되지 않았습니다.');
    }

    // 1. 최근 UFC 데이터 수집 (작은 샘플로 시작)
    onProgress?.({ step: 'UFC 데이터', progress: 10, total: 100, message: '2024 UFC 경기 데이터 수집 중...' });
    
    const ufc2024 = await fightingTomatoesAPI.getUFCFights(2024);
    const limitedFights = ufc2024.slice(0, 20); // 처음 20개만 테스트

    onProgress?.({ step: '선수 데이터', progress: 30, total: 100, message: `${limitedFights.length}개 UFC 경기에서 선수 정보 추출 중...` });

    // 2. 선수 데이터 추출
    const fighterNames = new Set<string>();
    limitedFights.forEach(fight => {
      fighterNames.add(fight.fighter_1);
      fighterNames.add(fight.fighter_2);
    });

    const fighterData = Array.from(fighterNames).map(name => ({
      name,
      name_kr: getKoreanName(name),
      nationality: getNationality(name),
      weight_class: 'Unknown',
      record_wins: 0,
      record_losses: 0,
      record_draws: 0,
    }));

    onProgress?.({ step: '선수 저장', progress: 50, total: 100, message: `${fighterData.length}명의 선수 정보 저장 중...` });

    // 3. 선수 데이터 삽입
    const { data: insertedFighters, error: fightersError } = await supabase
      .from('fighters')
      .upsert(fighterData, { onConflict: 'name' })
      .select();

    if (fightersError) {
      throw new Error(`선수 데이터 삽입 실패: ${fightersError.message}`);
    }

    onProgress?.({ step: '경기 데이터', progress: 70, total: 100, message: '경기 정보 변환 및 저장 중...' });

    // 4. 선수 ID 매핑
    const { data: allFighters } = await supabase
      .from('fighters')
      .select('id, name');

    const fighterMap = new Map(allFighters?.map(f => [f.name, f.id]) || []);

    // 5. 경기 데이터 변환
    const fightData = limitedFights.map(fight => {
      const formattedFight = formatFightData(fight);
      
      return {
        fighter1_id: fighterMap.get(fight.fighter_1) || null,
        fighter2_id: fighterMap.get(fight.fighter_2) || null,
        event_name: `UFC ${fight.event}`,
        event_name_kr: `UFC ${fight.event}`,
        fight_date: formattedFight.date.toISOString(),
        venue: 'TBD',
        venue_kr: 'TBD',
        weight_class: 'Unknown',
        organization: 'UFC',
        status: formattedFight.date > new Date() ? 'upcoming' : 'completed',
        is_main_event: formattedFight.cardPosition === 1,
      };
    });

    // 6. 경기 데이터 삽입
    const { data: insertedFights, error: fightsError } = await supabase
      .from('fights')
      .upsert(fightData, { onConflict: 'event_name' })
      .select();

    if (fightsError) {
      throw new Error(`경기 데이터 삽입 실패: ${fightsError.message}`);
    }

    onProgress?.({ step: '완료', progress: 100, total: 100, message: `데이터 수집 완료! ${insertedFighters?.length || 0}명 선수, ${insertedFights?.length || 0}개 경기` });

  } catch (error) {
    console.error('Fighting Tomatoes API 시드 과정에서 오류 발생:', error);
    throw error;
  }
}

// 유틸리티 함수들
function getKoreanName(englishName: string): string | null {
  const nameMap: Record<string, string> = {
    'Ilia Topuria': '일리아 토파우리아',
    'Max Holloway': '맥스 홀로웨이',
    'Kim Min-woo': '김민우',
    'Lee Seung-woo': '이승우',
    'Park Jin-sung': '박진성',
    'Jung Chan-sung': '정찬성',
    'Korean Zombie': '코리안 좀비',
    'Song Yadong': '송야동',
    'Zhang Weili': '장웨이리',
  };
  
  return nameMap[englishName] || null;
}

function getNationality(fighterName: string): string {
  const koreanNames = ['Kim', 'Lee', 'Park', 'Jung', 'Choi', 'Yoon', 'Kang', 'Song'];
  const hasKoreanName = koreanNames.some(korean => fighterName.includes(korean));
  
  if (hasKoreanName) return 'South Korea';
  if (fighterName.includes('Zhang') || fighterName.includes('Li ')) return 'China';
  if (fighterName.includes('Silva') || fighterName.includes('Santos')) return 'Brazil';
  
  return 'USA';
}