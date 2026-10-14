// =====================================================
//  채팅: 추천 질문 + 자동 답장 (가상 프로필용)
//  AI 없이, 상대 프로필(관심사·성격·연락 스타일·데이트 스타일 등)로 답장을 정해요.
// =====================================================

// ---------- 주제 찾기용 단어 ----------
const TOPICS = {
  러닝: ["러닝", "뛰", "달리", "마라톤", "조깅"],
  노래: ["노래", "노래방", "가수", "음악", "18번", "플리", "콘서트"],
  OTT: ["ott", "넷플", "드라마", "영화", "정주행", "예능", "유튜브", "애니"],
  산책: ["산책", "걷", "공원", "노을"],
  요리: ["요리", "레시피", "만들어 먹", "파스타", "베이킹"],
  게임: ["게임", "롤", "배그", "피시방", "pc방", "닌텐도"],
  독서: ["책", "독서", "소설", "에세이", "작가"],
  여행: ["여행", "제주", "해외", "바다", "놀러", "캠핑"],
  카페: ["카페", "커피", "라떼", "디저트", "케이크"],
  운동: ["운동", "헬스", "농구", "축구", "요가", "필라테스", "배드민턴"],
};

// ---------- 관심사별: 좋아하는 사람의 답 ----------
const LIKE_LINES = {
  러닝: ["저 러닝 진짜 좋아해요! 주로 저녁에 뛰어요", "요즘도 일주일에 세 번은 뛰어요", "5km 뛰고 나면 기분이 완전 좋아져요",
    "강변 따라 뛰는 거 제일 좋아해요", "언제 같이 뛰어요! 페이스 맞춰 드릴게요"],
  노래: ["노래방 완전 좋아해요! 18번은 비밀이에요 ㅎㅎ", "요즘 플리 공유할래요? 저 노래 추천 잘해요", "발라드 부르는 거 좋아해요",
    "콘서트 가는 게 제일 행복해요", "이동할 때 노래 없으면 못 살아요"],
  OTT: ["요즘 드라마 정주행 중이에요! 추천해 줄까요?", "저 OTT 없으면 못 살아요 ㅋㅋ", "주말엔 영화 두 편은 기본이에요",
    "로맨스 코미디 좋아해요", "예능 보면서 밥 먹는 게 낙이에요"],
  산책: ["산책 좋아해요! 노을 질 때 걷는 거 최고예요", "걷다 보면 생각 정리가 돼서 좋아요", "동네 공원 한 바퀴 도는 게 루틴이에요",
    "밤 산책 하면서 노래 듣는 거 좋아해요"],
  요리: ["요리 좋아해요! 파스타는 자신 있어요", "주말엔 새로운 레시피 도전해요", "제가 만든 김치볶음밥 맛있어요 ㅎㅎ",
    "요즘 베이킹에 빠졌어요"],
  게임: ["게임 좋아해요! 같이 한 판 할래요?", "요즘도 게임 해요. 밤에 주로 해요", "같이 할 수 있는 게임 좋아해요",
    "승부욕 생기는 게임 좋아해요 ㅋㅋ"],
  독서: ["책 좋아해요! 요즘은 에세이 읽고 있어요", "카페에서 책 읽는 시간이 제일 좋아요", "한 달에 두세 권은 읽으려고 해요",
    "좋은 문장 나오면 메모해 둬요"],
  여행: ["여행 너무 좋아해요! 바다 보러 가는 게 제일 좋아요", "기억에 남는 데는 제주도예요! 또 가고 싶어요", "다음엔 일본 소도시 가 보고 싶어요",
    "계획 없이 떠나는 당일치기도 좋아해요"],
  카페: ["카페 투어 좋아해요! 라떼 맛집 찾아다녀요", "단골 카페 있어요. 디저트가 맛있어요", "분위기 좋은 카페 발견하면 기록해 둬요",
    "아이스 아메리카노는 겨울에도 마셔요 ㅋㅋ"],
  운동: ["운동 좋아해요! 땀 흘리면 개운하더라고요", "요즘 운동 열심히 하고 있어요", "주말엔 농구나 배드민턴 쳐요",
    "운동 끝나고 먹는 밥이 제일 맛있어요"],
};

