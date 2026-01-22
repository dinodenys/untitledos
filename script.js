// THE SYSTEM REGISTRY (All Apps Data)
const REGISTRY = {
    browser: { title: "Web Explorer", icon: "🌐", type: "app", content: `
        <div class="browser-container">
            <div class="browser-nav">
                <input type="text" id="url-in" value="https://www.wikipedia.org" onkeypress="if(event.key==='Enter') this.parentElement.nextElementSibling.src=this.value">
                <button onclick="this.previousElementSibling.parentElement.nextElementSibling.src=this.previousElementSibling.value">GO</button>
            </div>
            <iframe src="https://www.wikipedia.org"></iframe>
        </div>`
    },
    hacker: { title: "Terminal", icon: "💀", type: "app", content: `
        <div class="terminal">
            <div id="h-log">[LOCAL NODE ACTIVE] Type 'print message' to hack the screen.</div>
            <span style="color:#39ff14">root@uOS:~$ </span><input type="text" id="h-in" onkeypress="hackerExec(event)" style="background:none; border:none; color:#39ff14; outline:none; width:70%; font-family:monospace;">
        </div>`
    },
    calc: { title: "Calculator", icon: "🔢", type: "app", content: `
        <div style="padding:10px; background:#000; text-align:right; font-size:24px;" id="c-disp">0</div>
        <div class="calc-grid">
            ${['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map(v => `<button onclick="calc('${v}')">${v}</button>`).join('')}
        </div>`
    },
    store: { title: "U-Store", icon: "🏪", type: "system", content: `
        <div style="padding:15px;">
            <h3>Available Apps</h3>
            <div id="store-list"></div>
        </div>`
    },
    settings: { title: "Settings", icon: "⚙️", type: "system", content: `
        <div style="padding:15px;">
            <h3>Theme</h3>
            <button onclick="document.body.style.background='red'">Hacker Red</button>
            <button onclick="document.body.style.background='black'">Void Black</button>
            <button onclick="location.reload()">Reset OS</button>
        </div>`
    }
};

const INITIAL_APPS = ['store', 'browser', 'hacker'];
const STORE_CATALOG = ['calc', 'settings'];

// 1. KERNEL INITIALIZATION
window.onload = () => {
    INITIAL_APPS.forEach(id => createShortcut(id));
    setInterval(() => { document.getElementById('clock').innerText = new Date().toLocaleTimeString(); }, 1000);
};

// 2. WINDOW MANAGER
function openApp(id) {
    const app = REGISTRY[id];
    const winId = `win-${id}-${Math.floor(Math.random()*1000)}`;
    const win = document.createElement('div');
    win.className = 'window';
    win.id = winId;
    win.style.top = "100px"; win.style.left = "200px";
    win.style.width = "500px"; win.style.height = "400px";

    win.innerHTML = `
        <div class="win-header">
            <span>${app.icon} ${app.title}</span>
            <div class="win-controls">
                <button onclick="document.getElementById('${winId}').classList.toggle('maximized')">□</button>
                <button onclick="closeApp('${winId}')">X</button>
            </div>
        </div>
        <div class="win-body">${id === 'store' ? renderStore() : app.content}</div>
        <div class="resizer"></div>
    `;

    document.getElementById('desktop').appendChild(win);
    initDrag(win);
    initResize(win);
    addTab(app.title, winId);
}

// 3. APP STORE SYSTEM
function renderStore() {
    let html = "";
    STORE_CATALOG.forEach(id => {
        html += `<div style="background:#222; margin-bottom:10px; padding:10px; border-radius:5px; display:flex; justify-content:space-between; align-items:center;">
            <span>${REGISTRY[id].icon} ${REGISTRY[id].title}</span>
            <button onclick="createShortcut('${id}')" style="background:#0078d4; color:white; border:none; padding:5px 10px; border-radius:3px; cursor:pointer;">Install</button>
        </div>`;
    });
    return html;
}

function createShortcut(id) {
    if(document.getElementById(`icon-${id}`)) return;
    const desktop = document.getElementById('desktop');
    const div = document.createElement('div');
    div.className = 'shortcut';
    div.id = `icon-${id}`;
    div.onclick = () => openApp(id);
    div.innerHTML = `<span>${REGISTRY[id].icon}</span><span>${REGISTRY[id].title}</span>`;
    desktop.appendChild(div);
}

// 4. RESIZE & DRAG ENGINES
function initResize(win) {
    const resizer = win.querySelector('.resizer');
    resizer.addEventListener('mousedown', (e) => {
        e.preventDefault();
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResize);
    });
    function resize(e) {
        win.style.width = (e.pageX - win.getBoundingClientRect().left) + 'px';
        win.style.height = (e.pageY - win.getBoundingClientRect().top) + 'px';
    }
    function stopResize() { window.removeEventListener('mousemove', resize); }
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

// 5. BROADCAST SYSTEM (HACKING)
window.hackerExec = (e) => {
    if(e.key === 'Enter') {
        const input = document.getElementById('h-in');
        const log = document.getElementById('h-log');
        if(input.value.startsWith('print ')) {
            const msg = input.value.substring(6);
            log.innerHTML += `<div>[BROADCASTING... OK]</div>`;
            const overlay = document.createElement('div');
            overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,255,0,0.9); z-index:10000; color:black; display:flex; align-items:center; justify-content:center; font-size:50px; font-weight:bold; font-family:monospace; text-align:center; padding:20px;";
            overlay.innerHTML = `[ALERT]<br>${msg.toUpperCase()}`;
            document.body.appendChild(overlay);
            setTimeout(() => overlay.remove(), 3000);
        }
        input.value = "";
    }
}

// 6. UTILS
window.closeApp = (id) => { 
    document.getElementById(id).remove(); 
    document.querySelector(`[data-ref="${id}"]`).remove();
};

window.addTab = (title, id) => {
    const tab = document.createElement('div');
    tab.className = 'tab';
    tab.innerText = title;
    tab.setAttribute('data-ref', id);
    document.getElementById('active-tabs').appendChild(tab);
};

window.calc = (v) => {
    const d = document.getElementById('c-disp');
    if(v === '=') { try{ d.innerText = eval(d.innerText); } catch{ d.innerText = "Error"; } }
    else if(d.innerText === '0' || d.innerText === 'Error') { d.innerText = v; }
    else { d.innerText += v; }
};
