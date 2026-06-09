export function iniciar(container, aoTerminar) {
  const itens = [
    { emoji: '🍌', nome: 'Casca de banana', tipo: 'organico' },
    { emoji: '📰', nome: 'Jornal',          tipo: 'papel' },
    { emoji: '🥤', nome: 'Copo plástico',   tipo: 'plastico' },
    { emoji: '🥫', nome: 'Lata',            tipo: 'metal' },
    { emoji: '🍎', nome: 'Resto de maçã',   tipo: 'organico' },
    { emoji: '📦', nome: 'Caixa de papelão', tipo: 'papel' }
  ];
  const lixeiras = [
    { tipo: 'organico', label: '🟤 Orgânico' },
    { tipo: 'papel',    label: '🔵 Papel' },
    { tipo: 'plastico', label: '🔴 Plástico' },
    { tipo: 'metal',    label: '🟡 Metal' }
  ];
  let idx = 0, pontos = 0;

  function render() {
    if (idx >= itens.length) {
      container.innerHTML = `<div style="padding:40px; text-align:center;">
        <h2>Fim! ♻️</h2><h3>Pontuação: ${pontos} de ${itens.length * 20}</h3>
        <p>Agora façam a estafeta na quadra com as 4 caixas!</p></div>`;
      aoTerminar({ jogo: 6, pontos });
      return;
    }
    const it = itens[idx];
    container.innerHTML = `
      <div style="padding:24px; text-align:center;">
        <h2>Recicladores em Ação</h2>
        <p>Item ${idx + 1} de ${itens.length}. Em qual lixeira ele vai?</p>
        <div style="font-size:3rem; margin:16px 0;">${it.emoji}</div>
        <p><strong>${it.nome}</strong></p>
        <div id="botoes" style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin:20px 0;"></div>
      </div>`;
    const box = container.querySelector('#botoes');
    lixeiras.forEach(l => {
      const btn = document.createElement('button');
      btn.className = 'btn-primary';
      btn.textContent = l.label;
      btn.onclick = () => classificar(l.tipo, it.tipo);
      box.appendChild(btn);
    });
  }

  function classificar(escolhido, correto) {
    if (escolhido === correto) pontos += 20;
    idx++;
    render();
  }

  render();
}
