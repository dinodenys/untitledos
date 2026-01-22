const REGISTRY = {
    browser: { title: "Web Explorer", icon: "🌐", content: `<iframe src="https://www.bing.com" style="width:100%;height:100%;border:none;"></iframe>` },
    dungeon: { title: "Dungeon Gamblers", icon: "🃏", content: `<iframe style="width:100%;height:100%;border:none;" srcdoc="<html><head><base href='https://cdn.jsdelivr.net/gh/Stinkalistic/UGS@main/MISC/dungeongamble/'><style>body,html{margin:0;padding:0;overflow:hidden;background:black;}</style></head><body><script src='gamble.js'></script><canvas id='canvas' style='width:100vw; height:100vh;'></canvas><script>window.onload=function(){const c={'args':[],'canvasResizePolicy':2,'executable':'gamble','fileSizes':{'index.pck':97937408,'gamble.wasm':25658069},'focusCanvas':true};var e=new Engine(c);e.startGame();}</script></body></html>"></iframe>` },
    knights: { title: "Knights Battle", icon: "⚔️", content: `<iframe style="width:100%;height:100%;border:none;" srcdoc="<html><body style='margin:0;overflow:hidden;background:black;'><script src='https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.loader.js'></script><canvas id='u-canvas' style='width:100vw;height:100vh;'></canvas><script>const c={dataUrl:'https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.data.unityweb',frameworkUrl:'https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.framework.js.unityweb',codeUrl:'https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.wasm.unityweb',companyName:'BANZAI',productName:'War Knights'};createUnityInstance(document.querySelector('#u-canvas'),c);</script></body></html>"></iframe>` },
    hacker: { title: "Terminal", icon: "💀", content: `<div style="background:#000;color:#0f0;height:100%;padding:10px;font-family:monospace;">root@untitled:~$ <input type="text" style="background:none;border:none;color:#0f0;outline:none;"></div>` },
    store: { title: "U-Store", icon: "🏪", content: `<div style="padding:20px;"><h3>Market</h3><button onclick="createShortcut('notes')">Install Notepad</button></div>` },
    notes: { title: "Notepad", icon: "📝", content: `<textarea style="width:100%;height:100%;border:none;padding:10px;"></textarea>` }
};

// SECURE LOGIN LOGIC
function attemptLogin() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    const err = document.getElementById('login-err');

    if(u === "untitled" && p === "king") {
        // Remove Lock Screen
        document.getElementById('boot-screen').classList.add('unlocked');
        // Show Taskbar
        document.getElementById('taskbar').style.display = "flex";
        // Initialize Desktop
        ['store', 'browser', 'hacker', 'dungeon', 'knights'].forEach(id => createShortcut(id));
    } else {
        err.innerText = "AUTHENTICATION FAILURE";
        document.getElementById('password').value = "";
    }
}

function createShortcut(id) {
    if(document.getElementById('icon-'+id)) return;
    const d = document.getElementById('desktop');
    const s = document.createElement('div');
    s.className = 'shortcut'; s.id = 'icon-'+id;
    s.onclick = () => openApp(id);
    s.innerHTML = `<span style="font-size:40px;display:block;">${REGISTRY[id].icon}</span><span style="font-size:11px;">${REGISTRY[id].title}</span>`;
    s.style.textAlign = "center"; s.style.cursor = "pointer"; s.style.width = "80px";
    d.appendChild(s);
}

function openApp(id) {
    const winId = 'win-'+Math.floor(Math.random()*1000);
    const win = document.createElement('div');
    win.className = 'window'; win.id = winId;
    win.style = "position:absolute;top:50px;left:100px;width:600px;height:400px;background:#111;border:1px solid #333;display:flex;flex-direction:column;resize:both;overflow:hidden;";
    win.innerHTML = `
        <div style="background:#222;padding:10px;display:flex;justify-content:space-between;cursor:move;" class="win-header">
            <span>${REGISTRY[id].title}</span>
            <button onclick="this.closest('.window').remove()" style="background:red;border:none;color:white;cursor:pointer;">X</button>
        </div>
        <div style="flex:1;">${REGISTRY[id].content}</div>
    `;
    document.getElementById('desktop').appendChild(win);
    
    // Simple Drag Logic
    const header = win.querySelector('.win-header');
    header.onmousedown = (e) => {
        let ox = e.clientX - win.offsetLeft, oy = e.clientY - win.offsetTop;
        document.onmousemove = (e) => { win.style.left = (e.clientX - ox)+'px'; win.style.top = (e.clientY - oy)+'px'; };
        document.onmouseup = () => { document.onmousemove = null; };
    };
}

setInterval(() => { document.getElementById('clock').innerText = new Date().toLocaleTimeString(); }, 1000);
