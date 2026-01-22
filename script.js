const apps = {
    repl: { title: "Code Lab IDE", content: `
        <p>Inject System JavaScript:</p>
        <textarea id="editor">document.body.style.filter = 'grayscale(1)';</textarea>
        <button onclick="runCode()" style="margin-top:10px; width:100%; padding:12px; background:#2563eb; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:600;">EXECUTE SCRIPT</button>` 
    },
    hacker: { title: "Ghost Net Terminal", content: `
        <div class="terminal">
            <div id="h-log">[LOCAL_NODE CONNECTED... SCANNING...]</div>
            root@uOS:~$ <input type="text" id="h-in" onkeypress="hackAction(event)" style="background:none; border:none; color:#39ff14; outline:none; width:70%">
        </div>` 
    },
    browser: { title: "Web Explorer", content: `
        <div style="display:flex; gap:10px; margin-bottom:10px;">
            <input type="text" id="url" value="https://www.wikipedia.org" style="flex:1; background:#222; color:white; border:1px solid #444; padding:5px; border-radius:4px;">
            <button onclick="document.getElementById('frame').src = document.getElementById('url').value">GO</button>
        </div>
        <iframe id="frame" src="https://www.wikipedia.org" style="width:100%; height:250px; background:white; border-radius:6px;"></iframe>`
    },
    monitor: { title: "System Monitor", content: `
        <div style="font-family:monospace; color:#39ff14;">
            <p>CPU LOAD: <span id="cpu-load">12%</span></p>
            <div style="width:100%; height:12px; background:#1e293b; border-radius:10px;"><div id="cpu-bar" style="width:12%; height:100%; background:#39ff14; border-radius:10px; transition: 0.5s;"></div></div>
            <p>MEMORY: 2.4GB / 16GB</p>
            <p>NETWORK: ENCRYPTED</p>
        </div>`
    },
    files: { title: "File System", content: `
        <div class="file-item">📁 System_Core</div>
        <div class="file-item">📁 User_Data</div>
        <div class="file-item" onclick="openApp('repl')">📄 payload.js</div>
        <div class="file-item" onclick="alert('Access Denied: Root Required')">🔐 passwords.db</div>`
    },
    ai: { title: "AI Assistant", content: `<div id="ai-log" style="height:200px; overflow:auto;">System AI initialized. How can I help?</div><hr><input type="text" id="ai-in" onkeypress="aiAction(event)" style="width:100%; padding:8px; background:#1e293b; color:white; border:none;">` },
    rpg: { title: "Chaos Quest", content: `<canvas id="rpg" width="380" height="250" style="background:#000; border-radius:8px;"></canvas>` },
    settings: { title: "System Settings", content: `<button onclick="document.body.style.background = 'linear-gradient(to right, #4facfe, #00f2fe)'">Set Blue Theme</button><br><br><button onclick="document.body.style.background = 'radial-gradient(circle, #0f172a 0%, #020617 100%)'">Set Dark Theme</button>` }
};

function openApp(id) {
    const app = apps[id];
    const win = document.createElement('div');
    win.className = 'window';
    win.style.top = "100px"; win.style.left = "150px";
    win.innerHTML = `
        <div class="win-header"><strong>${app.title}</strong><button onclick="this.closest('.window').remove()" style="color:white; background:none; border:none; cursor:pointer; font-size:18px;">&times;</button></div>
        <div class="win-body">${app.content}</div>
    `;
    document.getElementById('desktop').appendChild(win);
    makeDraggable(win);
    if(id === 'rpg') runRPG();
}

// DRAGGABLE LOGIC
function makeDraggable(el) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    el.querySelector('.win-header').onmousedown = dragMouseDown;
    function dragMouseDown(e) { e.preventDefault(); pos3 = e.clientX; pos4 = e.clientY; document.onmouseup = closeDragElement; document.onmousemove = elementDrag; }
    function elementDrag(e) { e.preventDefault(); pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY; pos3 = e.clientX; pos4 = e.clientY; el.style.top = (el.offsetTop - pos2) + "px"; el.style.left = (el.offsetLeft - pos1) + "px"; }
    function closeDragElement() { document.onmouseup = null; document.onmousemove = null; }
}

// COMPILER ENGINE
window.runCode = () => { try { new Function(document.getElementById('editor').value)(); } catch(e) { alert(e); } }

// HACKING ENGINE
window.hackAction = (e) => {
    if(e.key === 'Enter') {
        const log = document.getElementById('h-log');
        const val = document.getElementById('h-in').value;
        log.innerHTML += `<div>> ${val}</div>`;
        if(val.startsWith('send')) {
            log.innerHTML += `<div style="color:red">PAYLOAD INJECTED!</div>`;
            document.body.style.animation = "glitch 0.2s 3";
            setTimeout(() => document.body.style.animation = "", 600);
        }
        document.getElementById('h-in').value = "";
    }
}

// AI ENGINE
window.aiAction = (e) => {
    if(e.key === 'Enter') {
        const log = document.getElementById('ai-log');
        log.innerHTML += `<div>You: ${document.getElementById('ai-in').value}</div><div>AI: Command acknowledged. OS state stable.</div>`;
        document.getElementById('ai-in').value = "";
    }
}

// RPG ENGINE
function runRPG() {
    const ctx = document.getElementById('rpg').getContext('2d');
    let x = 10, y = 10;
    function animate() {
        ctx.clearRect(0,0,400,300);
        ctx.fillStyle = "#2563eb";
        ctx.fillRect(x, y, 20, 20);
        x = (x + 1) % 360;
        requestAnimationFrame(animate);
    }
    animate();
}

// CLOCK & MONITOR
setInterval(() => {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString();
    const load = Math.floor(Math.random() * 60);
    if(document.getElementById('cpu-load')) {
        document.getElementById('cpu-load').innerText = load + "%";
        document.getElementById('cpu-bar').style.width = load + "%";
    }
}, 1000);
