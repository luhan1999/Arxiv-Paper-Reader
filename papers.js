/* ============================================================
   Arxiv Paper Reader — 数据清单
   加新报告：在 PAPERS 数组里加一条记录即可，首页自动归类/可搜/可筛。
   字段说明：
     title    报告标题
     category 分类 id（对应 CATEGORIES：tech / survey / daily）
     date     "YYYY-MM" 用于倒序排序与显示
     source   来源徽标（arXiv:xxxx / Hugging Face PDF / 自制综述…）
     authors  作者/机构
     path     相对链接（指向该报告目录或 html 文件）
     summary  摘要（支持简单 <b> 等标签）
     tags     标签数组，第一个会高亮为主标签。
              【打标原则】只保留“本文新提出的算法侧贡献”：
                · 去掉本文沿用/未改动的既有方法（如某模型沿用 MoE、MLA 就不标）
                · 去掉系统/硬件/工程侧（Kernel、Triton、FP8、DualPipe、Async RL、KV Cache…）
                · 去掉泛化概念词（长上下文、Speculative Decoding 等非本文新意的通用项）
                · 近义标签合并，控制在 1–3 个，求精不求全
                · Survey 类例外：标主题轴（如 MoE / Scaling Law / 综述）
   ============================================================ */
window.SITE = {
  title: "Arxiv Paper Reader",
  tagline: "学术论文中文深度解读合集 · LaTeX 风格 HTML 报告",
  repo: "https://github.com/luhan1999/Arxiv-Paper-Reader",

  CATEGORIES: [
    { id: "tech",   icon: "📄", label: "技术报告",        desc: "单个模型 / 方法的官方报告深读",        defaultOpen: true  },
    { id: "survey", icon: "📚", label: "专题研究 Survey", desc: "跨多篇论文的主题综述与横向对比",        defaultOpen: false },
    { id: "daily",  icon: "🗓", label: "Daily Paper",     desc: "每日单篇速读，轻量笔记",              defaultOpen: false },
  ],

  PAPERS: [
    /* ---------------- 技术报告 ---------------- */
    {
      title: "DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence",
      category: "tech", date: "2026-05", source: "Hugging Face PDF", authors: "DeepSeek-AI",
      path: "DeepSeek-V4-Towards-Highly-Efficient-Million-Token-Context-Intelligence/index.html",
      summary: "把百万 token 上下文从“窗口长度指标”推进到模型、训练、推理与 agent 服务的联合设计。引入 <b>CSA/HCA 混合注意力</b>（压缩 KV + lightning indexer top-k 稀疏检索）、<b>mHC</b> 多通道残差流、大部分权重改用 <b>Muon</b>；系统侧含异构 KV cache、on-disk 前缀复用、TileLang kernel 与百万 token RL rollout。",
      tags: ["CSA/HCA", "mHC", "Muon"],
    },
    {
      title: "GLM-5: from Vibe Coding to Agentic Engineering",
      category: "tech", date: "2026-02", source: "arXiv:2602.15763", authors: "GLM-5 Team · Zhipu AI & Tsinghua",
      path: "GLM-5-Technical-Report/index.html",
      summary: "<b>744B 总参 / 40B 激活</b> 的 MoE 旗舰。四件套：<b>MLA + Muon Split + MLA-256</b>、<b>共享参数 3 层 MTP</b>（acceptance 2.76）、<b>DSA 持续预训练</b>（20B token 无损切 sparse attention）、全异步 RL（slime）+ <b>TITO Gateway</b>。SWE-Bench Verified 77.8。",
      tags: ["MLA + Muon Split", "Shared MTP"],
    },
    {
      title: "MiMo-V2-Flash Technical Report",
      category: "tech", date: "2026-01", source: "arXiv:2601.02780", authors: "LLM-Core Xiaomi",
      path: "MiMo-V2-Flash-Technical-Report/index.html",
      summary: "309B 总参 / 15B 激活的 MoE。三大支柱：<b>5:1 Hybrid Sliding Window Attention</b>（窗口 128 + 学习型 sink，KV 降至约 1/6）、轻量 <b>MTP</b>（3 层实测 2.6× 解码加速）、<b>MOPD 多教师 On-Policy 蒸馏</b>。SWE-Bench Multilingual 71.7 开源第一。",
      tags: ["MOPD", "Hybrid SWA"],
    },
    {
      title: "DeepSeek-V3.2: Pushing the Frontier of Open Large Language Models",
      category: "tech", date: "2025-12", source: "arXiv:2512.02556", authors: "DeepSeek-AI",
      path: "DeepSeek-V3.2-Pushing-the-Frontier-of-Open-LLMs/index.html",
      summary: "在 V3.1-Terminus 上引入 <b>DeepSeek Sparse Attention (DSA)</b>，把核心注意力从 $O(L^2)$ 降到 $O(Lk)$；RL 后训练 compute 推到预训练的 10%+；构建 1,827 个合成 agent 环境。high-compute 变体 <b>Speciale</b> 在 IMO/IOI/CMO/ICPC WF 2025 全部夺金。",
      tags: ["DSA"],
    },
    {
      title: "DeepSeek-V3 Technical Report",
      category: "tech", date: "2024-12", source: "arXiv:2412.19437", authors: "DeepSeek-AI",
      path: "DeepSeek-V3-Technical-Report/index.html",
      summary: "671B 总参 / 37B 激活的 MoE 旗舰。<b>MLA</b> 注意力 + <b>DeepSeekMoE</b>（1 共享 + 256 路由，top-8，前 3 层 dense）；<b>无辅助损失负载均衡</b>、<b>MTP</b> 训练目标、<b>FP8</b> 训练与 <b>DualPipe</b> 通信重叠。",
      tags: ["Aux-Loss-Free LB", "MTP"],
    },
    {
      title: "Native Sparse Attention: Hardware-Aligned and Natively Trainable Sparse Attention",
      category: "tech", date: "2025-02", source: "arXiv:2502.11089", authors: "DeepSeek-AI · PKU · UW",
      path: "Native-Sparse-Attention/index.html",
      summary: "<b>原生可训练</b>的稀疏注意力——sparsity 从预训练第一步就参与梯度。三分支：<b>Token Compression</b>（MLP 压缩 KV block）、<b>Token Selection</b>（复用 cmp softmax 分数挑 top-n，零额外打分）、<b>Sliding Window</b>。GQA-grouped Triton kernel；64K 序列 9.0× 前向 / 11.6× 解码加速。",
      tags: ["Native Sparse Attention"],
    },

    /* ---------------- 专题研究 Survey（示例：真实存在于 moe_ratio_survey/） ---------------- */
    {
      title: "LLM MoE 的“比例”设计：Dense / 共享专家 / 激活参数占比 —— 文献综述",
      category: "survey", date: "2026-06", source: "自制 Survey · 16 篇", authors: "整合 16 篇论文 / 技术报告",
      path: "surveys/moe-ratio-overview/index.html",
      summary: "把 MoE 的“比例”拆成四个互不相同的维度：<b>共享:路由</b>、<b>粒度 G</b>、<b>激活/总稀疏度 S</b>、<b>Dense 层占比</b>。梳理 6 篇真正做了受控消融的 scaling-law 论文及其实验设计，并给出合理实验模板。",
      tags: ["MoE", "Scaling Law", "综述"],
    },
    {
      title: "共享专家 : 路由专家比例 —— 专题深度综述",
      category: "survey", date: "2026-06", source: "自制 Survey · 40 模型", authors: "聚焦维度 A · 10 篇核心论文",
      path: "surveys/shared-expert-ratio/index.html",
      summary: "聚焦“几个共享专家最优”。四阶段演进：<b>起源(DeepSpeed 2022) → 标准化(DeepSeekMoE 2024) → Scaling Law 精确化(腾讯/蚂蚁 2025，U 形、1–2 个) → 最新质疑(Meta 2026)</b>。含 41 个前沿模型配置全表（按发布倒序）。",
      tags: ["Shared Expert", "MoE", "综述"],
    },
    {
      title: "大模型预训练指标深问：该看什么 · loss 更低更好吗 · grokking 更早更好吗",
      category: "survey", date: "2026-06", source: "自制 Survey · 40+ 篇 · 对抗核验", authors: "25 检索 agent + 20 条论断对抗式核验",
      path: "surveys/pretraining-metrics-qa/index.html",
      summary: "围绕预训练指标的四个尖锐问题逐一深答：<b>(1) 除 loss 外该实时监控哪些指标</b>（梯度/attention-logit 范数、GNS、z-loss、MaxVio、MFU）；<b>(2) loss 更低一定更好吗</b>——给出同配方成立条件与 tokenizer/污染/捷径/分布失配下的解耦反例；<b>(3) grokking 更早 = 更好吗</b>——论证延迟时长是可调旋钮而非质量信号、并区分 timing 与 occurrence；<b>(4) 可即时查看的诊断/预测方法</b>。每个反直觉结论都附对抗核验后的条件限定。",
      tags: ["训练指标", "Scaling Law", "综述"],
    },

    /* ---------------- Daily Paper ---------------- */
    {
      title: "Slicing and Dicing：配置最优的专家混合 (MoE)",
      category: "daily", date: "2026-06", source: "arXiv:2605.11689", authors: "Slicing and Dicing 作者团队",
      path: "Slicing-and-Dicing-Optimal-MoE/index.html",
      summary: "首个系统性、大规模解耦的 MoE 设计空间研究（<b>2000+ 预训练实验</b>）。把专家粒度、激活比例、共享专家、路由等维度逐一切开做受控消融，给出在固定算力下配置最优 MoE 的经验法则与 scaling 趋势。",
      tags: ["MoE", "Scaling Law"],
    },
  ],
};
