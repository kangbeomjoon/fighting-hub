import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Eye, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function NewsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">뉴스 & 분석</h1>
        <p className="text-muted-foreground">
          최신 MMA 뉴스, 경기 분석, 전문가 칼럼 및 인사이트
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="news">뉴스</TabsTrigger>
          <TabsTrigger value="analysis">분석</TabsTrigger>
          <TabsTrigger value="interviews">인터뷰</TabsTrigger>
          <TabsTrigger value="korean">한국 소식</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* 주요 뉴스 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 메인 기사 */}
            <Card className="lg:col-span-2 hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-red-500/20 rounded-t-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">🥊</span>
                  </div>
                  <p className="text-sm text-muted-foreground">이미지 준비 중</p>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="default">주요 뉴스</Badge>
                      <Badge variant="secondary">UFC</Badge>
                    </div>
                    <CardTitle className="text-xl leading-tight">
                      UFC 308: 토파우리아 vs 홀로웨이 완벽 프리뷰
                    </CardTitle>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>2시간 전</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>1,234 조회</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>45 댓글</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  일리아 토파우리아가 맥스 홀로웨이를 상대로 첫 번째 타이틀 방어전을 치른다. 
                  두 선수의 스타일 분석과 승부 포인트를 상세히 다뤄본다. 토파우리아의 강력한 
                  파워와 홀로웨이의 뛰어난 복싱 기술이 만나는 흥미진진한 대결이 예상된다.
                </p>
                <Link href="/news/ufc-308-preview">
                  <Button className="w-full">전체 기사 읽기</Button>
                </Link>
              </CardContent>
            </Card>

            {/* 사이드 뉴스 */}
            <div className="space-y-4">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">로드FC</Badge>
                    <Badge variant="secondary">한국</Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    로드FC, 새로운 한국인 유망주 김현준과 계약
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>6시간 전</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    아마추어 무패 기록을 보유한 김현준이 로드FC와 전속 계약을 체결했다고 발표했다.
                  </p>
                  <Link href="/news/road-fc-kim-hyunjun">
                    <Button variant="outline" size="sm">더 보기</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">ONE Championship</Badge>
                    <Badge variant="secondary">아시아</Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    ONE Championship 2024 하반기 아시아 투어
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>1일 전</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    ONE Championship이 아시아 주요 도시에서 대규모 이벤트 개최를 발표했다.
                  </p>
                  <Link href="/news/one-asia-tour">
                    <Button variant="outline" size="sm">더 보기</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">블랙컴뱃</Badge>
                    <Badge variant="secondary">부산</Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    블랙컴뱃 15, 부산에서 화려한 개막
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>2일 전</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    부산 사직체육관에서 열릴 블랙컴뱃 15의 카드와 주요 선수들을 소개한다.
                  </p>
                  <Link href="/news/black-combat-15">
                    <Button variant="outline" size="sm">더 보기</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 추가 뉴스 목록 */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">더 많은 뉴스</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "UFC 파이트 나이트: 볼코프 vs 가네 결과 분석",
                  summary: "헤비급 매치업에서 볼코프가 압도적인 승리를 거두며 타이틀 도전권에 한 발 더 다가섰다.",
                  category: "UFC",
                  time: "3시간 전",
                  views: "892"
                },
                {
                  title: "ZFN 30주년 기념 이벤트 발표",
                  summary: "한국 격투기의 역사와 함께한 ZFN이 30주년을 맞아 특별 이벤트를 개최한다고 발표했다.",
                  category: "ZFN",
                  time: "5시간 전",
                  views: "567"
                },
                {
                  title: "일본 MMA 신예 타나카, 로드FC 데뷔전 승리",
                  summary: "일본에서 건너온 유망주 타나카가 로드FC 데뷔전에서 인상적인 승리를 거두었다.",
                  category: "로드FC",
                  time: "8시간 전",
                  views: "743"
                },
                {
                  title: "여자 MMA의 새로운 스타들",
                  summary: "아시아 여자 MMA 씬에서 주목받고 있는 신예 선수들을 소개한다.",
                  category: "분석",
                  time: "12시간 전",
                  views: "1,156"
                },
                {
                  title: "복싱 vs MMA: 크로스오버 매치의 가능성",
                  summary: "최근 화제가 되고 있는 복싱과 MMA 크로스오버 매치에 대해 전문가들이 분석한다.",
                  category: "칼럼",
                  time: "1일 전",
                  views: "2,034"
                },
                {
                  title: "한국 MMA 10년의 변화",
                  summary: "지난 10년간 한국 MMA가 어떻게 발전해왔는지 되돌아보는 특집 기사.",
                  category: "특집",
                  time: "2일 전",
                  views: "1,678"
                }
              ].map((article, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{article.category}</Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {article.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{article.views} 조회</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {article.summary}
                    </p>
                    <Link href={`/news/${index + 1}`}>
                      <Button variant="ghost" size="sm">더 보기</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 더보기 버튼 */}
          <div className="text-center py-8">
            <Button variant="outline" size="lg">
              더 많은 뉴스 보기
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="news">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">뉴스 목록을 불러오는 중...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">분석 기사를 불러오는 중...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interviews">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">인터뷰 기사를 불러오는 중...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="korean">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">한국 소식을 불러오는 중...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}