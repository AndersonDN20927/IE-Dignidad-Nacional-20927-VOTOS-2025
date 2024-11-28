// Manejo del almacenamiento local
const VOTES_KEY = 'election_votes';
const VOTERS_KEY = 'election_voters';

function initializeStorage() {
  if (!localStorage.getItem(VOTES_KEY)) {
    const initialVotes = {
      candidato1: 0,
      candidato2: 0,
      candidato3: 0
    };
    localStorage.setItem(VOTES_KEY, JSON.stringify(initialVotes));
  }
  if (!localStorage.getItem(VOTERS_KEY)) {
    localStorage.setItem(VOTERS_KEY, JSON.stringify([]));
  }
}

function getVotes() {
  return JSON.parse(localStorage.getItem(VOTES_KEY));
}

function saveVote(candidatoId) {
  const votes = getVotes();
  votes[candidatoId]++;
  localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
  
  // Guardar DNI del votante
  const dni = document.getElementById('dni').value;
  const voters = JSON.parse(localStorage.getItem(VOTERS_KEY));
  voters.push(dni);
  localStorage.setItem(VOTERS_KEY, JSON.stringify(voters));
}

function hasVoted(dni) {
  const voters = JSON.parse(localStorage.getItem(VOTERS_KEY));
  return voters.includes(dni);
}

function updateVoteDisplay() {
  const votes = getVotes();
  Object.keys(votes).forEach(candidatoId => {
    const element = document.getElementById(`votes-${candidatoId}`);
    if (element) {
      element.textContent = votes[candidatoId];
    }
  });
}