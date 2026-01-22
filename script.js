const REGISTRY = {
    // --- GAMES ---
    dungeon: { title: "Dungeon Gamblers", icon: "🃏", content: `<iframe style="width:100%;height:100%;border:none;" srcdoc="<html><head><base href='https://cdn.jsdelivr.net/gh/Stinkalistic/UGS@main/MISC/dungeongamble/'><style>body,html{margin:0;padding:0;overflow:hidden;background:black;}</style></head><body><script src='gamble.js'></script><canvas id='canvas' style='width:100vw; height:100vh;'></canvas><script>window.onload=function(){const c={'args':[],'canvasResizePolicy':2,'executable':'gamble','fileSizes':{'index.pck':97937408,'gamble.wasm':25658069},'focusCanvas':true};var e=new Engine(c);e.startGame();}</script></body></html>"></iframe>` },
    knights: { title: "Knights Battle", icon: "⚔️", content: `<iframe style="width:100%;height:100%;border:none;" srcdoc="<html><body style='margin:0;overflow:hidden;background:black;'><script src='https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.loader.js'></script><canvas id='u-canvas' style='width:100vw;height:100vh;'></canvas><script>const c={dataUrl:'https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.data.unityweb',frameworkUrl:'https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.framework.js.unityweb',codeUrl:'https://cdn.jsdelivr.net/gh/pegege-classroom/swwq@main/Build/War The Knights Battle Arena Swords 3D.wasm.unityweb',companyName:'BANZAI',productName:'War Knights'};createUnityInstance(document.querySelector('#u-canvas'),c);</script></body></html>"></iframe>` },
    rpg: { title: "Python RPG Player", icon: "📜", content: `
        <div style="height:100%; display:flex; flex-direction:column; background:#1e1e1e;">
            <div style="padding:5px; background:#333; font-size:10px;">PASTE YOUR PYTHON CODE BELOW</div>
            <textarea id="py-code" style="flex:1; background:#000; color:#0f0; font-family:monospace; border:none; padding:10px;">
# Your Python RPG Code
print("Initializing RPG...")
name = "Traveler"
print(f"Welcome to the Quest, {name}!")
            </textarea>
            <button onclick="runPython()" style="background:#444; color:#fff; border:none; padding:10px; cursor:pointer;">RUN QUEST</button>
            <div id="py-output" style="height:150px; background:#000; color:#fff; padding:10px; overflow-y:auto; border-top:1px solid #333; font-family:monospace; white-space:pre;"></div>
        </div>`
    },

    // --- APPS ---
    ai: { title: "Nexus AI", icon: "🧠", content: `<div id="ai-chat" style="height:calc(100% - 40px); overflow-y:auto; padding:10px; font-family:monospace; color:#0f0;"></div><input type="text" id="ai-in" style="width:100%; height:40px; background:#111; color:#fff; border:none; padding:10px;" placeholder="Command Nexus..." onkeypress="if(event.key==='Enter') nexusQuery(this)">` },
    browser: { title: "Web Explorer", icon: "🌐", content: `<div style="display:flex;background:#222;"><input type="text" id="u-url" style="flex:1" value="https://www.wikipedia.org"><button onclick="this.nextElementSibling.src=document.getElementById('u-url').value">GO</button></div><iframe src="https://www.wikipedia.org" style="width:100%;height:100%;border:none;background:#fff;"></iframe>` },
    chat: { title: "Secure Chat", icon: "💬", content: `<div style="padding:20px; color:#555;">[ENCRYPTED CHANNEL 09]<br><br><span style="color:#0f0;">User_77:</span> Package delivered.<br><span style="color:#fff;">You:</span> Acknowledged.</div>` },
    paint: { title: "U-Paint", icon: "🎨", content: `<iframe src="https://jspaint.app" style="width:100%;height:100%;border:none;"></iframe>` },
    write: { title: "U-Write", icon: "🖋️", content: `<textarea style="width:100%;height:100%;padding:20px;font-family:serif;font-size:18px;"></textarea>` },
    calc: { title: "Calculator", icon: "🔢", content: `<div style="padding:20px; font-size:2em; text-align:right;" id="cl-res">0</div><div style="display:grid;grid-template-columns:repeat(4,1fr); gap:5px;">${['7','8','9','/','4','5','6','*','1','2','3','-','0','C','=','+'].map(v=>`<button onclick="uCalc('${v}')">${v}</button>`).join('')}</div>` },
    store: { title: "U-Store", icon: "🏪", content: `<div style="padding:20px;"><h3>Repository</h3><div id="store-target"></div></div>` },
    settings: { title: "Settings", icon: "⚙️", content: `<div style="padding:20px;"><button onclick="document.body.style.background='red'">PANIC MODE</button><br><br><button onclick="location.reload()">LOCK OS</button></div>` }
};