// ---------- 추천 질문 ----------
const INTEREST_QUESTIONS = {
  러닝: ["러닝 좋아한다고 했는데 요즘도 자주 뛰어요?", "주로 어디서 뛰어요?"],
  노래: ["노래방 가면 18번 곡이 뭐예요?", "요즘 자주 듣는 노래 있어요?"],
  OTT: ["요즘 정주행하는 작품 있어요?", "인생 드라마나 영화 하나만 추천해 줄래요?"],
  산책: ["산책할 때 자주 가는 코스 있어요?", "밤 산책이랑 아침 산책 중에 뭐가 좋아요?"],
  요리: ["제일 자신 있는 요리가 뭐예요?", "요즘 해 먹은 것 중에 맛있었던 거 있어요?"],
  게임: ["요즘 하는 게임 뭐예요?", "같이 할 수 있는 게임 추천해 줄래요?"],
  독서: ["최근에 읽은 책 중에 추천할 만한 거 있어요?", "좋아하는 작가 있어요?"],
  여행: ["여행 가 본 곳 중에 가장 기억에 남는 곳은 어디예요?", "다음에 가 보고 싶은 여행지 있어요?"],
  카페: ["단골 카페 있어요? 거기서 뭐 마셔요?", "커피파예요, 디저트파예요?"],
  운동: ["주로 어떤 운동 해요?", "운동 시작한 계기가 있어요?"],
};
const GENERAL_QUESTIONS = [
  "주말에 갑자기 하루가 비었다면 뭐 하고 싶어요?",
  "요즘 제일 재밌는 게 뭐예요?",
  "스트레스 받을 때는 주로 뭐 해요?",
  "좋아하는 음식이 뭐예요?",
  "이상형이 어떤 사람이에요?",
];

function suggestions(me, p) {
  const common = me.interests.filter(i => p.interests.includes(i));
  const others = p.interests.filter(i => !common.includes(i));
  const out = ["안녕하세요! 프로필 보고 반가워서 연락했어요", `${p.nickname}님 자기소개 보고 궁금해졌어요`];
  for (const i of common) out.push(...INTEREST_QUESTIONS[i]);
  for (const i of others.slice(0, 2)) out.push(INTEREST_QUESTIONS[i][0]);
  out.push(`MBTI ${p.mbti} 맞아요? 진짜 그런 편이에요?`);
  out.push(...GENERAL_QUESTIONS);
  return [...new Set(out)].slice(0, 12);
}

// ---------- 도우미 ----------
const hasBatchimC = w => { const c = w.charCodeAt(w.length - 1); return c >= 0xAC00 && c <= 0xD7A3 && (c - 0xAC00) % 28 > 0; };
const ieyo = w => w + (hasBatchimC(w) ? "이에요" : "예요");
const eunneun = w => w + (hasBatchimC(w) ? "은" : "는");
function seedOf(text, n) { let h = 7 + n; for (const c of text) h = (h * 31 + c.charCodeAt(0)) | 0; return Math.abs(h); }

// 이미 한 말은 피해서 고르기
function pickFresh(arr, seed, said) {
  const fresh = arr.filter(x => !said.some(s => s.startsWith(x.slice(0, 8))));
  const pool = fresh.length ? fresh : arr;
  return pool[seed % pool.length];
}

function topicsIn(text) {
  const t = text.toLowerCase();
  return Object.keys(TOPICS).filter(k => TOPICS[k].some(w => t.includes(w)));
}

// ---------- 말투: 연락 스타일 ----------
function styleLine(p, line, seed) {
  if (p.contact === "자주") {
    if (/[ㅋㅎ😊🙌🌙]\s*$/u.test(line)) return line;
    return line + (/\?$/.test(line) ? [" 😊", " ㅎㅎ"][seed % 2] : [" ㅎㅎ", " 😊", "!", " ㅋㅋ", " 🙌"][seed % 5]);
  }
  if (p.contact === "가끔") return line.replace(/\s*(😊|🙌|🌙|💪)/gu, "").replace(/!/g, ".");
  return line;
}

// 성격에 따라 가끔 한마디 덧붙이기
function traitTail(p, my, seed) {
  if (seed % 3 !== 0) return "";
  if (p.traits.includes("다정함")) return [` ${my}님은 오늘 하루 어땠어요?`, ` ${my}님이랑 얘기하니까 좋네요`][seed % 2];
  if (p.traits.includes("활발함")) return [" 우리 언제 한번 놀아요!", " 얘기하니까 신나요"][seed % 2];
  if (p.traits.includes("계획적")) return " 다음에 날 잡아서 더 얘기해요";
  return "";
}

// 외향일수록 질문을 자주 되물어요
function askBack(p, me, seed, said) {
  const chance = p.energy === "외향" ? 2 : p.energy === "중간" ? 3 : 5;
  if (seed % chance !== 0) return "";
  const common = me.interests.filter(i => p.interests.includes(i));
  const pool = common.length ? common : me.interests;
  const q = pool.map(i => ` ${me.nickname}님은 ${eunneun(i)} 어때요?`).filter(x => !said.some(m => m.includes(x.trim())));
  return q.length ? q[seed % q.length] : "";
}

