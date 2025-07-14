import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function RankingsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">랭킹</h1>
        <p className="text-muted-foreground">
          각 체급별 최신 랭킹 정보 (UFC, ONE Championship, 로드FC, 블랙컴뱃)
        </p>
      </div>

      <Tabs defaultValue="ufc" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ufc">UFC</TabsTrigger>
          <TabsTrigger value="one">ONE Championship</TabsTrigger>
          <TabsTrigger value="road">로드FC</TabsTrigger>
          <TabsTrigger value="black">블랙컴뱃</TabsTrigger>
        </TabsList>

        <TabsContent value="ufc">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 페더급 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  페더급 (66kg)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* 챔피언 */}
                <div className="flex items-center gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    C
                  </div>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder-fighter.jpg" />
                    <AvatarFallback>IT</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">일리아 토파우리아</p>
                    <p className="text-sm text-muted-foreground">15-0-0</p>
                  </div>
                  <Badge variant="default">챔피언</Badge>
                </div>

                {/* 도전자들 */}
                {[
                  { rank: 1, name: "맥스 홀로웨이", nameEn: "Max Holloway", record: "25-7-0", trend: "up" },
                  { rank: 2, name: "알렉산더 볼카노프스키", nameEn: "Alexander Volkanovski", record: "26-4-0", trend: "down" },
                  { rank: 3, name: "브라이언 오르테가", nameEn: "Brian Ortega", record: "16-3-0", trend: "same" },
                  { rank: 4, name: "조쉬 에메트", nameEn: "Josh Emmett", record: "18-4-0", trend: "up" },
                  { rank: 5, name: "아놀드 알렌", nameEn: "Arnold Allen", record: "19-2-0", trend: "down" },
                ].map((fighter) => (
                  <div key={fighter.rank} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center font-bold text-sm">
                      {fighter.rank}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder-fighter.jpg" />
                      <AvatarFallback>{fighter.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{fighter.name}</p>
                      <p className="text-sm text-muted-foreground">{fighter.record}</p>
                    </div>
                    <div className="flex items-center">
                      {fighter.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                      {fighter.trend === "down" && <TrendingDown className="w-4 h-4 text-red-500" />}
                      {fighter.trend === "same" && <Minus className="w-4 h-4 text-gray-500" />}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 라이트급 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  라이트급 (70kg)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* 챔피언 */}
                <div className="flex items-center gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    C
                  </div>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder-fighter.jpg" />
                    <AvatarFallback>IM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">이슬람 마카체프</p>
                    <p className="text-sm text-muted-foreground">25-1-0</p>
                  </div>
                  <Badge variant="default">챔피언</Badge>
                </div>

                {/* 도전자들 */}
                {[
                  { rank: 1, name: "아르만 차리칸", nameEn: "Arman Tsarukyan", record: "21-3-0", trend: "up" },
                  { rank: 2, name: "찰스 올리베이라", nameEn: "Charles Oliveira", record: "34-10-0", trend: "same" },
                  { rank: 3, name: "저스틴 게이치", nameEn: "Justin Gaethje", record: "25-5-0", trend: "down" },
                  { rank: 4, name: "더스틴 포이에", nameEn: "Dustin Poirier", record: "30-9-0", trend: "same" },
                  { rank: 5, name: "벤일 다리우쉬", nameEn: "Beneil Dariush", record: "22-5-1", trend: "up" },
                ].map((fighter) => (
                  <div key={fighter.rank} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center font-bold text-sm">
                      {fighter.rank}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder-fighter.jpg" />
                      <AvatarFallback>{fighter.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{fighter.name}</p>
                      <p className="text-sm text-muted-foreground">{fighter.record}</p>
                    </div>
                    <div className="flex items-center">
                      {fighter.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                      {fighter.trend === "down" && <TrendingDown className="w-4 h-4 text-red-500" />}
                      {fighter.trend === "same" && <Minus className="w-4 h-4 text-gray-500" />}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="road">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 라이트급 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  라이트급 (70kg)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* 챔피언 */}
                <div className="flex items-center gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    C
                  </div>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder-fighter.jpg" />
                    <AvatarFallback>이호</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">이호진</p>
                    <p className="text-sm text-muted-foreground">14-2-0</p>
                  </div>
                  <Badge variant="default">챔피언</Badge>
                </div>

                {/* 도전자들 */}
                {[
                  { rank: 1, name: "김민우", record: "12-3-0", trend: "up" },
                  { rank: 2, name: "박현석", record: "11-4-0", trend: "same" },
                  { rank: 3, name: "타나카 유키", record: "8-2-0", trend: "up" },
                  { rank: 4, name: "최승우", record: "9-3-0", trend: "down" },
                  { rank: 5, name: "야마다 케이", record: "7-1-0", trend: "up" },
                ].map((fighter) => (
                  <div key={fighter.rank} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center font-bold text-sm">
                      {fighter.rank}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder-fighter.jpg" />
                      <AvatarFallback>{fighter.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{fighter.name}</p>
                      <p className="text-sm text-muted-foreground">{fighter.record}</p>
                    </div>
                    <div className="flex items-center">
                      {fighter.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                      {fighter.trend === "down" && <TrendingDown className="w-4 h-4 text-red-500" />}
                      {fighter.trend === "same" && <Minus className="w-4 h-4 text-gray-500" />}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 웰터급 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  웰터급 (77kg)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* 챔피언 */}
                <div className="flex items-center gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    C
                  </div>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder-fighter.jpg" />
                    <AvatarFallback>안성</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">안성현</p>
                    <p className="text-sm text-muted-foreground">16-1-0</p>
                  </div>
                  <Badge variant="default">챔피언</Badge>
                </div>

                {/* 도전자들 */}
                {[
                  { rank: 1, name: "김동현", record: "13-2-0", trend: "same" },
                  { rank: 2, name: "박준영", record: "10-3-0", trend: "up" },
                  { rank: 3, name: "이상민", record: "8-1-0", trend: "up" },
                  { rank: 4, name: "최우람", record: "9-4-0", trend: "down" },
                  { rank: 5, name: "사토 타쿠야", record: "6-2-0", trend: "same" },
                ].map((fighter) => (
                  <div key={fighter.rank} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center font-bold text-sm">
                      {fighter.rank}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder-fighter.jpg" />
                      <AvatarFallback>{fighter.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{fighter.name}</p>
                      <p className="text-sm text-muted-foreground">{fighter.record}</p>
                    </div>
                    <div className="flex items-center">
                      {fighter.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                      {fighter.trend === "down" && <TrendingDown className="w-4 h-4 text-red-500" />}
                      {fighter.trend === "same" && <Minus className="w-4 h-4 text-gray-500" />}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="black">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 웰터급 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  웰터급 (77kg)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* 1위 도전자 */}
                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder-fighter.jpg" />
                    <AvatarFallback>이승</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">이승우</p>
                    <p className="text-sm text-muted-foreground">9-1-0</p>
                  </div>
                  <Badge variant="default">#1 도전자</Badge>
                </div>

                {/* 나머지 랭커들 */}
                {[
                  { rank: 2, name: "김태현", record: "8-2-0", trend: "up" },
                  { rank: 3, name: "송민호", record: "7-1-0", trend: "up" },
                  { rank: 4, name: "장우진", record: "6-3-0", trend: "same" },
                  { rank: 5, name: "박진성", record: "7-2-0", trend: "down" },
                ].map((fighter) => (
                  <div key={fighter.rank} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center font-bold text-sm">
                      {fighter.rank}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder-fighter.jpg" />
                      <AvatarFallback>{fighter.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{fighter.name}</p>
                      <p className="text-sm text-muted-foreground">{fighter.record}</p>
                    </div>
                    <div className="flex items-center">
                      {fighter.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                      {fighter.trend === "down" && <TrendingDown className="w-4 h-4 text-red-500" />}
                      {fighter.trend === "same" && <Minus className="w-4 h-4 text-gray-500" />}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 라이트급 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  라이트급 (70kg)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* 1위 도전자 */}
                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder-fighter.jpg" />
                    <AvatarFallback>박시</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">박시후</p>
                    <p className="text-sm text-muted-foreground">11-1-0</p>
                  </div>
                  <Badge variant="default">#1 도전자</Badge>
                </div>

                {/* 나머지 랭커들 */}
                {[
                  { rank: 2, name: "최준석", record: "9-2-0", trend: "same" },
                  { rank: 3, name: "이현우", record: "8-3-0", trend: "up" },
                  { rank: 4, name: "김성진", record: "7-2-0", trend: "down" },
                  { rank: 5, name: "한재민", record: "6-1-0", trend: "up" },
                ].map((fighter) => (
                  <div key={fighter.rank} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center font-bold text-sm">
                      {fighter.rank}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder-fighter.jpg" />
                      <AvatarFallback>{fighter.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{fighter.name}</p>
                      <p className="text-sm text-muted-foreground">{fighter.record}</p>
                    </div>
                    <div className="flex items-center">
                      {fighter.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                      {fighter.trend === "down" && <TrendingDown className="w-4 h-4 text-red-500" />}
                      {fighter.trend === "same" && <Minus className="w-4 h-4 text-gray-500" />}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="one">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">ONE Championship 랭킹 데이터를 불러오는 중...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 랭킹 업데이트 정보 */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              마지막 업데이트: 2024년 10월 25일
            </p>
            <p className="text-xs text-muted-foreground">
              랭킹은 각 단체의 공식 발표를 기준으로 업데이트됩니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}