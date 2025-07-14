import { NextRequest, NextResponse } from 'next/server';
import { seedSampleData, seedFromFightingTomatoes } from '@/lib/data/seed';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'sample';

    if (type === 'sample') {
      // 샘플 데이터로 시드
      await seedSampleData();
      
      return NextResponse.json({
        success: true,
        message: '샘플 데이터 시드가 완료되었습니다.',
        type: 'sample'
      });
    } 
    
    if (type === 'api') {
      // Fighting Tomatoes API로 시드
      if (!process.env.FIGHTING_TOMATOES_API_KEY) {
        return NextResponse.json({
          success: false,
          error: 'Fighting Tomatoes API 키가 설정되지 않았습니다.'
        }, { status: 500 });
      }

      await seedFromFightingTomatoes();
      
      return NextResponse.json({
        success: true,
        message: 'Fighting Tomatoes API 데이터 시드가 완료되었습니다.',
        type: 'api'
      });
    }

    return NextResponse.json({
      success: false,
      error: '유효하지 않은 시드 타입입니다. (sample 또는 api)'
    }, { status: 400 });

  } catch (error) {
    console.error('시드 과정에서 오류 발생:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: '데이터 시드 API',
    usage: {
      sample: 'POST /api/seed?type=sample - 샘플 데이터로 시드',
      api: 'POST /api/seed?type=api - Fighting Tomatoes API로 시드'
    },
    note: 'Fighting Tomatoes API 사용을 위해서는 FIGHTING_TOMATOES_API_KEY 환경변수가 필요합니다.'
  });
}