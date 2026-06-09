export function iniciar(container, aoTerminar) {
  const animais = [
    { emoji: '🐸', nome: 'Sapo',   mov: 'pular agachado' },
    { emoji: '🐍', nome: 'Cobra',  mov: 'rastejar no chão' },
    { emoji: '🐎', nome: 'Cavalo', mov: 'galopar' },
    { emoji: '🦀', nome: 'Caranguejo', mov: 'andar de lado' },
    { emoji: '🦘', nome: 'Canguru', mov: 'saltos grandes' },
    { emoji: '🦆', nome: 'Pato',   mov: 'andar agachado' }
  ];
  let escolhidos = [];

  function render() {
    container.innerHTML = `
      <div style="padding:24px; text-align:center;">
        <h2>Zoo-Lógica</h2>
        <p>Escolha 4 animais na ordem. Cada um vira um jeito de atravessar a quadra!</p>
        <div id="opcoes" style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin:20px 0;"></div>
        <div id="cartao"></div>
        <button class="btn-secondary" id="reset" style="margin-top:12px;">↺ Recomeçar</button>
      </div>`;
    const opcoes = container.querySelector('#opcoes');
    animais.forEach(a => {
      const btn = document.createElement('button');
      btn.className = 'btn-primary';
      btn.style.fontSize = '1.4rem';
      btn.textContent = a.emoji;
      btn.title = a.nome;
      btn.onclick = () => escolher(a);
      opcoes.appendChild(btn);
    });
    container.querySelector('#reset').onclick = () => { escolhidos = []; render(); };
  }

  function escolher(a) {
    if (escolhidos.length >= 4) return;
    escolhidos.push(a);
    if (escolhidos.length === 4) gerarCartao();
  }

  function gerarCartao() {
    const linhas = escolhidos.map((a, i) =>
      `<li>${i + 1}. ${a.emoji} ${a.nome} → ${a.mov}</li>`).join('');
    container.querySelector('#cartao').innerHTML = `
      <div style="background:#f8fafc; border-radius:12px; padding:16px; margin-top:16px; text-align:left; display:inline-block;">
        <h3>🎫 Cartão de Missão</h3>
        <ul style="list-style:none; line-height:2;">${linhas}</ul>
      </div>
      <p style="margin-top:10px;"><strong>Imprima ou anote e leve para a quadra!</strong></p>`;
    aoTerminar({ jogo: 2, pontos: 100 });
  }

  render();
}
