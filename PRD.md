# FightHub - MMA & 프로 복싱 정보 포털 PRD

## 프로젝트 개요

**프로젝트명**: FightHub  
**목적**: MMA와 프로 복싱 경기 정보를 제공하는 한국어 웹 포털 개발  
**수익 모델**: 구글 애드센스, 스포츠 용품 제휴 광고  
**개발 기간**: 4-6주 (MVP 기준)  
**타겟 사용자**: 한국어 사용자 중 MMA 및 복싱 팬

## 기술 스택

### Frontend
- **Next.js**: React 기반의 풀스택 프레임워크, CSR/SSR/SSG 지원
- **TypeScript**: 타입 안전성 및 개발 생산성 향상
- **ShadCN**: TailwindCSS 기반의 컴포넌트 라이브러리
- **TailwindCSS**: 유틸리티 퍼스트 CSS 프레임워크
- **Lucide**: 오픈 소스 아이콘 라이브러리

### Backend & Database
- **Next.js API Routes**: 서버리스 백엔드 API
- **Supabase**: PostgreSQL 기반의 BaaS (Backend as a Service)
- **DrizzleORM**: 타입 안전한 TypeScript ORM

### 인증 & 배포
- **Clerk**: 간편한 사용자 인증 서비스 (이메일/비밀번호, 소셜 로그인, OTP)
- **Vercel**: Next.js 최적화된 배포 플랫폼

## 핵심 기능 요구사항

### 1. 경기 정보 관리 시스템

**API 엔드포인트**:
```typescript
GET /api/fights          // 경기 목록 조회
GET /api/fights/[id]     // 경기 상세 정보
POST /api/fights         // 경기 정보 생성 (관리자)
PUT /api/fights/[id]     // 경기 정보 수정 (관리자)
```

**화면 구성**:
- 경기 일정 캘린더 (UFC, ONE Championship, PFL, 블랙컴뱃, ZFN, 로드FC, 주요 복싱 경기)
- 경기 결과 및 상세 정보 페이지
- 실시간 경기 상태 업데이트
- 경기별 상세 페이지 (선수 정보, 전적, 분석)

### 2. 선수 데이터베이스

**API 엔드포인트**:
```typescript
GET /api/fighters        // 선수 목록 조회
GET /api/fighters/[id]   // 선수 상세 정보
GET /api/fighters/rankings // 체급별 랭킹
```

**화면 구성**:
- 선수 프로필 페이지 (사진, 기본 정보, 전적)
- 체급별 랭킹 시스템
- 선수별 통계 (승률, 피니시율, 최근 폼)
- 선수 비교 기능

### 3. 컨텐츠 관리

**API 엔드포인트**:
```typescript
GET /api/articles        // 분석 글 목록
GET /api/articles/[id]   // 분석 글 상세
POST /api/articles       // 분석 글 작성 (관리자)
GET /api/news           // 뉴스 큐레이션
```

**화면 구성**:
- 경기 분석 및 예측 게시글
- 뉴스 큐레이션 (RSS 피드 활용)
- 경기 하이라이트 영상 임베드
- 사용자 댓글 및 평점 시스템

### 4. 사용자 기능 (Clerk 활용)

**인증 기능**:
- 소셜 로그인 (Google, Instagram, KakaoTalk)
- 이메일/비밀번호 로그인
- OTP 인증 지원

**사용자 기능**:
- 관심 선수/경기 북마크
- 경기 예측 참여 (포인트 시스템)
- 사용자 프로필 및 활동 내역

## 데이터베이스 스키마 (DrizzleORM + Supabase)

