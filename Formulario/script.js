function realizarLogin(event) {
    event.preventDefault(); // Impede o recarregamento da página

    const nome = document.getElementById("nome").value;

    if (nome) {
        alert("Bem-vindo(a), " + nome + "! Vamos para o próximo passo.");
        
        // Exemplo: Redirecionar para a página com o formulário completo
        // window.location.href = "formulario_completo.html"; 
    }
}