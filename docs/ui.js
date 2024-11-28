// Funciones de interfaz de usuario
function verificarFormulario() {
  const dni = document.getElementById('dni').value.trim();
  const nombre = document.getElementById('nombre').value.trim();
  const fecha = document.getElementById('fecha').value;
  const grado = document.getElementById('grado').value;
  
  const continuarBtn = document.getElementById('continuarBtn');
  
  if (hasVoted(dni)) {
    alert('Ya has emitido tu voto anteriormente.');
    continuarBtn.disabled = true;
    return;
  }
  
  continuarBtn.disabled = !(dni.length === 8 && nombre && fecha && grado);
}

function mostrarCandidatos() {
  document.getElementById('inicio').style.display = 'none';
  document.getElementById('candidatos').style.display = 'block';
}

function mostrarAdminLogin() {
  document.getElementById('inicio').style.display = 'none';
  document.getElementById('admin-login').style.display = 'block';
}

function mostrarPerfil(candidatoId) {
  const candidato = candidatos[candidatoId];
  document.getElementById('nombre-candidato').innerText = candidato.nombre;
  document.getElementById('profile-img').src = candidato.foto;
  
  const listaPropuestas = document.getElementById('lista-propuestas');
  listaPropuestas.innerHTML = '';
  candidato.propuestas.forEach(propuesta => {
    const li = document.createElement('li');
    li.textContent = propuesta;
    listaPropuestas.appendChild(li);
  });
  
  document.getElementById('candidatos').style.display = 'none';
  document.getElementById('perfil').style.display = 'block';
  
  // Guardar el candidato seleccionado para el voto
  document.getElementById('btn-votar').setAttribute('data-candidato', candidatoId);
}

function votar() {
  const candidatoId = document.getElementById('btn-votar').getAttribute('data-candidato');
  saveVote(candidatoId);
  
  document.getElementById('perfil').style.display = 'none';
  document.getElementById('mensaje-final').style.display = 'block';
  
  setTimeout(() => {
    document.getElementById('mensaje-final').style.display = 'none';
    document.getElementById('inicio').style.display = 'block';
    // Limpiar formulario
    document.getElementById('dni').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('grado').value = '';
    document.getElementById('continuarBtn').disabled = true;
  }, 2000);
}

function volverACandidatos() {
  document.getElementById('perfil').style.display = 'none';
  document.getElementById('candidatos').style.display = 'block';
}

function volverAInicio() {
  document.getElementById('candidatos').style.display = 'none';
  document.getElementById('admin-login').style.display = 'none';
  document.getElementById('admin-panel').style.display = 'none';
  document.getElementById('inicio').style.display = 'block';
}

function verificarPassword() {
  const password = document.getElementById('admin-password').value;
  const accederBtn = document.getElementById('accederBtn');
  accederBtn.disabled = password !== 'dignidad2025';
}

function accederPanel() {
  const password = document.getElementById('admin-password').value;
  if (password === 'dignidad2025') {
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    mostrarResultadosAdmin();
  }
}

function mostrarResultadosAdmin() {
  const votes = getVotes();
  const listaResultados = document.getElementById('admin-lista-resultados');
  listaResultados.innerHTML = '';
  
  Object.keys(votes).forEach(candidatoId => {
    const li = document.createElement('li');
    li.textContent = `${candidatos[candidatoId].nombre}: ${votes[candidatoId]} votos`;
    listaResultados.appendChild(li);
  });
}