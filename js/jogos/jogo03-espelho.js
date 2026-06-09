export function iniciar(container, aoTerminar) {
  const poses = ['🙆 Braços para cima', '🧍 Braços ao lado', '🤸 Perna levantada', '🙋 Uma mão no alto'];
  let rodada = 0;
  let acertos = 0;

  function mostrar() {
    if (rodada >= poses.length) {
      aoTerminar({ jogo:3, pontos:acertos * 25 });
      return;
    }
    container.innerHTML = `
      <div style="text-align:center; padding:40px;">
        <h2>Espelho Mágico</h2>
        <p>Rodada ${rodada + 1} de ${poses.length}</p>
        <div style="font-size:3rem; margin:30px 0;">${poses[rodada]}</div>
        <p>O aluno espelhou a pose corretamente?</p>
        <button class="btn-primary" id="ok">✔ Acertou</button>
        <button class="btn-secondary" id="no">�’ Errou</button>
      </div>`;
    container.querySelector('#ok').onclick = () => { acertos++; rodada++; mostrar(); };
    container.querySelector('#no').onclick = () => { rodada++; mostrar(); };
  }
  mostrar();
}