// ---------- 추천 질문에 맞춘 답 ----------
// 상대가 그 관심사를 가지고 있으면 구체적으로, 없으면 솔직하게 "잘 안 해요 + 대신 좋아하는 것"
// 관심사별 동사 (뒤에 "고 싶어요", "면" 등을 붙여 써요)
const VERB = { 노래: "노래방 가", 카페: "카페 가", 여행: "여행 가", OTT: "드라마 보", 독서: "책 읽", 요리: "요리하",
  게임: "게임하", 산책: "산책하", 러닝: "뛰", 운동: "운동하" };
const NOUN = { 노래: "노래 부르는 거", OTT: "드라마 보는 거", 카페: "카페 투어", 여행: "여행 계획 짜는 거", 독서: "책 읽는 거",
  요리: "요리하는 거", 게임: "게임", 산책: "산책", 러닝: "러닝", 운동: "운동" };
const igaa = w => w.endsWith("거") ? w.slice(0, -1) + "게" : w + (hasBatchimC(w) ? "이" : "가");
const myeon = v => v + (hasBatchimC(v) ? "으면" : "면");
const NEG = { 노래: "노래방은 잘 안 가요", 카페: "카페는 잘 안 가요", 여행: "여행은 자주 못 가 봤어요", OTT: "드라마나 영화는 잘 안 봐요",
  독서: "책은 잘 안 읽어요", 요리: "요리는 거의 안 해요", 게임: "게임은 잘 안 해요", 산책: "산책은 잘 안 해요",
  러닝: "러닝은 잘 안 해요", 운동: "운동은 잘 안 해요" };
