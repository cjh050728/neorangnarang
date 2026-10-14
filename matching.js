// =====================================================
//  매칭 로직 (화면과 분리해 둔 "두뇌" 파일)
//  순서: ① 거르기 → ② 점수 → ③ 이유
// =====================================================

// ---------- 기본 점수표 (각 100점) ----------
const DEFAULT_WEIGHTS = {
  연인: { interests: 20, traits: 20, contact: 10, face: 10, chronotype: 10, dateStyle: 10, energy: 5, age: 10, hometown: 5 },
  친구: { interests: 30, traits: 20, contact: 10, face: 0, chronotype: 5, dateStyle: 10, energy: 10, age: 10, hometown: 5 },
};

const ITEM_LABELS = {
  interests: "관심사", traits: "성격", contact: "연락 스타일", face: "상",
  chronotype: "생활 패턴", dateStyle: "데이트 스타일", energy: "성향", age: "나이", hometown: "지역",
};
function itemLabel(key, mode) {
  if (key === "dateStyle" && mode === "친구") return "노는 스타일";
  return ITEM_LABELS[key];
}

// 3단계로 순서가 있는 값들 (차이가 작을수록 비슷)
const ORDINAL = {
  energy: { 내향: 0, 중간: 1, 외향: 2 },
  contact: { 가끔: 0, 적당히: 1, 자주: 2 },
  dateStyle: { 집콕: 0, 반반: 1, 밖으로: 2 },
};

// ---------- 중요도(0~3) → 100점 환산 ----------
function weightsFromLevels(levels) {
  const total = Object.values(levels).reduce((a, b) => a + b, 0);
  if (total === 0) return null;
  const w = {};
  for (const k in levels) w[k] = (levels[k] / total) * 100;
  return w;
}
function levelsFromWeights(w) {
  const lv = {};
  for (const k in w) lv[k] = w[k] >= 20 ? 3 : w[k] >= 10 ? 2 : w[k] > 0 ? 1 : 0;
  return lv;
}

// =====================================================
// ① 거르기: A가 원하는 조건에 B가 맞는지
//    맞으면 null, 안 맞으면 탈락 이유 문자열
// =====================================================
function checkWant(A, B) {
  const w = A.want;
  if (w.gender !== "상관없음" && B.gender !== w.gender) return `원하는 성별(${w.gender})이 아님`;
  if (B.age < w.ageMin || B.age > w.ageMax) return `${B.age}세라 원하는 나이(${w.ageMin}~${w.ageMax}세)가 아님`;
  if (A.lookingFor === "연인" && w.heightMin != null && w.heightMax != null &&
      (B.height < w.heightMin || B.height > w.heightMax))
    return `${B.height}cm라 원하는 키(${w.heightMin}~${w.heightMax}cm)가 아님`;
  if (!w.smokerOk && B.smoking === "흡연") return "흡연자는 안 됨";
  if (w.sameReligionOnly && A.religion !== B.religion) return `같은 종교만 원함 (${A.religion} ≠ ${B.religion})`;
  return null;
}

// 양방향 거르기: 하나라도 걸리면 탈락
function filterReason(me, other) {
  if (other.id === me.id) return "나 자신";
  if (other.lookingFor !== me.lookingFor) return `찾는 관계가 다름 (${other.lookingFor})`;
  const mine = checkWant(me, other);
  if (mine) return `내 조건: ${mine}`;
  const theirs = checkWant(other, me);
  if (theirs) return `상대 조건: ${theirs}`;
  return null;
}

