import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Supabase 연결 테스트
    const { data, error } = await supabase
      .from('fighters')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Supabase 오류:', error);
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Supabase 연결 성공',
      data: data
    });
  } catch (error) {
    console.error('Supabase 연결 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Supabase 연결 실패'
    }, { status: 500 });
  }
}

export async function POST() {
  try {
    // 간단한 선수 데이터 삽입 테스트
    const { data, error } = await supabase
      .from('fighters')
      .insert({
        name: 'Test Fighter',
        name_kr: '테스트 선수',
        nationality: 'South Korea',
        weight_class: 'Lightweight',
        record_wins: 5,
        record_losses: 0,
        record_draws: 0
      })
      .select();
    
    if (error) {
      console.error('데이터 삽입 오류:', error);
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      message: '테스트 데이터 삽입 성공',
      data: data
    });
  } catch (error) {
    console.error('테스트 삽입 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : '테스트 삽입 실패'
    }, { status: 500 });
  }
}