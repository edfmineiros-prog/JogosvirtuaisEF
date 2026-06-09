export function iniciar(container, aoTerminar) {
  const exercicios = [
    { emoji: '🏃', nome: 'Corrida no lugar' },
    { emoji: '🦵', nome: 'Agachamento' },
    { emoji: '💪', nome: 'Polichinelo' },
    { emoji: '🤸', nome: 'Abdominal' },
    { emoji: '🧎', nome: 'Prancha' }
  ];
  const tempos = [20, 30, 40];
  let circuito = [];

  function render() {
    container.innerHTML = `
      <div style="padding:24px; text-align:center;">
        <h2>Construtor de Circuitos</h2>
        <p>Monte seu treino HIIT (até 5 estações). Depois lidere a turma!</p>
        <div id="opcoes" style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin:18px 0;"></div>
        <div id="lista"></div>
        <button class="btn-primary" id="finalizar" style="margin-top:14px;">✔ Gerar roteiro</button>
        <button class="btn-secondary" id="reset" style="margin-top:14px;">↺ Limpar</button>
      </div>`;
    const box = container.querySelector('#opcoes');
    exercicios.forEach(e => {
      const btn = document.createElement('button');
      btn.className = 'btn-primary';
      btn.textContent = `${e.emoji} ${e.nome}`;
      btn.onclick = () => adicionar(e);
      box.appendChild(btn);
    });
    container.querySelector('#finalizar').onclick = gerar;
    container.querySelector('#reset').onclick = () => { circuito = []; atualizar(); };
    atualizar();
  }

  function adicionar(e) {
    if (circuito.length >= 5) return;
    const tempo = tempos[Math.floor(Math.random() * tempos.length)];
    circuito.push({ ...e, tempo });
    atualizar();
  }

  function atualizar() {
    const lista = container.querySelector('#lista');
    if (!lista) return;
    lista.innerHTML = circuito.length
      ? '<ul style="list-style:none; line-height:2;">' +
        circuito.map((c, i) => `<li>${i + 1}. ${c.emoji} ${c.nome} — ${c.tempo}s</li>`).join('') +
        '</ul>'
      : '<p style="color:#6b7280;">Nenhuma estação ainda.</p>';
  }

  function gerar() {
    if (circuito.length === 0) return;
    const total = circuito.reduce((s, c) => s + c.tempo, 0);
    container.querySelector('#lista').innerHTML += `
      <div style="background:#f8fafc; border-radius:12px; padding:14px; margin-top:14px;">
        <h3>📋 Roteiro do instrutor</h3>
        <p>Tempo total de esforço: <strong>${total}s</strong>. Você é o instrutor!</p>
      </div>`;
    aoTerminar({ jogo: 9, pontos: circuito.length * 20 });
  }

  render();
}
