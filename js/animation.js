function __x1y2z3() {
    if (document.getElementById('sg_ovl')) {
        document.getElementById('sg_ovl').style.display = 'flex';
        return;
    }
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'sg_ovl';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(10,25,47,0.98)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 9999;
    overlay.innerHTML = `
        <div style="position:relative;display:flex;flex-direction:column;align-items:center;">
            <h2 style="color:#64ffda;margin-bottom:10px;">🐍</h2>
            <canvas id="sg_cnv" width="400" height="400" style="background:#222;border-radius:10px;box-shadow:0 0 20px #64ffda;"></canvas>
            <button id="sg_cls" style="margin-top:18px;padding:8px 18px;font-size:1.1rem;background:#64ffda;color:#0a192f;border:none;border-radius:6px;cursor:pointer;">Close</button>
            <div style='color:#fff;margin-top:8px;font-size:0.95rem;'>Use arrow keys to play.</div>
        </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('sg_cls').onclick = function() {
        overlay.style.display = 'none';
    };
    _sg_start();
}

function _sg_start() {
    const canvas = document.getElementById('sg_cnv');
    const ctx = canvas.getContext('2d');
    const g = 20;
    const t = canvas.width / g;
    let s = [{x: 10, y: 10}];
    let d = {x: 0, y: 0};
    let f = _sg_food();
    let o = false;
    let sc = 0;

    function _sg_food() {
        let p;
        do {
            p = {
                x: Math.floor(Math.random() * t),
                y: Math.floor(Math.random() * t)
            };
        } while (s.some(q => q.x === p.x && q.y === p.y));
        return p;
    }

    function _sg_draw() {
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#64ffda';
        ctx.fillRect(f.x * g, f.y * g, g, g);
        for (let i = 0; i < s.length; i++) {
            ctx.fillStyle = i === 0 ? '#fff' : '#52e0c4';
            ctx.fillRect(s[i].x * g, s[i].y * g, g, g);
        }
        ctx.fillStyle = '#fff';
        ctx.font = '18px sans-serif';
        ctx.fillText('Score: ' + sc, 10, 24);
    }

    function _sg_update() {
        if (d.x === 0 && d.y === 0) return;
        const h = {x: s[0].x + d.x, y: s[0].y + d.y};
        if (h.x < 0 || h.x >= t || h.y < 0 || h.y >= t) { o = true; return; }
        if (s.some(q => q.x === h.x && q.y === h.y)) { o = true; return; }
        s.unshift(h);
        if (h.x === f.x && h.y === f.y) {
            sc++;
            f = _sg_food();
        } else {
            s.pop();
        }
    }

    function _sg_loop() {
        if (o) {
            ctx.fillStyle = 'rgba(10,25,47,0.95)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#ff5252';
            ctx.font = '32px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Game Over!', canvas.width/2, canvas.height/2-10);
            ctx.fillStyle = '#fff';
            ctx.font = '20px sans-serif';
            ctx.fillText('Score: ' + sc, canvas.width/2, canvas.height/2+24);
            ctx.font = '16px sans-serif';
            ctx.fillText('Press Close or Enter to restart', canvas.width/2, canvas.height/2+50);
            return;
        }
        _sg_update();
        _sg_draw();
        setTimeout(_sg_loop, 100);
    }

    // Prevent arrow keys from scrolling the page when overlay is open
    window.addEventListener('keydown', function(e) {
        const overlay = document.getElementById('sg_ovl');
        if (overlay && overlay.style.display === 'flex') {
            if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) {
                e.preventDefault();
            }
        }
    }, { passive: false });

    document.onkeydown = function(e) {
        if (o && (e.key === 'Enter' || e.key === ' ')) {
            s = [{x: 10, y: 10}];
            d = {x: 0, y: 0};
            f = _sg_food();
            o = false;
            sc = 0;
            _sg_loop();
            return;
        }
        switch(e.key) {
            case 'ArrowUp': if (d.y !== 1) d = {x: 0, y: -1}; break;
            case 'ArrowDown': if (d.y !== -1) d = {x: 0, y: 1}; break;
            case 'ArrowLeft': if (d.x !== 1) d = {x: -1, y: 0}; break;
            case 'ArrowRight': if (d.x !== -1) d = {x: 1, y: 0}; break;
        }
    };
    _sg_draw();
    _sg_loop();
}
