function salvarVenda() {

  const vloja = document.getElementById("loja").value.trim();
  const vvalorTotal = document.getElementById("valorTotal").value.trim();
  const vvalorItem = document.getElementById("valorItem").value.trim();
  const vdataCompra = document.getElementById("dataCompra").value.trim();
  const vformaPagamento = document.getElementById("formaPagamento").value.trim();
  const vstatus = document.getElementById("status").value.trim();

  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "*");

  fetch("http://127.0.0.1:8080/venda/cadvenda", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",

    body: JSON.stringify({
      loja: vloja,
      valorTotal: vvalorTotal,
      valorItem: vvalorItem,
      dataCompra: vdataCompra,
      formaPagamento: vformaPagamento,
      status: vstatus
    }),

    headers: headers

  }).then(response => {
    if (!response.ok) {
      throw new Error("Erro na resposta da API");
    }
    return response.json();
  }).then(data => {

    const venda_id = data.id;
    console.log("Id da venda salva: ", venda_id);

    localStorage.setItem('id_venda', venda_id);
    alert("Venda salva com sucesso! ID: " + venda_id);

    document.getElementById("formVenda").reset();

  }).catch(error => console.error('Erro!:', error));
}
