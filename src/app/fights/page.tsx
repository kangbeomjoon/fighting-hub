import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

export default function FightsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">경기 일정</h1>
        <p className="text-muted-foreground">
          UFC, ONE Championship, 로드FC, 블랙컴뱃 등 주요 MMA 경기 일정
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">예정 경기</TabsTrigger>
          <TabsTrigger value="live">진행 중</TabsTrigger>
          <TabsTrigger value="completed">완료 경기</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4">
            {/* UFC 308 */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">UFC 308: 토파우리아 vs 홀로웨이</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>10월 26일, 2024</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>오후 6시 (KST)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>아부다비, UAE</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">UFC</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 메인 이벤트 */}
                <div className="border rounded-lg p-4 bg-primary/5">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="default">메인 이벤트</Badge>
                    <Badge variant="outline">페더급 타이틀</Badge>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <div className="text-center">
                      <p className="font-semibold">일리아 토파우리아</p>
                      <p className="text-sm text-muted-foreground">15-0-0</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">VS</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">맥스 홀로웨이</p>
                      <p className="text-sm text-muted-foreground">25-7-0</p>
                    </div>
                  </div>
                </div>

                {/* 코메인 이벤트 */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">코메인 이벤트</Badge>
                    <Badge variant="outline">미들급</Badge>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <div className="text-center">
                      <p className="font-semibold">로버트 휘태커</p>
                      <p className="text-sm text-muted-foreground">26-7-0</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">VS</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">이크람 알리스케로프</p>
                      <p className="text-sm text-muted-foreground">15-1-0</p>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  경기 예측 참여하기
                </Button>
              </CardContent>
            </Card>

            {/* 로드FC 70 */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">로드FC 70: 김민우 vs 타나카</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>10월 28일, 2024</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>오후 7시 (KST)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>서울, 한국</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">로드FC</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4 bg-primary/5">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="default">메인 이벤트</Badge>
                    <Badge variant="outline">라이트급</Badge>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <div className="text-center">
                      <p className="font-semibold">김민우</p>
                      <p className="text-sm text-muted-foreground">12-3-0</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">VS</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">타나카 유키</p>
                      <p className="text-sm text-muted-foreground">8-2-0</p>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  경기 예측 참여하기
                </Button>
              </CardContent>
            </Card>

            {/* 블랙컴뱃 15 */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">블랙컴뱃 15: 이승우 vs 박진성</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>11월 2일, 2024</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>오후 8시 (KST)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>부산, 한국</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">블랙컴뱃</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4 bg-primary/5">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="default">메인 이벤트</Badge>
                    <Badge variant="outline">웰터급</Badge>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <div className="text-center">
                      <p className="font-semibold">이승우</p>
                      <p className="text-sm text-muted-foreground">9-1-0</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">VS</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">박진성</p>
                      <p className="text-sm text-muted-foreground">7-2-0</p>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  경기 예측 참여하기
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="live">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">현재 진행 중인 경기가 없습니다.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">최근 완료된 경기를 불러오는 중...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}