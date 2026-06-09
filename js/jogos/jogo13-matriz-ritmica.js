export function iniciar(container, aoTerminar) {
  const acoes = [
    { emoji: '👏', nome: 'Palma' },
    { emoji: '🦶', nome: 'Pé direito' },
    { emoji: '🦵', nome: 'Pé esquerdo' },
    { emoji: '🤸', nome: 'Pulo' },
    { emoji: '🙆', nome: 'Giro' }
  ];
  let sequencia = [];

  function render() {
    container.innerHTML = `
      <div style="padding:24px; text-align:center;">
        <h2>Matriz Rítmica</h2>
        <p>Monte sua sequência de movimentos (até 8). Depois execute no ritmo da música na escadinha!</p>
        <div id="paleta" style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin:18px 0;"></div>
        <div id="linha" style="min-height:50px; background:#f1f5f9; border-radius:10px; padding:12px; font-size:1.6rem;"></div>
        <button class="btn-primary" id="tocar" style="margin-top:14px;">▶ Tocar sequência</button>
        <button class="btn-secondary" id="reset" style="margin-top:14px;">↺ Limpar</button>
        <p id="status"></p>
      </div>`;
    const pal = container.querySelector('#paleta');
    acoes.forEach(a => {
      const btn = document.createElement('button');
      btn.className = 'btn-primary';
      btn.textContent = `${a.emoji} ${a.nome}`;
      btn.onclick = () => { if (sequencia.length < 8) { sequencia.push(a); atualizar(); } };
      pal.appendChild(btn);
    });
    container.querySelector('#tocar').onclick = tocar;
    container.querySelector('#reset').onclick = () => { sequencia = []; atualizar(); };
    atualizar();
  }

  function atualizar() {
    const linha = container.querySelector('#linha');
    if (!linha) return;
    linha.textContent = sequencia.length
      ? sequencia.map(a => a.emoji).join(' ')
      : 'Linha do tempo vazia';
  }

  function tocar() {
    if (!sequencia.length) return;
    let i = 0;
    const linha = container.querySelector('#linha');
    const passo = setInterval(() => {
      if (i >= sequencia.length) {
        clearInterval(passo);
        container.querySelector('#status').innerHTML =
          '<h3>✔ Sequência pronta! Execute na escadinha! 🎵</h3>';
        aoTerminar({ jogo: 13, pontos: sequencia.length * 12 });
        return;
      }
      linha.innerHTML = `<span style="font-size:2.4rem;">${sequencia[i].emoji}</span> <small>${sequencia[i].nome}</small>`;
      i++;
    }, 700);
  }

  render();
}
