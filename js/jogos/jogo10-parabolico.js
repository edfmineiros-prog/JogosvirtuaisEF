export function iniciar(container, aoTerminar) {
  const rodadas = [
    { distancia: 'perto',  forcaIdeal: 4, anguloIdeal: 30 },
    { distancia: 'média',  forcaIdeal: 6, anguloIdeal: 45 },
    { distancia: 'longe',  forcaIdeal: 9, anguloIdeal: 50 }
  ];
  let idx = 0, pontos = 0;

  function render() {
    if (idx >= rodadas.length) {
      container.innerHTML = `<div style="padding:40px; text-align:center;">
        <h2>Fim! 🏀</h2><h3>Pontuação: ${pontos}</h3>
        <p>Replique força e ângulo na quadra com bolas reais!</p></div>`;
      aoTerminar({ jogo: 10, pontos });
      return;
    }
    const r = rodadas[idx];
    container.innerHTML = `
      <div style="padding:24px; text-align:center;">
        <h2>Lançamento Parabólico</h2>
        <p>Rodada ${idx + 1} de ${rodadas.length}. Alvo: <strong>${r.distancia}</strong>.</p>
        <p>Força: <strong id="vf">5</strong></p>
        <input type="range" id="forca" min="1" max="10" value="5" style="width:240px;">
        <p>Ângulo: <strong id="va">45</strong>°</p>
        <input type="range" id="angulo" min="10" max="70" value="45" style="width:240px;">
        <br><button class="btn-primary" id="lancar" style="margin-top:16px;">🏀 Lançar!</button>
        <p id="resultado" style="margin-top:12px;"></p>
      </div>`;
    const f = container.querySelector('#forca');
    const a = container.querySelector('#angulo');
    f.oninput = () => container.querySelector('#vf').textContent = f.value;
    a.oninput = () => container.querySelector('#va').textContent = a.value;
    container.querySelector('#lancar').onclick = () => lancar(r, +f.value, +a.value);
  }

  function lancar(r, forca, angulo) {
    const erroF = Math.abs(forca - r.forcaIdeal);
    const erroA = Math.abs(angulo - r.anguloIdeal);
    const res = container.querySelector('#resultado');
    if (erroF <= 1 && erroA <= 10) {
      pontos += 50;
      res.innerHTML = '<h3>✔ Cesta! 🎯</h3>';
      idx++;
      setTimeout(render, 1000);
    } else {
      const dica = forca < r.forcaIdeal ? 'mais força' : forca > r.forcaIdeal ? 'menos força' : 'ajuste o ângulo';
      res.innerHTML = `<h3>✖ Errou! Tente ${dica}.</h3>`;
    }
  }

  render();
}
