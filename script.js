// Array para armazenar as informações dos alunos
const presencas = [];

document.getElementById('confirmar-presenca').addEventListener('click', function() {
    const ra = document.getElementById('ra').value;
    const codigo = document.getElementById('codigo').value;
    const horario = new Date().toLocaleTimeString('pt-BR'); // Adiciona o horário de registro

    // Verifica se ambos os campos foram preenchidos
    if (ra && codigo) {
        // Adiciona as informações ao array de presenças
        presencas.push({ ra, codigo, horario });

        // Exibe uma mensagem de confirmação
        alert(`Presença confirmada para RA: ${ra}`);

        // Limpa os campos de entrada
        document.getElementById('ra').value = '';
        document.getElementById('codigo').value = '';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

document.getElementById('gerar-pdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;

    const professor = document.getElementById('professor').value;
    const disciplina = document.getElementById('disciplina').value;

    // Cria um novo documento PDF
    const doc = new jsPDF();

    // Título e informações do palestrante/tema
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text("Lista de Participantes", 105, 20, null, null, 'center');

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Professor(a): ${professor}`, 20, 30);
    doc.text(`Disciplina: ${disciplina}`, 20, 40);
    doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, 50);

    // Desenha a linha horizontal
    doc.line(20, 55, 190, 55);

    // Cabeçalhos da tabela
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text("Nº", 20, 65);
    doc.text("Matrícula (RA)", 40, 65);
    doc.text("Nome", 80, 65);
    doc.text("Hr.Registro", 160, 65);
    // Linha abaixo dos cabeçalhos
    doc.line(20, 68, 190, 68);

    // Adiciona a lista de presenças
    let yPosition = 75;
    presencas.forEach((presenca, index) => {
        doc.setFont('helvetica', 'normal');
        doc.text(`${index + 1}`, 20, yPosition);
        doc.text(presenca.ra, 40, yPosition);
        doc.text(presenca.codigo, 80, yPosition);
        doc.text(presenca.horario, 160, yPosition);
        yPosition += 10;

        // Verifica se precisa criar uma nova página
        if (yPosition > 280) {
            doc.addPage();
            yPosition = 20;
        }
    });

    // Salva o PDF
    doc.save('lista_presenca.pdf');
});

function updateDateTime() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-BR');
    const formattedTime = now.toLocaleTimeString('pt-BR');
    document.getElementById('datetime').innerText = `${formattedDate} ${formattedTime}`;
}

setInterval(updateDateTime, 1000);
