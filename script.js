const OS_APPS = {
    browser: { title: "Firefox AI", content: `
        <div class="browser-ui">
            <div class="address-bar">
                <span style="color:#ff7139">AI</span>
                <input type="text" id="url-input" value="https://www.bing.com">
                <button onclick="navigate()">Go</button>
            </div>
            <div id="ai-insight" style="font-size:11px; color:#aaa; margin-bottom:5px;">AI: Waiting for URL...</div>
            <iframe id="browser-frame" src="https://www.bing.com" style="width:100%; height:250px; background:white; border-radius:5px;"></iframe>
        </div>`
    },
    store: { title: "U-Store", content: `
        <div class="store-grid">
            <div class="app-card"><h3>Snake</h3><button class="install-btn" onclick="installApp('Snake', '🐍')">Install</button></div>
            <div class="app-card"><h3>Space Invaders</h3><button class="install-btn" onclick="installApp('Invaders', '👾')">Install</button></div>
            <div class="app-card"><h3>Tetris</h3><button class="install-btn" onclick="installApp('Tetris', '🧱')">Install</button></div>
            <div class="app-card"><h3>Note Pad</h3><button class="install-btn" onclick="installApp('Notes', '📝')">Install</button></div>
        </div>`
    },
    repl: { title: "Code Lab", content: `
        <textarea id="lab-code" style="width:100%; height:200px; background:#000; color:#38bdf8; font-family:monospace; padding:10px; border:none;">// Write JS here\nalert('System Online');</textarea>
        <button onclick="executeCode()" style="width:100%; margin-top:10px; padding:10px; background:#059669; border:none; color:white; cursor:pointer;">RUN INJECTOR</button>`
    },
    hacker: { title: "Ghost Net Terminal", content: `
        <div id="hack-log" style="background:#000; color:#0f0; font-family:monospace; height:200px; padding:10px; overflow:auto;">[READY TO SCAN NODES]</div>
        <input type="text" id="hack-in" onkeypress="handleHack(event)" style="width:100%; background:#000; color:#0f0; border:1px solid #0f0; outline:none;">`
    }
};

function openApp(id) {
    const app = OS_APPS[id];
    const win = document.createElement('div');
    win.className = 'window';
    win.style.top = "80px"; win.style.left = "100px";
    win.innerHTML = `
        <div class="win-header"><strong>${app.title}</strong><button onclick="this.closest('.window').remove()">✕</button></div>
        <div class="win-body">${app.content}</div>
    `;
    document.getElementById('desktop').appendChild(win);
    dragElement(win);
}

// AI Browser Logic
window.navigate = () => {
    const url = document.getElementById('url-input').value;
    document.getElementById('ai-insight').innerText = "AI: Analyzing " + url + " for safety and speed...";
    setTimeout(() => {
        document.getElementById('browser-frame').src = url;
        document.getElementById('ai-insight').innerText = "AI: Page loaded. Firefox UI optimization complete.";
    }, 1200);
}

// U-Store Installation Logic
window.installApp = (name, icon) => {
    const desktop = document.getElementById('desktop');
    const shortcut = document.createElement('div');
    shortcut.className = 'shortcut';
    shortcut.innerHTML = `${icon}<span>${name}</span>`;
    shortcut.onclick = () => alert("Launching " + name + "...");
    desktop.appendChild(shortcut);
    alert(name + " has been installed!");
}

// Code Lab (Replit) Logic
window.executeCode = () => {
    try { new Function(document.getElementById('lab-code').value)(); } 
    catch(e) { alert("Error: " + e.message); }
}

// Ghost Net Logic
window.handleHack = (e) => {
    if(e.key === 'Enter') {
        const log = document.getElementById('hack-log');
        log.innerHTML += `<div>> ${document.getElementById('hack-in').value}</div>`;
        if(document.getElementById('hack-in').value === 'attack') {
            log.innerHTML += `<div style="color:red">SENDING VIRUS TO SERVER...</div>`;
        }
        document.getElementById('hack-in').value = "";
    }
}

// Draggable Window Logic
function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.querySelector('.win-header').onmousedown = dragMouseDown;
    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX; pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY;
        pos3 = e.clientX; pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    function closeDragElement() { document.onmouseup = null; document.onmousemove = null; }
}

// Clock
setInterval(() => { document.getElementById('clock').innerText = new Date().toLocaleTimeString(); }, 1000);
