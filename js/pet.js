function salvarpet() {

  const nome = document.getElementById("nome").value.trim();
  const idade= document.getElementById("idade").value.trim();
  const raca = document.getElementById("raca").value.trim();
  const sexo= document.getElementById("sexo").value.trim();
  const urlImagem = document.getElementById("urlImagem").value.trim();
  const responsavel= document.getElementById("responsavel").value.trim();


  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "*");

  fetch("http://127.0.0.1:8080/pet/insert", {

    method: "POST",
    mode: "cors",
    cache: "no-cache",

    body: JSON.stringify({
      nome: nome,
      idade: idade,
      raca: raca,
      sexo: sexo,
      urlImagem: urlImagem,
      responsavel: responsavel
    }),
     
    headers: headers

 
  }).then(response => {
    if (!response.ok) {
      throw new Error("Erro na resposta da API");
    }
    return response.json();
  }).then(  data =>  {

    const professor_id = data.id;
    console.log("Id do registro salvo: ", pet_id);

    window.location.href = "sucesso.html"

    localStorage.setItem('id_pet', pet_id);

  }).catch(error => console.error('Erro!:', error));


}





// const form = document.getElementById('form-pet');
// const petsContainer = document.getElementById('pets-container');

// // Array para armazenar pets em memória
// const pets = [];

// form.addEventListener('submit', function(event) {
//   event.preventDefault();

//   // Capturar valores do formulário
//   const novoPet = {
//     id: Date.now(), // gera um id simples único
//     nome: form.nome.value.trim(),
//     idade: form.idade.value.trim(),
//     raca: form.raca.value.trim(),
//     porte: form.porte.value,
//     sexo: form.sexo.value,
//     responsavel: form.responsavel.value.trim(),
//     cor: form.cor.value.trim()
//   };

//   // Adiciona no array pets
//   pets.push(novoPet);

//   // Atualiza lista na tela
//   renderPets();

//   // Reseta o formulário
//   form.reset();
//   form.nome.focus();
// });

// function renderPets() {
//   petsContainer.innerHTML = '';

//   if (pets.length === 0) {
//     petsContainer.innerHTML = '<p>Nenhum pet cadastrado.</p>';
//     return;
//   }

//   pets.forEach(pet => {
//     const petDiv = document.createElement('div');
//     petDiv.classList.add('pet-item');

//     petDiv.innerHTML = `
//       <p><strong>Nome:</strong> ${pet.nome}</p>
//       <p><strong>Idade:</strong> ${pet.idade}</p>
//       <p><strong>Raça:</strong> ${pet.raca}</p>
//       <p><strong>Porte:</strong> ${pet.porte}</p>
//       <p><strong>Sexo:</strong> ${pet.sexo}</p>
//       <p><strong>Responsável:</strong> ${pet.responsavel}</p>
//       <p><strong>Cor:</strong> ${pet.cor}</p>
//     `;

//     petsContainer.appendChild(petDiv);
//   });
// }

// // Inicializa lista vazia
// renderPets();
