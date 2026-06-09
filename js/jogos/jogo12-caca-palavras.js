export function iniciar(container, aoTerminar) {
  const palavra = 'CORRER';
  const letras = [...palavra];
  let embaralhadas = [...letras].sort(() => Math.random() - 0.5);
  let rota = [];

  function render() {
    container.innerHTML = `
      <div style="padding:24px; text-align:center;">
        <h2>Caça-Palavras em Movimento</h2>
        <p>Clique nas letras na ordem para formar a palavra. Depois corra pelos cones na mesma ordem!</p>
        <h3>Palavra: ${palavra.split('').map(() => '_').join(' ')}</h3>
        <div id="cones" style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin:18px 0;"></div>
        <p>Sua rota: <strong id="rota">(vazia)</strong></p>
        <button class="btn-secondary" id="reset">↺ Recomeçar</button>
      </div>`;
    const box = container.querySelector('#cones');
    embaralhadas.forEach((l, i) => {
      const btn = document.createElement('button');
      btn.className = 'btn-primary';
      btn.style.fontSize = '1.4rem';
      btn.textContent = `🚩${l}`;
      btn.onclick = () => { rota.push({ letra: l, btn }); btn.disabled = true; checar(); };
      box.appendChild(btn);
    });
    container.querySelector('#reset').onclick = () => { rota = []; render(); };
  }

  function checar() {
    container.querySelector('#rota').textContent = rota.map(r => r.letra).join('');
    if (rota.length === letras.length) {
      const ok = rota.every((r, i) => r.letra === letras[i]);
      container.querySelector('#cones').innerHTML = ok
        ? '<h3>✔ Palavra correta! Agora corra na quadra! 🏃</h3>'
        : '<h3>✖ Ordem errada. Recomece.</h3>';
      aoTerminar({ jogo: 12, pontos: ok ? 100 : 0 });
    }
  }

  render();
}
