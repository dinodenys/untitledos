const apps = {
    repl: { title: "Code Lab", content: `<textarea id="ed" style="width:100%;height:150px;background:#000;color:#0f0;">alert('System Hack Successful');</textarea><button onclick="run()">Run</button>` },
    hacker: { title: "Ghost Net", content: `<div id="log" style="font-family:monospace;color:#0f0;">> Scanning...</div>` },
    browser: { title: "Browser", content: `<iframe src="https://www.wikipedia.org" style="width:100%;height:200px;border:none;"></iframe>` },
    monitor: { title: "Monitor", content: `<div id="cpu" style="color:#0f0;">CPU: 0%</div>` }
};

function openApp(id) {
    const win = document.createElement('div');
    win.className = 'window';
    win.style.top = "50px"; win.style.left = "50px";
    win.innerHTML = `
        <div class="win-header"><span>${apps[id].title}</span><button onclick="this.closest('.window').remove()">X</button></div>
        <div class="win-body">${apps[id].content}</div>
    `;
    document.getElementById('desktop').appendChild(win);
}

window.run = () => {
    try {
        const code = document.getElementById('ed').value;
        eval(code); // Runs your code like Replit
    } catch(e) { alert(e); }
}

setInterval(() => {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString();
    if(document.getElementById('cpu')) {
        document.getElementById('cpu').innerText = "CPU: " + Math.floor(Math.random()*100) + "%";
    }
}, 1000);
