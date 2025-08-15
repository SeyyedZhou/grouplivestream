
(() => {
  const container = document.getElementById('danmakuContainer');

  const lanes = 7; 
  const minFontSize = 14;
  const maxFontSize = 36;
  const colors = ['#d9c1a1', '#f6f1e5', '#ec7f55', '#eec576', '#ffc7c7'];
  const margin = 40; // 弹幕间隔距离

  const danmakuData = [
    {text:"读书真的很重要", weight:12},
    {text:"搞钱没错但别盲目", weight:10},
    {text:"经济形势所迫", weight:8},
    {text:"不读书容易被骗", weight:7},
    {text:"团播有门槛", weight:6},
    {text:"做主播不丢人", weight:6},
    {text:"做什么都不如做网红", weight:6},
    {text:"主播是普通职业", weight:6},
    {text:"MCN骗人", weight:6},
    {text:"读书建立认知体系", weight:5},
    {text:"没办法养活自己", weight:5},
    {text:"情绪消费观众", weight:5},
    {text:"赚钱更重要", weight:5},
    {text:"太唏嘘了", weight:5},
    {text:"是现实逼的", weight:5},
    {text:"真的焦虑", weight:5},
    {text:"主播引导不良", weight:4},
    {text:"普通人没得选", weight:4},
    {text:"挣钱为王", weight:4},
    {text:"靠脸吃饭", weight:4},
    {text:"热度和流量的游戏", weight:4},
    {text:"好工作工资太低", weight:4},
    {text:"读书不一定有用", weight:4},
    {text:"直播有门槛", weight:4},
    {text:"书读少了难进办公室", weight:4},
    {text:"转行不是错", weight:4},
    {text:"娱乐至死", weight:4},
    {text:"内卷严重", weight:3},
    {text:"大家都想赚快钱", weight:3},
    {text:"团播是下海吗", weight:3},
    {text:"华美的陷阱", weight:3},
    {text:"身不由己", weight:3},
    {text:"压力太大了", weight:3},
    {text:"小孩被短视频影响", weight:3},
    {text:"曾经有梦想", weight:3},
    {text:"光鲜背后是辛苦", weight:3},
    {text:"不是自嘲是炫耀", weight:3},
    {text:"网络毒性太强", weight:3},
    {text:"读书不能逆天改命", weight:3},
    {text:"人生选择越来越窄", weight:3},
    {text:"主持人都下海了", weight:2},
    {text:"初中生想当网红", weight:2},
    {text:"做主播真的累", weight:2},
    {text:"梦想不值钱", weight:2},
    {text:"工资低到离谱", weight:2},
    {text:"短视频污染语言", weight:2},
    {text:"团播像体力劳动", weight:2},
    {text:"主播收入没想象中高", weight:2},
    {text:"长得不好看连团播都做不了", weight:2},
    {text:"无力", weight:2},
    {text:"读了书也没好工作", weight:2}
  ];

  const getFontSize = (weight) => {
    const maxWeight = 12, minWeight = 2;
    const baseSize = minFontSize + (weight - minWeight) * (maxFontSize - minFontSize) / (maxWeight - minWeight);
    return baseSize * 1.5; // 放大1.5倍
  };

  const lineHeight = 44 * 1.5; // 66px
  const containerHeight = lineHeight * lanes;
  container.style.height = containerHeight + 'px';
  container.parentElement.style.height = containerHeight + 'px';

  const baseSpeed = 0.006;

  function shuffleArray(arr) {
    const array = arr.slice();
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  let danmakuPool = shuffleArray(danmakuData);

  function createDanmaku(text, weight) {
    const span = document.createElement('span');
    span.className = 'danmaku-text';
    span.textContent = text;
    const fontSize = getFontSize(weight);
    span.style.fontSize = fontSize + 'px';
    span.style.color = colors[Math.floor(Math.random() * colors.length)];
    span.style.fontWeight = 'bold';
    span.style.position = 'absolute';
    span.style.whiteSpace = 'nowrap';
    return {element: span, fontSize};
  }

  function launchOnLane(lane) {
    if (danmakuPool.length === 0) {
      danmakuPool = shuffleArray(danmakuData);
    }
    const danmaku = danmakuPool.pop();
    const {element, fontSize} = createDanmaku(danmaku.text, danmaku.weight);
    container.appendChild(element);

    const textWidth = element.offsetWidth;
    const startX = container.clientWidth;
    const posY = lane * lineHeight + (lineHeight - fontSize) / 2;
    element.style.top = posY + 'px';
    element.style.left = startX + 'px';

    const speed = 0.12; // px/frame 固定速度，数字可以调节速度快慢

    let currentX = startX;

    let nextDanmakuLaunched = false;

    function step() {
      currentX -= speed * 16;

      // 提前触发下一条弹幕（距离足够时）
      if (!nextDanmakuLaunched && currentX < startX - (textWidth + margin)) {
        nextDanmakuLaunched = true;
        setTimeout(() => launchOnLane(lane), 200 + Math.random() * 200); // 更快出现
      }

      if (currentX < -textWidth) {
        container.removeChild(element);
        return;
      } else {
        element.style.transform = `translateX(${currentX - startX}px)`;
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  for(let i = 0; i < lanes; i++) {
    setTimeout(() => {
      launchOnLane(i);
    }, i * 50);  // 弹幕启动更密集
  }
  // 在原有 containerHeight 的基础上，额外加一段 paddingBottom
const paddingBottom = 59; // 你可以根据实际弹幕高度调整
container.style.paddingBottom = paddingBottom + '10px';
container.parentElement.style.height = (containerHeight + paddingBottom) + 'px';
})();




   // 每月 1 日和 15 日
        const monthlyDates = [
            '2024-11-01','2024-11-15','2024-12-01','2024-12-15','2025-01-01','2025-01-15','2025-02-01','2025-02-15',
            '2025-03-01','2025-03-15','2025-04-01','2025-04-15','2025-05-01','2025-05-15','2025-06-01','2025-06-15',
            '2025-07-01','2025-07-15','2025-08-01'
        ];

        // Monthly 数据
        const monthlyData = [
            42988, 228346, 95896, 77788, 73829, 43252, 29086, 
            63980, 86191, 145090, 101431, 115941, 105010, 217911,
            277948, 934268, 551784, 622898, 791699
        ];

        // Yearly 数据
        const yearlyDates = ['2021-08~22-08', '2022-08~23-08', '2023-08~24-08', '2024-08~25-08'];
        const yearlyData = [847, 2973, 20000, 177000];

        const chartDom = document.getElementById('chart');
        const myChart = echarts.init(chartDom);

        const baseOption = {
            backgroundColor: '#1F2937',
            title: {
    text: '抖音“团播”关键词声量变化趋势',
    left: 'center',
    textStyle: { 
        fontFamily: 'Noto Serif SC', 
        color: 'white',
        fontSize: 25 // 这里改成你需要的大小
    }
},
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    let data = params[0];
                    return `<span style="color:white">${data.axisValue}<br/>搜索指数：${data.data.toLocaleString()}</span>`;
                },
                backgroundColor: '#1F2937',
                borderColor: '#333',
                textStyle: { fontFamily: 'Noto Serif SC', color: 'white' }
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    rotate: 45,
                    fontFamily: 'Noto Serif SC',
                    color: 'white'
                },
                axisLine: { lineStyle: { color: 'white' } }
            },
            yAxis: {
                type: 'value',
                name: '搜索指数',
                axisLabel: {
                    formatter: function (value) {
                        if (value >= 10000 && value < 100000000) {
                            return (value / 10000) + '万';
                        } else if (value >= 100000000) {
                            return (value / 100000000) + '亿';
                        }
                        return value;
                    },
                    fontFamily: 'Noto Serif SC',
                    color: 'white'
                },
                axisLine: { lineStyle: { color: 'white' } },
                splitLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } }
            },
            series: [{
                name: '年均搜索指数',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 6,

            }],
            animationDuration: 1000
        };

        function setMonthly() {
    myChart.setOption({
        ...baseOption,
        xAxis: { ...baseOption.xAxis, data: monthlyDates },
        series: [{
            ...baseOption.series[0],
            data: monthlyData,
            lineStyle: { width: 3, color: '#ec7f55' }, // 蓝色
            itemStyle: { color: '#ec7f55' },
            areaStyle: { color: '#ec80555b' }
        }]
    });
    document.getElementById('monthlyBtn').classList.add('active');
    document.getElementById('yearlyBtn').classList.remove('active');
}

