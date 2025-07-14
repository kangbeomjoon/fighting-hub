import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Users, Trophy, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12 space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
          FightHub
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          한국 MMA와 프로 복싱의 모든 정보를 한 곳에서
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="secondary">UFC</Badge>
          <Badge variant="secondary">ONE Championship</Badge>
          <Badge variant="secondary">로드FC</Badge>
          <Badge variant="secondary">블랙컴뱃</Badge>
          <Badge variant="secondary">ZFN</Badge>
          <Badge variant="secondary">프로복싱</Badge>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">이번 주 경기</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">예정된 경기</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">등록 선수</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">활성 선수</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">랭킹 업데이트</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">오늘</div>
            <p className="text-xs text-muted-foreground">최신 랭킹</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">예측 정확도</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73%</div>
            <p className="text-xs text-muted-foreground">커뮤니티 평균</p>
          </CardContent>
        </Card>
      </section>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 최신 경기 일정 */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              이번 주 주요 경기
              <Link href="/fights">
                <Button variant="ghost" size="sm">전체 보기</Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <h3 className="font-semibold">UFC 308: 토파우리아 vs 홀로웨이</h3>
                <p className="text-sm text-muted-foreground">아부다비, UAE</p>
                <Badge variant="outline">페더급 타이틀</Badge>
              </div>
              <div className="text-right space-y-1">
                <p className="font-medium">10월 26일</p>
                <p className="text-sm text-muted-foreground">오후 6시</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <h3 className="font-semibold">로드FC 70: 김민우 vs 타나카</h3>
                <p className="text-sm text-muted-foreground">서울, 한국</p>
                <Badge variant="outline">라이트급</Badge>
              </div>
              <div className="text-right space-y-1">
                <p className="font-medium">10월 28일</p>
                <p className="text-sm text-muted-foreground">오후 7시</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <h3 className="font-semibold">블랙컴뱃 15: 이승우 vs 박진성</h3>
                <p className="text-sm text-muted-foreground">부산, 한국</p>
                <Badge variant="outline">웰터급</Badge>
              </div>
              <div className="text-right space-y-1">
                <p className="font-medium">11월 2일</p>
                <p className="text-sm text-muted-foreground">오후 8시</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 최신 뉴스 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              최신 뉴스
              <Link href="/news">
                <Button variant="ghost" size="sm">전체 보기</Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-tight">
                UFC 308 프리뷰: 토파우리아의 첫 방어전
              </h4>
              <p className="text-sm text-muted-foreground">
                일리아 토파우리아가 맥스 홀로웨이를 상대로 첫 타이틀 방어전을 치른다.
              </p>
              <p className="text-xs text-muted-foreground">2시간 전</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium leading-tight">
                로드FC, 새로운 한국인 유망주 계약
              </h4>
              <p className="text-sm text-muted-foreground">
                아마추어 무패 기록의 김현준이 로드FC와 계약을 체결했다.
              </p>
              <p className="text-xs text-muted-foreground">6시간 전</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium leading-tight">
                ONE Championship 아시아 투어 발표
              </h4>
              <p className="text-sm text-muted-foreground">
                2024년 하반기 아시아 주요 도시에서 대회 개최 예정.
              </p>
              <p className="text-xs text-muted-foreground">1일 전</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Call to Action */}
      <section className="text-center py-8 space-y-4">
        <h2 className="text-2xl font-bold">격투기의 모든 순간을 놓치지 마세요</h2>
        <p className="text-muted-foreground">
          실시간 경기 결과, 상세한 선수 분석, 전문가 예측까지
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/fights">
            <Button size="lg">경기 일정 보기</Button>
          </Link>
          <Link href="/fighters">
            <Button variant="outline" size="lg">선수 정보</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
