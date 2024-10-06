document.addEventListener('DOMContentLoaded', function() {
    const rsvpButton = document.getElementById('rsvpButton');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const formModal = document.getElementById('formModal');
    const rsvpForm = document.getElementById('rsvpForm');
    const confirmationModal = document.getElementById('confirmationModal');
    const downloadButton = document.getElementById('downloadButton');

    // Asegurarse de que el modal esté oculto inicialmente
    formModal.classList.add('hidden');
    confirmationModal.classList.add('hidden');

    rsvpButton.addEventListener('click', function() {
        formModal.classList.remove('hidden');
    });

    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const lastName = document.getElementById('lastName').value;

        // Ocultar el botón y mostrar el mensaje de agradecimiento
        rsvpButton.style.display = 'none';
        thankYouMessage.classList.remove('hidden');

        // Ocultar el formulario y mostrar el modal de confirmación
        formModal.classList.add('hidden');
        confirmationModal.classList.remove('hidden');

        // Lanzar confeti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        // Generar la imagen de confirmación
        generateConfirmationImage(name, lastName);
    });

    function generateConfirmationImage(name, lastName) {
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');

        // Fondo
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Texto
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Confirmación de Asistencia', canvas.width / 2, 50);
        ctx.font = '20px Arial';
        ctx.fillText(`${name} ${lastName}`, canvas.width / 2, 100);
        ctx.fillText('confirma su asistencia al', canvas.width / 2, 130);
        ctx.fillText('cumpleaños de Victoria', canvas.width / 2, 160);
        ctx.fillText('Fecha: Miércoles 4 de Diciembre', canvas.width / 2, 220);
        ctx.fillText('Hora: 4:00 PM', canvas.width / 2, 250);

        // Agregar imagen de la invitación
        const img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 200, 280, 200, 100);
            setDownloadButton(canvas);
        };
        img.src = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Victoia-jCgNN5PcX5J8hZWJ57jhINRBWs55uz.jpeg';
        img.crossOrigin = 'anonymous';
    }

    function setDownloadButton(canvas) {
        downloadButton.addEventListener('click', function() {
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'confirmacion_cumpleanos_victoria.png';
            link.href = dataURL;
            link.click();
        });
    }
});