const STORE_LIST = ['ai', 'chat', 'paint', 'write', 'calc', 'settings', 'rpg'];

function attemptLogin() {
    if(document.getElementById('username').value === "untitled" && document.getElementById('password').value === "king") {
        document.getElementById('boot-screen').style.display = "none";
        document.getElementById('taskbar').style.display = "flex";
        ['store', 'browser', 'hacker', 'dungeon', 'knights', 'rpg'].forEach(id => createShortcut(id));
        renderStore();
        brython(); // Init Python Engine
    } else {
        document.getElementById('login-err').innerText = "ACCESS DENIED";
    }
}

// Python RPG Execution Logic
window.runPython = function() {
    const code = document.getElementById('py-code').value;
    const output = document.getElementById('py-output');
    output.innerHTML = "Running Python Kernel...\n";
    // Mocking print to display in our window
    try {
        // This is a bridge for Brython to talk to our UI
        eval( __BRYTHON__.run_python(code) );
    } catch(e) {
        output.innerHTML += "Python Error: " + e;
    }
};

function renderStore() {
    setTimeout(() => {
        const target = document.getElementById('store-target');
        if(target) target.innerHTML = STORE_LIST.map(id => `<div style="padding:10px; border:1px solid #333; margin:5px; display:flex; justify-content:space-between;"><span>${REGISTRY[id].icon} ${REGISTRY[id].title}</span><button onclick="createShortcut('${id}')">Get</button></div>`).join('');
    }, 100);
}

function createShortcut(id) {
    if(document.getElementById('icon-'+id)) return;
    const s = document.createElement('div');
    s.className = 'shortcut'; s.id = 'icon-'+id;
    s.onclick = () => openApp(id);
    s.innerHTML = `<span style="font-size:40px; display:block;">${REGISTRY[id].icon}</span><span style="font-size:10px;">${REGISTRY[id].title}</span>`;
    s.style = "width:80px; text-align:center; cursor:pointer; margin:10px;";
    document.getElementById('desktop').appendChild(s);
}

function openApp(id) {
    const win = document.createElement('div');
    win.className = 'window';
    win.style = "position:absolute; top:100px; left:100px; width:600px; height:450px; background:#111; border:1px solid #333; display:flex; flex-direction:column; z-index:100;";
    win.innerHTML = `<div style="background:#222; padding:10px; display:flex; justify-content:space-between; cursor:move;" class="h"><span>${REGISTRY[id].title}</span><button onclick="this.closest('.window').remove()">X</button></div><div style="flex:1; overflow:hidden;">${REGISTRY[id].content}</div>`;
    document.getElementById('desktop').appendChild(win);
    drag(win);
}

function drag(el) {
    const h = el.querySelector('.h');
    h.onmousedown = (e) => {
        let ox = e.clientX - el.offsetLeft, oy = e.clientY - el.offsetTop;
        document.onmousemove = (e) => { el.style.left = (e.clientX - ox)+'px'; el.style.top = (e.clientY - oy)+'px'; };
        document.onmouseup = () => { document.onmousemove = null; };
    };
}

function uCalc(v) {
    const r = document.getElementById('cl-res');
    if(v === '=') r.innerText = eval(r.innerText);
    else if(v === 'C') r.innerText = '0';
    else r.innerText = r.innerText === '0' ? v : r.innerText + v;
}

function nexusQuery(el) {
    const chat = document.getElementById('ai-chat');
    chat.innerHTML += `<div>> ${el.value}</div>`;
    setTimeout(() => { chat.innerHTML += `<div>Nexus: Command processed. Integrity confirmed.</div>`; chat.scrollTop = chat.scrollHeight; }, 500);
    el.value = "";
}

setInterval(() => { document.getElementById('clock').innerText = new Date().toLocaleTimeString(); }, 1000);
