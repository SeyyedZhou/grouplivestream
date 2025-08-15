

 window.addEventListener('scroll', () => {
    const container = document.getElementById('interactiveSection');
    const floating = document.getElementById('floatingContainer');
    const triggerPoint = window.innerHeight * 0.75; // 视口75%高度触发显示
    const containerTop = container.getBoundingClientRect().top;
    const containerBottom = container.getBoundingClientRect().bottom;

    // 当容器进入视口范围，显示；否则隐藏
    if (containerTop < triggerPoint && containerBottom > 0) {
      floating.classList.add('visible');
    } else {
      floating.classList.remove('visible');
    }
  });
  



   var animation = lottie.loadAnimation({
    container: document.getElementById('lottieContainer'), // 放动画的容器
    renderer: 'svg',      // 推荐svg，清晰且灵活
    loop: true,          // 是否循环
    autoplay: true,      // 是否自动播放
    path: 'lottie/1.json'  // JSON文件路径，根据你的实际位置改
  });


     var animation = lottie.loadAnimation({
    container: document.getElementById('lottieContainer1'), // 放动画的容器
    renderer: 'svg',      // 推荐svg，清晰且灵活
    loop: true,          // 是否循环
    autoplay: true,      // 是否自动播放
    path: 'lottie/2.json'  // JSON文件路径，根据你的实际位置改
  });

       var animation = lottie.loadAnimation({
    container: document.getElementById('lottieContainer2'), // 放动画的容器
    renderer: 'svg',      // 推荐svg，清晰且灵活
    loop: true,          // 是否循环
    autoplay: true,      // 是否自动播放
    path: 'lottie/3.json'  // JSON文件路径，根据你的实际位置改
  });











  /*
  修复说明（简要）：
  - 用 track（内层）做 translateY，外层 col overflow:hidden；
  - 复制原始项目 (clone) -> track 上原始数量至少 6 个，复制后就是 12 个，实现无缝；
  - 使用时间增量（dt）计算位移，避免帧率相关的问题；
  - 使用 ResizeObserver 在尺寸变化时重新计算循环长度；
  - 支持 pointerenter / pointerleave 暂停（每列单独生效）。
*/

