const inputTarefa = document.getElementById('inputTarefa');
const btnAdicionar = document.getElementById('btnAdicionar');
const listaTarefas = document.getElementById('listaTarefas');
const contador = document.getElementById('contador');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function salvar() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function atualizarContador() {
  const total = tarefas.length;
  const feitas = tarefas.filter(t => t.concluida).length;
  contador.textContent = `${feitas} de ${total} concluídas`;
}

function renderizar() {
  listaTarefas.innerHTML = '';

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement('li');
    if (tarefa.concluida) {
      li.classList.add('concluida');
    }

    const span = document.createElement('span');
    span.textContent = tarefa.texto;
    span.addEventListener('click', () => {
      tarefa.concluida = !tarefa.concluida;
      salvar();
      renderizar();
    });

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'X';
    btnRemover.classList.add('btn-remover');
    btnRemover.addEventListener('click', () => {
      tarefas.splice(index, 1);
      salvar();
      renderizar();
    });

    li.appendChild(span);
    li.appendChild(btnRemover);
    listaTarefas.appendChild(li);
  });

  atualizarContador();
}

function adicionarTarefa() {
  const texto = inputTarefa.value.trim();

  if (texto === '') {
    alert('Digite alguma coisa antes de adicionar!');
    return;
  }

  tarefas.push({ texto: texto, concluida: false });
  salvar();
  renderizar();

  inputTarefa.value = '';
  inputTarefa.focus();
}

btnAdicionar.addEventListener('click', adicionarTarefa);

inputTarefa.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    adicionarTarefa();
  }
});

renderizar();
