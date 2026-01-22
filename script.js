const REGISTRY = {
    browser: { title: "Google Explorer", icon: "🌐", content: `<div style="height:40px;background:#222;display:flex;"><input type="text" id="url-in" style="flex:1;background:#000;color:#fff;border:none;padding:5px;" value="https://www.bing.com"><button onclick="document.getElementById('b-frame').src=document.getElementById('url-in').value">GO</button></div><iframe id="b-frame" src="https://www.bing.com" style="width:100%;height:calc(100% - 40px);border:none;"></iframe>` },
    
    dungeon: { title: "Dungeon Gamblers", icon: "🃏", content: `<iframe style="width:100%;height:100%;border:none;" srcdoc="<html><head><base href='https://cdn.jsdelivr.net/gh/Stinkalistic/UGS@main/MISC/dungeongamble/'><style>body,html{margin:0;padding:0;overflow:hidden;background:black;}</style></head><body><script src='gamble.js'></script><canvas id='canvas' style='width:100vw; height:100vh;'></canvas><script>window.onload=function(){const c={'args':[],'canvasResizePolicy':2,'executable':'gamble','fileSizes':{'index.pck':97937408,'gamble.wasm':25658069},'focusCanvas':true};var e=new Engine(c);e.startGame();}</script></body></html>"></iframe>` },
    
    knights: { title: "Knights Battle", icon: "⚔️", content: `<iframe style="width:100%;height:100%;border:none;" srcdoc="<html><body style='margin:0;overflow:hidden;background:black;'><script src='https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.loader.js'></script><canvas id='u-canvas' style='width:100vw;height:100vh;'></canvas><script>const c={dataUrl:'https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.data.unityweb',frameworkUrl:'https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.framework.js.unityweb',codeUrl:'https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.wasm.unityweb',companyName:'BANZAI',productName:'War Knights'};createUnityInstance(document.querySelector('#u-canvas'),c);</script></body></html>"></iframe>` },
    
    hacker: { title: "Terminal", icon: "💀", content: `<div style="background:#000;color:#0f0;height:100%;padding:10px;font-family:monospace;" id="term-out">root@uOS:~$ <input type="text" onkeypress="handleTerm(event)" style="background:none;border:none;color:#0f0;outline:none;width:70%;"></div>` },
    
    store: { title: "U-Store", icon: "🏪", content: `<div style="padding:20px;"><h3>Available Apps</h3><button onclick="createShortcut('calc')">Install Calculator</button></div>` },
    
    calc: { title: "Calculator", icon: "🔢", content: `<div id="c-res" style="padding:20px;font-size:30px;text-align:right;">0</div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;padding:10px;">${['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map(v=>`<button style="padding:15px;" onclick="doCalc('${v}')">${v}</button>`).join('')}</div>` }
};

function attemptLogin() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    if(u === "hacker" && p === "admin") {
        document.getElementById('boot-screen').classList.add('unlocked');
        // AUTO-LOAD GAMES TO DESKTOP
        ['store', 'browser', 'hacker', 'dungeon', 'knights'].forEach(id => createShortcut(id));
    } else {
        document.getElementById('login-err').innerText = "DENIED";
    }
}

function createShortcut(id) {
    if(document.getElementById('icon-'+id)) return;
    const d = document.getElementById('desktop');
    const s = document.createElement('div');
    s.className = 'shortcut'; s.id = 'icon-'+id;
    s.onclick = () => openApp(id);
    s.innerHTML = `<span>${REGISTRY[id].icon}</span><span>${REGISTRY[id].title}</span>`;
    d.appendChild(s);
}

function openApp(id) {
    const winId = 'win-'+Math.random().toString(36).substr(2,9);
    const win = document.createElement('div');
    win.className = 'window'; win.id = winId;
    win.style.top = "50px"; win.style.left = "100px";
    win.innerHTML = `<div class="win-header"><span>${REGISTRY[id].icon} ${REGISTRY[id].title}</span><div class="win-controls"><button style="background:#febc2e" onclick="document.getElementById('${winId}').classList.toggle('maximized')"></button><button style="background:#ff5f56" onclick="this.closest('.window').remove()"></button></div></div><div class="win-body">${REGISTRY[id].content}</div><div class="resizer"></div>`;
    document.getElementById('desktop').appendChild(win);
    makeDraggable(win); makeResizable(win);
}

function makeDraggable(el) {
    const h = el.querySelector('.win-header');
    h.onmousedown = (e) => {
        let ox = e.clientX - el.offsetLeft, oy = e.clientY - el.offsetTop;
        document.onmousemove = (e) => { el.style.left = (e.clientX - ox)+'px'; el.style.top = (e.clientY - oy)+'px'; };
        document.onmouseup = () => { document.onmousemove = null; };
    };
}

function makeResizable(el) {
    const r = el.querySelector('.resizer');
    r.onmousedown = (e) => {
        e.preventDefault();
        window.onmousemove = (e) => {
            el.style.width = (e.pageX - el.offsetLeft)+'px';
            el.style.height = (e.pageY - el.offsetTop)+'px';
        };
        window.onmouseup = () => { window.onmousemove = null; };
    };
}

function doCalc(v) {
    const res = document.getElementById('c-res');
    if(v === '=') res.innerText = eval(res.innerText);
    else res.innerText = res.innerText === '0' ? v : res.innerText + v;
}

function handleTerm(e) {
    if(e.key === 'Enter') {
        const v = e.target.value;
        if(v.startsWith('print ')) {
            const m = document.createElement('div');
            m.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:red;z-index:10000;display:flex;align-items:center;justify-content:center;font-size:50px;";
            m.innerText = v.substring(6).toUpperCase();
            document.body.appendChild(m);
            setTimeout(() => m.remove(), 2000);
        }
        e.target.value = '';
    }
}

setInterval(() => { document.getElementById('clock').innerText = new Date().toLocaleTimeString(); }, 1000);