function notMine(p, topic, alt, seed) {
  return [`사실 ${NEG[topic]} ㅎㅎ 대신 ${NOUN[alt]} 좋아해요`,
    `저는 ${NEG[topic]}! 그 대신 ${NOUN[alt]} 좋아하는 편이에요`,
    `음 ${NEG[topic]} ㅋㅋ 저는 쉬는 날엔 주로 ${VERB[alt]}요`.replace("하요", "해요").replace("보요", "봐요").replace("뛰요", "뛰어요").replace("읽요", "읽어요")][seed % 3];
}
const ANSWERS = [
  { re: /(요즘도|자주).*(뛰|러닝)|러닝.*(자주|요즘)/, topic: "러닝",
    yes: ["네! 일주일에 두세 번은 뛰어요. 요즘 날씨가 뛰기 딱 좋아요", "요즘도 뛰어요! 저녁에 5km 정도 뛰고 있어요"] },
  { re: /어디서 뛰/, topic: "러닝",
    yes: ["주로 집 근처 강변 따라 뛰어요. 노을 볼 때 최고예요", "동네 공원 트랙이요! 한 바퀴씩 세면서 뛰어요"] },
  { re: /자주 듣는 노래|요즘 듣는 노래|무슨 노래/, topic: "노래",
    yes: ["요즘은 잔잔한 인디 노래 많이 들어요. 밤에 들으면 좋아요", "신나는 아이돌 노래요! 걸을 때 들으면 기분 좋아져요"] },
  { re: /정주행/, topic: "OTT",
    yes: ["요즘 로맨스 코미디 드라마 정주행 중이에요! 밤새 보다가 큰일 났어요", "옛날 시트콤 다시 보고 있어요 ㅋㅋ 몇 번 봐도 웃겨요"] },
  { re: /인생 (드라마|영화)/, topic: "OTT",
    yes: ["저는 잔잔한 성장 영화를 제일 좋아해요. 보고 나면 위로받는 느낌이에요", "가족 이야기 나오는 드라마요! 보다가 엄청 울었어요"] },
  { re: /산책.*코스|자주 가는 코스/, topic: "산책",
    yes: ["집 앞 공원 한 바퀴 도는 코스요. 30분 정도 걸려요", "강변 따라 쭉 걷는 코스 좋아해요. 바람이 시원해요"] },
  { re: /밤 산책.*아침 산책|아침 산책.*밤 산책/, topic: "산책",
    fn: (p) => p.chronotype === "아침형" ? "저는 아침 산책이요! 아침 공기 마시면 하루가 상쾌해요" : "밤 산책이요! 조용하고 불빛 보면서 걷는 게 좋아요" },
  { re: /자신 있는 요리/, topic: "요리",
    yes: ["토마토 파스타요! 소스도 직접 만들어요", "김치볶음밥은 진짜 자신 있어요. 계란 반숙 올려서요"] },
  { re: /해 먹은 것|해먹은 것/, topic: "요리",
    yes: ["얼마 전에 처음 만든 감바스가 대박이었어요", "주말에 떡볶이 해 먹었는데 가게 맛 났어요 ㅋㅋ"] },
  { re: /하는 게임|무슨 게임/, topic: "게임",
    yes: ["요즘은 친구들이랑 같이 하는 협동 게임 해요", "모바일로 퍼즐 게임 자주 해요. 은근 중독이에요"] },
  { re: /같이 할 수 있는 게임|게임 추천/, topic: "게임",
    yes: ["둘이 협동하는 게임 좋아요! 같이 하면 진짜 웃겨요", "가볍게 할 수 있는 파티 게임 추천해요. 승부욕 생겨요 ㅋㅋ"] },
  { re: /읽은 책|추천할 만한 책|책 추천/, topic: "독서",
    yes: ["최근에 읽은 에세이가 좋았어요. 하루 마무리할 때 읽기 좋아요", "추리 소설 읽었는데 반전 때문에 밤새 읽었어요"] },
  { re: /좋아하는 작가/, topic: "독서",
    yes: ["따뜻한 에세이 쓰는 작가들 좋아해요. 문장이 예쁘더라고요", "추리 소설 작가 좋아해요! 반전 나오면 짜릿해요"] },
  { re: /기억에 남는 곳|가장 기억/, topic: "여행",
    yes: ["제주도요! 바다 보면서 드라이브한 게 제일 기억에 남아요", "강릉이요. 바다 앞 카페에서 멍때린 게 최고였어요"] },
  { re: /가 보고 싶은|가보고 싶은|여행지/, topic: "여행",
    yes: ["일본 소도시 가 보고 싶어요! 조용히 걷는 여행 좋아해요", "부산 가 보고 싶어요. 바다랑 맛집 둘 다 있잖아요"] },
  { re: /단골 카페/, topic: "카페",
    yes: ["있어요! 동네 작은 카페인데 바닐라라떼가 맛있어요", "집 근처 카페요. 창가 자리가 제 지정석이에요 ㅋㅋ"] },
  { re: /커피파|디저트파/, topic: "카페",
    yes: ["저는 커피파예요! 아이스 아메리카노 없으면 안 돼요", "디저트파예요 ㅋㅋ 케이크 보면 못 참아요"] },
  { re: /어떤 운동/, topic: "운동",
    yes: ["헬스 위주로 하고 주말엔 배드민턴 쳐요", "요즘 필라테스 다니고 있어요. 생각보다 힘들어요"] },
  { re: /운동.*계기|시작한 계기/, topic: "운동",
    yes: ["체력이 너무 떨어져서 시작했는데 지금은 재밌어요", "친구 따라 갔다가 빠져 버렸어요 ㅋㅋ"] },
  { re: /mbti.*맞아|그런 편이에요/, fn: (p) => `네 ${p.mbti} 맞아요! ${p.traits.slice(0, 2).join(", ")} 이런 소리 많이 들어요` },
  { re: /하루가 비었다면|하루가 비면/, fn: (p, fav) => p.dateStyle === "집콕" ? `집에서 푹 쉬다가 ${VERB[fav]}고 싶어요` :
      p.dateStyle === "밖으로" ? `무조건 나가요! ${VERB[fav]}고 싶어요` : `오전엔 늦잠 자고 오후엔 ${VERB[fav]}고 싶어요` },
  { re: /제일 재밌는 게|요즘 재밌는/, fn: (p, fav) => `요즘은 ${igaa(NOUN[fav])} 제일 재밌어요! 시간 가는 줄 몰라요` },
  { re: /스트레스.*(뭐|어떻게)|스트레스 받을 때/, fn: (p, fav) => `저는 ${myeon(VERB[fav])} 풀려요. 아니면 맛있는 거 먹어요` },
  { re: /좋아하는 음식/, fn: (p, fav, seed) => ["떡볶이요! 매운 거 좋아해요", "파스타 좋아해요. 크림보다 토마토파예요", "국밥이요 ㅋㅋ 든든한 게 최고예요"][seed % 3] },
  { re: /이상형/, fn: (p) => `${p.wantTraits.join(", ")} 이런 사람이 좋아요` },
];

function answerQuestion(p, lower, seed) {
  const fav = p.interests[seed % p.interests.length];
  for (const a of ANSWERS) {
    if (!a.re.test(lower)) continue;
    if (a.fn) return a.fn(p, fav, seed);
    if (a.topic && !p.interests.includes(a.topic)) return notMine(p, a.topic, fav, seed);
    return a.yes[seed % a.yes.length];
  }
  return null;
}

