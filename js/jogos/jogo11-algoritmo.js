export function iniciar(container, aoTerminar) {
  const tamanho = 5;
  const inicio = { x: 0, y: 0 };
  const destino = { x: 4, y: 4 };
  let comandos = [];

  function render() {
    container.innerHTML = `
      <div style="padding:24px; text-align:center;">
        <h2>Algoritmo Humano</h2>
        <p>Programe o robô 🤖 para chegar ao alvo 🎯. Depois um aluno vira robô e o outro programador!</p>
        <div id="grid" style="display:grid; grid-template-columns:repeat(${tamanho}, 48px); gap:4px; justify-content:center; margin:18px auto;"></div>
        <div style="display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin:12px 0;">
          <button class="btn-primary" data-cmd="cima">⬆️</button>
          <button class="btn-primary" data-cmd="baixo">⬇️</button>
          <button class="btn-primary" data-cmd="esq">⬅️</button>
          <button class="btn-primary" data-cmd="dir">➡️</button>
        </div>
        <p>Programa: <strong id="prog">(vazio)</strong></p>
        <button class="btn-primary" id="run">▶ Executar</button>
        <button class="btn-secondary" id="reset">↺ Limpar</button>
        <p id="status"></p>
      </div>`;
    desenhar(inicio);
    container.querySelectorAll('[data-cmd]').forEach(b => {
      b.onclick = () => { comandos.push(b.dataset.cmd); atualizarProg(); };
    });
    container.querySelector('#run').onclick = executar;
    container.querySelector('#reset').onclick = () => { comandos = []; render(); };
  }

  function desenhar(pos) {
    const grid = container.querySelector('#grid');
    grid.innerHTML = '';
    for (let y = 0; y < tamanho; y++) {
      for (let x = 0; x < tamanho; x++) {
        const cel = document.createElement('div');
        cel.style.cssText = 'width:48px;height:48px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;background:#e5e7eb;';
        if (x === destino.x && y === destino.y) cel.textContent = '🎯';
        if (x === pos.x && y === pos.y) cel.textContent = '🤖';
        grid.appendChild(cel);
      }
    }
  }

  function atualizarProg() {
    const mapa = { cima: '⬆️', baixo: '⬇️', esq: '⬅️', dir: '➡️' };
    container.querySelector('#prog').textContent =
      comandos.length ? comandos.map(c => mapa[c]).join(' ') : '(vazio)';
  }

  function executar() {
    let pos = { ...inicio }, i = 0;
    const passo = setInterval(() => {
      if (i >= comandos.length) {
        clearInterval(passo);
        const ok = pos.x === destino.x && pos.y === destino.y;
        container.querySelector('#status').innerHTML = ok
          ? '<h3>✔ Chegou ao alvo! Levem para a quadra! 🎉</h3>'
          : '<h3>✖ Não chegou. Ajuste o programa.</h3>';
        aoTerminar({ jogo: 11, pontos: ok ? 100 : 0 });
        return;
      }
      const c = comandos[i++];
      if (c === 'cima')  pos.y = Math.max(0, pos.y - 1);
      if (c === 'baixo') pos.y = Math.min(tamanho - 1, pos.y + 1);
      if (c === 'esq')   pos.x = Math.max(0, pos.x - 1);
      if (c === 'dir')   pos.x = Math.min(tamanho - 1, pos.x + 1);
      desenhar(pos);
    }, 500);
  }

  render();
}
