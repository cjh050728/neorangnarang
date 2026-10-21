// =====================================================
//  나랑이: 왜 이 사람인지 LLM(Ollama)으로 설명하기
//  순위와 점수는 matching.js의 규칙이 정하고,
//  나랑이는 그 근거를 "자연스러운 문장"으로 바꾸기만 해요.
//  (LLM은 말을 그럴듯하게 만들 뿐, 맞는지는 보장 못 하기 때문)
// =====================================================

const NARANG = { name: "나랑이", emoji: "🤖" };
const LLM_KEY = "neorangnarang_llm";
const LLM_DEFAULT = { url: "http://localhost:11434", model: "" };

function loadLLM() {
  try { return { ...LLM_DEFAULT, ...(JSON.parse(localStorage.getItem(LLM_KEY)) || {}) }; } catch { return { ...LLM_DEFAULT }; }
}
function saveLLM(cfg) { try { localStorage.setItem(LLM_KEY, JSON.stringify(cfg)); } catch {} }

// Ollama에 설치된 모델 목록 (연결 확인 겸용)
async function ollamaModels(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 4000);
  try {
    const res = await fetch(url.replace(/\/$/, "") + "/api/tags", { signal: ctrl.signal });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    return (data.models || []).map(m => m.name);
  } finally { clearTimeout(timer); }
}
// gemma3가 있으면 그걸, 없으면 첫 번째 모델
function pickModel(models, wanted) {
  if (wanted && models.includes(wanted)) return wanted;
  return models.find(m => m.startsWith("gemma3")) || models.find(m => m.startsWith("gemma")) || models[0] || "";
}

// ---------- LLM에 넘길 "사실"만 정리 ----------
function factsFor(me, r, rank, mode, label) {
  const items = [...r.mine.items].sort((a, b) => b.pts - a.pts);
  const lines = items.map(i => `- ${label(i.key, mode)}: ${i.why} (${i.pts.toFixed(1)}/${Math.round(i.max)}점)`);
  const common = me.interests.filter(i => r.p.interests.includes(i));
  return [
    `찾는 관계: ${mode}`,
    `나: ${me.nickname}, ${me.age}세, ${me.mbti}, 관심사 ${me.interests.join(", ")}, 성격 ${me.traits.join(", ")}`,
    `상대: ${r.p.nickname}, ${r.p.gender === "남" ? "남자" : "여자"} ${r.p.age}세, ${r.p.mbti}, 자기소개 "${r.p.intro}"`,
    `순위: ${rank}위, 최종 ${r.final.toFixed(1)}점 (나 기준 ${r.mine.total.toFixed(1)}점, 상대 기준 ${r.theirs.total.toFixed(1)}점의 평균)`,
    `겹치는 관심사: ${common.length ? common.join(", ") : "없음"}`,
    `항목별 근거 (높은 순):`,
    ...lines,
  ].join("\n");
}

function buildPrompt(facts, nick) {
  return `너는 매칭 앱 "너랑나랑"의 설명 도우미 "${NARANG.name}"야.
아래 [사실]은 규칙으로 계산한 매칭 결과야. 이 사실만 보고, 사용자에게 왜 ${nick}님이 추천됐는지 설명해 줘.

규칙:
- 한국어 존댓말, 친근하고 다정한 말투. 3~4문장.
- 첫 문장은 "${NARANG.name}가 보기엔"으로 시작해.
- 점수가 높은 항목 2~3개를 근거로 들어. 겹치는 관심사가 있으면 꼭 말해.
- 나 기준 점수와 상대 기준 점수가 둘 다 높으면 "서로" 잘 맞는다고 말하고, 차이가 크면 그것도 솔직하게 말해.
- [사실]에 없는 내용(외모, 직업, 학교, 지어낸 경험)은 절대 만들지 마.
- 점수 숫자는 최종 점수 하나만 써. 목록이나 제목 없이 문장으로만 써.

[사실]
${facts}`;
}

// 스트리밍으로 받아서 글자가 나오는 대로 보여 줘요
async function narangExplain(cfg, prompt, onText, signal) {
  const res = await fetch(cfg.url.replace(/\/$/, "") + "/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: cfg.model, prompt, stream: true, options: { temperature: 0.6 } }),
    signal,
  });
  if (!res.ok) throw new Error("HTTP " + res.status);
  const reader = res.body.getReader(), dec = new TextDecoder();
  let buf = "", text = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const parts = buf.split("\n"); buf = parts.pop();
    for (const line of parts) {
      if (!line.trim()) continue;
      const j = JSON.parse(line);
      if (j.error) throw new Error(j.error);
      if (j.response) { text += j.response; onText(text); }
    }
  }
  return text.trim();
}

// ---------- LLM이 안 될 때: 규칙으로 만든 설명 ----------
function ruleExplain(me, r, rank, mode, label) {
  const items = [...r.mine.items].sort((a, b) => b.pts - a.pts).filter(i => i.pts > 0);
  const top = items.slice(0, 3).map(i => label(i.key, mode));
  const common = me.interests.filter(i => r.p.interests.includes(i));
  const gap = Math.abs(r.mine.total - r.theirs.total);
  const s = [];
  s.push(`${NARANG.name}가 보기엔 ${r.p.nickname}님은 ${top.join(", ")} 면에서 특히 잘 맞아서 ${rank}위가 됐어요.`);
  if (common.length) s.push(`두 분 다 ${common.join(", ")}${common.length > 1 ? " 같은 걸" : "을(를)"} 좋아해서 같이 할 거리가 많아요.`.replace("을(를)", /[가-힣]$/.test(common[0]) && (common[0].charCodeAt(common[0].length - 1) - 0xAC00) % 28 ? "을" : "를"));
  s.push(gap < 8
    ? `나 기준 ${r.mine.total.toFixed(1)}점, 상대 기준 ${r.theirs.total.toFixed(1)}점으로 서로 비슷하게 잘 맞는 사이예요.`
    : r.mine.total > r.theirs.total
      ? `다만 나 기준(${r.mine.total.toFixed(1)}점)보다 상대 기준(${r.theirs.total.toFixed(1)}점)이 낮아서, 상대 쪽 마음은 조금 더 알아가 봐야 해요.`
      : `오히려 상대 기준 점수(${r.theirs.total.toFixed(1)}점)가 더 높아서, ${r.p.nickname}님이 좋아할 가능성이 커요.`);
  return s.join(" ");
}

if (typeof module !== "undefined") module.exports = { NARANG, factsFor, buildPrompt, ruleExplain, pickModel, narangExplain, ollamaModels };
