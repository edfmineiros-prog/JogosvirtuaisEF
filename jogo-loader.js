const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'), 10);
const container = document.getElementById('jogo-container');

// Mapa de id -> caminho do arquivo do jogo
const arquivos = {
  1:'./jogos/jogo01-cores-formas.js',
  2:'./jogos/jogo02-zoo-logica.js',
  3:'./jogos/jogo03-espelho.js',
  4:'./jogos/jogo04-pula-silaba.js',
  5:'./jogos/jogo05-calculadora.js',
  6:'./jogos/jogo06-recicladores.js',
  7:'./jogos/jogo07-historias.js',
  8:'./jogos/jogo08-campo-minado.js',
  9:'./jogos/jogo09-circuitos.js',
  10:'./jogos/jogo10-parabolico.js',
  11:'./jogos/jogo11-algoritmo.js',
  12:'./jogos/jogo12-caca-palavras.js',
  13:'./jogos/jogo13-matriz-ritmica.js',
  14:'./jogos/jogo14-batalha-naval.js'
};

// Por enquanto, o que fazer quando um jogo termina.
// No futuro: gravar resultado no Firestore.
function aoTerminar(resultado) {
  console.log('Jogo finalizado:', resultado);
  container.innerHTML += `
    <div style="text-align:center; margin-top:20px;">
      <h3>Fim! Pontuação: ${resultado.pontos ?? '—'}</h3>
      <button class="btn-primary" onclick="window.location.href='index.html'">Voltar ao catálogo</button>
    </div>`;
}

async function carregar() {
  if (!arquivos[id]) {
    container.innerHTML = '<p style="text-align:center; padding:40px;">Jogo não encontrado.</p>';
    return;
  }
  try {
    const modulo = await import(arquivos[id]);
    container.innerHTML = '';
    modulo.iniciar(container, aoTerminar);
  } catch (e) {
    container.innerHTML = '<p style="text-align:center; padding:40px;">Este jogo ainda está em desenvolvimento.</p>';
    console.error(e);
  }
}

carregar();
