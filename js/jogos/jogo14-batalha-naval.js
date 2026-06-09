export function iniciar(container, aoTerminar) {
  const cols = ['A', 'B', 'C', 'D'];
  const linhas = [1, 2, 3, 4];
  const alvos = ['B2', 'C4', 'A3']; // coordenadas escondidas
  let acertos = 0, tentativas = 0;

  function render() {
    container.innerHTML = `
      <div style="padding:24px; text-align:center;">
        <h2>Batalha Naval do Arremesso</h2>
        <p>Acerte as 3 coordenadas escondidas! Depois arremesse nos bambolês da grade real.</p>
        <div id="grade" style="display:inline-grid; grid-template-columns:repeat(${cols.length}, 56px); gap:6px; margin:18px 0;"></div>
        <p>Acertos: <strong id="placar">0</strong> de ${alvos.length} • Tentativas: <strong id="tent">0</strong></p>
      </div>`;
    const grade = container.querySelector('#grade');
    linhas.forEach(l => {
      cols.forEach(c => {
        const coord = `${c}${l}`;
        const btn = document.createElement('button');
        btn.className = 'btn-secondary';
        btn.textContent = coord;
        btn.style.cssText = 'width:56px;height:56px;';
        btn.onclick = () => atacar(coord, btn);
        grade.appendChild(btn);
      });
    });
  }

  function atacar(coord, btn) {
    if (btn.disabled) return;
    btn.disabled = true;
    tentativas++;
    container.querySelector('#tent').textContent = tentativas;
    if (alvos.includes(coord)) {
      acertos++;
      btn.textContent = '🎯';
      btn.style.background = '#16a34a';
      container.querySelector('#placar').textContent = acertos;
      if (acertos === alvos.length) finalizar();
    } else {
      btn.textContent = '💦';
    }
  }

  function finalizar() {
    const grade = container.querySelector('#grade');
    grade.insertAdjacentHTML('afterend',
      `<h3>✔ Todos os alvos! Em ${tentativas} tentativas. Para os bambolês! 🎉</h3>`);
    const pontos = Math.max(40, 100 - (tentativas - alvos.length) * 10);
    aoTerminar({ jogo: 14, pontos });
  }

  render();
}