// ---------- 상대가 물어본 것에 내가 대답했을 때 ----------
// 상대의 마지막 말이 질문이면, 무엇을 물어봤는지 알아내요.
function askType(q) {
  let m;
  if ((m = q.match(/님은 (\S+?)(?:은|는) 어때요\?/))) return { type: "interest", topic: m[1] };
  if ((m = q.match(/님은 (\S+?) 좋아해요\?/))) return { type: "interest", topic: m[1] };
  if (/하루 어땠어요\?|어떻게 지내요\?/.test(q)) return { type: "day" };
  if (/뭐 먹었어요\?|밥은/.test(q)) return { type: "food" };
  if (/뭐에 빠져 있어요\?/.test(q)) return { type: "focus" };
  if (/님은요\?/.test(q)) return { type: "mirror" };
  if (/살이죠\?|맞죠\?/.test(q)) return { type: "confirm" };
  if (/어땠어요\?/.test(q)) return { type: "experience" };
  if (/갈래요\?|어때요\?|할래요\?|추천해 줄까요\?|놀아요/.test(q)) return { type: "offer" };
  return { type: "other" };
}

const NEG_RE = /안\s?될|안\s?돼|못\s?갈|어려울|어렵|바빠|바쁠|아니|별로|안\s?해|안\s?좋|안\s?먹|아직|잘 몰라|모르|싫|글쎄|힘들|피곤|못\s?해|노노|ㄴㄴ|그닥|별루|최악|우울|ㅠ/;
const POS_RE = /좋아|좋죠|좋았|좋은|네|넵|넹|응|웅|그럼|당연|완전|최고|재밌|재미있|맛있|자주|괜찮|ㅇㅇ|그래|콜|오케이|ok|행복|신나|즐거/i;
const mood = t => NEG_RE.test(t) ? "neg" : POS_RE.test(t) ? "pos" : "mid";
const FOOD_RE = /밥|라면|치킨|피자|떡볶이|국밥|김치|파스타|햄버거|샐러드|마라|초밥|고기|짜장|빵|덮밥|분식|찌개|면/;

function contextReply(p, me, t, ask, seed, F, fav) {
  const my = me.nickname, md = mood(t);
  const tps = topicsIn(t);
  // 내가 "님은요?" 하고 되물으면 → 상대가 자기 얘기를 해요
  if (/(님은|는)요\?|님은\?|너는\?/.test(t)) {
    if (ask.type === "interest") return p.interests.includes(ask.topic) ? `저도 ${ask.topic} 좋아해요! 그래서 물어봤어요 ㅎㅎ` : `저는 ${NEG[ask.topic] || "잘 안 해요"}. 대신 ${NOUN[fav]} 좋아해요`;
    if (ask.type === "day") return F([`저는 ${myeon(VERB[fav])}서 보냈어요`.replace("면서", "면서"), `저는 무난했어요! ${VERB[fav]}고 쉬었어요`]);
    if (ask.type === "food") return F(["저는 김치찌개 먹었어요!", "저는 아직이요 ㅠ 배고파요"]);
    if (ask.type === "focus") return `저는 요즘 ${igaa(NOUN[fav])} 제일 재밌어요!`;
    return null;
  }
  if (/\?/.test(t)) return null; // 새로운 질문이면 다른 규칙으로

  switch (ask.type) {
    case "interest": {
      const X = ask.topic, both = p.interests.includes(X);
      if (md === "neg") return F([`아 그렇구나 ㅎㅎ 그럼 ${my}님은 요즘 뭐 좋아해요?`, `괜찮아요! 다른 거 같이 하면 되죠`, `오케이! ${X} 말고 다른 얘기 해요 ㅋㅋ`]);
      return both ? F([`오 진짜요? 그럼 다음에 같이 ${VERB[X] ? VERB[X] + "요" : X + " 해요"}!`.replace("하요", "해요").replace("보요", "봐요").replace("뛰요", "뛰어요").replace("읽요", "읽어요"),
          `우와 우리 ${X} 취향 통하네요!`, `역시! ${X} 얘기 나오면 저 말 많아져요`])
        : F([`오 ${X} 좋아하는구나! 저도 한번 해 보고 싶어요`, `멋있다! 나중에 ${X} 알려줘요`]);
    }
    case "day":
      if (md === "neg") return p.traits.includes("다정함") || p.traits.includes("배려심")
        ? F(["에고 고생 많았어요. 오늘은 푹 쉬어요", "무슨 일 있었어요? 얘기 들어줄게요", "힘든 날엔 맛있는 거 먹어야 해요!"])
        : F(["에고 힘내요! 내일은 괜찮을 거예요", "그런 날도 있죠. 푹 자요!"]);
      if (md === "pos") return F(["다행이다! 좋은 일 있었어요?", "오 좋네요! 저까지 기분 좋아져요", "좋은 하루였다니 다행이에요"]);
      return F(["그렇구나! 무난한 하루도 좋죠", "오 그랬구나! 고생했어요"]);
    case "food":
      if (FOOD_RE.test(t) && !/안\s?먹|아직/.test(t)) return F(["오 맛있겠다! 저도 먹고 싶어요", "헐 완전 좋아하는 메뉴예요", "그거 진짜 맛있죠!"]);
      if (md === "neg") return F(["얼른 챙겨 먹어요! 굶으면 안 돼요", "에고 배고프겠다. 맛있는 거 먹어요"]);
      return F(["잘했어요! 밥 잘 챙겨 먹어야 해요", "든든하게 먹었어요?"]);
    case "focus":
    case "mirror":
      if (tps.length) {
        const c = tps.filter(x => p.interests.includes(x));
        return c.length ? F([`우와 ${c[0]}! 저도 진짜 좋아해요`, `헐 우리 ${c[0]} 둘 다 좋아하네요!`])
          : F([`오 ${tps[0]}! 저는 잘 몰랐는데 재밌어 보여요`, `${tps[0]} 좋아하는구나! 다음에 얘기 더 해 줘요`]);
      }
      return F(["오 재밌겠다! 나중에 더 얘기해 줘요", "취향 좋은데요? ㅎㅎ", "오 그렇구나! 몰랐던 거 알게 됐어요"]);
    case "confirm":
      return md === "neg" ? "어 아니었어요? 제가 잘못 봤나 봐요 ㅋㅋ" : F(["역시! 프로필 잘 봤죠 ㅎㅎ", "맞죠! 기억력 좋죠?"]);
    case "experience":
      return md === "neg" ? F(["아쉬웠겠네요 ㅠ", "에고 다음엔 더 좋을 거예요"]) : F(["와 좋았겠다!", "부럽다! 저도 해 보고 싶어요"]);
    case "offer":
      if (md === "neg") return F(["괜찮아요! 다음에 시간 될 때 해요", "아쉽다 ㅠ 그럼 다음에 꼭이요!"]);
      if (md === "pos") return p.traits.includes("계획적") ? F(["좋아요! 그럼 날짜랑 장소 정해 봐요", "좋아요! 제가 계획 짜 볼게요"])
        : F(["좋아요! 그럼 날 잡아요 ㅎㅎ", "신난다! 기대할게요", "좋아요 약속한 거예요!"]);
      return F(["좋아요! 기대할게요", "좋아요 ㅎㅎ 시간 될 때 연락해요"]);
    default:
      if (md === "pos") return F(["오 좋네요!", "그쵸그쵸", "역시 ㅎㅎ"]);
      if (md === "neg") return F(["아 그렇구나 ㅠ", "괜찮아요!"]);
      return null;
  }
}

