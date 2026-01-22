const REGISTRY = {
    // SYSTEM CORE
    browser: { title: "Web Explorer", icon: "🌐", content: `
        <div style="height:40px; background:#1a1a1a; display:flex; padding:5px; gap:5px;">
            <button onclick="this.nextElementSibling.src='https://www.bing.com'">🏠</button>
            <input type="text" id="url-input" style="flex:1; background:#000; color:#fff; border:1px solid #333; padding:0 10px;" value="https://www.bing.com">
            <button onclick="this.previousElementSibling.src=this.previousElementSibling.value">GO</button>
        </div>
        <iframe src="https://www.bing.com" style="width:100%; height:calc(100% - 40px); border:none; background:#fff;"></iframe>` 
    },
    ai: { title: "Nexus AI", icon: "🧠", content: `
        <div style="height:100%; display:flex; flex-direction:column; background:#0a0a0a; color:#0f0; padding:15px; font-family:monospace;">
            <div id="ai-chat" style="flex:1; overflow-y:auto; margin-bottom:10px;">[Nexus Core Online] How can I assist?</div>
            <input type="text" id="ai-in" placeholder="Ask anything..." style="background:#111; border:1px solid #0f0; color:#0f0; padding:10px;" onkeypress="if(event.key==='Enter') nexusQuery(this)">
        </div>`
    },
    // PRODUCTION APPS
    write: { title: "U-Write", icon: "🖋️", content: `<textarea style="width:100%; height:100%; background:#fff; color:#000; border:none; padding:20px; font-family:serif; font-size:18px; outline:none;" placeholder="Type your document..."></textarea>` },
    code: { title: "Code Runner", icon: "⌨️", content: `
        <div style="height:100%; display:flex; flex-direction:column;">
            <textarea id="js-code" style="flex:1; background:#1e1e1e; color:#dcdcdc; font-family:monospace; padding:10px; border:none;" placeholder="// Write JS here..."></textarea>
            <button onclick="try{eval(document.getElementById('js-code').value)}catch(e){alert(e)}" style="height:30px; background:#28c840; border:none; color:white; font-weight:bold; cursor:pointer;">RUN CODE</button>
        </div>`
    },
    paint: { title: "U-Paint", icon: "🎨", content: `<iframe src="https://jspaint.app" style="width:100%; height:100%; border:none;"></iframe>` },
    // GAMES
    dungeon: { title: "Dungeon Gamblers", icon: "🃏", content: `<iframe style="width:100%;height:100%;border:none;" srcdoc="<html><head><base href='https://cdn.jsdelivr.net/gh/Stinkalistic/UGS@main/MISC/dungeongamble/'><style>body,html{margin:0;padding:0;overflow:hidden;background:black;}</style></head><body><script src='gamble.js'></script><canvas id='canvas' style='width:100vw; height:100vh;'></canvas><script>window.onload=function(){const c={'args':[],'canvasResizePolicy':2,'executable':'gamble','fileSizes':{'index.pck':97937408,'gamble.wasm':25658069},'focusCanvas':true};var e=new Engine(c);e.startGame();}</script></body></html>"></iframe>` },
    knights: { title: "Knights Battle", icon: "⚔️", content: `<iframe style="width:100%;height:100%;border:none;" srcdoc="<html><body style='margin:0;overflow:hidden;background:black;'><script src='https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.loader.js'></script><canvas id='u-canvas' style='width:100vw;height:100vh;'></canvas><script>const c={dataUrl:'https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.data.unityweb',frameworkUrl:'https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.framework.js.unityweb',codeUrl:'https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.wasm.unityweb',companyName:'BANZAI',productName:'War Knights'};createUnityInstance(document.querySelector('#u-canvas'),c);</script></body></html>"></iframe>` },
    // SYSTEM
    store: { title: "U-Store", icon: "🏪", content: `<div style="padding:20px;"><h3>Marketplace</h3><div id="store-list" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;"></div></div>` },
    settings: { title: "Settings", icon: "⚙️", content: `<div style="padding:20px;"><h3>System</h3><button onclick="document.body.style.background='#1a0000'">Security Red</button><br><br><button onclick="location.reload()">Force Logout</button></div>` }
};

const STORE_CATALOG = ['ai', 'write', 'code', 'paint', 'settings'];

function attemptLogin() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    if(u === "untitled" && p === "king") {
        document.getElementById('boot-screen').classList.add('unlocked');
        document.getElementById('taskbar').style.display = "flex";
        ['store', 'browser', 'dungeon', 'knights'].forEach(id => createShortcut(id));
        renderStore();
    } else {
        document.getElementById('login-err').innerText = "INVALID ACCESS KEY";
        document.getElementById('password').value = "";
    }
}

function renderStore() {
    setTimeout(() => {
        const list = document.getElementById('store-list');
        if(list) list.innerHTML = STORE_CATALOG.map(id => `<button style="padding:15px; background:#111; color:#fff; border:1px solid #333; cursor:pointer;" onclick="createShortcut('${id}')">${REGISTRY[id].icon} ${REGISTRY[id].title}</button>`).join('');
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
    win.style.width = "700px"; win.style.height = "500px";
    win.innerHTML = `<div class="win-header"><span>${REGISTRY[id].icon} ${REGISTRY[id].title}</span><button class="close-btn" onclick="this.closest('.window').remove()"></button></div><div class="win-body">${REGISTRY[id].content}</div>`;
    document.getElementById('desktop').appendChild(win);
    initDrag(win);
}

function initDrag(el) {
    const h = el.querySelector('.win-header');
    h.onmousedown = (e) => {
        let ox = e.clientX - el.offsetLeft, oy = e.clientY - el.offsetTop;
        document.onmousemove = (e) => { el.style.left = (e.clientX - ox)+'px'; el.style.top = (e.clientY - oy)+'px'; };
        document.onmouseup = () => { document.onmousemove = null; };
    };
}

function nexusQuery(el) {
    const chat = document.getElementById('ai-chat');
    chat.innerHTML += `<div style="color:#fff;">> ${el.value}</div>`;
    setTimeout(() => {
        chat.innerHTML += `<div style="color:#0f0;">Nexus: I have processed your request. Command accepted.</div>`;
        chat.scrollTop = chat.scrollHeight;
    }, 500);
    el.value = "";
}

setInterval(() => { document.getElementById('clock').innerText = new Date().toLocaleTimeString(); }, 1000);
