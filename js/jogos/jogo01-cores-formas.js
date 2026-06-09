export function iniciar(container, aoTerminar) {
  const blocos = [
    { id: 'azul-quad', label: '🟦 Quadrado azul' },
    { id: 'verm-circ', label: '🔴 Círculo vermelho' },
    { id: 'amar-tri',  label: '🔺 Triângulo amarelo' },
    { id: 'verde-quad',label: '🟩 Quadrado verde' }
  ];
  const sequenciaAlvo = ['azul-quad', 'verm-circ', 'amar-tri', 'verde-quad'];
  let montada = [];

  function render() {
    container.innerHTML = `
      <div style="padding:24px; text-align:center;">
        <h2>Caminho das Cores e Formas</h2>
        <p>Clique nos blocos na ordem para montar a trilha. Depois reproduza pulando nos arcos!</p>
        <p><strong>Trilha alvo:</strong> 🟦 → 🔴 → 🔺 → 🟩</p>
        <div id="opcoes" style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin:20px 0;"></div>
        <p>Sua trilha: <strong id="atual">(vazia)</strong></p>
        <button class="btn-secondary" id="reset">↺ Recomeçar</button>
      </div>`;
    const opcoes = container.querySelector('#opcoes');
    blocos.forEach(b => {
      const btn = document.createElement('button');
      btn.className = 'btn-primary';
      btn.textContent = b.label;
      btn.onclick = () => adicionar(b);
      opcoes.appendChild(btn);
    });
    container.querySelector('#reset').onclick = () => { montada = []; atualizar(); };
  }

  function adicionar(b) {
    montada.push(b.id);
    atualizar();
    if (montada.length === sequenciaAlvo.length) verificar();
  }

  function atualizar() {
    const txt = montada.length
      ? montada.map(id => blocos.find(b => b.id === id).label.split(' ')[0]).join(' → ')
      : '(vazia)';
    container.querySelector('#atual').textContent = txt;
  }

  function verificar() {
    const acertou = montada.every((v, i) => v === sequenciaAlvo[i]);
    container.querySelector('#opcoes').innerHTML =
      acertou ? '<h3>✔ Trilha correta! Agora façam na quadra! 🎉</h3>'
              : '<h3>✖ Ops! A ordem não bate. Toque em recomeçar.</h3>';
    aoTerminar({ jogo: 1, pontos: acertou ? 100 : 0 });
  }

  render();
}
