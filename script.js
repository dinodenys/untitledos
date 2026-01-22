const apps = {
    repl: { title: "Code Lab", content: `
        <textarea id="editor">document.body.style.filter = 'invert(1)';</textarea>
        <button onclick="runCode()" style="margin-top:10px; width:100%; padding:10px; cursor:pointer;">RUN SYSTEM CODE</button>` 
    },
    hacker: { title: "Ghost Net", content: `
        <div class="terminal">
            <div id="h-log">[SCANNING NODES...]</div>
            root@uOS:~$ <input type="text" id="h-in" onkeypress="hackAction(event)" style="background:none; border:none; color:#0f0; outline:none; width:70%">
        </div>` 
    },
    ai: { title: "AI Kernel", content: `<div id="ai-log">Ready.</div><input type="text" id="ai-in" onkeypress="aiAction(event)" style="width:100%">` },
    rpg: { title: "Quest RPG", content: `<canvas id="rpg" width="370" height="250" style="background:#111;"></canvas>` }
};

function openApp(id) {
    const app = apps[id];
    const win = document.createElement('div');
    win.className = 'window';
    win.style.top = "100px"; win.style.left = "150px";
    win.innerHTML = `
        <div class="win-header"><span>${app.title}</span><button onclick="this.closest('.window').remove()">X</button></div>
        <div class="win-body">${app.content}</div>
    `;
    document.getElementById('desktop').appendChild(win);
    if(id === 'rpg') runRPG();
}

// 🛠️ THE REPLIT FEATURE (Compile & Run)
window.runCode = function() {
    const code = document.getElementById('editor').value;
    try {
        const execute = new Function(code);
        execute();
    } catch (e) { alert("Error: " + e.message); }
}

// 💀 HACKING LOGIC
window.hackAction = function(e) {
    if(e.key === 'Enter') {
        const val = document.getElementById('h-in').value;
        const log = document.getElementById('h-log');
        log.innerHTML += `<div>> ${val}</div>`;
        if(val.startsWith('send')) {
            log.innerHTML += `<div style="color:red">PAYLOAD DELIVERED. SYSTEM GLITCHING...</div>`;
            document.body.style.animation = "glitch 0.1s 5";
        }
        document.getElementById('h-in').value = "";
    }
}

// 🤖 AI LOGIC
window.aiAction = function(e) {
    if(e.key === 'Enter') {
        const log = document.getElementById('ai-log');
        log.innerHTML += `<div>User: ${document.getElementById('ai-in').value}</div>`;
        log.innerHTML += `<div>AI: Command received. Running in background.</div>`;
        document.getElementById('ai-in').value = "";
    }
}

// ⚔️ RPG ENGINE
function runRPG() {
    const canvas = document.getElementById('rpg');
    const ctx = canvas.getContext('2d');
    let x = 0;
    function animate() {
        ctx.clearRect(0,0,400,300);
        ctx.fillStyle = "#3b82f6";
        ctx.fillRect(x, 100, 20, 20);
        x = (x + 2) % 370;
        requestAnimationFrame(animate);
    }
    animate();
}

// Clock
setInterval(() => {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString();
}, 1000);