// =====================================================
// ② 점수: 항목별 0~1 비슷함 + 설명
//    (A 입장에서 B를 볼 때)
// =====================================================
function similarity(key, A, B) {
  switch (key) {
    case "interests": { // 자카드 유사도: 겹친 수 ÷ 합친 수
      const inter = A.interests.filter(x => B.interests.includes(x));
      const union = new Set([...A.interests, ...B.interests]);
      return { s: union.size ? inter.length / union.size : 0,
        why: inter.length ? `겹친 관심사 ${inter.join(", ")} (${inter.length}/${union.size})` : "겹치는 관심사 없음" };
    }
    case "traits": { // 내가 원하는 성격 중 상대가 가진 비율
      const hit = A.wantTraits.filter(t => B.traits.includes(t));
      return { s: A.wantTraits.length ? hit.length / A.wantTraits.length : 0,
        why: hit.length ? `원하는 성격 중 ${hit.join(", ")} 있음 (${hit.length}/${A.wantTraits.length})` : "원하는 성격과 겹치지 않음" };
    }
    case "face": {
      const ok = A.wantFaces.includes("상관없음") || A.wantFaces.includes(B.face);
      return { s: ok ? 1 : 0, why: A.wantFaces.includes("상관없음") ? "상 상관없음" :
        ok ? `${B.face} (선호하는 상)` : `${B.face} (선호하는 상 아님)` };
    }
    case "contact": case "energy": case "dateStyle": { // 3단계 거리
      const d = Math.abs(ORDINAL[key][A[key]] - ORDINAL[key][B[key]]);
      return { s: 1 - d / 2, why: d === 0 ? `둘 다 ${A[key]}` : `${A[key]} ↔ ${B[key]}` };
    }
    case "chronotype": case "hometown": {
      const same = A[key] === B[key];
      return { s: same ? 1 : 0, why: same ? `둘 다 ${A[key]}` : `${A[key]} ↔ ${B[key]}` };
    }
    case "age": { // 가까울수록 높게, 0 아래로는 안 내려감
      const d = Math.abs(A.age - B.age);
      return { s: Math.max(0, 1 - d / 5), why: d === 0 ? "동갑" : `${d}살 차이` };
    }
  }
}

// A 입장 점수 (A의 중요도로 계산)
function directionalScore(A, B, weights) {
  const items = [];
  let total = 0;
  for (const key in weights) {
    if (weights[key] <= 0) continue;
    const { s, why } = similarity(key, A, B);
    const pts = s * weights[key];
    total += pts;
    items.push({ key, max: weights[key], pts, s, why });
  }
  return { total, items };
}

// =====================================================
// 전체 실행: 거르기 → 서로 점수 → 정렬
// =====================================================
function runMatching(me, store, myWeights) {
  const mode = me.lookingFor;
  const passed = [], filtered = [];
  let otherMode = 0;
  for (const p of store) {
    const reason = filterReason(me, p);
    if (reason === null) passed.push(p);
    else if (reason.startsWith("찾는 관계")) otherMode++;
    else filtered.push({ p, reason });
  }
  const theirWeights = DEFAULT_WEIGHTS[mode]; // 가상 프로필은 기본 점수표 사용
  const ranked = passed.map(p => {
    const mine = directionalScore(me, p, myWeights);
    const theirs = directionalScore(p, me, p.weights || theirWeights);
    return { p, mine, theirs, final: (mine.total + theirs.total) / 2 };
  }).sort((a, b) => b.final - a.final);
  return { ranked, filtered, otherMode };
}

// =====================================================
// ③ 이유: 1위가 왜 1위인지 문장으로
// =====================================================
function explainTop(ranked, mode) {
  if (!ranked.length) return null;
  const top = ranked[0];
  const best = [...top.mine.items].sort((a, b) => b.pts - a.pts).filter(i => i.pts > 0).slice(0, 3);
  const lines = best.map(i => `${itemLabel(i.key, mode)}: ${i.why} → +${i.pts.toFixed(1)}점`);
  let vsSecond = null;
  if (ranked[1]) {
    const second = ranked[1];
    const gaps = top.mine.items.map(i => {
      const j = second.mine.items.find(x => x.key === i.key);
      return { key: i.key, gap: i.pts - (j ? j.pts : 0) };
    }).filter(g => g.gap > 0.05).sort((a, b) => b.gap - a.gap).slice(0, 2);
    vsSecond = { name: second.p.nickname, diff: top.final - second.final,
      by: gaps.map(g => `${itemLabel(g.key, mode)}(+${g.gap.toFixed(1)})`) };
  }
  return { top, lines, vsSecond };
}

if (typeof module !== "undefined") module.exports = {
  DEFAULT_WEIGHTS, ITEM_LABELS, itemLabel, weightsFromLevels, levelsFromWeights,
  checkWant, filterReason, similarity, directionalScore, runMatching, explainTop,
};
