export function iniciar(container, aoTerminar) {
  const rodadas = [
    { alvo: 10, opcoes: ['+5', '+5', '+3', '-2'], solucao: ['+5', '+5'] },
    { alvo: 8,  opcoes: ['+4', '+4', '+6', '-1'], solucao: ['+4', '+4'] },
    { alvo: 12, opcoes: ['+6', '+6', '+2', '+9'], solucao: ['+6', '+6'] }
  ];
  let idx = 0, atual = 0, escolhas = [], pontos = 0;

  function render() {
    if (idx >= rodadas.length) {
      container.innerHTML = `<div style="padding:40px; text-align:center;">
        <h2>Fim! 🔢</h2><h3>Pontuação: ${pontos}</h3></div>`;
      aoTerminar({ jogo: 5, pontos });
      return;
    }
    const r = rodadas[idx];
    atual = 0; escolhas = [];
    container.innerHTML = `
      <div style="padding:24px; text-align:center;">
        <h2>Calculadora Gigante</h2>
        <p>Rodada ${idx + 1} de ${rodadas.length}. Chegue ao número-alvo saltando!</p>
        <h3>🎯 Alvo: ${r.alvo}</h3>
        <div id="botoes" style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin:20px 0;"></div>
        <p>Valor atual: <strong id="valor">0</strong></p>
        <button class="btn-secondary" id="reset">↺ Recomeçar rodada</button>
      </div>`;
    const box = container.querySelector('#botoes');
    r.opcoes.forEach(op => {
      const btn = document.createElement('button');
      btn.className = 'btn-primary';
      btn.textContent = op;
      btn.onclick = () => aplicar(op, r);
      box.appendChild(btn);
    });
    container.querySelector('#reset').onclick = render;
  }

  function aplicar(op, r) {
    const valor = parseInt(op.replace('+', ''), 10);
    atual += valor;
    escolhas.push(op);
    container.querySelector('#valor').textContent = atual;
    if (atual === r.alvo) {
      pontos += 50; idx++;
      container.querySelector('#valor').textContent = `${atual} ✔ Acertou!`;
      setTimeout(render, 900);
    } else if (atual > r.alvo) {
      container.querySelector('#valor').textContent = `${atual} ✖ Passou! Recomece.`;
    }
  }

  render();
}