// ---------- 답장 만들기 ----------
function makeReply(p, me, text, history) {
  const t = text.trim(), lower = t.toLowerCase();
  const n = history.length, seed = seedOf(t, n + p.id);
  const my = me.nickname;
  const said = history.filter(m => m.from === "them").map(m => m.text);
  const common = me.interests.filter(i => p.interests.includes(i));
  const fav = p.interests[seed % p.interests.length];
  const greeted = history.some(m => m.from === "them");
  const topics = topicsIn(t);
  const F = arr => pickFresh(arr, seed, said);
  const lastThem = [...history].reverse().find(m => m.from === "them");
  const lastMine = history.length && history[history.length - 1].from === "me";
  let ask = null;
  if (lastThem && !lastMine) {
    if (/\?/.test(lastThem.text)) ask = askType(lastThem.text);
    else if (/놀아요|같이 뛰어요|얘기해요|날 잡아서/.test(lastThem.text)) ask = { type: "offer" };
  }
  let line, tail = true;

  if (/안녕|반가|하이|hi|hello|처음|연락했어/.test(lower) && !greeted) {
    line = F([`안녕하세요 ${my}님! 저 ${ieyo(p.nickname)}. ${p.intro}`,
      `와 반가워요 ${my}님! 매칭돼서 신기했어요. ${p.intro}`,
      `안녕하세요! 먼저 연락 줘서 고마워요. 저는 ${p.nickname}, ${p.intro}`]);
    tail = false;
  } else if (ask && (line = contextReply(p, me, t, ask, seed, F, fav))) {
    tail = false;
  } else if ((line = answerQuestion(p, lower, seed))) {
    tail = false;
  } else if (/자기소개|궁금해/.test(lower)) {
    line = `${p.intro}! 저는 ${p.traits.join(", ")} 이런 편이라는 말 자주 들어요`;
  } else if (/안녕|반가|하이|hi|hello/.test(lower)) {
    line = F([`또 만났네요 ${my}님!`, `${my}님 반가워요`, "어서 와요!"]);
  } else if (/잘\s?자|굿밤|좋은 밤|자러/.test(lower)) {
    line = F(["잘 자요! 좋은 꿈 꿔요", `${my}님도 푹 자요 🌙`, "오늘 얘기 즐거웠어요. 굿밤!"]); tail = false;
  } else if (/좋은 아침|굿모닝|일어났/.test(lower)) {
    line = p.chronotype === "아침형" ? F(["좋은 아침이에요! 저는 벌써 한참 전에 일어났어요", "굿모닝! 아침 공기 좋죠?"])
      : F(["좋은 아침이에요… 저 방금 일어났어요", "굿모닝… 저는 아침이 너무 힘들어요 ㅋㅋ"]);
  } else if (/아침형|저녁형|밤형/.test(lower)) {
    line = p.chronotype === "아침형" ? "저는 완전 아침형이에요! 일찍 자고 일찍 일어나요" : "저는 밤형이에요 ㅋㅋ 밤에 정신이 맑아져요";
  } else if (/이상형|어떤 사람/.test(lower)) {
    line = `저는 ${p.wantTraits.join(", ")} 이런 사람이 좋아요`;
  } else if (/18번/.test(lower)) {
    line = p.interests.includes("노래") ? F(["제 18번은 발라드예요! 분위기 잡는 노래 좋아해요", "신나는 댄스곡이요! 분위기 띄우는 담당이에요", "그건 노래방 가서 공개할게요 ㅋㅋ"])
      : "노래방은 가끔 가는데 18번은 아직 없어요 ㅋㅋ";
  } else if (topics.length && !/\?/.test(t)) {
    // 내 얘기를 할 때: 상대도 좋아하는 게 있으면 그걸 먼저 알아채요
    const tp = topics.find(x => p.interests.includes(x)) || topics[0];
    line = p.interests.includes(tp)
      ? F([`우와 저도 ${tp} 좋아해요!`, `헐 ${tp}! 우리 취향 통하네요`, `${tp} 얘기 나오니까 반갑다! ${LIKE_LINES[tp][seed % LIKE_LINES[tp].length]}`])
      : F([`오 ${tp} 좋아하는구나! 저는 잘 몰랐는데 재밌어 보여요`, `${tp}! 나중에 저도 알려줘요 ㅎㅎ`, `멋있다! 저는 ${tp}보다 ${fav} 쪽이에요`]);
  } else if (topics.length) {
    const tp = topics.find(x => p.interests.includes(x)) || topics[0];
    if (p.interests.includes(tp)) line = (/좋아해요\?|해요\?|하세요\?/.test(t) ? "네! " : "") + F(LIKE_LINES[tp]);
    else line = F([`${eunneun(tp)} 잘 안 하는데, 저는 ${fav} 좋아해요!`,
      `오 ${tp}! 저는 해 본 적이 별로 없어요. 대신 ${fav} 좋아해요`,
      `${eunneun(tp)} 잘 몰라요 ㅠ 저는 ${fav} 좋아하는 쪽이에요`]);
  } else if (/mbti|엠비티아이/.test(lower)) {
    line = F([`저 ${ieyo(p.mbti)}! ${my}님은 ${me.mbti} 맞죠? 프로필에서 봤어요`,
      `${p.mbti} 맞아요! 근데 반반인 것도 있어서 저도 헷갈려요 ㅋㅋ`, `${p.mbti} 특징 거의 다 맞는 편이에요`]);
  } else if (/몇 살|몇살|나이|동갑/.test(lower)) {
    line = p.age === me.age ? `저 ${p.age}살이에요! 우리 동갑이네요` : `저 ${p.age}살이에요! ${my}님은 ${me.age}살이죠?`;
    tail = false;
  } else if (/만나|약속|주말|시간 되|언제|데이트|놀자|놀래/.test(lower)) {
    line = p.dateStyle === "밖으로" ? F([`좋아요! 밖에 나가는 거 좋아해서 ${fav} 하러 갈래요?`, "완전 좋아요! 어디 갈지는 제가 찾아볼게요", "좋아요! 날 좋으면 한강 어때요?"])
      : p.dateStyle === "집콕" ? F(["좋아요. 저는 조용한 데가 편해서 한적한 카페 어때요?", "좋아요! 사람 많은 데보다 조용한 데가 좋아요", "영화 보는 건 어때요?"])
      : F(["좋아요 ㅎㅎ 이번 주말 어때요?", "좋아요! 밥 먹고 카페 가요", "좋아요. 시간 맞춰 봐요!"]);
  } else if (/연락|카톡|답장/.test(lower)) {
    line = p.contact === "자주" ? F(["저 연락 자주 하는 편이에요! 답장 빨라요", "심심하면 바로 연락해요!"])
      : p.contact === "가끔" ? F(["저는 연락을 자주 하는 편은 아니에요. 그래도 꼭 답해요", "답장이 좀 느려도 서운해하지 마요"])
      : F(["적당히 연락하는 게 편해요", "자기 전에 연락하는 거 좋아해요"]);
  } else if (/밥|점심|저녁|먹었|배고/.test(lower)) {
    line = F(["저 방금 먹었어요! 오늘은 국밥 먹었어요", "아직이요 ㅠ 뭐 먹을지 고민 중이에요", `${my}님은 뭐 먹었어요?`, "떡볶이 먹고 싶다…"]);
    tail = false;
  } else if (/음식|메뉴/.test(lower)) {
    line = F(["저 마라탕이랑 떡볶이 좋아해요", "한식파예요! 김치찌개 최고", "파스타 좋아해요", "매운 거 잘 먹어요"]);
  } else if (/뭐 해|뭐해|뭐하|지금/.test(lower)) {
    line = F([`그냥 ${fav} 관련된 거 보고 있었어요`, "누워서 쉬고 있었어요", "방금 할 일 끝냈어요!", `${my}님 연락 기다리고 있었죠`]);
  } else if (/취미|좋아하는 거|좋아하는 게|재밌는/.test(lower)) {
    line = `저는 ${p.interests.slice(0, 2).join("이랑 ")} 좋아해요! ${my}님은요?`; tail = false;
  } else if (/스트레스|힘들|우울|ㅠ|속상/.test(lower)) {
    line = p.traits.includes("다정함") || p.traits.includes("배려심")
      ? F(["무슨 일 있었어요? 얘기 들어줄게요", "오늘 고생 많았어요. 맛있는 거 먹어요", "힘들 땐 푹 쉬는 게 최고예요"])
      : F([`저는 힘들 땐 ${fav}${fav === "노래" ? " 불러" : " 해"}요. ${my}님도 기분 전환 해 봐요`, "에고 힘내요!", "그럴 때 있죠. 내일은 더 나을 거예요"]);
    tail = false;
  } else if (/귀여|멋있|잘생|예쁘|최고/.test(lower)) {
    line = F(["헉 고마워요 ㅎㅎ", `${my}님이 더요!`, "칭찬 들으니까 기분 좋네요", "부끄럽네요 ㅋㅋ"]);
  } else if (/날씨|비 와|비와|덥|춥|눈 와/.test(lower)) {
    line = F(["그러게요! 이런 날엔 산책하고 싶어요", "날씨 때문에 기분이 왔다 갔다 해요 ㅋㅋ", "따뜻하게 입고 다녀요!", "이런 날엔 집에 있고 싶어요"]);
  } else if (/고마|감사/.test(lower)) {
    line = F(["저야말로요!", "에이 별말씀을요", "앞으로도 자주 얘기해요"]);
  } else if (/^[ㅋㅎ]+$/.test(t.replace(/\s/g, ""))) {
    line = p.traits.includes("유머러스") ? F(["ㅋㅋㅋㅋ 웃기다", "ㅋㅋㅋ 저 웃음 장벽 낮아요"]) : F(["ㅎㅎ", "ㅋㅋ"]); tail = false;
  } else if (/\?$/.test(t)) {
    line = F([`음… 좋은 질문이네요! 저는 ${fav} 할 때 제일 행복해요`, "생각해 볼게요 ㅎㅎ 근데 그런 질문 좋아요", `솔직히 아직 잘 모르겠어요. ${my}님은요?`]);
    tail = false;
  } else if (common.length && n < 6) {
    line = F([`그렇구나! 근데 ${my}님도 ${common[0]} 좋아한다면서요?`, `오 그렇구나! 우리 ${common[0]} 좋아하는 거 똑같던데`]);
    tail = false;
  } else {
    line = F([`오 그렇구나! ${my}님 얘기 더 듣고 싶어요`, `그러게요! ${my}님은 요즘 어떻게 지내요?`, "오 좋네요!",
      `요즘은 ${fav}에 빠져 있어요. ${my}님은 요즘 뭐에 빠져 있어요?`, "오 그랬구나! 어땠어요?", "헉 진짜요?"]);
  }

  if (tail && !/\?\s*\S*$/.test(line)) {
    const extra = traitTail(p, my, seed) || askBack(p, me, seed, said);
    if (extra) line = (/[.!?ㅋㅎ)]$/.test(line) ? line : line + ".") + extra;
  }
  return styleLine(p, line, seed);
}

// 연락 스타일이 자주면 답장이 빠르고, 가끔이면 느려요 (ms)
function replyDelay(p) { return p.contact === "자주" ? 700 : p.contact === "가끔" ? 2000 : 1200; }

if (typeof module !== "undefined") module.exports = { makeReply, replyDelay, topicsIn, suggestions };
