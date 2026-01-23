const REGISTRY = {
    // SYSTEM
    store: { title: "U-Store", icon: "🏪", content: `<div style="padding:20px;"><h3>Marketplace</h3><div id="store-target" style="display:grid;grid-template-columns:1fr;gap:10px;"></div></div>` },
    settings: { title: "Settings", icon: "⚙️", content: `<div style="padding:20px;"><h3>System</h3><button onclick="location.reload()">Reboot System</button></div>` },
    
    // APPS
    ai: { title: "Nexus AI", icon: "🧠", content: `<div style="height:100%;display:flex;flex-direction:column;padding:15px;color:#0f0;font-family:monospace;"><div id="ai-chat" style="flex:1;overflow-y:auto;">[Nexus Core] Waiting...</div><input type="text" onkeypress="if(event.key==='Enter')nexusQuery(this)" style="background:#111;border:1px solid #333;color:#0f0;padding:10px;outline:none;"></div>` },
    browser: { title: "Browser", icon: "🌐", content: `<iframe src="https://www.bing.com" style="width:100%;height:100%;border:none;"></iframe>` },
    paint: { title: "U-Paint", icon: "🎨", content: `<iframe src="https://jspaint.app" style="width:100%;height:100%;border:none;"></iframe>` },
    write: { title: "U-Write", icon: "🖋️", content: `<textarea style="width:100%;height:100%;background:#fff;color:#000;padding:20px;border:none;outline:none;font-size:16px;"></textarea>` },
    code: { title: "Code Runner", icon: "⌨️", content: `<textarea id="c-in" style="width:100%;height:calc(100% - 40px);background:#1e1e1e;color:#fff;padding:10px;font-family:monospace;border:none;"></textarea><button onclick="eval(document.getElementById('c-in').value)" style="width:100%;height:40px;cursor:pointer;">RUN JS</button>` },

    // GAMES
    rpg: { title: "Python RPG", icon: "📜", content: `<div style="height:100%;display:flex;flex-direction:column;"><textarea id="py-in" style="flex:1;background:#000;color:#0f0;padding:10px;font-family:monospace;border:none;"># RPG Code Here\nprint("Hero spawned...")</textarea><button onclick="runPython()" style="padding:10px;cursor:pointer;">RUN PYTHON</button><div id="py-out" style="height:100px;background:#050505;color:#fff;padding:10px;overflow-y:auto;font-family:monospace;white-space:pre;"></div></div>` },
    dungeon: { title: "Dungeon Gamblers", icon: "🃏", content: `<iframe style="width:100%;height:100%;border:none;" srcdoc="<html><head><base href='https://cdn.jsdelivr.net/gh/Stinkalistic/UGS@main/MISC/dungeongamble/'><style>body,html{margin:0;padding:0;overflow:hidden;background:black;}</style></head><body><script src='gamble.js'></script><canvas id='canvas' style='width:100vw; height:100vh;'></canvas><script>window.onload=function(){const c={'args':[],'canvasResizePolicy':2,'executable':'gamble','fileSizes':{'index.pck':97937408,'gamble.wasm':25658069},'focusCanvas':true};var e=new Engine(c);e.startGame();}</script></body></html>"></iframe>` },
    knights: { title: "Knights Battle", icon: "⚔️", content: `<iframe style="width:100%;height:100%;border:none;" srcdoc="<html><body style='margin:0;overflow:hidden;background:black;'><script src='https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.loader.js'></script><canvas id='u-canvas' style='width:100vw;height:100vh;'></canvas><script>const c={dataUrl:'https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.data.unityweb',frameworkUrl:'https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.framework.js.unityweb',codeUrl:'https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.wasm.unityweb',companyName:'BANZAI',productName:'War Knights'};createUnityInstance(document.querySelector('#u-canvas'),c);</script></body></html>"></iframe>` }
};

const STORE_LIST = ['ai', 'write', 'code', 'paint', 'settings'];

function attemptLogin() {
    if(document.getElementById('username').value === "untitled" && document.getElementById('password').value === "king") {
        document.getElementById('boot-screen').style.display = "none";
        document.getElementById('taskbar').style.display = "flex";
        ['store', 'browser', 'rpg', 'dungeon', 'knights'].forEach(id => createShortcut(id));
    } else {
        document.getElementById('login-err').innerText = "DENIED";
    }
}

function createShortcut(id) {
    if(document.getElementById('icon-'+id)) return;
    const s = document.createElement('div');
    s.className = 'shortcut'; s.id = 'icon-'+id;
    s.onclick = () => openApp(id);
    s.innerHTML = `<span>${REGISTRY[id].icon}</span><span>${REGISTRY[id].title}</span>`;
    document.getElementById('desktop').appendChild(s);
}

function openApp(id) {
    const win = document.createElement('div');
    win.className = 'window';
    win.style = "position:absolute; top:80px; left:120px; width:650px; height:480px;";
    win.innerHTML = `
        <div class="win-header">
            <span>${REGISTRY[id].icon} ${REGISTRY[id].title}</span>
            <button class="close-btn" onclick="this.closest('.window').remove()"></button>
        </div>
        <div class="win-body">${REGISTRY[id].content}</div>`;
    document.getElementById('desktop').appendChild(win);
    initDrag(win);
    
    // DELAYED RENDER FOR STORE
    if(id === 'store') {
        setTimeout(renderStore, 50);
    }
}

function renderStore() {
    const target = document.getElementById('store-target');
    if(target) {
        target.innerHTML = STORE_LIST.map(id => `
            <div style="padding:10px; border:1px solid #222; background:#111; display:flex; justify-content:space-between; align-items:center;">
                <span>${REGISTRY[id].icon} ${REGISTRY[id].title}</span>
                <button onclick="createShortcut('${id}')" style="padding:5px 15px; cursor:pointer;">INSTALL</button>
            </div>
        `).join('');
    }
}

function initDrag(el) {
    const h = el.querySelector('.win-header');
    h.onmousedown = (e) => {
        let ox = e.clientX - el.offsetLeft, oy = e.clientY - el.offsetTop;
        document.onmousemove = (e) => { el.style.left = (e.clientX - ox)+'px'; el.style.top = (e.clientY - oy)+'px'; };
        document.onmouseup = () => { document.onmousemove = null; };
    };
}

window.nexusQuery = (el) => {
    const chat = document.getElementById('ai-chat');
    chat.innerHTML += `<div>> ${el.value}</div>`;
    setTimeout(() => { chat.innerHTML += `<div>Nexus: Command processed.</div>`; chat.scrollTop = chat.scrollHeight; }, 600);
    el.value = "";
}

window.runPython = () => {
    const code = document.getElementById('py-in').value;
    const out = document.getElementById('py-out');
    out.innerText = "Initializing...\n";
    try { __BRYTHON__.run_python(code); } catch(e) { out.innerText += "Error: " + e; }
}

setInterval(() => { document.getElementById('clock').innerText = new Date().toLocaleTimeString(); }, 1000);
