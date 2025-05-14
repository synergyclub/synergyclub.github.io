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
            <h2 style="color:#64ffda;margin-bottom:10px;">🐍</h2>
            <div id="g_menu" style="margin-bottom:18px;">
                <button id="g_snake" style="margin:6px;padding:8px 18px;font-size:1.1rem;background:#64ffda;color:#0a192f;border:none;border-radius:6px;cursor:pointer;">Snake</button>
            </div>
            <div id="g_area"></div>
            <button id="sg_cls" style="margin-top:18px;padding:8px 18px;font-size:1.1rem;background:#64ffda;color:#0a192f;border:none;border-radius:6px;cursor:pointer;">Close</button>
            <button id="sg_fs" style="margin-top:8px;padding:8px 18px;font-size:1.1rem;background:#64ffda;color:#0a192f;border:none;border-radius:6px;cursor:pointer;">🗖</button>
        </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('sg_cls').onclick = function() {
        overlay.style.display = 'none';
    };
    document.getElementById('sg_fs').onclick = function() {
        var area = document.getElementById('g_area');
        var menu = document.getElementById('g_menu');
        var html = '<div style="background:#0a192f;width:120vw;height:90vh;display:flex;flex-direction:column;align-items:center;justify-content:center;">'+menu.outerHTML+area.outerHTML+'</div>';
        var win = window.open('about:blank','_blank');
        if(win) {
            win.document.write('<!DOCTYPE html><html><head><title>Snake</title><meta name="viewport" content="width=device-width,initial-scale=1.0"></head><body style="margin:0;">'+html+'<script>'+fullscreenSnakeScript()+'<\/script></body></html>');
            win.document.close();
        } else {
            alert('Allow popups for fullscreen!');
        }
    };
    document.getElementById('g_snake').onclick = function() { _sg_load('snake'); };
}

function _sg_load(g) {
    const area = document.getElementById('g_area');
    area.innerHTML = '';
    if (g === 'snake') _sg_start(area);
}

function _exf(a, u) {
    // Not needed for snake only
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

function fullscreenSnakeScript() {
    return `
        function _sg_start(area) {
            area.innerHTML = '<canvas id="sg_cnv" width="600" height="600" style="background:#222;border-radius:10px;box-shadow:0 0 20px #64ffda;"></canvas><div style=\'color:#fff;margin-top:8px;font-size:0.95rem;\'>Use arrow keys to play.</div>';
            var canvas = document.getElementById('sg_cnv');
            var ctx = canvas.getContext('2d');
            var g = 20;
            var t = canvas.width / g;
            var s = [{x: 10, y: 10}];
            var d = {x: 0, y: 0};
            var f = (function _sg_food() {
                let p;
                do {
                    p = { x: Math.floor(Math.random() * t), y: Math.floor(Math.random() * t) };
                } while (s.some(q => q.x === p.x && q.y === p.y));
                return p;
            })();
            var o = false;
            var sc = 0;
            function _sg_draw() {
                ctx.fillStyle = '#222';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#64ffda';
                ctx.fillRect(f.x * g, f.y * g, g, g);
                for (var i = 0; i < s.length; i++) {
                    ctx.fillStyle = i === 0 ? '#fff' : '#52e0c4';
                    ctx.fillRect(s[i].x * g, s[i].y * g, g, g);
                }
                ctx.fillStyle = '#fff';
                ctx.font = '18px sans-serif';
                ctx.fillText('Score: ' + sc, 10, 24);
            }
            function _sg_update() {
                if (d.x === 0 && d.y === 0) return;
                var h = {x: s[0].x + d.x, y: s[0].y + d.y};
                if (h.x < 0 || h.x >= t || h.y < 0 || h.y >= t) { o = true; return; }
                if (s.some(q => q.x === h.x && q.y === h.y)) { o = true; return; }
                s.unshift(h);
                if (h.x === f.x && h.y === f.y) { sc++; f = (function _sg_food() {
                    let p;
                    do {
                        p = { x: Math.floor(Math.random() * t), y: Math.floor(Math.random() * t) };
                    } while (s.some(q => q.x === p.x && q.y === p.y));
                    return p;
                })(); } else { s.pop(); }
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
                if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) {
                    e.preventDefault();
                }
                if (o && (e.key === 'Enter' || e.key === ' ')) {
                    s = [{x: 10, y: 10}];
                    d = {x: 0, y: 0};
                    f = (function _sg_food() {
                        let p;
                        do {
                            p = { x: Math.floor(Math.random() * t), y: Math.floor(Math.random() * t) };
                        } while (s.some(q => q.x === p.x && q.y === p.y));
                        return p;
                    })();
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
        document.getElementById('g_snake').onclick=function(){var area=document.getElementById('g_area');area.innerHTML='';_sg_start(area);};
        var area=document.getElementById('g_area');area.innerHTML='';_sg_start(area);
    `;
}
