// 가상 프로필 저장소 (36명)
// 값 목록
//   nickname: 닉네임 / intro: 자기소개 한 줄
//   gender: "여" | "남"
//   lookingFor: "연인" | "친구"
//   energy: "내향" | "중간" | "외향"
//   interests: 러닝, 노래, OTT, 산책, 요리, 게임, 독서, 여행, 카페, 운동
//   chronotype: "아침형" | "저녁형"
//   hometown (지역): 서울, 경기, 강원, 충청, 경상, 전라, 제주
//   smoking: "흡연" | "비흡연"
//   contact: "가끔" | "적당히" | "자주"
//   dateStyle: "집콕" | "반반" | "밖으로"   (친구일 땐 '노는 스타일'로 표시)
//   religion: 무교, 기독교, 천주교, 불교, 기타
//   face: 강아지상, 고양이상, 토끼상, 곰상, 여우상, 공룡상
//   photo: 사진 경로 (없으면 null → 화면에서 동물 아바타로 표시)
//   wantFaces: 선호하는 상 (여러 개, "상관없음" 가능 / 친구 모드에선 점수에 안 씀)
//   traits: 나의 성격 3개 / wantTraits: 원하는 성격 3개
//     (다정함, 유머러스, 차분함, 활발함, 솔직함, 배려심, 계획적, 즉흥적, 예의 바름, 리더십)
//   want: 원하는 상대 조건 (거르기용)
//     gender: "여" | "남" | "상관없음"
//     ageMin, ageMax, heightMin, heightMax (친구는 키 null = 안 거름)
//     smokerOk: 흡연자 괜찮은지
//     sameReligionOnly: 같은 종교만 원하는지