```typescript
// schema.ts
export const fighters = pgTable('fighters', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  nameKr: varchar('name_kr', { length: 100 }), // 한국어 이름
  nationality: varchar('nationality', { length: 50 }),
  weightClass: varchar('weight_class', { length: 50 }),
  recordWins: integer('record_wins').default(0),
  recordLosses: integer('record_losses').default(0),
  recordDraws: integer('record_draws').default(0),
  imageUrl: varchar('image_url', { length: 255 }),
  reach: integer('reach'), // 리치 (cm)
  height: integer('height'), // 키 (cm)
  weight: integer('weight'), // 체중 (kg)
  stance: varchar('stance', { length: 20 }), // 스탠스
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const fights = pgTable('fights', {
  id: uuid('id').primaryKey().defaultRandom(),
  fighter1Id: uuid('fighter1_id').references(() => fighters.id),
  fighter2Id: uuid('fighter2_id').references(() => fighters.id),
  eventName: varchar('event_name', { length: 200 }).notNull(),
  eventNameKr: varchar('event_name_kr', { length: 200 }), // 한국어 이벤트명
  fightDate: timestamp('fight_date').notNull(),
  venue: varchar('venue', { length: 200 }),
  venueKr: varchar('venue_kr', { length: 200 }), // 한국어 장소명
  weightClass: varchar('weight_class', { length: 50 }),
  result: varchar('result', { length: 100 }),
  method: varchar('method', { length: 100 }),
  round: integer('round'),
  time: varchar('time', { length: 10 }),
  organization: varchar('organization', { length: 50 }), // UFC, ONE, PFL, 블랙컴뱃, ZFN, 로드FC 등
  status: varchar('status', { length: 20 }).default('upcoming'), // upcoming, live, completed
  isMainEvent: boolean('is_main_event').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const predictions = pgTable('predictions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: varchar('user_id', { length: 100 }).notNull(), // Clerk User ID
  fightId: uuid('fight_id').references(() => fights.id),
  predictedWinner: uuid('predicted_winner').references(() => fighters.id),
  confidence: integer('confidence').default(50), // 1-100
  method: varchar('method', { length: 50 }), // KO, TKO, Decision 등
  round: integer('round'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const articles = pgTable('articles', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 200 }).notNull(),
  content: text('content').notNull(),
  summary: varchar('summary', { length: 500 }),
  authorId: varchar('author_id', { length: 100 }).notNull(),
  fightId: uuid('fight_id').references(() => fights.id), // 관련 경기
  tags: varchar('tags', { length: 200 }), // 쉼표로 구분된 태그
  isPublished: boolean('is_published').default(false),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
```

## UI/UX 디자인 가이드라인 (ShadCN + TailwindCSS)

### 컬러 스키마
```css
:root {
  --background: 222.2 84% 4.9%;        /* 다크 배경 */
  --foreground: 210 40% 98%;           /* 밝은 텍스트 */
  --primary: 346.8 77.2% 49.8%;       /* 격투기 레드 */
  --secondary: 217.2 32.6% 17.5%;     /* 어두운 그레이 */
  --accent: 346.8 77.2% 49.8%;        /* 액센트 레드 */
  --muted: 217.2 32.6% 17.5%;         /* 음소거된 색상 */
  --destructive: 0 62.8% 30.6%;       /* 위험 색상 */
}
```

### 주요 ShadCN 컴포넌트
- **Card, CardContent, CardHeader**: 경기 정보, 선수 카드 표시
- **Button**: 액션 버튼 (예측하기, 북마크 등)
- **Avatar**: 선수 프로필 이미지
- **Badge**: 체급, 상태, 조직 표시
- **Tabs**: 경기 상세 정보 탭 (개요, 통계, 예측)
- **Calendar**: 경기 일정 표시
- **Dialog**: 로그인 모달, 예측 모달
- **Table**: 선수 랭킹, 전적 표시
- **Select**: 필터링 옵션

## 페이지 구조 및 라우팅

```
/                    - 메인 페이지 (최신 경기, 예정 경기, 인기 뉴스)
/fights              - 경기 일정 목록 (필터링 가능)
/fights/[id]         - 경기 상세 페이지 (선수 정보, 예측, 댓글)
/fighters            - 선수 목록 (검색, 필터링)
/fighters/[id]       - 선수 프로필 (전적, 통계, 관련 경기)
/rankings            - 체급별 랭킹 시스템
/news                - 뉴스 및 분석 글 목록
/news/[id]           - 뉴스/분석 글 상세
/predictions         - 내 예측 현황 (로그인 필요)
/profile             - 사용자 프로필 (Clerk)
/admin               - 관리자 페이지 (데이터 입력)
```

## 개발 우선순위

### Phase 1 (MVP - 2주)
1. **프로젝트 셋업**
   - Next.js + TypeScript + TailwindCSS 구성
   - ShadCN 컴포넌트 설치 및 설정
   - Supabase 프로젝트 생성 및 DrizzleORM 연동

2. **기본 데이터 모델**
   - 선수, 경기 테이블 생성
   - 기본 시드 데이터 입력

