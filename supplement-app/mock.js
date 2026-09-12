/* ============================================================
   拾养 Shiyang · Mock 数据单一数据源
   所有页面从此处读取，不散落硬编码。
   （品牌均为虚构：禾拾/青栀/植元/康源/NATURZA/臻养）
   ============================================================ */
window.DB = {
  brand: '拾养',
  slogan: '懂你的营养补给站',

  /* ---------- 基础枚举 ---------- */
  gender: [
    { key: 'female', label: '女性' },
    { key: 'male', label: '男性' }
  ],
  ageGroups: [
    { key: 'u18', label: '18岁以下' },
    { key: '18-30', label: '18–30岁' },
    { key: '30-45', label: '30–45岁' },
    { key: '45-60', label: '45–60岁' },
    { key: '60plus', label: '60岁以上' }
  ],
  conditions: [
    { key: 'poor-sleep', label: '睡眠质量差' },
    { key: 'fatigue', label: '容易疲劳' },
    { key: 'anemia', label: '贫血或易头晕' },
    { key: 'low-immunity', label: '免疫力低、易感冒' },
    { key: 'gut', label: '肠胃不好、易胀气' },
    { key: 'hair-loss', label: '脱发、发质变差' },
    { key: 'eye-strain', label: '用眼过度、眼干涩' },
    { key: 'joint', label: '关节或骨骼不适' },
    { key: 'skin', label: '皮肤干燥、暗沉' },
    { key: 'muscle-cramp', label: '肌肉酸痛、易抽筋' }
  ],
  events: [
    { key: 'surgery', label: '刚做完手术' },
    { key: 'postpartum', label: '产后修复期', genders: ['female'] },
    { key: 'ttc', label: '正在备孕' },
    { key: 'pregnant', label: '孕期中', genders: ['female'] },
    { key: 'breastfeeding', label: '哺乳期', genders: ['female'] },
    { key: 'heavy-exercise', label: '高强度运动/健身增肌' },
    { key: 'night-owl', label: '长期熬夜/加班' },
    { key: 'dieting', label: '节食/轻断食减肥' },
    { key: 'exam', label: '备考/高强度用脑' }
  ],

  /* ---------- 首页场景快捷入口 ---------- */
  scenes: [
    { key: 'postpartum', label: '产后修复', desc: '补铁 · DHA · 钙', icon: 'baby', prefill: { gender: 'female', events: ['postpartum'] } },
    { key: 'surgery', label: '术后恢复', desc: '蛋白 · 维C · 锌', icon: 'syringe', prefill: { events: ['surgery'] } },
    { key: 'ttc', label: '科学备孕', desc: '叶酸 · DHA', icon: 'heart', prefill: { events: ['ttc'] } },
    { key: 'pregnant', label: '孕期营养', desc: '叶酸 · 铁 · DHA', icon: 'sparkles', prefill: { gender: 'female', events: ['pregnant'] } },
    { key: 'heavy-exercise', label: '健身增肌', desc: '蛋白 · 镁 · 锌', icon: 'dumbbell', prefill: { events: ['heavy-exercise'] } },
    { key: 'night-owl', label: '熬夜加班', desc: 'B族 · 叶黄素', icon: 'moon', prefill: { events: ['night-owl'] } },
    { key: 'elderly', label: '中老年护骨', desc: '钙D3 · 氨糖 · K2', icon: 'bone', prefill: { ageGroup: '60plus', conditions: ['joint'] } },
    { key: 'exam', label: '备考冲刺', desc: 'DHA · B族', icon: 'brain', prefill: { events: ['exam'] } }
  ],

  /* ---------- 营养素知识库 ---------- */
  nutrients: [
    {
      id: 'calcium-d3', name: '钙 + 维生素D3', en: 'Calcium & Vitamin D3', category: '骨骼肌肉',
      why: '骨骼健康的基石。钙与维生素D3协同作用，帮助钙质真正沉积到骨骼。孕期、产后、中老年及生长发育期需求明显上升，摄入不足易导致腿抽筋、骨密度下降。',
      dose: '钙 800–1000mg · 维D3 400–800IU / 日',
      foods: ['牛奶', '酸奶', '北豆腐', '深绿叶菜', '小鱼干'],
      products: [
        { name: '钙镁维D复合片', brand: '禾拾', form: '片剂 · 120片', price: 129, rating: 4.9, sales: '2.3万', tags: ['钙镁协同', '添加K2'] },
        { name: '高钙维D3软胶囊', brand: '康源', form: '胶囊 · 90粒', price: 79, rating: 4.7, sales: '5.1万', tags: ['性价比', '好吞咽'] }
      ],
      warnings: ['与铁剂、锌剂错开 2 小时服用', '肾结石病史者补充前请咨询医生'],
      tests: [
        { name: '25-羟维生素D', note: '判断维D水平，缺D时补钙吸收率会打折扣' },
        { name: '血钙', note: '初筛血清钙水平，与维D一起综合评估' }
      ],
      match: { conditions: ['joint', 'muscle-cramp'], events: ['postpartum', 'pregnant', 'breastfeeding'], ageGroups: ['u18', '45-60', '60plus'], genders: [], base: 0 }
    },
    {
      id: 'iron-vc', name: '铁 + 维生素C', en: 'Iron & Vitamin C', category: '气血能量',
      why: '铁是血红蛋白的核心原料，维生素C能把三价铁还原为更易吸收的形式。贫血、经期量大、孕期与产后失血、节食人群尤其需要关注铁的补充。',
      dose: '铁 15–20mg · 维C 100mg / 日',
      foods: ['红肉', '动物肝脏', '鸭血', '焯水菠菜', '猕猴桃'],
      products: [
        { name: '血红素铁红枣复合', brand: '青栀', form: '胶囊 · 30粒', price: 99, rating: 4.8, sales: '1.8万', tags: ['温和不刺激肠胃', '含维C'] },
        { name: '富铁软糖', brand: '康源', form: '软糖 · 60粒', price: 59, rating: 4.6, sales: '8.7万', tags: ['适合怕苦人群'] }
      ],
      warnings: ['确诊缺铁性贫血后按医嘱剂量补充', '避免与咖啡、浓茶、钙剂同服'],
      tests: [
        { name: '血清铁蛋白', note: '反映体内铁储备是否充足' },
        { name: '血常规·血红蛋白', note: '排查是否存在缺铁性贫血' }
      ],
      match: { conditions: ['anemia', 'hair-loss'], events: ['postpartum', 'pregnant', 'dieting'], ageGroups: [], genders: ['female'], base: 0 }
    },
    {
      id: 'folic-acid', name: '叶酸', en: 'Folic Acid (B9)', category: '孕育护航',
      why: '备孕与孕早期每日补充 400μg 叶酸，可显著降低胎儿神经管缺陷风险；哺乳期也建议继续补充，支持宝宝的生长发育。',
      dose: '400μg / 日（备孕至孕早期）',
      foods: ['深绿叶菜', '豆类', '动物肝脏', '柑橘'],
      products: [
        { name: '活性叶酸 400μg', brand: '臻养', form: '片剂 · 60片', price: 139, rating: 4.9, sales: '9000', tags: ['活性叶酸', '无需转化'] },
        { name: '备孕叶酸复合片', brand: '植元', form: '片剂 · 90片', price: 89, rating: 4.7, sales: '3.6万', tags: ['含B族协同'] }
      ],
      warnings: ['建议备孕前 3 个月开始补充', '剂量遵从医嘱，请勿自行加量'],
      tests: [
        { name: '血清叶酸', note: '评估当前体内叶酸水平' },
        { name: '红细胞叶酸', note: '反映近3个月的平均叶酸储备' }
      ],
      match: { conditions: [], events: ['ttc', 'pregnant', 'breastfeeding'], ageGroups: [], genders: ['female'], base: 0 }
    },
    {
      id: 'dha', name: 'DHA 藻油', en: 'DHA (Algae)', category: '孕育护航',
      why: 'DHA 是大脑与视网膜的关键脂肪酸。孕期与哺乳期通过胎盘和乳汁供给宝宝，备考用脑人群与青少年也推荐适量补充。',
      dose: '200–300mg / 日',
      foods: ['三文鱼', '沙丁鱼', '核桃', '亚麻籽'],
      products: [
        { name: '高纯藻油DHA', brand: '禾拾', form: '胶囊 · 60粒', price: 168, rating: 4.9, sales: '1.2万', tags: ['植物来源', 'IFOS认证'] },
        { name: 'DHA深海鱼油胶囊', brand: 'NATURZA', form: '胶囊 · 90粒', price: 128, rating: 4.8, sales: '4.4万', tags: ['进口', '无腥味'] }
      ],
      warnings: ['孕期优先选择藻油来源', '择期手术者术前请遵医嘱停服鱼油类'],
      tests: [
        { name: 'Omega-3 脂肪酸指数', note: '评估体内EPA/DHA水平（参考性指标）' }
      ],
      match: { conditions: ['eye-strain'], events: ['pregnant', 'breastfeeding', 'ttc', 'exam'], ageGroups: ['u18'], genders: [], base: 0 }
    },
    {
      id: 'protein', name: '优质蛋白粉', en: 'Whey / Plant Protein', category: '骨骼肌肉',
      why: '蛋白质是组织修复、免疫与肌肉合成的原料。术后康复、产后恢复、健身增肌以及中老年肌肉流失（肌少症）人群，往往需要额外补充。',
      dose: '额外 10–30g / 日（按需）',
      foods: ['鸡胸肉', '鸡蛋', '鱼虾', '牛奶', '大豆制品'],
      products: [
        { name: '植物+乳清双蛋白粉', brand: '青栀', form: '粉剂 · 420g', price: 139, rating: 4.8, sales: '6.2万', tags: ['双蛋白', '0蔗糖'] },
        { name: '乳清蛋白粉原味', brand: '康源', form: '粉剂 · 450g', price: 99, rating: 4.7, sales: '9.3万', tags: ['乳源', '易冲泡'] }
      ],
      warnings: ['肾功能异常者请在医生指导下控制摄入量'],
      tests: [
        { name: '血清白蛋白', note: '评估蛋白质营养状态' }
      ],
      match: { conditions: ['fatigue'], events: ['surgery', 'postpartum', 'heavy-exercise', 'dieting'], ageGroups: ['60plus'], genders: [], base: 0 }
    },
    {
      id: 'b-complex', name: '维生素B族', en: 'Vitamin B Complex', category: '精力代谢',
      why: 'B族维生素是能量代谢的关键辅酶。熬夜、加班、备考等高压状态下消耗加剧，易疲劳、口腔溃疡人群常见缺乏。',
      dose: '复合B族 1 片 / 日（随餐）',
      foods: ['全谷物', '瘦肉', '蛋类', '绿叶菜', '奶类'],
      products: [
        { name: 'B族复合维生素片', brand: '植元', form: '片剂 · 60片', price: 69, rating: 4.6, sales: '11万', tags: ['8种B族', '缓释技术'] },
        { name: '高活性B族胶囊', brand: '禾拾', form: '胶囊 · 30粒', price: 119, rating: 4.8, sales: '2.7万', tags: ['甲基化活性形态'] }
      ],
      warnings: ['服用后尿液变黄属正常现象', '晚间避免高剂量，以免影响睡眠'],
      tests: [
        { name: '维生素B12', note: '长期熬夜、素食人群尤其需要关注' }
      ],
      match: { conditions: ['fatigue', 'poor-sleep'], events: ['night-owl', 'exam'], ageGroups: [], genders: [], base: 10 }
    },
    {
      id: 'vitamin-c', name: '维生素C', en: 'Vitamin C', category: '免疫防线',
      why: '经典抗氧化剂，支持免疫细胞功能、促进伤口愈合。术后恢复、节食、吸烟人群对维C的需求量明显上升。',
      dose: '100–200mg / 日（上限 1000mg）',
      foods: ['猕猴桃', '鲜枣', '柑橘', '青椒', '西兰花'],
      products: [
        { name: '维C泡腾片', brand: '康源', form: '泡腾片 · 20片', price: 29, rating: 4.5, sales: '15万', tags: ['酸甜橙味'] },
        { name: '针叶樱桃维C', brand: '青栀', form: '胶囊 · 60粒', price: 89, rating: 4.7, sales: '5.5万', tags: ['天然来源', '缓释'] }
      ],
      warnings: ['长期每日超过 2000mg 可能引起腹泻或肾结石风险'],
      tests: [
        { name: '血浆维生素C', note: '反映近期维C摄入水平' }
      ],
      match: { conditions: ['low-immunity'], events: ['surgery', 'dieting'], ageGroups: [], genders: [], base: 5 }
    },
    {
      id: 'zinc', name: '锌', en: 'Zinc', category: '免疫防线',
      why: '维持免疫应答与伤口愈合所必需。脱发、食欲不振、健身人群以及成年男性对锌的需求量较高。',
      dose: '10–15mg / 日',
      foods: ['生蚝', '红肉', '贝类', '坚果', '南瓜籽'],
      products: [
        { name: '锌镁复合胶囊', brand: '臻养', form: '胶囊 · 90粒', price: 109, rating: 4.8, sales: '3.1万', tags: ['锌镁B6', '男士友好'] },
        { name: '葡萄糖酸锌口服液', brand: '植元', form: '口服液 · 10支', price: 45, rating: 4.6, sales: '8.9万', tags: ['吸收快'] }
      ],
      warnings: ['长期过量补锌会影响铜吸收', '与钙剂、铁剂错开 2 小时服用'],
      tests: [
        { name: '血锌', note: '评估体内锌营养状态' }
      ],
      match: { conditions: ['hair-loss', 'low-immunity'], events: ['surgery'], ageGroups: [], genders: ['male'], base: 0 }
    },
    {
      id: 'magnesium', name: '镁', en: 'Magnesium', category: '安睡舒缓',
      why: '帮助放松神经与肌肉，改善睡眠质量、缓解疲劳。健身抽筋、久坐办公人群普遍摄入不足。',
      dose: '200–300mg / 日',
      foods: ['坚果', '深绿叶菜', '黑巧克力', '香蕉', '燕麦'],
      products: [
        { name: '甘氨酸镁', brand: '禾拾', form: '胶囊 · 60粒', price: 128, rating: 4.9, sales: '1.6万', tags: ['甘氨酸螯合', '不刺激肠胃'] },
        { name: '柠檬酸镁粉剂', brand: '康源', form: '粉剂 · 30条', price: 79, rating: 4.7, sales: '4.2万', tags: ['易吸收'] }
      ],
      warnings: ['肾功能不全者慎用', '可能引起嗜睡，建议睡前补充'],
      tests: [
        { name: '血清镁', note: '评估体内镁水平' }
      ],
      match: { conditions: ['poor-sleep', 'fatigue', 'muscle-cramp'], events: ['heavy-exercise'], ageGroups: [], genders: [], base: 0 }
    },
    {
      id: 'probiotics', name: '益生菌', en: 'Probiotics', category: '肠胃养护',
      why: '调节肠道菌群平衡。肠胃不适、便秘、服用抗生素后以及产后恢复期，是补充益生菌的常见场景。',
      dose: '100–300亿CFU / 日',
      foods: ['酸奶', '发酵乳', '纳豆', '泡菜'],
      products: [
        { name: '300亿双歧益生菌', brand: '青栀', form: '粉剂 · 30条', price: 119, rating: 4.8, sales: '7.4万', tags: ['16株菌', '耐胃酸'] },
        { name: '益生菌固体饮料', brand: '植元', form: '粉剂 · 20条', price: 69, rating: 4.6, sales: '12万', tags: ['性价比'] }
      ],
      warnings: ['免疫力极低或重症患者补充前请咨询医生'],
      match: { conditions: ['gut'], events: ['postpartum', 'surgery'], ageGroups: ['60plus'], genders: [], base: 0 }
    },
    {
      id: 'vitamin-d', name: '维生素D3', en: 'Vitamin D3', category: '免疫防线',
      why: '促进钙吸收、支持骨骼与免疫。现代人日照普遍不足，维生素D是覆盖面最广的基础补充项。',
      dose: '400–800IU / 日',
      foods: ['海鱼', '蛋黄', '蘑菇', '强化牛奶'],
      products: [
        { name: '维生素D3滴剂', brand: '康源', form: '滴剂 · 30ml', price: 69, rating: 4.7, sales: '6.6万', tags: ['易滴服'] },
        { name: '维D3 2000IU', brand: '禾拾', form: '胶囊 · 60粒', price: 99, rating: 4.8, sales: '2.9万', tags: ['高纯度'] }
      ],
      warnings: ['可与钙剂同服', '建议先检测血清水平再确定剂量'],
      tests: [
        { name: '25-羟维生素D', note: '判断维D水平，指导补充剂量' }
      ],
      match: { conditions: [], events: [], ageGroups: ['u18', '45-60', '60plus'], genders: [], base: 15 }
    },
    {
      id: 'lutein', name: '叶黄素', en: 'Lutein', category: '用眼呵护',
      why: '保护视网膜黄斑区、过滤有害蓝光，缓解用眼疲劳。长时间面对屏幕的上班族与中老年人群推荐。',
      dose: '6–10mg / 日',
      foods: ['菠菜', '羽衣甘蓝', '玉米', '蛋黄', '南瓜'],
      products: [
        { name: '叶黄素酯软糖', brand: '植元', form: '软糖 · 60粒', price: 79, rating: 4.6, sales: '9.8万', tags: ['蓝莓风味'] },
        { name: '叶黄素+玉米黄质', brand: '臻养', form: '胶囊 · 60粒', price: 129, rating: 4.8, sales: '2.1万', tags: ['10:2 配比'] }
      ],
      warnings: ['长期过量摄入可能使皮肤轻微泛黄，停药后可恢复'],
      match: { conditions: ['eye-strain'], events: ['night-owl'], ageGroups: ['45-60', '60plus'], genders: [], base: 0 }
    },
    {
      id: 'collagen', name: '胶原蛋白肽', en: 'Collagen Peptide', category: '容颜养护',
      why: '皮肤弹性与关节软骨的营养基质。产后、术后及皮肤松弛、干燥人群常希望通过补充胶原蛋白肽改善状态。',
      dose: '2.5–5g / 日',
      foods: ['鱼皮', '猪蹄', '银耳', '鸡爪', '骨汤'],
      products: [
        { name: '深海鱼胶原蛋白肽', brand: '青栀', form: '粉剂 · 300g', price: 169, rating: 4.8, sales: '5.2万', tags: ['小分子肽', '0添加'] },
        { name: '胶原蛋白肽饮', brand: '臻养', form: '饮品 · 30支', price: 259, rating: 4.7, sales: '1.9万', tags: ['便携装'] }
      ],
      warnings: ['效果因人而异，不替代均衡蛋白质摄入'],
      match: { conditions: ['skin'], events: ['postpartum', 'surgery'], ageGroups: ['45-60', '60plus'], genders: ['female'], base: 0 }
    },
    {
      id: 'glucosamine', name: '氨糖软骨素', en: 'Glucosamine & Chondroitin', category: '骨骼肌肉',
      why: '关节软骨修复的原料。关节不适、运动磨损与中老年退行性关节变化人群是主要需求群体。',
      dose: '氨糖 750–1500mg / 日',
      foods: ['甲壳类提取物', '软骨', '牛筋'],
      products: [
        { name: '氨糖软骨素钙片', brand: '康源', form: '片剂 · 90片', price: 99, rating: 4.6, sales: '8.1万', tags: ['氨糖+软骨素+钙'] },
        { name: '高含量氨糖胶囊', brand: '植元', form: '胶囊 · 120粒', price: 119, rating: 4.7, sales: '3.4万', tags: ['1500mg'] }
      ],
      warnings: ['海鲜过敏者注意成分来源', '糖尿病患者注意糖分与添加成分'],
      match: { conditions: ['joint'], events: ['heavy-exercise'], ageGroups: ['45-60', '60plus'], genders: [], base: 0 }
    },
    {
      id: 'vitamin-k2', name: '维生素K2', en: 'Vitamin K2 (MK-7)', category: '骨骼肌肉',
      why: '引导钙沉积到骨骼而非血管壁，与钙、维D3形成黄金组合。中老年骨健康的进阶选择。',
      dose: '45–90μg / 日',
      foods: ['纳豆', '发酵奶酪', '蛋黄', '鸡肝'],
      products: [
        { name: 'MK-7 维生素K2', brand: '臻养', form: '胶囊 · 60粒', price: 149, rating: 4.8, sales: '1.1万', tags: ['纳豆菌发酵'] },
        { name: '钙D3K2复合片', brand: '禾拾', form: '片剂 · 90片', price: 159, rating: 4.9, sales: '8000', tags: ['一站式'] }
      ],
      warnings: ['正在服用抗凝血药（如华法林）者禁用'],
      match: { conditions: ['joint'], events: [], ageGroups: ['45-60', '60plus'], genders: [], base: 0 }
    },
    {
      id: 'biotin', name: '生物素(维生素H)', en: 'Biotin', category: '容颜养护',
      why: '参与角蛋白合成，帮助改善发质与指甲强度。脱发、发质干枯、指甲脆裂人群的关注点。',
      dose: '30–100μg / 日（通常复合补充）',
      foods: ['蛋黄', '坚果', '大豆', '全谷物', '香蕉'],
      products: [
        { name: '生物素+锌复合片', brand: '植元', form: '片剂 · 60片', price: 75, rating: 4.5, sales: '6.3万', tags: ['发肤甲'] },
        { name: '高含量生物素软糖', brand: '青栀', form: '软糖 · 60粒', price: 89, rating: 4.6, sales: '4.8万', tags: ['莓果味'] }
      ],
      warnings: ['水溶性维生素，超量部分随尿排出，安全性较高'],
      match: { conditions: ['hair-loss'], events: [], ageGroups: [], genders: [], base: 0 }
    },
    {
      id: 'coq10', name: '辅酶Q10', en: 'Coenzyme Q10', category: '精力代谢',
      why: '心肌与细胞线粒体能量代谢的关键辅酶。易疲劳、中老年人群以及备孕（卵子质量）阶段关注较多。',
      dose: '100–200mg / 日',
      foods: ['沙丁鱼', '牛肉', '西兰花', '花生', '大豆油'],
      products: [
        { name: '还原型辅酶Q10', brand: '禾拾', form: '胶囊 · 60粒', price: 199, rating: 4.9, sales: '1.4万', tags: ['还原型更易吸收'] },
        { name: '辅酶Q10软胶囊', brand: 'NATURZA', form: '胶囊 · 90粒', price: 139, rating: 4.7, sales: '5.7万', tags: ['高性价比'] }
      ],
      warnings: ['服用抗凝血药者请咨询医生', '建议餐后服用，吸收更好'],
      match: { conditions: ['fatigue'], events: ['ttc'], ageGroups: ['45-60', '60plus'], genders: [], base: 0 }
    },
    {
      id: 'fiber', name: '膳食纤维', en: 'Dietary Fiber', category: '肠胃养护',
      why: '促进肠道蠕动、增加饱腹感。便秘、久坐以及节食减肥人群是主要需求群体。',
      dose: '10–25g / 日（额外补充）',
      foods: ['燕麦', '糙米', '奇亚籽', '西梅', '苹果'],
      products: [
        { name: '菊粉膳食纤维', brand: '植元', form: '粉剂 · 30条', price: 59, rating: 4.5, sales: '10万', tags: ['水溶性'] },
        { name: '奇亚籽纤维粉', brand: '青栀', form: '粉剂 · 300g', price: 69, rating: 4.6, sales: '3.9万', tags: ['低碳水'] }
      ],
      warnings: ['建议逐步加量并多喝水，避免胀气'],
      match: { conditions: ['gut'], events: ['dieting'], ageGroups: [], genders: [], base: 0 }
    }
  ],

  /* ---------- 今日贴士 ---------- */
  tips: [
    { title: '补钙有搭档', body: '钙 + 维D3 + 维K2 是骨骼「黄金三角」，光补钙不补D，吸收率会大打折扣。' },
    { title: '铁剂别配茶', body: '茶与咖啡中的鞣酸会抑制铁吸收，补铁前后 1 小时尽量只喝白水或橙汁。' },
    { title: 'B族随餐吃', body: 'B族维生素是水溶性的，随餐服用吸收更好，多余部分会随尿液排出。' },
    { title: '叶酸提前补', body: '叶酸需要提前 3 个月开始补充，而不是等确认怀孕再开始。' },
    { title: '蛋白要均匀', body: '把蛋白质均匀分配到三餐，比一顿猛吃更利于肌肉合成与吸收。' },
    { title: '镁助眠黄金期', body: '镁能放松神经与肌肉，睡前 1 小时补充有助于缩短入睡时间。' },
    { title: '益生菌怕热', body: '冲调益生菌水温不要超过 40℃，否则活性菌会大量失活。' },
    { title: '维C怕加热', body: '蔬菜中的维C怕高温久煮，快炒或生食能保留更多营养素。' }
  ],

  /* ---------- 可录入的检测指标池（「我有报告」入口） ----------
     abnormal.low/high: { boost:[{id,weight}], text } —— 异常时对营养素的加权与诊断文案
     参考区间为通用近似值，实际以检验报告为准 */
  testsPool: [
    { key: 'vitD', name: '25-羟维生素D', ref: '参考 30–100 nmol/L',
      abnormal: {
        low: { boost: [{ id: 'vitamin-d', weight: 30 }, { id: 'calcium-d3', weight: 20 }], text: '维D偏低可能影响钙的吸收与骨骼健康，建议补充维D并在 3 个月后复查' },
        high: { boost: [{ id: 'vitamin-d', weight: -15 }], text: '维D偏高通常与过量补充有关，建议咨询医生调整剂量' }
      } },
    { key: 'ferritin', name: '血清铁蛋白', ref: '参考 15–150 ng/mL',
      abnormal: { low: { boost: [{ id: 'iron-vc', weight: 30 }], text: '铁蛋白偏低提示铁储备不足，可能与缺铁性贫血相关，建议补充铁+维C 并遵医嘱复查' } } },
    { key: 'hb', name: '血红蛋白', ref: '参考 110–150 g/L（女）',
      abnormal: { low: { boost: [{ id: 'iron-vc', weight: 30 }], text: '血红蛋白偏低提示贫血可能，请先就医明确类型再按医嘱补铁' } } },
    { key: 'calcium', name: '血钙', ref: '参考 2.1–2.6 mmol/L',
      abnormal: { low: { boost: [{ id: 'calcium-d3', weight: 20 }], text: '血钙偏低建议补钙，同时配合维D 与维K2 提升吸收利用' } } },
    { key: 'folate', name: '血清叶酸', ref: '参考 ≥13.5 nmol/L',
      abnormal: { low: { boost: [{ id: 'folic-acid', weight: 30 }], text: '叶酸偏低会影响造血与孕早期胎儿发育，备孕及孕期务必纠正' } } },
    { key: 'rbcFolate', name: '红细胞叶酸', ref: '参考 >340 nmol/L',
      abnormal: { low: { boost: [{ id: 'folic-acid', weight: 30 }], text: '红细胞叶酸偏低反映近 3 个月叶酸储备不足，建议补充叶酸' } } },
    { key: 'albumin', name: '血清白蛋白', ref: '参考 40–55 g/L',
      abnormal: { low: { boost: [{ id: 'protein', weight: 30 }], text: '白蛋白偏低提示蛋白质营养不足，建议增加优质蛋白摄入' } } },
    { key: 'b12', name: '维生素B12', ref: '参考 150–700 pmol/L',
      abnormal: { low: { boost: [{ id: 'b-complex', weight: 30 }], text: 'B12 偏低在素食者、长期熬夜人群中常见，可能引起疲劳与神经症状' } } },
    { key: 'vc', name: '血浆维生素C', ref: '参考 23–85 μmol/L',
      abnormal: { low: { boost: [{ id: 'vitamin-c', weight: 30 }], text: '维C 偏低会影响胶原合成与免疫力，术后恢复期尤其需要注意' } } },
    { key: 'zinc', name: '血锌', ref: '参考 10.7–17.9 μmol/L',
      abnormal: { low: { boost: [{ id: 'zinc', weight: 30 }], text: '锌偏低会影响伤口愈合、发质与免疫力，建议补充锌剂' } } },
    { key: 'magnesium', name: '血清镁', ref: '参考 0.75–1.00 mmol/L',
      abnormal: { low: { boost: [{ id: 'magnesium', weight: 30 }], text: '镁偏低与抽筋、睡眠差、疲劳有关，建议补充镁' } } },
    { key: 'omega3', name: 'Omega-3 脂肪酸指数', ref: '参考 ≥8%',
      abnormal: { low: { boost: [{ id: 'dha', weight: 20 }], text: 'Omega-3 指数偏低与日常鱼类摄入不足有关，孕期及用脑人群建议补充' } } }
  ],

  /* ---------- 菜谱库（与营养素按 nutrientIds 联动） ----------
     meal: 适合餐次；steps 为简单做法要点 */
  recipes: [
    { id: 'r01', name: '虾皮豆腐煲', nutrientIds: ['calcium-d3'], meal: '晚餐', intro: '豆腐与虾皮都是钙的优质来源，配合维D 吸收更好。', ingredients: ['嫩豆腐 1 盒', '虾皮 10g', '小葱 2 根', '高汤 适量'], steps: ['豆腐切块，沸水焯 1 分钟去豆腥', '热锅下虾皮炒香，倒入高汤煮开', '放入豆腐小火焖 5 分钟，撒葱花即可'] },
    { id: 'r02', name: '黑芝麻糊', nutrientIds: ['calcium-d3', 'biotin'], meal: '加餐', intro: '黑芝麻的钙含量在坚果中名列前茅，加餐暖胃又补钙。', ingredients: ['熟黑芝麻 60g', '糯米 30g', '冰糖 适量'], steps: ['糯米提前浸泡 2 小时', '黑芝麻与糯米放入破壁机，加水打成糊', '倒入锅中煮至浓稠，加冰糖调味'] },
    { id: 'r03', name: '猪肝菠菜粥', nutrientIds: ['iron-vc'], meal: '早餐', intro: '猪肝富血红素铁，菠菜补叶酸，经典补血粥。', ingredients: ['猪肝 80g', '菠菜 1 把', '大米 80g', '姜丝 少许'], steps: ['猪肝切片用清水浸泡去血水，加姜丝焯水', '大米熬至开花，放入猪肝煮 3 分钟', '下菠菜烫熟，加盐调味'] },
    { id: 'r04', name: '彩椒牛肉丝', nutrientIds: ['iron-vc', 'zinc'], meal: '午餐', intro: '牛肉补铁锌，彩椒富含维C，维C 促进铁吸收。', ingredients: ['牛里脊 150g', '红黄彩椒 各半个', '蒜片 少许', '生抽/淀粉 适量'], steps: ['牛肉切丝，加生抽、淀粉抓匀腌 10 分钟', '热油快炒牛肉至变色盛出', '下彩椒丝炒断生，回锅牛肉翻炒调味'] },
    { id: 'r05', name: '芦笋炒蛋', nutrientIds: ['folic-acid'], meal: '午餐', intro: '芦笋叶酸含量高，配鸡蛋蛋白优质，快手又均衡。', ingredients: ['芦笋 1 把', '鸡蛋 3 个', '盐 少许'], steps: ['芦笋斜切段，焯水 1 分钟', '鸡蛋打散炒至半熟盛出', '下芦笋翻炒，回蛋加盐炒匀'] },
    { id: 'r06', name: '清蒸鲈鱼', nutrientIds: ['dha', 'protein'], meal: '晚餐', intro: '鲈鱼富含 DHA 与优质蛋白，清蒸保留最多营养。', ingredients: ['鲈鱼 1 条', '姜丝 葱段 适量', '蒸鱼豉油 1 勺'], steps: ['鲈鱼两面划刀，铺姜丝腌 10 分钟', '水开后大火蒸 8 分钟，倒掉盘内汤汁', '铺葱丝淋豉油，浇一勺热油'] },
    { id: 'r07', name: '三文鱼牛油果沙拉', nutrientIds: ['dha', 'coq10'], meal: '午餐', intro: '三文鱼与牛油果都是优质脂肪来源，DHA 直接拉满。', ingredients: ['三文鱼 100g', '牛油果 半个', '生菜/小番茄 适量', '橄榄油/柠檬汁 少许'], steps: ['三文鱼煎至两面金黄，切块', '牛油果切片，蔬菜洗净', '全部装盘，淋橄榄油柠檬汁'] },
    { id: 'r08', name: '鸡胸肉藜麦碗', nutrientIds: ['protein', 'b-complex'], meal: '午餐', intro: '藜麦是"全蛋白"谷物，配鸡胸肉饱腹又高蛋白。', ingredients: ['鸡胸肉 120g', '三色藜麦 60g', '西兰花 几朵', '黑胡椒/橄榄油 适量'], steps: ['藜麦煮熟，西兰花焯水', '鸡胸肉煎熟切条，撒黑胡椒', '藜麦打底，摆上鸡肉与西兰花'] },
    { id: 'r09', name: '豆腐鸡蛋羹', nutrientIds: ['protein', 'calcium-d3'], meal: '早餐', intro: '豆腐与鸡蛋的蛋白互补，嫩滑易消化，老人小孩都适合。', ingredients: ['嫩豆腐 1 盒', '鸡蛋 2 个', '葱花 少许', '蒸鱼豉油 半勺'], steps: ['豆腐切块铺碗底', '蛋液加 1.5 倍温水打匀，过滤后倒入', '盖保鲜膜蒸 12 分钟，淋豉油撒葱花'] },
    { id: 'r10', name: '五谷杂粮饭', nutrientIds: ['b-complex', 'fiber'], meal: '晚餐', intro: '糙米、燕麦、黑米等富含 B 族与膳食纤维，替代白米饭更抗饿。', ingredients: ['糙米/燕麦/黑米/小米 各 20g', '红豆 20g'], steps: ['杂粮提前浸泡 4 小时', '按 1:1.3 加水电饭煲煮熟', '可一次多做，分装冷冻保存'] },
    { id: 'r11', name: '猕猴桃酸奶杯', nutrientIds: ['vitamin-c', 'probiotics'], meal: '加餐', intro: '猕猴桃维C 含量是橙子的 2 倍，配酸奶补充益生菌。', ingredients: ['猕猴桃 1 个', '无糖酸奶 150g', '燕麦脆 适量'], steps: ['猕猴桃去皮切丁', '酸奶打底，铺猕猴桃与燕麦脆', '现做现吃，避免水果出水'] },
    { id: 'r12', name: '凉拌西兰花', nutrientIds: ['vitamin-c', 'lutein'], meal: '午餐', intro: '西兰花是维C 与叶黄素双料冠军，凉拌保留营养。', ingredients: ['西兰花 1 颗', '蒜末 少许', '生抽/香醋/香油 各少许'], steps: ['西兰花掰小朵，焯水 1 分钟过凉', '加蒜末与料汁拌匀', '冷藏 10 分钟口感更脆'] },
    { id: 'r13', name: '生蚝煎蛋', nutrientIds: ['zinc'], meal: '晚餐', intro: '生蚝是"锌之王"，配蛋煎制去腥又增香。', ingredients: ['生蚝 6 只', '鸡蛋 3 个', '葱花/盐 适量'], steps: ['生蚝取肉焯水 10 秒沥干', '蛋液加盐打散，拌入生蚝', '热油倒入小火煎至两面金黄'] },
    { id: 'r14', name: '南瓜籽酸奶杯', nutrientIds: ['zinc', 'magnesium'], meal: '加餐', intro: '南瓜籽是锌镁双料选手，工作间隙的健康零食。', ingredients: ['无糖酸奶 150g', '南瓜籽仁 20g', '蜂蜜 少许'], steps: ['酸奶倒入杯中', '撒南瓜籽仁，淋一点蜂蜜', '冷藏后口感更佳'] },
    { id: 'r15', name: '香蕉牛奶燕麦粥', nutrientIds: ['magnesium', 'b-complex'], meal: '早餐', intro: '香蕉与燕麦补镁，帮助放松神经，也适合睡前垫胃。', ingredients: ['燕麦 40g', '牛奶 200ml', '香蕉 1 根', '坚果碎 少许'], steps: ['燕麦加牛奶小火煮 5 分钟', '香蕉切片拌入', '撒坚果碎即可'] },
    { id: 'r16', name: '纳豆拌饭', nutrientIds: ['vitamin-k2', 'probiotics'], meal: '早餐', intro: '纳豆富含维K2 与益生菌，是骨骼与肠道的"双保险"。', ingredients: ['纳豆 1 盒', '米饭 1 碗', '生蛋黄 1 个', '葱花/酱油 适量'], steps: ['纳豆加酱油充分搅拌出丝', '热米饭装碗，放纳豆与生蛋黄', '撒葱花拌匀开吃'] },
    { id: 'r17', name: '香菇鸡汤', nutrientIds: ['vitamin-d', 'protein'], meal: '晚餐', intro: '干香菇日晒后富含维D2，配鸡肉营养互补。', ingredients: ['干香菇 6 朵', '鸡腿 2 个', '姜片 3 片', '枸杞 少许'], steps: ['干香菇温水泡发，鸡腿焯水', '全部材料入锅，加足量水', '小火炖 40 分钟，加盐调味'] },
    { id: 'r18', name: '银耳莲子羹', nutrientIds: ['collagen', 'fiber'], meal: '加餐', intro: '银耳富含可溶性膳食纤维，胶质口感温润养颜。', ingredients: ['银耳 半朵', '莲子 15g', '红枣 4 颗', '冰糖 适量'], steps: ['银耳泡发撕小朵，与莲子同煮', '大火煮开后转小火 40 分钟', '加红枣冰糖再煮 10 分钟'] },
    { id: 'r19', name: '红烧猪蹄', nutrientIds: ['collagen'], meal: '午餐', intro: '猪蹄胶原蛋白丰富，术后恢复与养肤人群的经典菜。', ingredients: ['猪蹄 500g', '冰糖 20g', '葱姜/八角/生抽 适量'], steps: ['猪蹄焯水去浮沫', '冰糖炒糖色，下猪蹄翻炒上色', '加调料与热水，小火炖 1.5 小时'] },
    { id: 'r20', name: '骨汤豆腐锅', nutrientIds: ['glucosamine', 'calcium-d3'], meal: '晚餐', intro: '棒骨与软骨慢炖，释放葡萄糖胺与钙质，汤浓味鲜。', ingredients: ['猪棒骨 500g', '嫩豆腐 1 盒', '白萝卜 半根', '姜片 适量'], steps: ['棒骨焯水，加姜片炖 1 小时', '白萝卜切块入汤煮 20 分钟', '下豆腐再煮 5 分钟，加盐调味'] },
    { id: 'r21', name: '蛋黄燕麦杯', nutrientIds: ['biotin', 'b-complex'], meal: '早餐', intro: '蛋黄是生物素最丰富的食物来源，配燕麦更扛饿。', ingredients: ['鸡蛋 2 个', '燕麦片 40g', '牛奶 150ml'], steps: ['燕麦加牛奶小火煮软', '水煮蛋剥出蛋黄压碎', '蛋黄拌入燕麦粥即可'] },
    { id: 'r22', name: '香煎秋刀鱼', nutrientIds: ['coq10', 'dha'], meal: '晚餐', intro: '秋刀鱼是辅酶 Q10 与 DHA 的双料来源，煎烤最香。', ingredients: ['秋刀鱼 2 条', '柠檬 半个', '盐/黑胡椒 适量'], steps: ['秋刀鱼去内脏洗净擦干', '撒盐黑胡椒腌 10 分钟', '少油煎至两面金黄，挤柠檬汁'] },
    { id: 'r23', name: '燕麦南瓜粥', nutrientIds: ['fiber', 'magnesium'], meal: '早餐', intro: '南瓜与燕麦的膳食纤维强强联合，饱腹又稳血糖。', ingredients: ['南瓜 150g', '燕麦片 40g', '牛奶 适量'], steps: ['南瓜去皮切块蒸熟压泥', '燕麦加水煮开，拌入南瓜泥', '加牛奶调至顺滑'] },
    { id: 'r24', name: '凉拌木耳', nutrientIds: ['fiber', 'iron-vc'], meal: '午餐', intro: '木耳膳食纤维丰富，还含铁，低脂开胃小菜。', ingredients: ['干木耳 20g', '蒜末/小米辣 少许', '生抽/香醋/香油 适量'], steps: ['木耳冷水泡发，焯水 2 分钟过凉', '加蒜末小米辣与料汁拌匀', '腌制 10 分钟更入味'] }
  ],

  /* ---------- 工具方法 ---------- */
  labelOf(listKey, key) {
    if (!key) return '';
    const arr = this[listKey] || [];
    const it = arr.find(x => x.key === key);
    return it ? it.label : key;
  },
  nutrientById(id) {
    return this.nutrients.find(n => n.id === id);
  }
};
