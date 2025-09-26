function salvarAgenda() {
  const data = document.getElementById("data").value;
  const horainicio = document.getElementById("horainicio").value;
  const horafim = document.getElementById("horafim").value;
  const disponivel = document.getElementById("disponivel").checked;

  if (!data || !horainicio || !horafim) {
    document.getElementById("mensagem").textContent = "Preencha todos os campos obrigatórios!";
    document.getElementById("mensagem").style.color = "red";
    return;
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "*");

  fetch("http://127.0.0.1:8080/agenda/insert", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    body: JSON.stringify(
      { data,
        Horainicio: horainicio,
        Horafim: horafim, 
        Disponivel: disponivel }
    ),
    headers: headers
  })
  .then(response => {
    if (!response.ok) throw new Error("Erro na resposta da API");
    return response.json();
  })
  .then(data => {
    const agenda_id = data.id;
    console.log("Id da Agenda salva: ", agenda_id);
    localStorage.setItem('id_agenda', agenda_id);

    document.getElementById("mensagem").textContent = "Agenda cadastrada com sucesso!";
    document.getElementById("mensagem").style.color = "green";

    document.getElementById("agendaForm").reset();
  })
  .catch(error => {
    console.error('Erro!:', error);
    document.getElementById("mensagem").textContent = "Erro ao salvar a Agenda!";
    document.getElementById("mensagem").style.color = "red";
  });
}