const PROFILES = [
  // ===== 연인 찾는 사람 (14명) =====
  { id: 1, photo: "photos/1.jpg", nickname: "달리는댕댕이", intro: "러닝하고 노래방 가는 게 낙인 사람이에요", gender: "남", lookingFor: "연인", age: 23, height: 183, mbti: "ENFP", energy: "외향",
    interests: ["러닝", "노래", "OTT", "여행"], chronotype: "저녁형", hometown: "강원",
    smoking: "비흡연", contact: "적당히", dateStyle: "반반", religion: "무교",
    face: "강아지상", wantFaces: ["고양이상", "토끼상"],
    traits: ["유머러스", "활발함", "다정함"], wantTraits: ["다정함", "솔직함", "배려심"],
    want: { gender: "여", ageMin: 20, ageMax: 25, heightMin: 150, heightMax: 170, smokerOk: false, sameReligionOnly: false } },
    // 테스트: 잘 맞아서 상위권에 올 사람

  { id: 2, photo: "photos/2.jpg", nickname: "책읽는곰", intro: "조용한 카페에서 책 읽는 주말을 좋아해요", gender: "남", lookingFor: "연인", age: 24, height: 186, mbti: "ISTJ", energy: "내향",
    interests: ["독서", "카페", "산책"], chronotype: "아침형", hometown: "서울",
    smoking: "비흡연", contact: "가끔", dateStyle: "집콕", religion: "기독교",
    face: "곰상", wantFaces: ["강아지상"],
    traits: ["차분함", "계획적", "예의 바름"], wantTraits: ["차분함", "배려심", "예의 바름"],
    want: { gender: "여", ageMin: 21, ageMax: 26, heightMin: 155, heightMax: 170, smokerOk: false, sameReligionOnly: true } },
    // 테스트: 같은 종교만 원함 → 종교 거르기

  { id: 3, photo: "photos/3.jpg", nickname: "운동장공룡", intro: "운동이든 게임이든 같이 땀 흘릴 사람 찾아요", gender: "남", lookingFor: "연인", age: 22, height: 180, mbti: "ESTP", energy: "외향",
    interests: ["운동", "게임", "러닝"], chronotype: "저녁형", hometown: "경기",
    smoking: "흡연", contact: "자주", dateStyle: "밖으로", religion: "무교",
    face: "공룡상", wantFaces: ["여우상", "고양이상"],
    traits: ["활발함", "즉흥적", "유머러스"], wantTraits: ["활발함", "유머러스", "솔직함"],
    want: { gender: "여", ageMin: 20, ageMax: 24, heightMin: 150, heightMax: 172, smokerOk: true, sameReligionOnly: false } },
    // 테스트: 흡연자 → 흡연 거르기

  { id: 4, photo: "photos/4.jpg", nickname: "요리하는댕댕", intro: "맛있는 거 해주는 걸 좋아해요", gender: "남", lookingFor: "연인", age: 25, height: 184, mbti: "INFJ", energy: "중간",
    interests: ["노래", "OTT", "요리", "카페"], chronotype: "저녁형", hometown: "충청",
    smoking: "비흡연", contact: "적당히", dateStyle: "반반", religion: "무교",
    face: "강아지상", wantFaces: ["상관없음"],
    traits: ["다정함", "배려심", "차분함"], wantTraits: ["다정함", "유머러스", "솔직함"],
    want: { gender: "여", ageMin: 22, ageMax: 27, heightMin: 150, heightMax: 172, smokerOk: false, sameReligionOnly: false } },
    // 테스트: 잘 맞음 (1번과 순위 경쟁)

  { id: 5, photo: "photos/5.jpg", nickname: "여행가는여우", intro: "즉흥 여행 좋아하는 사람 손!", gender: "남", lookingFor: "연인", age: 21, height: 177, mbti: "ENTP", energy: "외향",
    interests: ["게임", "OTT", "여행"], chronotype: "저녁형", hometown: "경상",
    smoking: "비흡연", contact: "자주", dateStyle: "밖으로", religion: "무교",
    face: "여우상", wantFaces: ["토끼상", "강아지상"],
    traits: ["유머러스", "즉흥적", "솔직함"], wantTraits: ["활발함", "유머러스", "즉흥적"],
    want: { gender: "여", ageMin: 19, ageMax: 22, heightMin: 150, heightMax: 168, smokerOk: false, sameReligionOnly: false } },
    // 테스트: 중간 점수

  { id: 6, photo: "photos/6.jpg", nickname: "아침형곰돌이", intro: "주말 아침 브런치 같이 갈 사람", gender: "남", lookingFor: "연인", age: 29, height: 188, mbti: "ESTJ", energy: "중간",
    interests: ["운동", "여행", "카페"], chronotype: "아침형", hometown: "서울",
    smoking: "비흡연", contact: "적당히", dateStyle: "밖으로", religion: "무교",
    face: "곰상", wantFaces: ["고양이상"],
    traits: ["리더십", "계획적", "예의 바름"], wantTraits: ["차분함", "계획적", "예의 바름"],
    want: { gender: "여", ageMin: 25, ageMax: 30, heightMin: 155, heightMax: 175, smokerOk: false, sameReligionOnly: false } },
    // 테스트: 상대 조건(25~30세)에 내가 안 맞음 → 양방향 거르기

  { id: 7, photo: "photos/7.jpg", nickname: "산책하는토끼", intro: "저녁 산책하면서 노래 듣는 시간이 제일 좋아요", gender: "남", lookingFor: "연인", age: 23, height: 169, mbti: "ISFP", energy: "내향",
    interests: ["산책", "노래", "독서"], chronotype: "저녁형", hometown: "강원",
    smoking: "비흡연", contact: "적당히", dateStyle: "집콕", religion: "무교",
    face: "토끼상", wantFaces: ["강아지상", "토끼상"],
    traits: ["배려심", "차분함", "다정함"], wantTraits: ["다정함", "활발함", "배려심"],
    want: { gender: "여", ageMin: 20, ageMax: 25, heightMin: 150, heightMax: 168, smokerOk: false, sameReligionOnly: false } },
    // 테스트: 키 169cm → 170 이상 원하면 걸러짐

  { id: 8, photo: "photos/8.jpg", nickname: "카페러너", intro: "아침에 뛰고 카페 가는 루틴러", gender: "남", lookingFor: "연인", age: 22, height: 181, mbti: "ESFJ", energy: "외향",
    interests: ["러닝", "카페", "여행", "노래"], chronotype: "아침형", hometown: "충청",
    smoking: "비흡연", contact: "자주", dateStyle: "밖으로", religion: "천주교",
    face: "강아지상", wantFaces: ["고양이상"],
    traits: ["활발함", "리더십", "솔직함"], wantTraits: ["다정함", "활발함", "예의 바름"],
    want: { gender: "여", ageMin: 20, ageMax: 24, heightMin: 150, heightMax: 170, smokerOk: false, sameReligionOnly: false } },

  { id: 9, photo: "photos/9.jpg", nickname: "노래방고양이", intro: "노래방 가면 마이크 안 놓는 타입", gender: "여", lookingFor: "연인", age: 22, height: 163, mbti: "ENFJ", energy: "외향",
    interests: ["노래", "카페", "여행", "OTT"], chronotype: "저녁형", hometown: "경기",
    smoking: "비흡연", contact: "자주", dateStyle: "반반", religion: "무교",
    face: "고양이상", wantFaces: ["강아지상", "곰상"],
    traits: ["활발함", "다정함", "솔직함"], wantTraits: ["다정함", "배려심", "유머러스"],
    want: { gender: "남", ageMin: 21, ageMax: 26, heightMin: 170, heightMax: 185, smokerOk: false, sameReligionOnly: false } },

  { id: 10, photo: "photos/10.jpg", nickname: "조용한토끼", intro: "잔잔한 대화 좋아해요", gender: "여", lookingFor: "연인", age: 23, height: 158, mbti: "INFP", energy: "내향",
    interests: ["독서", "산책", "요리"], chronotype: "아침형", hometown: "전라",
    smoking: "비흡연", contact: "가끔", dateStyle: "집콕", religion: "불교",
    face: "토끼상", wantFaces: ["곰상"],
    traits: ["차분함", "배려심", "예의 바름"], wantTraits: ["차분함", "다정함", "계획적"],
    want: { gender: "남", ageMin: 22, ageMax: 27, heightMin: 170, heightMax: 190, smokerOk: false, sameReligionOnly: true } },

  { id: 11, photo: "photos/11.jpg", nickname: "게임하는여우", intro: "운동도 게임도 이기는 게 좋아요", gender: "여", lookingFor: "연인", age: 21, height: 166, mbti: "ESTP", energy: "외향",
    interests: ["운동", "러닝", "게임"], chronotype: "저녁형", hometown: "서울",
    smoking: "흡연", contact: "적당히", dateStyle: "밖으로", religion: "무교",
    face: "여우상", wantFaces: ["공룡상", "여우상"],
    traits: ["솔직함", "즉흥적", "활발함"], wantTraits: ["유머러스", "즉흥적", "활발함"],
    want: { gender: "남", ageMin: 20, ageMax: 25, heightMin: 170, heightMax: 190, smokerOk: true, sameReligionOnly: false } },

  { id: 12, photo: "photos/12.jpg", nickname: "베이킹토끼", intro: "주말엔 빵 굽고 카페 투어해요", gender: "여", lookingFor: "연인", age: 24, height: 160, mbti: "ISFJ", energy: "중간",
    interests: ["요리", "카페", "OTT"], chronotype: "아침형", hometown: "충청",
    smoking: "비흡연", contact: "적당히", dateStyle: "반반", religion: "기독교",
    face: "토끼상", wantFaces: ["강아지상", "곰상"],
    traits: ["다정함", "계획적", "배려심"], wantTraits: ["예의 바름", "다정함", "계획적"],
    want: { gender: "남", ageMin: 23, ageMax: 28, heightMin: 170, heightMax: 190, smokerOk: false, sameReligionOnly: false } },

  { id: 13, photo: "photos/13.jpg", nickname: "밤샘고양이", intro: "밤에 게임하고 영화 보는 집순돌이", gender: "남", lookingFor: "연인", age: 23, height: 179, mbti: "INTP", energy: "내향",
    interests: ["게임", "독서", "OTT"], chronotype: "저녁형", hometown: "경기",
    smoking: "비흡연", contact: "가끔", dateStyle: "집콕", religion: "무교",
    face: "고양이상", wantFaces: ["상관없음"],
    traits: ["차분함", "솔직함", "유머러스"], wantTraits: ["차분함", "다정함", "솔직함"],
    want: { gender: "남", ageMin: 21, ageMax: 26, heightMin: 165, heightMax: 190, smokerOk: false, sameReligionOnly: false } },
    // 테스트: 원하는 성별이 남 → 성별 양방향 거르기

  { id: 14, photo: "photos/14.jpg", nickname: "해맑은댕댕", intro: "노래 부르면서 걷는 거 좋아해요", gender: "여", lookingFor: "연인", age: 22, height: 165, mbti: "ENFP", energy: "외향",
    interests: ["노래", "러닝", "산책", "OTT"], chronotype: "저녁형", hometown: "강원",
    smoking: "비흡연", contact: "적당히", dateStyle: "반반", religion: "무교",
    face: "강아지상", wantFaces: ["고양이상", "토끼상"],
    traits: ["유머러스", "다정함", "활발함"], wantTraits: ["솔직함", "배려심", "유머러스"],
    want: { gender: "여", ageMin: 20, ageMax: 25, heightMin: 150, heightMax: 175, smokerOk: false, sameReligionOnly: false } },
    // 테스트: 원하는 성별이 여 → 여성이 여성을 찾을 때 매칭

  // ===== 친구 찾는 사람 (10명) =====
  { id: 15, photo: null, nickname: "카페고양이", intro: "새로운 카페 탐방이 취미예요", gender: "여", lookingFor: "친구", age: 22, height: 161, mbti: "ESFP", energy: "외향",
    interests: ["노래", "OTT", "카페", "여행"], chronotype: "저녁형", hometown: "강원",
    smoking: "비흡연", contact: "자주", dateStyle: "밖으로", religion: "무교",
    face: "고양이상", wantFaces: ["상관없음"],
    traits: ["활발함", "유머러스", "즉흥적"], wantTraits: ["유머러스", "솔직함", "활발함"],
    want: { gender: "상관없음", ageMin: 19, ageMax: 26, heightMin: null, heightMax: null, smokerOk: false, sameReligionOnly: false } },

  { id: 16, photo: null, nickname: "책갈피토끼", intro: "책 이야기 나눌 친구 찾아요", gender: "여", lookingFor: "친구", age: 21, height: 157, mbti: "INFJ", energy: "내향",
    interests: ["독서", "카페", "산책"], chronotype: "아침형", hometown: "충청",
    smoking: "비흡연", contact: "가끔", dateStyle: "집콕", religion: "기독교",
    face: "토끼상", wantFaces: ["상관없음"],
    traits: ["차분함", "배려심", "계획적"], wantTraits: ["차분함", "다정함", "예의 바름"],
    want: { gender: "여", ageMin: 19, ageMax: 24, heightMin: null, heightMax: null, smokerOk: false, sameReligionOnly: false } },

  { id: 17, photo: null, nickname: "헬스공룡", intro: "같이 운동할 친구 구해요", gender: "남", lookingFor: "친구", age: 22, height: 182, mbti: "ENTJ", energy: "외향",
    interests: ["운동", "러닝", "게임"], chronotype: "아침형", hometown: "경상",
    smoking: "비흡연", contact: "적당히", dateStyle: "밖으로", religion: "무교",
    face: "공룡상", wantFaces: ["상관없음"],
    traits: ["리더십", "활발함", "솔직함"], wantTraits: ["활발함", "리더십", "즉흥적"],
    want: { gender: "남", ageMin: 20, ageMax: 25, heightMin: null, heightMax: null, smokerOk: true, sameReligionOnly: false } },
    // 테스트: 남자 친구만 원함 → 성별 거르기

  { id: 18, photo: null, nickname: "러닝메이트", intro: "저녁 러닝 같이 뛰어요", gender: "여", lookingFor: "친구", age: 23, height: 164, mbti: "ESTP", energy: "중간",
    interests: ["러닝", "운동", "OTT", "노래"], chronotype: "저녁형", hometown: "강원",
    smoking: "비흡연", contact: "적당히", dateStyle: "반반", religion: "무교",
    face: "강아지상", wantFaces: ["상관없음"],
    traits: ["솔직함", "유머러스", "활발함"], wantTraits: ["유머러스", "솔직함", "즉흥적"],
    want: { gender: "상관없음", ageMin: 20, ageMax: 26, heightMin: null, heightMax: null, smokerOk: false, sameReligionOnly: false } },
    // 테스트: 친구로 잘 맞아서 상위권에 올 사람

  { id: 19, photo: null, nickname: "집밥토끼", intro: "집에서 요리하고 영화 보는 게 좋아요", gender: "여", lookingFor: "친구", age: 20, height: 162, mbti: "ISFP", energy: "내향",
    interests: ["요리", "독서", "OTT"], chronotype: "저녁형", hometown: "전라",
    smoking: "비흡연", contact: "가끔", dateStyle: "집콕", religion: "무교",
    face: "토끼상", wantFaces: ["상관없음"],
    traits: ["차분함", "다정함", "예의 바름"], wantTraits: ["차분함", "배려심", "다정함"],
    want: { gender: "상관없음", ageMin: 19, ageMax: 21, heightMin: null, heightMax: null, smokerOk: false, sameReligionOnly: false } },
    // 테스트: 상대 조건(19~21세)에 내가 안 맞으면 걸러짐

  { id: 20, photo: null, nickname: "여행곰", intro: "어디든 떠나는 거 좋아해요", gender: "남", lookingFor: "친구", age: 24, height: 184, mbti: "ESFJ", energy: "외향",
    interests: ["여행", "카페", "노래"], chronotype: "저녁형", hometown: "서울",
    smoking: "흡연", contact: "자주", dateStyle: "밖으로", religion: "무교",
    face: "곰상", wantFaces: ["상관없음"],
    traits: ["유머러스", "활발함", "리더십"], wantTraits: ["유머러스", "즉흥적", "활발함"],
    want: { gender: "상관없음", ageMin: 20, ageMax: 28, heightMin: null, heightMax: null, smokerOk: true, sameReligionOnly: false } },
    // 테스트: 흡연자 (친구 모드)

  { id: 21, photo: null, nickname: "게임여우", intro: "게임하고 노래방 가요", gender: "여", lookingFor: "친구", age: 22, height: 159, mbti: "ENTP", energy: "외향",
    interests: ["게임", "OTT", "노래", "요리"], chronotype: "저녁형", hometown: "경기",
    smoking: "비흡연", contact: "자주", dateStyle: "반반", religion: "천주교",
    face: "여우상", wantFaces: ["상관없음"],
    traits: ["유머러스", "즉흥적", "솔직함"], wantTraits: ["유머러스", "활발함", "다정함"],
    want: { gender: "여", ageMin: 20, ageMax: 25, heightMin: null, heightMax: null, smokerOk: false, sameReligionOnly: false } },

  { id: 22, photo: null, nickname: "제주고양이", intro: "산책이랑 독서 좋아하는 아침형 인간", gender: "여", lookingFor: "친구", age: 25, height: 167, mbti: "ISTJ", energy: "내향",
    interests: ["독서", "산책", "카페"], chronotype: "아침형", hometown: "제주",
    smoking: "비흡연", contact: "가끔", dateStyle: "집콕", religion: "불교",
    face: "고양이상", wantFaces: ["상관없음"],
    traits: ["계획적", "차분함", "예의 바름"], wantTraits: ["계획적", "예의 바름", "차분함"],
    want: { gender: "상관없음", ageMin: 22, ageMax: 28, heightMin: null, heightMax: null, smokerOk: false, sameReligionOnly: true } },
    // 테스트: 같은 종교만 (친구 모드)

  { id: 23, photo: null, nickname: "노래하는댕댕", intro: "노래 추천 주고받을 친구 구해요", gender: "남", lookingFor: "친구", age: 21, height: 177, mbti: "INFP", energy: "중간",
    interests: ["노래", "산책", "OTT"], chronotype: "저녁형", hometown: "강원",
    smoking: "비흡연", contact: "적당히", dateStyle: "반반", religion: "무교",
    face: "강아지상", wantFaces: ["상관없음"],
    traits: ["다정함", "배려심", "유머러스"], wantTraits: ["다정함", "솔직함", "유머러스"],
    want: { gender: "상관없음", ageMin: 19, ageMax: 24, heightMin: null, heightMax: null, smokerOk: false, sameReligionOnly: false } },

  { id: 24, photo: null, nickname: "아침러너", intro: "아침 러닝 크루 모집 중", gender: "여", lookingFor: "친구", age: 23, height: 160, mbti: "ESFP", energy: "외향",
    interests: ["러닝", "여행", "카페", "운동"], chronotype: "아침형", hometown: "충청",
    smoking: "비흡연", contact: "자주", dateStyle: "밖으로", religion: "무교",
    face: "강아지상", wantFaces: ["상관없음"],
    traits: ["활발함", "계획적", "리더십"], wantTraits: ["활발함", "솔직함", "배려심"],
    want: { gender: "상관없음", ageMin: 20, ageMax: 26, heightMin: null, heightMax: null, smokerOk: false, sameReligionOnly: false } },

  // ===== 추가 프로필 (사진 없음 → 아바타로 표시) =====
  { id: 25, photo: null, nickname: "노래하는곰", intro: "노래방이랑 밤 산책이 최고의 데이트", gender: "남", lookingFor: "연인", age: 24, height: 183, mbti: "ENFJ", energy: "중간",
    interests: ["노래", "OTT", "산책", "카페"], chronotype: "저녁형", hometown: "강원",
    smoking: "비흡연", contact: "적당히", dateStyle: "반반", religion: "무교",
    face: "곰상", wantFaces: ["강아지상", "토끼상"],
    traits: ["다정함", "배려심", "유머러스"], wantTraits: ["활발함", "솔직함", "유머러스"],
    want: { gender: "여", ageMin: 20, ageMax: 26, heightMin: 150, heightMax: 172, smokerOk: false, sameReligionOnly: false } },

  { id: 26, photo: null, nickname: "산책댕댕", intro: "날 좋으면 무조건 밖으로 나가요", gender: "남", lookingFor: "연인", age: 23, height: 181, mbti: "ESFP", energy: "외향",
    interests: ["산책", "러닝", "여행"], chronotype: "저녁형", hometown: "경기",
    smoking: "비흡연", contact: "적당히", dateStyle: "밖으로", religion: "무교",
    face: "강아지상", wantFaces: ["강아지상"],
    traits: ["다정함", "활발함", "배려심"], wantTraits: ["유머러스", "활발함", "다정함"],
    want: { gender: "여", ageMin: 20, ageMax: 25, heightMin: 150, heightMax: 170, smokerOk: false, sameReligionOnly: false } },

  { id: 27, photo: null, nickname: "드라이브곰", intro: "주말엔 드라이브하고 맛집 찾아다녀요", gender: "남", lookingFor: "연인", age: 26, height: 179, mbti: "ENTJ", energy: "외향",
    interests: ["여행", "카페", "OTT"], chronotype: "아침형", hometown: "충청",
    smoking: "비흡연", contact: "자주", dateStyle: "밖으로", religion: "천주교",
    face: "곰상", wantFaces: ["상관없음"],
    traits: ["리더십", "배려심", "계획적"], wantTraits: ["다정함", "차분함", "예의 바름"],
    want: { gender: "여", ageMin: 21, ageMax: 27, heightMin: 150, heightMax: 172, smokerOk: false, sameReligionOnly: false } },

  { id: 28, photo: null, nickname: "기타치는토끼", intro: "기타 치면서 노래 만드는 중이에요", gender: "남", lookingFor: "연인", age: 22, height: 176, mbti: "INTP", energy: "내향",
    interests: ["노래", "게임", "OTT"], chronotype: "저녁형", hometown: "서울",
    smoking: "비흡연", contact: "가끔", dateStyle: "집콕", religion: "무교",
    face: "토끼상", wantFaces: ["강아지상", "고양이상"],
    traits: ["차분함", "유머러스", "솔직함"], wantTraits: ["활발함", "유머러스", "다정함"],
    want: { gender: "여", ageMin: 20, ageMax: 24, heightMin: 150, heightMax: 170, smokerOk: false, sameReligionOnly: false } },

  { id: 29, photo: null, nickname: "새벽러닝공룡", intro: "러닝 크루 같이 뛸 사람!", gender: "남", lookingFor: "연인", age: 25, height: 185, mbti: "ESTJ", energy: "외향",
    interests: ["러닝", "운동", "노래"], chronotype: "아침형", hometown: "강원",
    smoking: "비흡연", contact: "적당히", dateStyle: "밖으로", religion: "무교",
    face: "공룡상", wantFaces: ["강아지상"],
    traits: ["활발함", "솔직함", "리더십"], wantTraits: ["활발함", "솔직함", "배려심"],
    want: { gender: "여", ageMin: 21, ageMax: 26, heightMin: 155, heightMax: 172, smokerOk: false, sameReligionOnly: false } },

  { id: 30, photo: null, nickname: "카페고양이군", intro: "조용한 카페에서 책 읽는 게 좋아요", gender: "남", lookingFor: "연인", age: 21, height: 178, mbti: "INFJ", energy: "내향",
    interests: ["카페", "독서", "산책"], chronotype: "저녁형", hometown: "경상",
    smoking: "비흡연", contact: "가끔", dateStyle: "반반", religion: "무교",
    face: "고양이상", wantFaces: ["토끼상", "고양이상"],
    traits: ["차분함", "예의 바름", "배려심"], wantTraits: ["차분함", "다정함", "계획적"],
    want: { gender: "여", ageMin: 19, ageMax: 24, heightMin: 150, heightMax: 168, smokerOk: false, sameReligionOnly: false } },

  { id: 31, photo: null, nickname: "딸기토끼", intro: "카페 투어하고 노래방 가는 거 좋아해요", gender: "여", lookingFor: "연인", age: 23, height: 162, mbti: "ESFJ", energy: "외향",
    interests: ["카페", "여행", "노래"], chronotype: "저녁형", hometown: "경기",
    smoking: "비흡연", contact: "자주", dateStyle: "반반", religion: "무교",
    face: "토끼상", wantFaces: ["강아지상", "곰상"],
    traits: ["다정함", "활발함", "배려심"], wantTraits: ["다정함", "유머러스", "예의 바름"],
    want: { gender: "남", ageMin: 22, ageMax: 28, heightMin: 172, heightMax: 190, smokerOk: false, sameReligionOnly: false } },

  { id: 32, photo: null, nickname: "러닝고양이", intro: "아침 러닝하는 사람 좋아요", gender: "여", lookingFor: "연인", age: 21, height: 167, mbti: "ESTJ", energy: "외향",
    interests: ["러닝", "운동", "OTT"], chronotype: "아침형", hometown: "서울",
    smoking: "비흡연", contact: "적당히", dateStyle: "밖으로", religion: "무교",
    face: "고양이상", wantFaces: ["공룡상", "곰상"],
    traits: ["솔직함", "활발함", "계획적"], wantTraits: ["리더십", "솔직함", "활발함"],
    want: { gender: "남", ageMin: 21, ageMax: 27, heightMin: 175, heightMax: 190, smokerOk: false, sameReligionOnly: false } },

  { id: 33, photo: null, nickname: "책읽는여우", intro: "잔잔하게 오래 가는 사이 좋아해요", gender: "여", lookingFor: "연인", age: 25, height: 160, mbti: "ISTJ", energy: "내향",
    interests: ["독서", "카페", "산책"], chronotype: "아침형", hometown: "충청",
    smoking: "비흡연", contact: "가끔", dateStyle: "집콕", religion: "불교",
    face: "여우상", wantFaces: ["상관없음"],
    traits: ["차분함", "계획적", "예의 바름"], wantTraits: ["차분함", "배려심", "예의 바름"],
    want: { gender: "남", ageMin: 24, ageMax: 30, heightMin: 170, heightMax: 190, smokerOk: false, sameReligionOnly: false } },

  { id: 34, photo: null, nickname: "노래하는냥이", intro: "같이 노래방 가고 러닝할 친구 구해요", gender: "여", lookingFor: "친구", age: 22, height: 164, mbti: "ENFP", energy: "외향",
    interests: ["노래", "OTT", "카페", "러닝"], chronotype: "저녁형", hometown: "강원",
    smoking: "비흡연", contact: "적당히", dateStyle: "반반", religion: "무교",
    face: "고양이상", wantFaces: ["상관없음"],
    traits: ["유머러스", "다정함", "활발함"], wantTraits: ["유머러스", "솔직함", "다정함"],
    want: { gender: "상관없음", ageMin: 20, ageMax: 25, heightMin: null, heightMax: null, smokerOk: false, sameReligionOnly: false } },

  { id: 35, photo: null, nickname: "농구곰", intro: "운동 같이 할 친구 환영", gender: "남", lookingFor: "친구", age: 23, height: 182, mbti: "ESTP", energy: "외향",
    interests: ["운동", "게임", "러닝"], chronotype: "저녁형", hometown: "경기",
    smoking: "비흡연", contact: "가끔", dateStyle: "밖으로", religion: "무교",
    face: "곰상", wantFaces: ["상관없음"],
    traits: ["솔직함", "리더십", "유머러스"], wantTraits: ["유머러스", "활발함", "솔직함"],
    want: { gender: "상관없음", ageMin: 20, ageMax: 26, heightMin: null, heightMax: null, smokerOk: false, sameReligionOnly: false } },

  { id: 36, photo: null, nickname: "베이글토끼", intro: "빵집 투어 메이트 찾아요", gender: "여", lookingFor: "친구", age: 24, height: 159, mbti: "ISFJ", energy: "중간",
    interests: ["요리", "카페", "여행", "산책"], chronotype: "아침형", hometown: "전라",
    smoking: "비흡연", contact: "자주", dateStyle: "반반", religion: "기독교",
    face: "토끼상", wantFaces: ["상관없음"],
    traits: ["다정함", "계획적", "배려심"], wantTraits: ["다정함", "차분함", "계획적"],
    want: { gender: "여", ageMin: 21, ageMax: 27, heightMin: null, heightMax: null, smokerOk: false, sameReligionOnly: false } },

  // ===== 실제 친구 프로필은 여기 아래에 같은 형식으로 추가 =====
];
