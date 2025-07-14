import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const weightClass = searchParams.get('weightClass');
    const nationality = searchParams.get('nationality');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // 기본 쿼리 빌더
    let query = supabase
      .from('fighters')
      .select('*');
    
    // 필터 적용
    if (weightClass && weightClass !== 'all') {
      query = query.eq('weight_class', weightClass);
    }
    
    if (nationality && nationality !== 'all') {
      query = query.eq('nationality', nationality);
    }
    
    if (search) {
      query = query.or(`name.ilike.%${search}%,name_kr.ilike.%${search}%`);
    }
    
    // 페이지네이션 및 정렬
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    const { data, error, count } = await query;
    
    if (error) {
      console.error('선수 데이터 조회 오류:', error);
      throw error;
    }
    
    return NextResponse.json({
      success: true,
      data: data || [],
      pagination: {
        limit,
        offset,
        total: count || data?.length || 0
      }
    });

  } catch (error) {
    console.error('선수 데이터 조회 중 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : '선수 데이터를 불러오는 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newFighter = {
      name: body.name,
      name_kr: body.nameKr || null,
      nationality: body.nationality || null,
      weight_class: body.weightClass || null,
      record_wins: body.recordWins || 0,
      record_losses: body.recordLosses || 0,
      record_draws: body.recordDraws || 0,
      image_url: body.imageUrl || null,
      reach: body.reach || null,
      height: body.height || null,
      weight: body.weight || null,
      stance: body.stance || null,
    };

    const { data, error } = await supabase
      .from('fighters')
      .insert(newFighter)
      .select()
      .single();
    
    if (error) {
      console.error('선수 추가 오류:', error);
      throw error;
    }
    
    return NextResponse.json({
      success: true,
      data: data,
      message: '선수가 성공적으로 추가되었습니다.'
    });

  } catch (error) {
    console.error('선수 추가 중 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : '선수를 추가하는 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
}