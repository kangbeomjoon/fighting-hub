import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Flag, TrendingUp, TrendingDown, Award } from "lucide-react";

export default function FightersPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">선수 정보</h1>
        <p className="text-muted-foreground">
          UFC, ONE Championship, 로드FC, 블랙컴뱃 등 주요 선수들의 상세 정보
        </p>
      </div>

      {/* 필터 */}
      <div className="flex flex-wrap gap-4">
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="단체 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 단체</SelectItem>
            <SelectItem value="ufc">UFC</SelectItem>
            <SelectItem value="one">ONE Championship</SelectItem>
            <SelectItem value="road">로드FC</SelectItem>
            <SelectItem value="black">블랙컴뱃</SelectItem>
            <SelectItem value="zfn">ZFN</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="체급 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 체급</SelectItem>
            <SelectItem value="heavyweight">헤비급</SelectItem>
            <SelectItem value="light-heavyweight">라이트헤비급</SelectItem>
            <SelectItem value="middleweight">미들급</SelectItem>
            <SelectItem value="welterweight">웰터급</SelectItem>
            <SelectItem value="lightweight">라이트급</SelectItem>
            <SelectItem value="featherweight">페더급</SelectItem>
            <SelectItem value="bantamweight">밴텀급</SelectItem>
            <SelectItem value="flyweight">플라이급</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="국적" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 국적</SelectItem>
            <SelectItem value="kr">한국</SelectItem>
            <SelectItem value="us">미국</SelectItem>
            <SelectItem value="br">브라질</SelectItem>
            <SelectItem value="jp">일본</SelectItem>
            <SelectItem value="ru">러시아</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 선수 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 일리아 토파우리아 */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-start space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder-fighter.jpg" />
                <AvatarFallback>IT</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <CardTitle className="text-lg">일리아 토파우리아</CardTitle>
                <p className="text-sm text-muted-foreground">Ilia Topuria</p>
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4" />
                  <span className="text-sm">스페인</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="default">UFC 페더급 챔피언</Badge>
              <Badge variant="secondary">UFC</Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">전적</span>
                <span className="font-medium">15승 0패 0무</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">체급</span>
                <span className="font-medium">페더급 (66kg)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">나이</span>
                <span className="font-medium">27세</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">피니시율</span>
                <span className="font-medium text-green-500">87%</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-500">5연승</span>
            </div>

            <Button className="w-full" variant="outline">
              상세 정보 보기
            </Button>
          </CardContent>
        </Card>

        {/* 김민우 */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-start space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder-fighter.jpg" />
                <AvatarFallback>김민</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <CardTitle className="text-lg">김민우</CardTitle>
                <p className="text-sm text-muted-foreground">Kim Min-woo</p>
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4" />
                  <span className="text-sm">한국</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline">라이트급 랭킹 #3</Badge>
              <Badge variant="secondary">로드FC</Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">전적</span>
                <span className="font-medium">12승 3패 0무</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">체급</span>
                <span className="font-medium">라이트급 (70kg)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">나이</span>
                <span className="font-medium">29세</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">피니시율</span>
                <span className="font-medium text-yellow-500">67%</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-500">3연승</span>
            </div>

            <Button className="w-full" variant="outline">
              상세 정보 보기
            </Button>
          </CardContent>
        </Card>

        {/* 이승우 */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-start space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder-fighter.jpg" />
                <AvatarFallback>이승</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <CardTitle className="text-lg">이승우</CardTitle>
                <p className="text-sm text-muted-foreground">Lee Seung-woo</p>
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4" />
                  <span className="text-sm">한국</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline">웰터급 랭킹 #1</Badge>
              <Badge variant="secondary">블랙컴뱃</Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">전적</span>
                <span className="font-medium">9승 1패 0무</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">체급</span>
                <span className="font-medium">웰터급 (77kg)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">나이</span>
                <span className="font-medium">26세</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">피니시율</span>
                <span className="font-medium text-green-500">80%</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-500">4연승</span>
            </div>

            <Button className="w-full" variant="outline">
              상세 정보 보기
            </Button>
          </CardContent>
        </Card>

        {/* 맥스 홀로웨이 */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-start space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder-fighter.jpg" />
                <AvatarFallback>MH</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <CardTitle className="text-lg">맥스 홀로웨이</CardTitle>
                <p className="text-sm text-muted-foreground">Max Holloway</p>
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4" />
                  <span className="text-sm">미국</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline">페더급 랭킹 #1</Badge>
              <Badge variant="secondary">UFC</Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">전적</span>
                <span className="font-medium">25승 7패 0무</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">체급</span>
                <span className="font-medium">페더급 (66kg)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">나이</span>
                <span className="font-medium">32세</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">피니시율</span>
                <span className="font-medium text-yellow-500">56%</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-yellow-500">전 페더급 챔피언</span>
            </div>

            <Button className="w-full" variant="outline">
              상세 정보 보기
            </Button>
          </CardContent>
        </Card>

        {/* 정찬성 */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-start space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder-fighter.jpg" />
                <AvatarFallback>정찬</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <CardTitle className="text-lg">정찬성</CardTitle>
                <p className="text-sm text-muted-foreground">Jung Chan-sung</p>
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4" />
                  <span className="text-sm">한국</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline">페더급 전설</Badge>
              <Badge variant="secondary">은퇴</Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">전적</span>
                <span className="font-medium">17승 7패 0무</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">체급</span>
                <span className="font-medium">페더급 (66kg)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">나이</span>
                <span className="font-medium">37세</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">피니시율</span>
                <span className="font-medium text-green-500">88%</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-yellow-500">한국 MMA 레전드</span>
            </div>

            <Button className="w-full" variant="outline">
              상세 정보 보기
            </Button>
          </CardContent>
        </Card>

        {/* 박진성 */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-start space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder-fighter.jpg" />
                <AvatarFallback>박진</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <CardTitle className="text-lg">박진성</CardTitle>
                <p className="text-sm text-muted-foreground">Park Jin-sung</p>
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4" />
                  <span className="text-sm">한국</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline">웰터급 랭킹 #5</Badge>
              <Badge variant="secondary">블랙컴뱃</Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">전적</span>
                <span className="font-medium">7승 2패 0무</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">체급</span>
                <span className="font-medium">웰터급 (77kg)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">나이</span>
                <span className="font-medium">24세</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">피니시율</span>
                <span className="font-medium text-yellow-500">71%</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-500">1패 후 복귀</span>
            </div>

            <Button className="w-full" variant="outline">
              상세 정보 보기
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 페이지네이션 또는 더보기 */}
      <div className="text-center py-8">
        <Button variant="outline">더 많은 선수 보기</Button>
      </div>
    </div>
  );
}