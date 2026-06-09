export function iniciar(container, aoTerminar) {
  const tamanho = 4;
  const caminhoSeguro = [0, 5, 6, 10, 15]; // índices da grade 4x4
  let escolhas = [], fase = 'memorizar';

  function render() {
    container.innerHTML = `
      <div style="padding:24px; text-align:center;">
        <h2>Campo Minado da Memória</h2>
        <p id="instr">Memorize o caminho verde! Você tem 5 segundos...</p>
        <div id="grade" style="display:grid; grid-template-columns:repeat(${tamanho}, 56px); gap:6px; justify-content:center; margin:20px auto;"></div>
        <p id="status"></p>
      </div>`;
    desenhar(true);
    let s = 5;
    const timer = setInterval(() => {
      s--;
      container.querySelector('#instr').textContent = `Memorize o caminho verde! ${s}s...`;
      if (s <= 0) { clearInterval(timer); iniciarFaseJogo(); }
    }, 1000);
  }

  function desenhar(mostrar) {
    const grade = container.querySelector('#grade');
    grade.innerHTML = '';
    for (let i = 0; i < tamanho * tamanho; i++) {
      const cel = document.createElement('button');
      cel.style.cssText = 'width:56px;height:56px;border:none;border-radius:8px;cursor:pointer;font-size:1.2rem;';
      const seguro = caminhoSeguro.includes(i);
      if (mostrar) {
        cel.style.background = seguro ? '#16a34a' : '#e5e7eb';
      } else {
        cel.style.background = '#cbd5e1';
        cel.onclick = () => pisar(i, cel);
      }
      grade.appendChild(cel);
    }
  }

  function iniciarFaseJogo() {
    fase = 'jogar';
    container.querySelector('#instr').textContent = 'Agora atravesse pisando só nas células seguras!';
    desenhar(false);
  }

  function pisar(i, cel) {
    if (caminhoSeguro.includes(i)) {
      cel.style.background = '#16a34a';
      escolhas.push(i);
      if (escolhas.length === caminhoSeguro.length) finalizar(true);
    } else {
      cel.style.background = '#ef4444';
      finalizar(false);
    }
  }

  function finalizar(ok) {
    container.querySelector('#status').innerHTML = ok
      ? '<h3>✔ Caminho completo! Façam na quadra com cones. 🎉</h3>'
      : '<h3>💥 Pisou numa mina! Tente de novo.</h3>';
    aoTerminar({ jogo: 8, pontos: ok ? 100 : escolhas.length * 20 });
  }

  render();
}
