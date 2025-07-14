import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { fights } from '@/lib/db/schema';
import { eq, and, gte, lte } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const organization = searchParams.get('organization');
    const status = searchParams.get('status');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // 기본 경기 정보 조회 (조인은 나중에 개선)
    let queryBuilder = db.select().from(fights);
    
    // 필터 조건들
    const conditions = [];
    
    if (organization && organization !== 'all') {
      conditions.push(eq(fights.organization, organization));
    }
    
    if (status && status !== 'all') {
      conditions.push(eq(fights.status, status));
    }
    
    if (startDate) {
      conditions.push(gte(fights.fightDate, new Date(startDate)));
    }
    
    if (endDate) {
      conditions.push(lte(fights.fightDate, new Date(endDate)));
    }
    
    // 조건들을 AND로 결합
    if (conditions.length > 0) {
      queryBuilder = queryBuilder.where(and(...conditions));
    }
    
    // 페이지네이션 및 정렬 (최신 경기 먼저)
    const results = await queryBuilder
      .orderBy(fights.fightDate)
      .limit(limit)
      .offset(offset);
    
    return NextResponse.json({
      success: true,
      data: results,
      pagination: {
        limit,
        offset,
        total: results.length
      }
    });

  } catch (error) {
    console.error('경기 데이터 조회 중 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: '경기 데이터를 불러오는 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newFight = {
      fighter1Id: body.fighter1Id || null,
      fighter2Id: body.fighter2Id || null,
      eventName: body.eventName,
      eventNameKr: body.eventNameKr || null,
      fightDate: new Date(body.fightDate),
      venue: body.venue || null,
      venueKr: body.venueKr || null,
      weightClass: body.weightClass || null,
      result: body.result || null,
      method: body.method || null,
      round: body.round || null,
      time: body.time || null,
      organization: body.organization || 'UFC',
      status: body.status || 'upcoming',
      isMainEvent: body.isMainEvent || false,
    };

    const [result] = await db.insert(fights).values(newFight).returning();
    
    return NextResponse.json({
      success: true,
      data: result,
      message: '경기가 성공적으로 추가되었습니다.'
    });

  } catch (error) {
    console.error('경기 추가 중 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: '경기를 추가하는 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
}