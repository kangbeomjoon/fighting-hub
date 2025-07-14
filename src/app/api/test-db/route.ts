import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // 간단한 데이터베이스 연결 테스트
    const result = await db.execute('SELECT 1 as test');
    
    return NextResponse.json({
      success: true,
      message: '데이터베이스 연결 성공',
      result: result
    });
  } catch (error) {
    console.error('데이터베이스 연결 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : '데이터베이스 연결 실패'
    }, { status: 500 });
  }
}