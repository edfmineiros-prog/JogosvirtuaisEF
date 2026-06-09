export function iniciar(container, aoTerminar) {
  const cenasOriginais = [
    { ordem: 1, texto: '⚽ A criança pega a bola' },
    { ordem: 2, texto: '🏃 Corre até a estação' },
    { ordem: 3, texto: '🎯 Acerta o alvo' },
    { ordem: 4, texto: '🙌 Comemora o ponto' }
  ];
  let embaralhadas = [...cenasOriginais].sort(() => Math.random() - 0.5);
  let montada = [];

  function render() {
    container.innerHTML = `
      <div style="padding:24px; text-align:center;">
        <h2>Construtores de Histórias</h2>
        <p>Clique nas cenas na ordem certa para montar a história. Depois executem nas estações!</p>
        <div id="opcoes" style="display:flex; flex-direction:column; gap:8px; max-width:380px; margin:18px auto;"></div>
        <p>Sua sequência: <strong id="atual">(vazia)</strong></p>
        <button class="btn-secondary" id="reset">↺ Recomeçar</button>
      </div>`;
    const box = container.querySelector('#opcoes');
    embaralhadas.forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'btn-primary';
      btn.textContent = c.texto;
      btn.disabled = montada.includes(c.ordem);
      btn.onclick = () => { montada.push(c.ordem); checar(); };
      box.appendChild(btn);
    });
    container.querySelector('#atual').textContent =
      montada.length ? montada.join(' → ') : '(vazia)';
    container.querySelector('#reset').onclick = () => { montada = []; render(); };
  }

  function checar() {
    if (montada.length === cenasOriginais.length) {
      const ok = montada.every((o, i) => o === i + 1);
      container.querySelector('#opcoes').innerHTML =
        ok ? '<h3>✔ História perfeita! Para a quadra! 🎉</h3>'
           : '<h3>✖ A ordem não faz sentido. Recomece.</h3>';
      aoTerminar({ jogo: 7, pontos: ok ? 100 : 0 });
    } else {
      render();
    }
  }

  render();
}
