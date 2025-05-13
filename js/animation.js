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
        <div id="g_sw" style="position:relative;display:flex;flex-direction:column;align-items:center;">
            <h2 style="color:#64ffda;margin-bottom:10px;">🎮</h2>
            <div id="g_menu" style="margin-bottom:18px;">
                <button id="g_snake" style="margin:6px;padding:8px 18px;font-size:1.1rem;background:#64ffda;color:#0a192f;border:none;border-radius:6px;cursor:pointer;">Snake</button>
                <button id="g_pong" style="margin:6px;padding:8px 18px;font-size:1.1rem;background:#64ffda;color:#0a192f;border:none;border-radius:6px;cursor:pointer;">Pong</button>
                <button id="g_brk" style="margin:6px;padding:8px 18px;font-size:1.1rem;background:#64ffda;color:#0a192f;border:none;border-radius:6px;cursor:pointer;">Breakout</button>
                <button id="g_1v1" style="margin:6px;padding:8px 18px;font-size:1.1rem;background:#64ffda;color:#0a192f;border:none;border-radius:6px;cursor:pointer;">1v1.lol</button>
                <button id="g_trc" style="margin:6px;padding:8px 18px;font-size:1.1rem;background:#64ffda;color:#0a192f;border:none;border-radius:6px;cursor:pointer;">Tunnel Rush</button>
                <button id="g_si" style="margin:6px;padding:8px 18px;font-size:1.1rem;background:#64ffda;color:#0a192f;border:none;border-radius:6px;cursor:pointer;">Space Invaders</button>
                <button id="g_2048" style="margin:6px;padding:8px 18px;font-size:1.1rem;background:#64ffda;color:#0a192f;border:none;border-radius:6px;cursor:pointer;">Hex-2048</button>
                <button id="g_tag" style="margin:6px;padding:8px 18px;font-size:1.1rem;background:#64ffda;color:#0a192f;border:none;border-radius:6px;cursor:pointer;">Tag</button>
            </div>
            <div id="g_area"></div>
            <button id="sg_cls" style="margin-top:18px;padding:8px 18px;font-size:1.1rem;background:#64ffda;color:#0a192f;border:none;border-radius:6px;cursor:pointer;">Close</button>
        </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('sg_cls').onclick = function() {
        overlay.style.display = 'none';
    };
    // Game switcher logic
    document.getElementById('g_snake').onclick = function() { _sg_load('snake'); };
    document.getElementById('g_pong').onclick = function() { _sg_load('pong'); };
    document.getElementById('g_brk').onclick = function() { _sg_load('brk'); };
    document.getElementById('g_1v1').onclick = function() { _sg_load('1v1'); };
    document.getElementById('g_trc').onclick = function() { _sg_load('trc'); };
    document.getElementById('g_si').onclick = function() { _sg_load('si'); };
    document.getElementById('g_2048').onclick = function() { _sg_load('2048'); };
    document.getElementById('g_tag').onclick = function() { _sg_load('tag'); };
}

function _sg_load(g) {
    const area = document.getElementById('g_area');
    area.innerHTML = '';
    if (g === 'snake') _sg_start(area);
    if (g === 'pong') _pg_start(area);
    if (g === 'brk') _bk_start(area);
    if (g === '1v1') _exf(area,'https://il11liiillli11.github.io/1v1.lol/1v1.lol/');
    if (g === 'trc') _exf(area,'https://il11liiillli11.github.io/TunnelRush22/');
    if (g === 'si') _exf(area,'http://strykerkkd.github.io/SpaceInvaders/');
    if (g === '2048') _exf(area,'https://jeffhou.github.io/hex-2048/');
    if (g === 'tag') _exf(area,'https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://118473026-235917736205837253.preview.editmysite.com/uploads/b/146211889-618141766941606391/files/tag.xml&container=ig');
}

function _exf(a, u) {
    a.innerHTML = '<iframe src="'+u+'" style="width:400px;height:400px;border:none;border-radius:10px;box-shadow:0 0 20px #64ffda;background:#222;"></iframe>';
}

