export function iniciar(container, aoTerminar) {
  const rodadas = [
    { palavra: 'BOLA',  silabas: ['BO', 'LA'],       extra: ['CA', 'TO'] },
    { palavra: 'SAPATO', silabas: ['SA', 'PA', 'TO'], extra: ['LE', 'MI'] },
    { palavra: 'CAVALO', silabas: ['CA', 'VA', 'LO'], extra: ['PE', 'RU'] }
  ];
  let idx = 0, montada = [], pontos = 0;

  function render() {
    if (idx >= rodadas.length) {
      container.innerHTML = `<div style="padding:40px; text-align:center;">
        <h2>Fim! 🐸</h2><h3>Pontuação: ${pontos}</h3></div>`;
      aoTerminar({ jogo: 4, pontos });
      return;
    }
    const r = rodadas[idx];
    const opcoes = [...r.silabas, ...r.extra].sort(() => Math.random() - 0.5);
    montada = [];
    container.innerHTML = `
      <div style="padding:24px; text-align:center;">
        <h2>Pula-Sílaba</h2>
        <p>Rodada ${idx + 1} de ${rodadas.length}. Forme a palavra com ${r.silabas.length} sílabas (${r.silabas.length} arcos na quadra).</p>
        <div id="botoes" style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin:20px 0;"></div>
        <p>Formando: <strong id="atual">_</strong></p>
        <button class="btn-secondary" id="reset">↺ Limpar</button>
      </div>`;
    const box = container.querySelector('#botoes');
    opcoes.forEach(s => {
      const btn = document.createElement('button');
      btn.className = 'btn-primary';
      btn.textContent = s;
      btn.onclick = () => { montada.push(s); checar(r); };
      box.appendChild(btn);
    });
    container.querySelector('#reset').onclick = () => { montada = []; container.querySelector('#atual').textContent = '_'; };
  }

  function checar(r) {
    container.querySelector('#atual').textContent = montada.join('-');
    if (montada.length === r.silabas.length) {
      const ok = montada.every((s, i) => s === r.silabas[i]);
      if (ok) pontos += 50;
      idx++;
      setTimeout(render, 700);
    }
  }

  render();
}
