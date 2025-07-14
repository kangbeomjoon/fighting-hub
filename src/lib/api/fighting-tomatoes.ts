// Fighting Tomatoes API integration
// API Documentation: https://fightingtomatoes.com/API

export interface FightingTomatoesResponse {
  date: string;
  promotion: string;
  event: string;
  main_or_prelim: string;
  card_placement: number;
  fighter_1: string;
  fighter_2: string;
  fighting_tomatoes_aggregate_rating: number;
  fighting_tomatoes_number_ratings: number;
}

export interface APIParams {
  year?: string | number;
  event?: string;
  fighter?: string;
}

class FightingTomatoesAPI {
  private apiKey: string;
  private baseUrl = 'https://fightingtomatoes.com/API';
  private requestCount = 0;
  private maxRequests = 200; // 월 200회 제한

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private checkRateLimit(): void {
    if (this.requestCount >= this.maxRequests) {
      throw new Error('월 API 요청 제한 (200회)을 초과했습니다.');
    }
  }

  private async makeRequest(url: string): Promise<FightingTomatoesResponse[]> {
    this.checkRateLimit();
    
    try {
      console.log(`API 요청: ${url}`);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      this.requestCount++;
      
      console.log(`API 응답 성공. 남은 요청: ${this.maxRequests - this.requestCount}`);
      return data;
    } catch (error) {
      console.error('Fighting Tomatoes API 요청 실패:', error);
      throw error;
    }
  }

  /**
   * 전체 경기 데이터 조회
   * @param params - 년도, 이벤트, 선수 필터
   */
  async getFights(params: APIParams = {}): Promise<FightingTomatoesResponse[]> {
    const { year = 'any', event = 'any', fighter = 'any' } = params;
    const url = `${this.baseUrl}/${this.apiKey}/${year}/${event}/${fighter}`;
    
    return this.makeRequest(url);
  }

  /**
   * 특정 년도의 UFC 경기 조회
   */
  async getUFCFights(year: string | number = 'any'): Promise<FightingTomatoesResponse[]> {
    const fights = await this.getFights({ year });
    return fights.filter(fight => fight.promotion === 'UFC');
  }

  /**
   * 특정 선수의 경기 기록 조회
   */
  async getFighterHistory(fighterName: string): Promise<FightingTomatoesResponse[]> {
    return this.getFights({ fighter: fighterName });
  }

  /**
   * 최근 경기 데이터 조회 (2024년)
   */
  async getRecentFights(): Promise<FightingTomatoesResponse[]> {
    return this.getFights({ year: 2024 });
  }

  /**
   * 높은 평점 경기 조회 (평점 80 이상)
   */
  async getHighRatedFights(year: string | number = 'any'): Promise<FightingTomatoesResponse[]> {
    const fights = await this.getFights({ year });
    return fights.filter(fight => 
      fight.fighting_tomatoes_aggregate_rating >= 80 && 
      fight.fighting_tomatoes_number_ratings >= 5
    );
  }

  /**
   * 특정 이벤트의 경기 조회
   */
  async getEventFights(eventNumber: string): Promise<FightingTomatoesResponse[]> {
    return this.getFights({ event: eventNumber });
  }

  /**
   * API 사용량 정보
   */
  getUsageInfo() {
    return {
      requestsUsed: this.requestCount,
      requestsRemaining: this.maxRequests - this.requestCount,
      maxRequests: this.maxRequests
    };
  }

  /**
   * 사용량 리셋 (새 달 시작시)
   */
  resetUsage() {
    this.requestCount = 0;
    console.log('API 사용량이 리셋되었습니다.');
  }
}

// API 클라이언트 인스턴스 생성
export const fightingTomatoesAPI = new FightingTomatoesAPI(
  process.env.FIGHTING_TOMATOES_API_KEY || ''
);

// 유틸리티 함수들
export const formatFightData = (fight: FightingTomatoesResponse) => ({
  date: new Date(fight.date),
  promotion: fight.promotion,
  event: fight.event,
  isMainCard: fight.main_or_prelim === 'Main',
  cardPosition: fight.card_placement,
  fighter1: fight.fighter_1,
  fighter2: fight.fighter_2,
  rating: fight.fighting_tomatoes_aggregate_rating,
  ratingCount: fight.fighting_tomatoes_number_ratings,
  isHighQuality: fight.fighting_tomatoes_aggregate_rating >= 70 && fight.fighting_tomatoes_number_ratings >= 5
});

export const groupFightsByPromotion = (fights: FightingTomatoesResponse[]) => {
  return fights.reduce((acc, fight) => {
    const promotion = fight.promotion;
    if (!acc[promotion]) {
      acc[promotion] = [];
    }
    acc[promotion].push(fight);
    return acc;
  }, {} as Record<string, FightingTomatoesResponse[]>);
};

export const getFighterStats = (fights: FightingTomatoesResponse[], fighterName: string) => {
  const fighterFights = fights.filter(fight => 
    fight.fighter_1.toLowerCase().includes(fighterName.toLowerCase()) ||
    fight.fighter_2.toLowerCase().includes(fighterName.toLowerCase())
  );

  const totalFights = fighterFights.length;
  const avgRating = totalFights > 0 
    ? fighterFights.reduce((sum, fight) => sum + fight.fighting_tomatoes_aggregate_rating, 0) / totalFights
    : 0;

  const promotions = Array.from(new Set(fighterFights.map(fight => fight.promotion)));

  return {
    totalFights,
    averageRating: Math.round(avgRating),
    promotions,
    recentFights: fighterFights.slice(0, 5)
  };
};