function _sg_start(area) {
    area.innerHTML = '<canvas id="sg_cnv" width="400" height="400" style="background:#222;border-radius:10px;box-shadow:0 0 20px #64ffda;"></canvas><div style=\'color:#fff;margin-top:8px;font-size:0.95rem;\'>Use arrow keys to play.</div>';
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
            p = { x: Math.floor(Math.random() * t), y: Math.floor(Math.random() * t) };
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
        if (h.x === f.x && h.y === f.y) { sc++; f = _sg_food(); } else { s.pop(); }
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
    window.onkeydown = function(e) {
        const overlay = document.getElementById('sg_ovl');
        if (overlay && overlay.style.display === 'flex') {
            if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) {
                e.preventDefault();
            }
        }
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

function _pg_start(area) {
    area.innerHTML = '<canvas id="pg_cnv" width="400" height="400" style="background:#222;border-radius:10px;box-shadow:0 0 20px #64ffda;"></canvas><div style=\'color:#fff;margin-top:8px;font-size:0.95rem;\'>Pong: Up/Down to move. First to 5 wins.</div>';
    const c = document.getElementById('pg_cnv');
    const x = c.getContext('2d');
    let py = 160, oy = 160, by = 200, bx = 200, bvx = 4, bvy = 2, ps = 0, os = 0;
    function draw() {
        x.fillStyle = '#222'; x.fillRect(0,0,400,400);
        x.fillStyle = '#64ffda'; x.fillRect(10,py,10,80);
        x.fillStyle = '#fff'; x.fillRect(380,oy,10,80);
        x.beginPath(); x.arc(bx,by,8,0,2*Math.PI); x.fillStyle = '#52e0c4'; x.fill();
        x.font = '18px sans-serif'; x.fillStyle = '#fff'; x.fillText(ps+':'+os, 180, 24);
    }
    function loop() {
        bx += bvx; by += bvy;
        if (by < 0 || by > 400) bvy *= -1;
        if (bx < 20 && by > py && by < py+80) bvx *= -1;
        if (bx > 370 && by > oy && by < oy+80) bvx *= -1;
        if (bx < 0) { os++; bx=200; by=200; bvx=4; }
        if (bx > 400) { ps++; bx=200; by=200; bvx=-4; }
        if (os === 5 || ps === 5) { x.font='32px sans-serif'; x.fillStyle='#ff5252'; x.fillText((ps===5?'You Win!':'You Lose!'),120,200); return; }
        oy += (by-oy-40)*0.1;
        draw();
        setTimeout(loop, 20);
    }
    window.onkeydown = function(e) {
        const overlay = document.getElementById('sg_ovl');
        if (overlay && overlay.style.display === 'flex') {
            if (["ArrowUp","ArrowDown"].includes(e.key)) e.preventDefault();
        }
        if (e.key === 'ArrowUp') py = Math.max(0, py-20);
        if (e.key === 'ArrowDown') py = Math.min(320, py+20);
    };
    draw();
    loop();
}

function _bk_start(area) {
    area.innerHTML = '<canvas id="bk_cnv" width="400" height="400" style="background:#222;border-radius:10px;box-shadow:0 0 20px #64ffda;"></canvas><div style=\'color:#fff;margin-top:8px;font-size:0.95rem;\'>Breakout: Left/Right to move. Clear all blocks!</div>';
    const c = document.getElementById('bk_cnv');
    const x = c.getContext('2d');
    let px = 170, bx = 200, by = 300, bvx = 3, bvy = -3, blocks = [], score = 0;
    for(let i=0;i<5;i++) for(let j=0;j<8;j++) blocks.push({x: j*48+8, y: i*24+8, hit: false});
    function draw() {
        x.fillStyle = '#222'; x.fillRect(0,0,400,400);
        x.fillStyle = '#64ffda'; x.fillRect(px,380,60,10);
        x.beginPath(); x.arc(bx,by,8,0,2*Math.PI); x.fillStyle = '#52e0c4'; x.fill();
        for(const b of blocks) if(!b.hit) { x.fillStyle='#fff'; x.fillRect(b.x,b.y,44,20); }
        x.font = '18px sans-serif'; x.fillStyle = '#fff'; x.fillText('Score: '+score, 10, 24);
    }
    function loop() {
        bx += bvx; by += bvy;
        if (bx < 0 || bx > 400) bvx *= -1;
        if (by < 0) bvy *= -1;
        if (by > 400) { x.font='32px sans-serif'; x.fillStyle='#ff5252'; x.fillText('Game Over!',120,200); return; }
        if (bx > px && bx < px+60 && by > 370 && by < 390) bvy *= -1;
        for(const b of blocks) {
            if(!b.hit && bx > b.x && bx < b.x+44 && by > b.y && by < b.y+20) {
                b.hit = true; bvy *= -1; score++;
            }
        }
        if (blocks.every(b=>b.hit)) { x.font='32px sans-serif'; x.fillStyle='#64ffda'; x.fillText('You Win!',120,200); return; }
        draw();
        setTimeout(loop, 20);
    }
    window.onkeydown = function(e) {
        const overlay = document.getElementById('sg_ovl');
        if (overlay && overlay.style.display === 'flex') {
            if (["ArrowLeft","ArrowRight"].includes(e.key)) e.preventDefault();
        }
        if (e.key === 'ArrowLeft') px = Math.max(0, px-20);
        if (e.key === 'ArrowRight') px = Math.min(340, px+20);
    };
    draw();
    loop();
}
