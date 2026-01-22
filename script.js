const REGISTRY = {
    browser: { title: "Web Explorer", icon: "🌐", content: `
        <div class="browser-nav">
            <input type="text" id="url-in" placeholder="Search Google or type URL..." onkeypress="if(event.key==='Enter') execSearch()">
            <button onclick="execSearch()">Go</button>
        </div>
        <iframe id="b-frame" src="https://www.bing.com"></iframe>`
    },
    dungeon: { title: "Dungeon Gamblers", icon: "🃏", content: `
        <iframe srcdoc="<html><head><base href='https://cdn.jsdelivr.net/gh/Stinkalistic/UGS@main/MISC/dungeongamble/'><style>body,html{margin:0;padding:0;overflow:hidden;background:black;}</style></head><body><script src='gamble.js'></script><canvas id='canvas' style='width:100vw; height:100vh;'></canvas><script>window.onload=function(){const c={'args':[],'canvasResizePolicy':2,'executable':'gamble','fileSizes':{'index.pck':97937408,'gamble.wasm':25658069},'focusCanvas':true};var e=new Engine(c);e.startGame();}</script></body></html>"></iframe>`
    },
    knights: { title: "Knights Battle", icon: "⚔️", content: `
        <iframe srcdoc="<html><body style='margin:0;overflow:hidden;background:black;'><script src='https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.loader.js'></script><canvas id='u-canvas' style='width:100vw;height:100vh;'></canvas><script>const c={dataUrl:'https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.data.unityweb',frameworkUrl:'https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.framework.js.unityweb',codeUrl:'https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.wasm.unityweb',companyName:'BANZAI',productName:'War Knights'};createUnityInstance(document.querySelector('#u-canvas'),c);</script></body></html>"></iframe>`
    },
    hacker: { title: "Terminal", icon: "💀", content: `
        <div class="terminal">
            <div id="h-log">[LOCAL NODE ACTIVE] Type 'print message' to broadcast.</div>
            <span style="color:#39ff14">root@uOS:~$ </span><input type="text" id="h-in" onkeypress="hackerExec(event)" style="background:none; border:none; color:#39ff14; outline:none; width:70%; font-family:monospace;">
        </div>`
    },
    calc: { title: "Calculator", icon: "🔢", content: `
        <div style="padding:15px; background:#000; text-align:right; font-size:24px;" id="c-disp">0</div>
        <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:5px; padding:10px;">
            ${['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map(v=>`<button style='padding:15px;background:#333;color:white;border:none;' onclick="calc('${v}')">${v}</button>`).join('')}
        </div>`
    },
    store: { title: "U-Store", icon: "🏪", content: `
        <div style="padding:20px;">
            <h3>App Repository</h3>
            <div id="store-target"></div>
        </div>`
    }
};

const INITIAL_APPS = ['store', 'browser', 'hacker'];
const STORE_CATALOG = ['dungeon', 'knights', 'calc'];

window.onload = () => {
    INITIAL_APPS.forEach(id => createShortcut(id));
    setInterval(() => { document.getElementById('clock').innerText = new Date().toLocaleTimeString(); }, 1000);
};

function createShortcut(id) {
    if(document.getElementById(`icon-${id}`)) return;
    const desktop = document.getElementById('desktop');
    const div = document.createElement('div');
    div.className = 'shortcut'; div.id = `icon-${id}`;
    div.onclick = () => openApp(id);
    div.innerHTML = `<span>${REGISTRY[id].icon}</span><span>${REGISTRY[id].title}</span>`;
    desktop.appendChild(div);
}

function openApp(id) {
    const app = REGISTRY[id];
    const winId = `win-${id}-${Math.floor(Math.random()*1000)}`;
    const win = document.createElement('div');
    win.className = 'window'; win.id = winId;
    win.style.width = "600px"; win.style.height = "450px";
    win.style.top = "50px"; win.style.left = "100px";

    win.innerHTML = `
        <div class="win-header">
            <div class="win-controls">
                <button class="control-btn close" onclick="closeApp('${winId}')"></button>
                <button class="control-btn max" onclick="toggleMax('${winId}')"></button>
                <button class="control-btn min" onclick="alert('App minimized')"></button>
            </div>
            <span>${app.icon} ${app.title}</span>
        </div>
        <div class="win-body">${id === 'store' ? renderStore() : app.content}</div>
        <div class="resizer"></div>
    `;

    document.getElementById('desktop').appendChild(win);
    initDrag(win); initResize(win); addTab(app.title, winId);
}

function renderStore() {
    return STORE_CATALOG.map(id => `
        <div class="store-item">
            <span>${REGISTRY[id].icon} ${REGISTRY[id].title}</span>
            <button onclick="createShortcut('${id}')" style="background:#0078d4; color:white; border:none; padding:5px 12px; border-radius:4px; cursor:pointer;">Install</button>
        </div>
    `).join('');
}

// BROWSER GOOGLE SEARCH LOGIC
window.execSearch = () => {
    const val = document.getElementById('url-in').value;
    const frame = document.getElementById('b-frame');
    if (!val.startsWith('http')) {
        frame.src = "https://www.bing.com/search?q=" + encodeURIComponent(val);
    } else {
        frame.src = val;
    }
};

// HACKER BROADCAST LOGIC
window.hackerExec = (e) => {
    if(e.key === 'Enter') {
        const input = document.getElementById('h-in');
        if(input.value.startsWith('print ')) {
            const msg = input.value.substring(6);
            const overlay = document.createElement('div');
            overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(255,0,0,0.9); z-index:10000; color:white; display:flex; align-items:center; justify-content:center; font-size:40px; text-align:center; padding:20px; font-family:monospace;";
            overlay.innerHTML = `[BROADCAST INCOMING]<br>${msg.toUpperCase()}`;
            document.body.appendChild(overlay);
            setTimeout(() => overlay.remove(), 3000);
        }
        input.value = "";
    }
};

// WINDOW CONTROLS
window.closeApp = (id) => { 
    document.getElementById(id).remove(); 
    document.querySelector(`[data-ref="${id}"]`).remove();
};

window.toggleMax = (id) => {
    document.getElementById(id).classList.toggle('maximized');
};

function addTab(title, id) {
    const tab = document.createElement('div');
    tab.className = 'tab'; tab.innerText = title; tab.setAttribute('data-ref', id);
    document.getElementById('active-tabs').appendChild(tab);
}

// DRAG & RESIZE ENGINES
function initResize(win) {
    const resizer = win.querySelector('.resizer');
    resizer.onmousedown = (e) => {
        e.preventDefault();
        window.onmousemove = (e) => {
            win.style.width = (e.pageX - win.getBoundingClientRect().left) + 'px';
            win.style.height = (e.pageY - win.getBoundingClientRect().top) + 'px';
        };
        window.onmouseup = () => { window.onmousemove = null; };
    };
}

function initDrag(win) {
    const header = win.querySelector('.win-header');
    header.onmousedown = (e) => {
        if(win.classList.contains('maximized')) return;
        let ox = e.clientX - win.offsetLeft;
        let oy = e.clientY - win.offsetTop;
        document.onmousemove = (e) => {
            win.style.left = (e.clientX - ox) + 'px';
            win.style.top = (e.clientY - oy) + 'px';
        };
        document.onmouseup = () => { document.onmousemove = null; };
    };
}

window.calc = (v) => {
    const d = document.getElementById('c-disp');
    if(v === '=') { try{ d.innerText = eval(d.innerText); } catch{ d.innerText = "Error"; } }
    else if(d.innerText === '0' || d.innerText === 'Error') { d.innerText = v; }
    else { d.innerText += v; }
};
