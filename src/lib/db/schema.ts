import { pgTable, uuid, varchar, integer, timestamp, boolean, text } from 'drizzle-orm/pg-core';

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