3. **핵심 페이지 구현**
   - 메인 페이지 (경기 일정 표시)
   - 경기 목록 페이지
   - 선수 프로필 페이지

4. **관리자 시스템**
   - 경기/선수 정보 입력 인터페이스

### Phase 2 (사용자 기능 - 2주)
1. **Clerk 인증 통합**
   - 로그인/회원가입 시스템
   - 사용자 프로필 페이지

2. **예측 시스템**
   - 경기 예측 기능
   - 예측 통계 및 리더보드

3. **인터랙티브 기능**
   - 북마크 시스템
   - 댓글 시스템

4. **뉴스/컨텐츠**
   - 분석 글 작성 시스템
   - RSS 피드 큐레이션

### Phase 3 (수익화 및 최적화 - 2주)
1. **수익화**
   - 구글 애드센스 통합
   - 제휴 광고 시스템

2. **SEO 최적화**
   - Next.js 메타데이터 최적화
   - 사이트맵 생성
   - 구조화된 데이터 추가

3. **성능 최적화**
   - 이미지 최적화 (Next.js Image)
   - 코드 스플리팅
   - Supabase 쿼리 최적화

4. **배포 및 모니터링**
   - Vercel 배포
   - 에러 모니터링 설정

## 초기 데이터 수집

### 우선순위 데이터
1. **UFC 데이터**
   - 공식 API 또는 웹 스크래핑
   - 주요 선수 및 예정 경기

2. **국내 MMA 단체**
   - 블랙컴뱃, ZFN, 로드FC 경기 정보
   - 한국 선수 우선 수집

3. **복싱 데이터**
   - 주요 경기 수동 입력
   - 한국 선수 우선

4. **ONE Championship**
   - 아시아 MMA 리그 데이터

### 데이터 수집 방법

#### 자동화된 데이터 수집 (제한적)
- **ESPN API**: 제한적인 MMA 경기 데이터 (API 키 필요)
- **RSS 피드**: UFC, ESPN MMA 뉴스 피드 수집
- **제3자 API**: Rapid API의 스포츠 데이터 서비스 활용 (유료)
- **웹 스크래핑**: 기술적 가능하나 법적 검토 필요

#### 주요 데이터 입력 방식 (현실적)
- **수동 입력 시스템**: 관리자 패널을 통한 핵심 경기 정보 입력
- **국내 단체 정보**: 블랙컴뱃, ZFN, 로드FC (수동 관리)
- **UFC/복싱 주요 경기**: 수동 입력 후 업데이트
- **한국어 현지화**: 선수명, 이벤트명 번역 및 관리

### 데이터 관리
- 관리자 패널을 통한 수동 입력 시스템
- 정기적인 데이터 동기화 및 업데이트
- 이미지 및 비디오 콘텐츠 관리
- 데이터 품질 검증 시스템

## 성능 요구사항

### 최적화 목표
- **로딩 속도**: 3초 이내 First Contentful Paint
- **SEO**: 구글 Core Web Vitals 통과
- **모바일**: 완전한 반응형 디자인

### 기술적 최적화
- Next.js Image 컴포넌트 활용
- 동적 임포트를 통한 코드 스플리팅
- TailwindCSS 퍼지를 통한 번들 사이즈 최적화
- Supabase 실시간 구독 최적화

## 성공 지표 (KPI)

### 3개월 목표
- **DAU**: 500명
- **월 페이지뷰**: 10만 PV
- **회원 가입자**: 1,000명
- **예측 참여율**: 30%
- **구글 애드센스 승인**: 완료

### 6개월 목표
- **DAU**: 2,000명
- **월 페이지뷰**: 50만 PV
- **회원 가입자**: 5,000명
- **월 수익**: $1,000

## 보안 및 개인정보 보호

- Clerk를 통한 안전한 사용자 인증
- Supabase Row Level Security (RLS) 적용
- GDPR 및 개인정보보호법 준수
- 사용자 데이터 최소 수집 원칙

## 향후 확장 계획

### 추가 기능
- 모바일 앱 개발 (React Native)
- 실시간 채팅 기능
- 라이브 스트리밍 통합
- 판타지 스포츠 기능

### 글로벌 확장
- 다국어 지원 (영어, 일본어)
- 해외 리그 데이터 확장
- 글로벌 광고 네트워크 연동