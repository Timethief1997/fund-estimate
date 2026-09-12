/* ============================================================
   拾养 Shiyang · API Stub 层
   所有"接口"都以真实接口形态暴露，接入后端时只需替换实现。
   标注: TODO replace with fetch(...) 的注释即对接点。
   ============================================================ */
window.API = (function () {
  const delay = (ms) => new Promise(r => setTimeout(r, ms));

  const STORE_HISTORY = 'sy.history';
  const STORE_RECORDS = 'sy.records';
  const STORE_PROFILE = 'sy.currentProfile';

  const read = (k, fallback) => { try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch (e) { return fallback; } };
  const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  /* ---------- 通用免责声明 ---------- */
  const CAUTIONS = [
    '本应用为产品演示原型。营养建议基于公开营养指南与科普资料（如《中国居民膳食营养素参考摄入量 DRIs》《中国居民膳食指南》等）简化整理，仅供学习参考，不构成医疗、诊断或治疗建议。',
    '不同个体对营养素的需求差异较大，请勿用本报告进行自我诊疗；如有不适请及时就医。',
    '正在服药或患有慢性疾病者，补充任何补品前请先咨询医生或注册营养师。',
    '孕期、哺乳期补充剂请严格遵循医嘱剂量，切勿自行加量。',
    '补品不能替代均衡饮食、规律作息与适量运动；建议优先通过食物获取营养。',
    '页面内商品信息为演示用虚构数据，不代表真实在售商品，不构成任何购买引导。'
  ];

  /* ---------- 推荐引擎 ----------
     POST /api/recommend
     req: { gender, ageGroup, conditions[], events[], report?: { 指标key: 'low'|'normal'|'high' } }
     res: { code:0, data:{ summary, lead, items[], report[], cautions[] } }
     TODO replace with fetch('/api/recommend', {method:'POST'...}) */
  async function recommendNutrients(profile, report) {
    await delay(1100); // 模拟网络延迟，让 loading 可见

    /* 检查报告加权：指标异常 → 对应营养素加权 + 诊断文案 */
    const reportBoost = {};
    const reportNotes = [];
    if (report && typeof report === 'object') {
      Object.keys(report).forEach(k => {
        const t = DB.testsPool.find(x => x.key === k);
        if (!t) return;
        const level = report[k];
        if (level === 'normal') return;
        const ab = t.abnormal && t.abnormal[level];
        if (!ab) return;
        (ab.boost || []).forEach(b => { reportBoost[b.id] = (reportBoost[b.id] || 0) + b.weight; });
        reportNotes.push({ name: t.name, level, text: ab.text, ids: (ab.boost || []).map(b => b.id) });
      });
    }
    const hasReport = reportNotes.length > 0;

    const scored = DB.nutrients.map(n => {
      let score = (n.match.base || 0) + (reportBoost[n.id] || 0);
      const reasons = [];
      (n.match.events || []).forEach(e => {
        if (profile.events.includes(e)) { score += 30; reasons.push(DB.labelOf('events', e)); }
      });
      (n.match.conditions || []).forEach(c => {
        if (profile.conditions.includes(c)) { score += 20; reasons.push(DB.labelOf('conditions', c)); }
      });
      (n.match.ageGroups || []).forEach(a => {
        if (profile.ageGroup === a) { score += 15; reasons.push('年龄阶段'); }
      });
      (n.match.genders || []).forEach(g => {
        if (profile.gender === g) { score += 10; reasons.push(DB.labelOf('gender', g)); }
      });
      return { nutrient: n, score, reasons: [...new Set(reasons)] };
    })
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 7);

    /* 按营养素匹配关联菜谱：菜谱库中 nutrientIds 命中该营养素即联动 */
    const recipesFor = (id) => DB.recipes.filter(r => r.nutrientIds.includes(id)).slice(0, 3);

    const items = scored.map((x, i) => ({
      rank: i + 1,
      id: x.nutrient.id,
      name: x.nutrient.name,
      en: x.nutrient.en,
      category: x.nutrient.category,
      why: x.nutrient.why,
      dose: x.nutrient.dose,
      foods: x.nutrient.foods,
      products: x.nutrient.products,
      warnings: x.nutrient.warnings,
      tests: x.nutrient.tests,
      recipes: recipesFor(x.nutrient.id),
      reportNotes: hasReport ? reportNotes.filter(rn => rn.ids.includes(x.nutrient.id)).map(rn => rn.text) : [],
      reasons: x.reasons,
      score: x.score
    }));

    const gLabel = DB.labelOf('gender', profile.gender);
    const aLabel = DB.labelOf('ageGroups', profile.ageGroup);
    const nCond = profile.conditions.length;
    const nEvt = profile.events.length;
    const lead = items[0] ? items[0].name : '均衡饮食';

    const labelParts = [gLabel, aLabel].filter(Boolean);
    if (nCond) labelParts.push(`关注 ${nCond} 项身体信号`);
    if (nEvt) labelParts.push(`${nEvt} 项近期事件`);
    const who = labelParts.length ? labelParts.join(' · ') : '你的情况';

    const reportSummary = hasReport
      ? `结合你录入的检查报告（${reportNotes.length} 项异常指标），推荐已按报告结果针对性加权。`
      : '';
    const summary = reportSummary + `针对${who}，我们为你筛选出 ${items.length} 个最值得优先补充的营养方向。请以「${lead}」为第一优先级开始。`;

    return {
      code: 0,
      data: {
        summary,
        lead,
        items,
        report: reportNotes.map(rn => ({ name: rn.name, level: rn.level, text: rn.text })),
        reportSummary,
        cautions: CAUTIONS,
        profile,
        generatedAt: Date.now()
      }
    };
  }

  /* ---------- 历史记录 ----------
     GET  /api/history  → list
     POST /api/history  → save record
     DEL  /api/history/:id
     TODO replace with fetch(...) 接入真实后端 */
  async function getHistory() {
    await delay(200);
    return { code: 0, data: read(STORE_HISTORY, []) };
  }

  async function saveRecord(record) {
    const list = read(STORE_HISTORY, []);
    record.id = 'R' + Date.now();
    record.date = new Date();
    list.unshift(record);
    write(STORE_HISTORY, list.slice(0, 30));
    // 同时存完整推荐结果，供结果页按 id 回放
    const recs = read(STORE_RECORDS, {});
    recs[record.id] = record;
    write(STORE_RECORDS, recs);
    return { code: 0, data: record };
  }

  async function deleteRecord(id) {
    write(STORE_HISTORY, read(STORE_HISTORY, []).filter(r => r.id !== id));
    const recs = read(STORE_RECORDS, {});
    delete recs[id];
    write(STORE_RECORDS, recs);
    return { code: 0 };
  }

  async function getRecord(id) {
    await delay(150);
    return { code: 0, data: (read(STORE_RECORDS, {}))[id] || null };
  }

  function getCurrentProfile() {
    return read(STORE_PROFILE, null);
  }
  function setCurrentProfile(p) {
    write(STORE_PROFILE, p);
  }

  return { recommendNutrients, getHistory, saveRecord, deleteRecord, getRecord, getCurrentProfile, setCurrentProfile };
})();
