import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { fighters } from '@/lib/db/schema';
import { eq, ilike, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const weightClass = searchParams.get('weightClass');
    const nationality = searchParams.get('nationality');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // 기본 쿼리
    let queryBuilder = db.select().from(fighters);
    
    // 필터 조건들
    const conditions = [];
    
    if (weightClass && weightClass !== 'all') {
      conditions.push(eq(fighters.weightClass, weightClass));
    }
    
    if (nationality && nationality !== 'all') {
      conditions.push(eq(fighters.nationality, nationality));
    }
    
    if (search) {
      conditions.push(ilike(fighters.name, `%${search}%`));
    }
    
    // 조건들을 AND로 결합
    if (conditions.length > 0) {
      queryBuilder = queryBuilder.where(and(...conditions));
    }
    
    // 페이지네이션
    const results = await queryBuilder.limit(limit).offset(offset);
    
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
    console.error('선수 데이터 조회 중 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: '선수 데이터를 불러오는 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newFighter = {
      name: body.name,
      nameKr: body.nameKr || null,
      nationality: body.nationality || null,
      weightClass: body.weightClass || null,
      recordWins: body.recordWins || 0,
      recordLosses: body.recordLosses || 0,
      recordDraws: body.recordDraws || 0,
      imageUrl: body.imageUrl || null,
      reach: body.reach || null,
      height: body.height || null,
      weight: body.weight || null,
      stance: body.stance || null,
    };

    const [result] = await db.insert(fighters).values(newFighter).returning();
    
    return NextResponse.json({
      success: true,
      data: result,
      message: '선수가 성공적으로 추가되었습니다.'
    });

  } catch (error) {
    console.error('선수 추가 중 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: '선수를 추가하는 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
}