function setYearly() {
    myChart.setOption({
        ...baseOption,
        xAxis: { ...baseOption.xAxis, data: yearlyDates },
        series: [{
            ...baseOption.series[0],
            data: yearlyData,
            lineStyle: { width: 3, color: '#ec7f55' }, // 红色
            itemStyle: { color: '#ec7f55' },
            areaStyle: { color: '#ec80555b' }
        }]
    });
    document.getElementById('yearlyBtn').classList.add('active');
    document.getElementById('monthlyBtn').classList.remove('active');
}

        // 默认显示 Monthly
        setMonthly();

        // 按钮事件
        document.getElementById('monthlyBtn').addEventListener('click', setMonthly);
        document.getElementById('yearlyBtn').addEventListener('click', setYearly);








document.addEventListener('DOMContentLoaded', function () {
  const chartDom = document.getElementById('main'); // 若你的容器 id 是 chart，请改这里
  if (!chartDom) {
    console.error('找不到 id 为 main 的 DOM 元素！');
    return;
  }

  const myChart = echarts.init(chartDom);

  // 低饱和浅色系配色（适配 #1F2937 背景）
  const colors = [
    '#A3C4DC', '#C8E0D8', '#F3D9B1', '#E8C2CA', '#D7C0E8',
    '#C4DFAA', '#F6EAC2', '#B8D8BA', '#E0D1B5', '#AEC5EB'
  ];

  // 原始数据
  const rawData = [
  { name: '不务正业', value: 141 },
  { name: '团播赚钱快', value: 97 },
  { name: '累死累活', value: 99 },
  { name: '大环境不好', value: 86 },
  { name: '不读书也能赚钱', value: 68 },
  { name: '就业难', value: 64 },
  { name: '逼到没路走了', value: 60 },
  { name: '下海不丢人', value: 57 },
  { name: '挣钱不磕碜', value: 56 },
  { name: '专业对口', value: 54 },
  { name: '放弃热爱', value: 52 },
  { name: '谁在看团播', value: 48 },
  { name: '不是想做就能做', value: 47 },
  { name: '不体面但赚钱', value: 47 },
  { name: '身材颜值要求高', value: 47 },
  { name: '读书无用论', value: 45 },
  { name: '艺体生出路', value: 44 },
  { name: '放弃曾经', value: 42 },
  { name: '文科生难', value: 40 },
  { name: '理科生也难', value: 38 },
  { name: '搞擦边', value: 35 },
  { name: '拿命赚钱', value: 34 },
  { name: '笑死', value: 33 },
  { name: '不值得惋惜', value: 32 },
  { name: '社会逼人', value: 30 },
  { name: '不是所有人都能做团播', value: 30 },
  { name: '不如进厂', value: 27 },
  { name: '赚钱为王', value: 24 },
  { name: '千篇一律', value: 24 },
  { name: '团播是门槛行业', value: 24 },
  { name: '压力大', value: 22 },
  { name: '有点想哭了', value: 22 },
  { name: '转行很可惜', value: 20 },
  { name: '靠脸吃饭', value: 18 },
  { name: '曾经有前途', value: 17 },
  { name: '直播太卷了', value: 15 }
];

  // 给每个词固定分配一个颜色（高亮时保持颜色不变）
  const data = rawData.map(item => ({
    name: item.name,
    value: item.value,
    textStyle: { color: colors[Math.floor(Math.random() * colors.length)] }
  }));

  const option = {
    backgroundColor: 'rgba(31, 41, 55, 0)',
    
    tooltip: {
      show: true,
      formatter: function (params) {
        return params.name + '<br/>词频: ' + params.value;
      }
    },
   
    series: [{
      type: 'wordCloud',
      // 保留你现有风格（如需改成 roundRect 可替换）
      shape: 'circle',
      left: 'center',
      top: '-50px',
      width: '87%',
      height: '90%',
      sizeRange: [10, 65],
      rotationRange: [0, 0],
      gridSize: 8,
      drawOutOfBound: false,
      textStyle: {
        fontFamily: 'Noto Serif SC',
        fontWeight: 'bold',
        // 使用预先分配的颜色，确保高亮不变色
        color: function (params) {
          // params.dataIndex 总是有值，因为词云为 data 驱动
          return data[params.dataIndex] && data[params.dataIndex].textStyle
                 ? data[params.dataIndex].textStyle.color
                 : colors[Math.floor(Math.random() * colors.length)];
        }
      },
      emphasis: {
        // 参考示例里的交互：focus = 'self'
        focus: 'self',
        // 高亮样式（光晕 + 保持原色）
        textStyle: {
          shadowBlur: 12,
          shadowColor: '#ffffff',
          // 保持原色（也用参数取回）
          color: function (params) {
            return data[params.dataIndex] && data[params.dataIndex].textStyle
                   ? data[params.dataIndex].textStyle.color
                   : '#fff';
          }
        },
        // blurScope 让同一系列内的其他项受到影响（尝试增强暗化感）
        blurScope: 'series'
      },
      // 使用我们带颜色的 data
      data: data
    }]
  };

  myChart.setOption(option);

  // —— 关键交互：使用 dispatchAction(highlight/downplay) 来触发“其他变暗”的效果 —— //
  // 鼠标移到某词时：先 downplay 全部（确保上次状态清理），再 highlight 当前词
  myChart.on('mouseover', function (params) {
    if (params.componentType === 'series' && params.seriesType === 'wordCloud') {
      myChart.dispatchAction({ type: 'downplay', seriesIndex: params.seriesIndex }); // 先清除所有高亮
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: params.seriesIndex,
        dataIndex: params.dataIndex
      }); // 高亮当前词（emphasis生效，其他项会显得暗）
    }
  });

  // 鼠标离开整个图表区域时恢复（也可以用 mouseout，但 globalout 更稳）
  myChart.on('globalout', function () {
    myChart.dispatchAction({ type: 'downplay', seriesIndex: 0 });
  });

  // 响应式
  window.addEventListener('resize', () => myChart.resize());
});


