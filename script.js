document.addEventListener('DOMContentLoaded', function() {
    const rsvpButton = document.getElementById('rsvpButton');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const formModal = document.getElementById('formModal');
    const rsvpForm = document.getElementById('rsvpForm');
    const confirmationModal = document.getElementById('confirmationModal');
    const shareButton = document.getElementById('shareButton');

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
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');

        // Fondo con degradado
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#1E90FF');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Burbujas decorativas
        for (let i = 0; i < 50; i++) {
            ctx.beginPath();
            ctx.arc(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                Math.random() * 5 + 1,
                0,
                Math.PI * 2
            );
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.fill();
        }

        // Título
        ctx.fillStyle = 'white';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Confirmación de Asistencia', canvas.width / 2, 80);

        // Información del invitado
        ctx.font = 'bold 30px Arial';
        ctx.fillText(`${name} ${lastName}`, canvas.width / 2, 150);
        ctx.font = '24px Arial';
        ctx.fillText('confirma su asistencia al', canvas.width / 2, 190);
        ctx.fillText('cumpleaños de Victoria', canvas.width / 2, 220);

        // Detalles del evento
        ctx.font = 'bold 28px Arial';
        ctx.fillText('Fecha: Miércoles 4 de Diciembre', canvas.width / 2, 300);
        ctx.fillText('Hora: 4:00 PM', canvas.width / 2, 340);

        // Agregar imagen de la invitación
        const img = new Image();
        img.onload = function() {
            // Crear un marco para la imagen
            ctx.save();
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
            
            // Dibujar un rectángulo blanco como fondo de la imagen
            ctx.fillStyle = 'white';
            ctx.fillRect(250, 380, 300, 150);
            
            // Dibujar la imagen
            ctx.drawImage(img, 260, 390, 280, 130);
            ctx.restore();

            // Añadir elementos decorativos marinos
            drawSeaElements(ctx);

            // Configurar el botón de compartir
            setShareButton(canvas);
        };
        img.src = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Victoia-jCgNN5PcX5J8hZWJ57jhINRBWs55uz.jpeg';
        img.crossOrigin = 'anonymous';
    }

    function drawSeaElements(ctx) {
        // Dibujar un pez
        ctx.fillStyle = '#FF6347';
        ctx.beginPath();
        ctx.moveTo(100, 500);
        ctx.quadraticCurveTo(150, 450, 200, 500);
        ctx.quadraticCurveTo(150, 550, 100, 500);
        ctx.fill();

        // Ojo del pez
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(170, 500, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(170, 500, 5, 0, Math.PI * 2);
        ctx.fill();

        // Dibujar algas
        ctx.strokeStyle = '#32CD32';
        ctx.lineWidth = 3;
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(50 + i * 20, 600);
            ctx.quadraticCurveTo(60 + i * 20, 550, 50 + i * 20, 500);
            ctx.stroke();
        }

        // Dibujar una estrella de mar
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.moveTo(700, 500);
        for (let i = 0; i < 5; i++) {
            ctx.lineTo(700 + Math.cos((18 + i * 72) * Math.PI / 180) * 30,
                       500 + Math.sin((18 + i * 72) * Math.PI / 180) * 30);
            ctx.lineTo(700 + Math.cos((54 + i * 72) * Math.PI / 180) * 15,
                       500 + Math.sin((54 + i * 72) * Math.PI / 180) * 15);
        }
        ctx.closePath();
        ctx.fill();
    }

    function setShareButton(canvas) {
        shareButton.addEventListener('click', function() {
            canvas.toBlob(function(blob) {
                const file = new File([blob], "confirmacion_cumpleanos_victoria.png", { type: "image/png" });
                const filesArray = [file];
                
                if (navigator.canShare && navigator.canShare({ files: filesArray })) {
                    navigator.share({
                        files: filesArray,
                        title: 'Confirmación de Asistencia',
                        text: '¡He confirmado mi asistencia al cumpleaños de Victoria!'
                    }).then(() => {
                        console.log('Compartido exitosamente');
                    }).catch((error) => {
                        console.error('Error al compartir', error);
                        fallbackToWhatsApp(canvas);
                    });
                } else {
                    fallbackToWhatsApp(canvas);
                }
            });
        });
    }

    function fallbackToWhatsApp(canvas) {
        canvas.toBlob(function(blob) {
            const reader = new FileReader();
            reader.onloadend = function() {
                const base64data = reader.result;
                const message = encodeURIComponent("¡He confirmado mi asistencia al cumpleaños de Victoria!");
                const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
                window.open(whatsappUrl, '_blank');
            }
            reader.readAsDataURL(blob);
        });
    }
});