(function initMarquee3D() {
  const demo = document.querySelector('.marquee3d-demo#marquee3d-demo-1');
  if (!demo) return;

  // 收集列（只在此 demo 内）
  const cols = Array.from(demo.querySelectorAll('.marquee3d-col')).map(col => {
    const track = col.querySelector('.marquee3d-track');
    return {
      col,
      track,
      speed: Number(col.dataset.speed) || 36, // px / s，越大越快
      reverse: col.dataset.reverse === 'true',
      paused: false,
      offset: 0,
      halfHeight: 0
    };
  });

  // 复制每个 track 的子节点（一次），形成两份内容
  cols.forEach(c => {
    const items = Array.from(c.track.children);
    items.forEach(node => c.track.appendChild(node.cloneNode(true)));
  });

  // 计算并设置 halfHeight（track.scrollHeight / 2）
  function recalcHeights() {
    cols.forEach(c => {
      // 使用 Math.max 防止 0
      c.halfHeight = Math.max(1, c.track.scrollHeight / 2);
      // 保证 offset 在 [0, halfHeight)
      c.offset = ((c.offset % c.halfHeight) + c.halfHeight) % c.halfHeight;
      // 立刻应用一次 transform（避免空白帧）
      c.track.style.transform = `translateY(${-c.offset}px)`;
    });
  }

  // 使用 ResizeObserver 监听 track 尺寸变化（字体加载 / 窗口变化）
  const ro = new ResizeObserver(() => recalcHeights());
  cols.forEach(c => ro.observe(c.track));
  window.addEventListener('resize', recalcHeights, { passive: true });

  // 暂停功能：pointerenter / pointerleave
  cols.forEach(c => {
    c.col.addEventListener('pointerenter', () => c.paused = true);
    c.col.addEventListener('pointerleave', () => c.paused = false);
    // 触摸设备 - 点击时暂停 （可选，注释掉如果不想手机点按暂停）
    // c.col.addEventListener('touchstart', () => c.paused = true, {passive:true});
    // c.col.addEventListener('touchend', () => c.paused = false, {passive:true});
  });

  // 先计算一次高度后开始动画循环（确保 DOM 已渲染）
  requestAnimationFrame(recalcHeights);

  // 全局 RAF 循环（一个 loop 更新所有列）
  let last = performance.now();
  function loop(now) {
    const dt = (now - last) / 1000; // 秒
    last = now;

    cols.forEach(c => {
      if (c.paused) return;
      if (!c.halfHeight || c.halfHeight <= 0) return;

      // 方向： reverse -> 向下（-1），否则向上（+1）
      const dir = c.reverse ? -1 : 1;
      // 速度（px/s）
      const speed = c.speed;

      // 更新 offset（并保持在 [0, halfHeight)）
      c.offset += dir * speed * dt;
      // 将 offset 规范到 [0, halfHeight)
      if (c.offset >= c.halfHeight || c.offset < 0) {
        c.offset = ((c.offset % c.halfHeight) + c.halfHeight) % c.halfHeight;
      }

      // 应用 transform（注意：对 track 做变换）
      c.track.style.transform = `translateY(${-c.offset}px)`;
    });

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

})(); // end init



 const maxRotate = 15;

  document.querySelectorAll('.img-wrapper').forEach(wrapper => {
    const img = wrapper.querySelector('img');

    wrapper.addEventListener('mouseenter', () => {
      wrapper.classList.add('hover');
    });

    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * maxRotate;
      const rotateY = ((centerX - x) / centerX) * maxRotate;

      img.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      img.style.boxShadow = `
        ${-rotateY * 3}px ${rotateX * 3 + 20}px 35px rgba(0,0,0,0.3),
        ${-rotateY * 1.5}px ${rotateX * 1.5 + 10}px 15px rgba(0,0,0,0.2)
      `;
    });

    wrapper.addEventListener('mouseleave', () => {
      wrapper.classList.remove('hover');
      img.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      img.style.boxShadow = 'none';
    });
  });




  document.addEventListener('DOMContentLoaded', () => {
  const cfg = {
    maxVisible: 5,
    itemHeight: 84,
    gap: 14,
    addInterval: 1000,   // 两条之间间隔（你想更长改这个）
    moveDur: 450,        // transform 动画时长（和 CSS --move-dur 保持一致）
    fadeDur: 400,        // 淡出时长（和 CSS --fade-dur 保持一致）
    maskH: 140,
    initialGroups: 3,
    groupSize: 4,
    pauseBetweenGroups: 200,
    blankDuration: 700
  };

  // 示例消息（你可以替换成真实数据源）
  const source = [
    { name: "小歪传媒", description: "有舞蹈基础优先考虑", time: "15m ago", icon: "👤", color: "#00bc9dff" },
    { name: "YY·MCN", description: "每天直播6h，底薪6000", time: "10m ago", icon: "👤", color: "#FFB800" },
    { name: "豆皮传媒公司", description: "“轻松过万”", time: "5m ago", icon: "👤", color: "#ff7b9eff" },
    { name: "圆圆传播", description: "只要颜值过关，会基本的舞蹈动作就行", time: "2m ago", icon: "👤", color: "#5da9ffff" },
    { name: "YM.Spread", description: "实现梦想的捷径", time: "1h ago", icon: "👤", color: "#906ecfff" },
    { name: "芋圆号(招聘主播中)", description: "想了解团播主播请联系我", time: "20m ago", icon: "👤", color: "#3ebab6ff" },
  ];

  // DOM
  const root = document.getElementById('notification-root');
  const list = document.getElementById('notification-list');

  // 注入 CSS 变量（让样式和 JS 参数同步）
  root.style.setProperty('--item-h', cfg.itemHeight + 'px');
  root.style.setProperty('--mask-h', cfg.maskH + 'px');
  root.style.setProperty('--move-dur', cfg.moveDur + 'ms');
  root.style.setProperty('--fade-dur', cfg.fadeDur + 'ms');
  // 计算容器高度： maxVisible * item + gaps
  const containerHeight = cfg.maxVisible * cfg.itemHeight + (cfg.maxVisible - 1) * cfg.gap + 20; // 20 为 padding tweak
  root.style.setProperty('--container-h', containerHeight + 'px');

  // 状态
  let idx = 0;                 // 读取 source 的索引
  const visible = [];          // 当前在 DOM 中的元素数组，index 0 为最上方
  const removalTimers = new Map(); // 存放每个待删除元素的定时器 id

  // 创建一条 DOM 元素（刚创建时放在顶部位置的偏移）
  function createItem(data) {
    const el = document.createElement('div');
    el.className = 'notification';
    // 初始处在顶部上方一点（从上方掉下来）
    el.style.setProperty('--y', (-cfg.itemHeight - 20) + 'px');
    el.style.setProperty('--s', 1);
    el.style.setProperty('--op', 0);
    el.innerHTML = `
      <div class="icon" style="background:${data.color}">${data.icon}</div>
      <div class="content">
        <div class="title"><div class="title-text">${escapeHtml(data.name)}</div><div class="time">· ${escapeHtml(data.time)}</div></div>
        <div class="desc">${escapeHtml(data.description)}</div>
      </div>
    `;
    return el;
  }

  // 简单转义
  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  // 重新计算每个元素的目标位移（用 CSS 变量 --y），元素会通过 transform 平滑移动
  function layoutUpdate() {
    const slot = cfg.itemHeight + cfg.gap;
    visible.forEach((el, i) => {
      const y = i * slot; // 从容器顶部开始排列
      el.style.setProperty('--y', y + 'px');
      el.style.setProperty('--op', 1);
      // zIndex：上面的在上方
      el.style.zIndex = String(100 + (cfg.maxVisible - i));
    });
  }

  // 插入一条到顶部（index 0）
  function insertOneItem(data) {
    const el = createItem(data);
    list.appendChild(el);     // 先加入 DOM（absolute 定位）
    visible.unshift(el);      // 放到数组最前面

    // 触发下次渲染，开始平滑移动到目标位置
    requestAnimationFrame(() => {
      layoutUpdate();
      // 让它显现（opacity）
      // 小延迟确保 transition 可见
      requestAnimationFrame(() => el.style.setProperty('--op', 1));
    });

    // 如果数组现在超出显示容量，则把最下面那一条安排移除（等动画走完）
    if (visible.length > cfg.maxVisible) {
      const outEl = visible[cfg.maxVisible]; // 第 (maxVisible) 个，索引从0开始 -> 已经滑出可视区
      if (outEl) {
        // 取消已有定时器（防止重复）
        if (removalTimers.has(outEl)) {
          clearTimeout(removalTimers.get(outEl));
          removalTimers.delete(outEl);
        }
        // 在位移动画完成后再真正移除：等待 moveDur + 小缓冲
        const delay = cfg.moveDur + 200;
        const tid = setTimeout(() => {
          const idx = visible.indexOf(outEl);
          if (idx > -1) visible.splice(idx, 1);
          outEl.remove();
          removalTimers.delete(outEl);
        }, delay);
        removalTimers.set(outEl, tid);
      }
    }
  }

  // 播放一组（count 条），间隔 addInterval
  function playGroup(count) {
    return new Promise((resolve) => {
      let i = 0;
      const iv = setInterval(() => {
        const data = source[idx % source.length];
        idx++;
        insertOneItem(data);
        i++;
        if (i >= count) {
          clearInterval(iv);
          resolve();
        }
      }, cfg.addInterval);
    });
  }

  // 整体淡出（用于轮次末尾），给 root 加 .fade-all，并在动画结束后清空 DOM
  function fadeAllAndClear() {
    return new Promise((resolve) => {
      root.classList.add('fade-all');
      // 让动画有个交错效果（逐条 delay），我们以 JS 去 stagger opacity
      visible.forEach((el, i) => {
        el.style.transitionDelay = (i * 70) + 'ms';
      });
      // 等待全部淡出时间（fadeDur + 最大 delay + 少量缓冲）
      const maxDelay = (visible.length - 1) * 70;
      const wait = cfg.fadeDur + maxDelay + 120;
      setTimeout(() => {
        // 移除所有节点以及清理计时器
        visible.forEach(el => {
          if (removalTimers.has(el)) {
            clearTimeout(removalTimers.get(el));
            removalTimers.delete(el);
          }
          el.remove();
        });
        visible.length = 0;
        // 清理 transitionDelay
        root.classList.remove('fade-all');
        resolve();
      }, wait);
    });
  }

  // 启动序列：先一次性做 initialGroups * groupSize 的小循环（只做一次），然后进入大循环（永远循环）
  async function startSequence() {
    // initial small cycle（只做一次）
    for (let g = 0; g < cfg.initialGroups; g++) {
      await playGroup(cfg.groupSize);
      await sleep(cfg.pauseBetweenGroups);
    }

    // 主循环（示例：每轮仍然做 3 组，再整体淡出 & 空白）
    while (true) {
      for (let g = 0; g < cfg.initialGroups; g++) {
        await playGroup(cfg.groupSize);
        await sleep(cfg.pauseBetweenGroups);
      }
      // 等 3 秒整体展示后淡出（你可以改这里的等待时间）
      await sleep(2000);
      await fadeAllAndClear();
      // 空白一段时间再继续
      await sleep(cfg.blankDuration);
    }
  }

  // 小工具：sleep
  function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

  // 启动
  startSequence();

  // 页面失焦时暂停（节能）
  let pausedAdd = false;
  window.addEventListener('blur', () => { pausedAdd = true; });
  window.addEventListener('focus', () => {
    if (pausedAdd) { pausedAdd = false; }
  });

  // 当窗口缩放/字体变化，重新布局（保证 y 值正确）
  window.addEventListener('resize', () => requestAnimationFrame(layoutUpdate));
});

