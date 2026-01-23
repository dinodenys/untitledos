const REGISTRY = {
    // --- SYSTEM & MEMORY ---
    explorer: { title: "File Explorer", icon: "📁", content: `<div style="padding:20px;" id="file-list"></div>` },
    store: { title: "U-Store", icon: "🏪", content: `<div style="padding:20px;"><h3>Marketplace</h3><div id="store-target" style="display:grid;grid-template-columns:1fr;gap:10px;"></div></div>` },
    
    // --- AI & INTELLIGENCE ---
    ai: { title: "Nexus AI", icon: "🧠", content: `
        <div style="height:100%;display:flex;flex-direction:column;padding:15px;color:#0f0;font-family:monospace;background:#050505;">
            <div id="ai-chat" style="flex:1;overflow-y:auto;border-bottom:1px solid #111;margin-bottom:10px;font-size:12px;">[Neural Link Established] Hello, untitled. I am Nexus.</div>
            <div style="display:flex;gap:10px;">
                <input type="text" id="ai-in" onkeypress="if(event.key==='Enter')nexusTalk()" style="flex:1;background:#000;border:1px solid #0f0;color:#0f0;padding:8px;outline:none;">
                <button onclick="nexusTalk()" style="background:#0f0;color:#000;border:none;padding:0 15px;font-weight:bold;cursor:pointer;">SEND</button>
            </div>
        </div>` 
    },

    // --- PRODUCTIVITY ---
    write: { title: "U-Write", icon: "🖋️", content: `<textarea id="write-mem" oninput="saveData('doc', this.value)" style="width:100%;height:100%;background:#fff;color:#000;padding:20px;border:none;outline:none;font-size:16px;"></textarea>` },
    paint: { title: "U-Paint", icon: "🎨", content: `<iframe src="https://jspaint.app" style="width:100%;height:100%;border:none;"></iframe>` },
    code: { title: "JS Lab", icon: "🧪", content: `<textarea id="js-mem" oninput="saveData('js', this.value)" style="width:100%;height:calc(100% - 40px);background:#1e1e1e;color:#fff;padding:10px;font-family:monospace;border:none;"></textarea><button onclick="eval(document.getElementById('js-mem').value)" style="width:100%;height:40px;cursor:pointer;background:#333;color:#fff;border:none;">RUN JAVASCRIPT</button>` },

    // --- GAMES ---
    rpg: { title: "Python RPG", icon: "📜", content: `
        <div style="height:100%;display:flex;flex-direction:column;">
            <textarea id="py-in" oninput="saveData('rpg', this.value)" style="flex:1;background:#000;color:#0f0;padding:10px;font-family:monospace;border:none;"># Python RPG Memory Loaded\nprint("Welcome back, King.")</textarea>
            <button onclick="runPython()" style="padding:10px;background:#222;color:#fff;border:none;cursor:pointer;">RUN QUEST</button>
            <div id="py-out" style="height:100px;background:#050505;color:#fff;padding:10px;font-family:monospace;overflow-y:auto;border-top:1px solid #333;white-space:pre;"></div>
        </div>` 
    }
};

// MEMORY SYSTEM
function saveData(key, val) { localStorage.setItem('uOS_' + key, val); }
function loadData(key) { return localStorage.getItem('uOS_' + key) || ""; }

function attemptLogin() {
    if(document.getElementById('username').value === "untitled" && document.getElementById('password').value === "king") {
        document.getElementById('boot-screen').style.display = "none";
        document.getElementById('taskbar').style.display = "flex";
        ['store', 'explorer', 'ai', 'rpg'].forEach(id => createShortcut(id));
        
        // Restore Memory into apps after a short delay
        setTimeout(() => {
            if(document.getElementById('write-mem')) document.getElementById('write-mem').value = loadData('doc');
            if(document.getElementById('js-mem')) document.getElementById('js-mem').value = loadData('js');
            if(document.getElementById('py-in')) document.getElementById('py-in').value = loadData('rpg');
        }, 500);
    }
}

// AI MODEL (Nexus)
window.nexusTalk = () => {
    const input = document.getElementById('ai-in');
    const chat = document.getElementById('ai-chat');
    const val = input.value;
    if(!val) return;

    chat.innerHTML += `<div style="color:#fff;margin-top:5px;">> ${val}</div>`;
    
    // Simulated Thinking
    setTimeout(() => {
        let response = "I am processing your request through my neural layers...";
        if(val.toLowerCase().includes("hello")) response = "Greetings, King. System status is nominal.";
        if(val.toLowerCase().includes("memory")) response = "All files are safely stored in your local browser cache.";
        if(val.toLowerCase().includes("who are you")) response = "I am Nexus, the core intelligence of Untitled OS.";
        
        chat.innerHTML += `<div style="color:#0f0;margin-bottom:10px;">Nexus: ${response}</div>`;
        chat.scrollTop = chat.scrollHeight;
    }, 600);
    input.value = "";
};

// REST OF THE CORE LOGIC (createShortcut, openApp, etc. remains same as v4.0)
