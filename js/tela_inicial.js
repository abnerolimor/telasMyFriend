// Funções de navegação (exemplo simples com alertas)
document.getElementById('home').addEventListener('click', () => {
    alert('Você clicou em Home');
  });
  
  document.getElementById('perfil-pet').addEventListener('click', () => {
    alert('Você clicou em Perfil do Pet');
  });
  
  document.getElementById('criar-conta').addEventListener('click', () => {
    alert('Você clicou em Criar conta');
  });
  
  document.getElementById('agenda').addEventListener('click', () => {
    alert('Você clicou em Agenda');
  });
  
  document.getElementById('produtos').addEventListener('click', () => {
    alert('Você clicou em Produtos');
  });
  
  // Pesquisa simples - só alerta o termo buscado
  document.getElementById('buscar').addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
      alert(`Buscando por: ${e.target.value}`);
    }
  });
  