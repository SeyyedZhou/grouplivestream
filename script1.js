                     window.addEventListener('load', () => {
            const containers = document.querySelectorAll('.interactive-container');
            
            containers.forEach(container => {
                const dialogueImage = container.querySelector('.dialogue-image');
                let isVisible = false; // 用于跟踪对话框是否已经显示
                
                window.addEventListener('scroll', () => {
                    const rect = container.getBoundingClientRect();
                    if (rect.top >= 0 && rect.bottom <= window.innerHeight && !isVisible) {
                        dialogueImage.style.opacity = '1';
                        isVisible = true; // 标记对话框为已显示
                    }
                });
            });
        });
        /* 索引高亮跟随滚动 */
        const sections = document.querySelectorAll('section');
        const links = document.querySelectorAll('.nav a');
     const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            links.forEach(link => link.classList.remove('active'));
            document.querySelector(`.nav a[href="#${entry.target.id}"]`)?.classList.add('active');
        }
    });
}, { threshold: 0.1 });
        sections.forEach(section => io.observe(section));

        // 获取元素
        const button1 = document.getElementById('button1');
        const button2 = document.getElementById('button2');
        const tag1 = document.getElementById('tag1');
        const tag2 = document.getElementById('tag2');
        
        // 显示标签1
        button1.addEventListener('click', function() {
            tag1.style.display = 'block';
        });
        
        // 显示标签2
        button2.addEventListener('click', function() {
            tag2.style.display = 'block';
        });
        
        // 根据图片大小调整按钮位置
        const mainImage = document.getElementById('mainImage');
        mainImage.onload = function() {
            resizeButtons();
        };
        
        // 手机按钮
        function resizeButtons() {
            const width = mainImage.clientWidth;
            const height = mainImage.clientHeight;
            
            const buttonWidth = width * 0.095;
            const buttonHeight = height * 0.171;
            
            const button1 = document.getElementById('button1');
            button1.style.width = buttonWidth + 'px';
            button1.style.height = buttonHeight + 'px';
            button1.style.left = (width * (0.0129)) + 'px';
            button1.style.top = (height * 0.326) + 'px';
            
            const button2 = document.getElementById('button2');
            button2.style.width = buttonWidth + 'px';
            button2.style.height = buttonHeight + 'px';
            button2.style.left = (width * 0.0129) + 'px';
            button2.style.top = (height * 0.55) + 'px';
            
            const tag1 = document.getElementById('tag1');
            tag1.style.width = width * 0.616 + 'px';
            tag1.style.height = height * 0.48 + 'px';
            
            const tag2 = document.getElementById('tag2');
            tag2.style.width = width * 0.597 + 'px';
            tag2.style.height = height * 0.430 + 'px';
        }
        
        // 窗口大小改变时调整按钮位置
        window.addEventListener('resize', function() {
            resizeButtons();
        });
        // 显示标签1并调整位置
button1.addEventListener('click', function() {
    tag1.style.display = 'block';
    tag1.style.right = '-60px'; // 调整右侧位置
    tag1.style.top = '34px'; // 调整顶部位置
});