function isVideoBottomInView(el, offset = 100) {
  const rect = el.getBoundingClientRect();
  // 视频底部距离视口底部小于 offset 就播放
  return rect.bottom <= window.innerHeight + offset;
}

const video = document.getElementById('videoFixed');
let played = false;
let timeoutId = null; // 用于存储定时器ID

function tryPlayVideo() {
  if (played) return;
  if (timeoutId) clearTimeout(timeoutId); // 清除之前的定时器
  
  // 只有当视频底部完全进入视口时才播放
if (isVideoBottomInView(video, 10)) { // offset = 100px，可以调大或调小
  timeoutId = setTimeout(() => {
    if (played) return;
    video.play().catch(() => console.warn('视频自动播放被阻止'))
         .then(() => { played = true; });
  }, 0);
}
}

window.addEventListener('scroll', tryPlayVideo);
window.addEventListener('resize', tryPlayVideo);
window.addEventListener('load', tryPlayVideo);

video.addEventListener('ended', () => {
  played = true;
});

(function() {
    var chart = echarts.init(document.getElementById('chinaMapInner'));

    var deepYellow = '#fed09a';
    var lightYellow = '#f1f3d9';
    var hoverYellow = '#cc803e';

    // 映射：ECharts地图省份名 -> 事件信息
    var events = {
        '北京': "北京市文化执法总队联合行业协会开展专项整治培训，要求：平台落实7*24小时内容审核，重点保护未成年人；抵制“违背核心价值观的内容”",
        '天津': "开展生活服务类平台整治，重点打击刷分控评、违规营销引流等行为，依托“海河净网”平台实现市区街镇3级管理",
        '上海': "发布了《上海市网络直播营销活动合规指引》，其中明确主播应当年满16周岁，规范自身行为、着装和直播用语",
        '内蒙古': "发布相关规范条例，属地细化规则，严禁团播通过低俗剧本炒作引流（如编造冲突、虚假促销），违者最高处以20万元罚款并暂停直播权限",
        '浙江': "发布《网络直播标准2024-2026年规划白皮书》，构建“1+3+5+4N”体系，覆盖主播管理、供应链合规等、绿色直播间评价等全链条",
        '湖北': "湖北省谷城县总工会推动63家电商企业与直播行业工会签订集体合同，明确全职主播底薪≥2500元/月，佣金提成≥销售额3%；自由主播佣金≥10%。同步约定夜班津贴、社保缴纳、年度体检等福利，并规范主播行为降低企业风险",
        '湖南': "主播王俪离职后被传媒公司拖欠工资，且未签劳动合同。法院因公司拒不提供工资记录，直接采信主播提交的业绩证明，判决公司支付双倍工资差额及欠薪4.7万元，确立“公会拒交工资记录则采信主播主张”的裁判规则，强化举证责任倒置",
        '广东': "广东工会为30名主播追回欠薪87万元，建议通过区块链存证固定电子证据（如后台数据、工资记录）",
        '广西': "与广南宁举办的“团播机构高质量发展恳谈会”，超60家直播机构代表联合发起自律倡议，承诺合法合规经营、抵制不良内容、保障从业者权益、推动团播行业高质量发展",
        '四川': "成都OST传媒设立创意研发部门，通过月度评奖、季度升职、20%利润投入研发等方式降低离职率，提升团播时内容合规性、创新性"
    };

    var highlighted = Object.keys(events);

    var provinces = [
        '北京','天津','上海','重庆','河北','山西','内蒙古','辽宁','吉林','黑龙江',
        '江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','广西',
        '海南','四川','贵州','云南','陕西','甘肃','青海','宁夏','西藏','台湾','香港','澳门','新疆'
    ];

    var mapData = provinces.map(function(province) {
        return {
            name: province,
            value: highlighted.includes(province) ? 1 : 0,
            event: events[province] || "暂无相关信息",
            itemStyle: {
                areaColor: highlighted.includes(province) ? deepYellow : lightYellow
            }
        };
    });

    var option = {
        backgroundColor: '#FFF9E6',
        tooltip: {
            trigger: 'item',
            enterable: true,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#321a06ff',
            borderWidth: 0.5,
            textStyle: { fontSize: 14, color: '#333' },
            formatter: function(params) {
                return `<div style="max-width: 300px; white-space: normal; line-height: 1.6; padding: 8px;">
                    <strong style="font-size: 16px; margin-bottom: 5px; display: block;">${params.name}</strong>
                    <p style="font-size: 14px;">${params.data.event}</p>
                </div>`;
            }
        },
        series: [{
            type: 'map',
            map: 'china',
            label: { show: false },
            data: mapData,
            center: [104, 36],
            zoom: 1.1,
            emphasis: {
                itemStyle: { areaColor: hoverYellow },
                label: { color: '#000' }
            },
            itemStyle: { borderColor: '#321a06ff', borderWidth: 0.5 },
            roam: false
        }]
    };

    chart.setOption(option);
    window.addEventListener('resize', function() {
        chart.resize();
    });
})();
