const REGISTRY = {
    // GAMES
    dungeon: { title: "Dungeon Gamblers", icon: "🃏", content: `<iframe style="width:100%;height:100%;border:none;" srcdoc="<html><head><base href='https://cdn.jsdelivr.net/gh/Stinkalistic/UGS@main/MISC/dungeongamble/'><style>body,html{margin:0;padding:0;overflow:hidden;background:black;}</style></head><body><script src='gamble.js'></script><canvas id='canvas' style='width:100vw; height:100vh;'></canvas><script>window.onload=function(){const c={'args':[],'canvasResizePolicy':2,'executable':'gamble','fileSizes':{'index.pck':97937408,'gamble.wasm':25658069},'focusCanvas':true};var e=new Engine(c);e.startGame();}</script></body></html>"></iframe>` },
    knights: { title: "Knights Battle", icon: "⚔️", content: `<iframe style="width:100%;height:100%;border:none;" srcdoc="<html><body style='margin:0;overflow:hidden;background:black;'><script src='https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.loader.js'></script><canvas id='u-canvas' style='width:100vw;height:100vh;'></canvas><script>const c={dataUrl:'https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.data.unityweb',frameworkUrl:'https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.framework.js.unityweb',codeUrl:'https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.wasm.unityweb',companyName:'BANZAI',productName:'War Knights'};createUnityInstance(document.querySelector('#u-canvas'),c);</script></body></html>"></iframe>` },
    doom: { title: "Doom 1993", icon: "🔥", content: `<iframe src="https://dos.zone/player/?bundleUrl=https%3A%2F%2Fcdn.dos.zone%2Fcustom%2Fdos%2Fdoom.jsdos?anonymous=1" style="width:100%;height:100%;border:none;"></iframe>` },
    chess: { title: "Grand Chess", icon: "♟️", content: `<iframe src="https://lichess.org/tv/frame?theme=brown&bg=dark" style="width:100%;height:100%;border:none;"></iframe>` },
    
    // APPS
    browser: { title: "Web Explorer", icon: "🌐", content: `<div style="height:35px;background:#111;display:flex;padding:5px;border-bottom:1px solid #222;"><input type="text" id="url-bar" style="flex:1;background:#000;color:#fff;border:1px solid #333;padding:0 10px;" value="https://www.wikipedia.org"><button onclick="this.parentElement.nextElementSibling.src=document.getElementById('url-bar').value">GO</button></div><iframe src="https://www.wikipedia.org" style="width:100%;height:calc(100% - 35px);border:none;background:#fff;"></iframe>` },
    hacker: { title: "Terminal", icon: "💀", content: `<div style="background:#000;color:#0f0;height:100%;padding:15px;font-family:monospace;font-size:12px;" id="t-out">ROOT@UNTITLED:~$ <input type="text" id="t-in" onkeypress="execTerm(event)" style="background:none;border:none;color:#0f0;outline:none;width:60%;"></div>` },
    store: { title: "U-Store", icon: "🏪", content: `<div style="padding:20px;"><h3>APP REGISTRY</h3><div id="store-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;"></div></div>` },
    paint: { title: "U-Paint", icon: "🎨", content: `<iframe src="https://jspaint.app" style="width:100%;height:100%;border:none;"></iframe>` },
    music: { title: "Synth-Wave", icon: "📻", content: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/jfKfPfyJRdk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` },
    settings: { title: "Settings", icon: "⚙️", content: `<div style="padding:20px;"><h3>OS CONFIG</h3><button onclick="document.body.style.background='linear-gradient(to bottom, #1a0033, #000)'">VIOLET THEME</button><br><br><button onclick="location.reload()">LOCK SYSTEM</button></div>` }
};

const STORE_ITEMS = ['doom', 'chess', 'paint', 'music', 'settings'];

function attemptLogin() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    if(u === "untitled" && p === "king") {
        document.getElementById('boot-screen').classList.add('unlocked');
        document.getElementById('taskbar').style.display = "flex";
        ['store', 'browser', 'hacker', 'dungeon', 'knights'].forEach(id => createShortcut(id));
        renderStore();
    } else {
        document.getElementById('login-err').innerText = "INVALID KEYCODE";
        document.getElementById('password').value = "";
    }
}

function renderStore() {
    setTimeout(() => {
        const grid = document.getElementById('store-grid');
        if(grid) grid.innerHTML = STORE_ITEMS.map(id => `<button style="padding:10px;background:#111;color:#fff;border:1px solid #333;cursor:pointer;" onclick="createShortcut('${id}')">${REGISTRY[id].icon} ${REGISTRY[id].title}</button>`).join('');
    }, 100);
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
    const winId = 'win-'+Math.random().toString(36).substr(2, 9);
    const win = document.createElement('div');
    win.className = 'window'; win.id = winId;
    win.style.top = "60px"; win.style.left = "150px";
    win.style.width = "650px"; win.style.height = "450px";
    win.innerHTML = `<div class="win-header"><span>${REGISTRY[id].title}</span><button class="close-btn" onclick="this.closest('.window').remove()">X</button></div><div class="win-body">${REGISTRY[id].content}</div>`;
    document.getElementById('desktop').appendChild(win);
    initMove(win);
}

function initMove(el) {
    const h = el.querySelector('.win-header');
    h.onmousedown = (e) => {
        let ox = e.clientX - el.offsetLeft, oy = e.clientY - el.offsetTop;
        document.onmousemove = (e) => { el.style.left = (e.clientX - ox)+'px'; el.style.top = (e.clientY - oy)+'px'; };
        document.onmouseup = () => { document.onmousemove = null; };
    };
}

function execTerm(e) {
    if(e.key === 'Enter') {
        const cmd = e.target.value.toLowerCase();
        if(cmd === 'clear') document.getElementById('t-out').innerHTML = 'ROOT@UNTITLED:~$ <input type="text" id="t-in" onkeypress="execTerm(event)" style="background:none;border:none;color:#0f0;outline:none;width:60%;">';
        e.target.value = '';
    }
}

setInterval(() => { document.getElementById('clock').innerText = new Date().toLocaleTimeString(); }, 1000);