// 显示标签2并调整位置
button2.addEventListener('click', function() {
    tag2.style.display = 'block';
    tag2.style.right = '-28px'; // 调整右侧位置
    tag2.style.top = '260px'; // 调整顶部位置
});
class AnimatedEyes {
    constructor() {
        this.mousePos = { x: 0, y: 0 };
        this.isBlinking = false;        
        this.currentHourRange = '23-24';
        this.hourRanges = ['23-24', '1-2', '3-4', '5-6', '7-8', '9-10', '11-12', '13-14', '15-16', '17-18', '19-20', '21-22'];                
        this.eyesContainer = document.getElementById('eyesContainer');
        this.clockCircle = document.getElementById('clockCircle');
        this.leftPupil = document.getElementById('leftPupil');
        this.rightPupil = document.getElementById('rightPupil');
        this.leftEyebrow = document.getElementById('leftEyebrow');
        this.rightEyebrow = document.getElementById('rightEyebrow');
        this.leftEyeClosed = document.getElementById('leftEyeClosed');
        this.rightEyeClosed = document.getElementById('rightEyeClosed');        
        this.leftHappyEffect = document.getElementById('leftHappyEffect');
        this.rightHappyEffect = document.getElementById('rightHappyEffect');
        this.timeBox = document.getElementById('timeBox');        
        this.statusText = document.getElementById('statusText');
        this.offsetX = -190; // 添加一个偏移量，值为你调整的位置（向左为负，向右为正）
        this.offsetY = -2;
                this.init();
    }
    init() {
        this.createClockNumbers();
        this.bindEvents();
        this.startBlinking();
        this.updateDisplay();
    }
    createClockNumbers() {
        this.hourRanges.forEach((hourRange, index) => {
            const angle = (index * 30 - 90) * (Math.PI / 180);
            const radius = 230;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;            
            const hourElement = document.createElement('div');            
            hourElement.className = 'hour-range';
            hourElement.textContent = hourRange;
            hourElement.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
                        this.clockCircle.appendChild(hourElement);
        });
    }    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });    }
    handleMouseMove(e) {
        if (!this.eyesContainer) return;      
        const rect = this.eyesContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2 + this.offsetX;
        const centerY = rect.top + rect.height / 2 + this.offsetY;        
        this.mousePos = {
            x: (e.clientX - centerX) / 20,
            y: (e.clientY - centerY) / 20
        };
        // 计算角度确定时间段        
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);        
        const degrees = (angle * 180 / Math.PI + 90 + 360) % 360;        
        const position = Math.floor(degrees / 30);      
        this.currentHourRange = this.hourRanges[position];        
        this.updateDisplay();
        this.updateEyeMovement();
    }
    updateEyeMovement() {
        const moveX = Math.max(-32, Math.min(32, this.mousePos.x));        
        const moveY = Math.max(-32, Math.min(32, this.mousePos.y));
      
        if (this.leftPupil) {
            this.leftPupil.style.transform = `translate(-50%, -50%) translate(${moveX}px, ${moveY}px)`;
        }        if (this.rightPupil) {
            this.rightPupil.style.transform = `translate(-50%, -50%) translate(${moveX}px, ${moveY}px)`;        }
        // 更新眉毛        
        const eyeState = this.getEyeState(this.currentHourRange);        
        this.updateEyebrows(eyeState);
    }    getEyeState(hourRange) {
        const sleepHours = ['3-4', '5-6', '7-8', '9-10'];
        const happyHours = ['11-12', '13-14'];
        const angryHours = ['15-16', '17-18'];        
        const sadHours = ['19-20', '21-22', '23-24', '1-2'];
        if (sleepHours.includes(hourRange)) {
            return { type: 'sleep', eyesClosed: true, eyebrowAngle: 0 };
        } else if (happyHours.includes(hourRange)) {
            return { type: 'happy', eyesClosed: false, eyebrowAngle: 20 };
        } else if (sadHours.includes(hourRange)) {
            return { type: 'sad', eyesClosed: false, eyebrowAngle: -15 };
        } else if (angryHours.includes(hourRange)) {
            return { type: 'angry', eyesClosed: false, eyebrowAngle: 15 };
        }        
        return { type: 'normal', eyesClosed: false, eyebrowAngle: 0 };
    }
    updateEyebrows(eyeState) {
        let leftTransform, rightTransform;
        if (eyeState.type === 'sleep') {
            leftTransform = 'rotate(0deg)';
            rightTransform = 'rotate(0deg)';        
        } else if (eyeState.type === 'happy') {            
            leftTransform = `rotate(${eyeState.eyebrowAngle}deg) translateY(-6px)`;
            rightTransform = `rotate(${-eyeState.eyebrowAngle}deg) translateY(-6px)`;}
        else if (eyeState.type === 'sad') {
            leftTransform = `rotate(${eyeState.eyebrowAngle}deg)`;
            rightTransform = `rotate(${-eyeState.eyebrowAngle}deg)`;}
        else if (eyeState.type === 'angry') {
            leftTransform = `rotate(${eyeState.eyebrowAngle}deg)`;
            rightTransform = `rotate(${-eyeState.eyebrowAngle}deg)`;}
        else {
            leftTransform = `rotate(${this.mousePos.x * 0.5}deg)`;
            rightTransform = `rotate(${-this.mousePos.x * 0.5}deg)`;}        
        if (this.leftEyebrow) {
            this.leftEyebrow.style.transform = leftTransform;
        }        if (this.rightEyebrow) {
            this.rightEyebrow.style.transform = rightTransform;
        }
    }
    updateDisplay() {
        // 更新时钟数字高亮
        const hourElements = this.clockCircle.querySelectorAll('.hour-range');
        hourElements.forEach((element, index) => {
            if (this.hourRanges[index] === this.currentHourRange) {                
                element.classList.add('active');
            } else {
                element.classList.remove('active');            
            }
        });
        // 更新时间显示
        const [start, end] = this.currentHourRange.split('-');        
        if (this.timeBox) {            
            this.timeBox.textContent = `${start}:00-${end}:00`;
        }
        // 更新状态文字
        const statusText = this.getStatusText(this.currentHourRange);
        if (this.statusText) {
            this.statusText.textContent = statusText;
        }        // 更新眼睛状态
        const eyeState = this.getEyeState(this.currentHourRange);
        this.updateEyeState(eyeState);
    }
    getStatusText(hourRange) {        
        const sleepHours = ['3-4', '5-6', '7-8', '9-10'];
        const restHours = ['11-12', '13-14'];
        const workHours = ['15-16', '17-18'];        
        const liveHours = ['19-20', '21-22', '23-24'];        
        const messageHours = ['1-2'];        
        if (sleepHours.includes(hourRange)) {            
            return '睡眠';
        } else if (restHours.includes(hourRange)) {
            return '自主安排时间';
        } else if (workHours.includes(hourRange)) {
            return '练舞、化妆';
        } else if (liveHours.includes(hourRange)) {
            return '直播';
        } else if (messageHours.includes(hourRange)) {
            return '复盘直播数据\n发送感谢私信';
        }
        return '';
    }
    updateEyeState(eyeState) {        
        if (eyeState.eyesClosed) {
            // 显示闭眼状态
            if (this.leftEyeClosed) this.leftEyeClosed.style.display = 'block';            
            if (this.rightEyeClosed) this.rightEyeClosed.style.display = 'block';
            if (this.leftPupil) this.leftPupil.style.display = 'none';
            if (this.rightPupil) this.rightPupil.style.display = 'none';
        } else {
            // 显示睁眼状态
            if (this.leftEyeClosed) this.leftEyeClosed.style.display = 'none';
            if (this.rightEyeClosed) this.rightEyeClosed.style.display = 'none';
            if (this.leftPupil) this.leftPupil.style.display = 'block';            
            if (this.rightPupil) this.rightPupil.style.display = 'block';
            // 开心效果
            if (eyeState.type === 'happy') {                
                if (this.leftHappyEffect) this.leftHappyEffect.style.display = 'block';
                if (this.rightHappyEffect) this.rightHappyEffect.style.display = 'block';
            } else {
                if (this.leftHappyEffect) this.leftHappyEffect.style.display = 'none';
                if (this.rightHappyEffect) this.rightHappyEffect.style.display = 'none';
            }
        }    }
    startBlinking() {
        setInterval(() => {
            if (!this.getEyeState(this.currentHourRange).eyesClosed) {
                if (this.leftPupil) this.leftPupil.classList.add('blinking');
                if (this.rightPupil) this.rightPupil.classList.add('blinking');
                                setTimeout(() => {
                    if (this.leftPupil) this.leftPupil.classList.remove('blinking');
                    if (this.rightPupil) this.rightPupil.classList.remove('blinking');                }, 150);
            }
        }, 3000 + Math.random() * 2000);
    }}
// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new AnimatedEyes();
});



(function(){
  const overlay = document.getElementById('coverTransition');
  const layer1  = overlay.querySelector('.cover1');
  const layer2  = overlay.querySelector('.cover2');

  // 预加载图片
  const preload = src => new Promise(r => { const img=new Image(); img.onload=img.onerror=r; img.src=src; });
  Promise.all([
    preload(layer1.style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '')),
    preload(layer2.style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, ''))
  ]).then(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
  });

  let done = false;
  function onScroll(){
    if(done) return;
    if(window.scrollY > 50){ // 下滑触发
      done = true;

      // 渐显封面2
      layer2.style.opacity = '1';
      // 渐隐封面1
      setTimeout(()=>{ layer1.style.opacity='0'; }, 600);

      // 渐变完成后移除覆盖层
      setTimeout(()=>{
        if(overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
        // 不做 scrollIntoView，保持当前 scrollY，自然显示 hero2
      }, 1300);
    }
  }
})();