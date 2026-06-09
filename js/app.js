import { jogos } from './catalogo.js';

const grid = document.getElementById('grid');
const filtros = document.getElementById('filtros');

const categorias = [
  { id:'todos', label:'🌐 Todos' },
  { id:'infantil', label:'🧒 Educação Infantil' },
  { id:'fund1', label:'📚 Fund. I' }
];

let filtroAtivo = 'todos';

function montarFiltros() {
  filtros.innerHTML = '';
  categorias.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'filtro-btn' + (c.id === filtroAtivo ? ' ativo' : '');
    btn.textContent = c.label;
    btn.addEventListener('click', () => {
      filtroAtivo = c.id;
      montarFiltros();
      montarCards();
    });
    filtros.appendChild(btn);
  });
}

function montarCards() {
  grid.innerHTML = '';
  const lista = jogos.filter(j => filtroAtivo === 'todos' || j.cat === filtroAtivo);

  lista.forEach(j => {
    const card = document.createElement('div');
    card.className = 'jogo-card';
    card.innerHTML = `
      <div class="jogo-thumb ${j.cor}">${j.emoji}</div>
      <div class="jogo-body">
        <span class="jogo-tag">${j.tag}</span>
        <h3>${j.id}. ${j.titulo}</h3>
        <p>${j.resumo}</p>
        <div class="jogo-actions">
          <button class="mini-btn digital">🎮 Digital</button>
          <button class="mini-btn quadra">🏃 Quadra</button>
        </div>
      </div>`;
    card.addEventListener('click', () => abrirModal(j.id));
    grid.appendChild(card);
  });
}

// ---- Modal ----
const modal = document.getElementById('modal');

function abrirModal(id) {
  const j = jogos.find(x => x.id === id);
  document.getElementById('modalTitulo').textContent = j.titulo;
  document.getElementById('modalTag').textContent = j.tag;
  document.getElementById('modalDigital').textContent = j.digital;
  document.getElementById('modalQuadra').textContent = j.quadra;
  document.getElementById('modalMateriais').textContent = j.materiais;

  const btnIniciar = document.getElementById('btnIniciarJogo');
  btnIniciar.onclick = () => { window.location.href = `jogo.html?id=${j.id}`; };

  modal.classList.add('show');
}

function fecharModal() { modal.classList.remove('show'); }

document.getElementById('modalClose').addEventListener('click', fecharModal);
modal.addEventListener('click', e => { if (e.target.id === 'modal') fecharModal(); });

// ---- Botões da home (preparados para o futuro) ----
document.getElementById('btnLogin').addEventListener('click', () => {
  alert('Login será adicionado em breve.'); // aqui entrará o Firebase Auth
});
document.getElementById('btnComecar').addEventListener('click', () => {
  document.getElementById('jogos').scrollIntoView({ behavior:'smooth' });
});

// ---- Inicialização ----
montarFiltros();
montarCards();
