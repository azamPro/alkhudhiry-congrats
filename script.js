const canvas = document.getElementById('cardCanvas');
const ctx = canvas.getContext('2d');
const nameInput = document.getElementById('nameInput');
const downloadBtn = document.getElementById('downloadBtn');


const image = new Image();
image.src = '/image1.jpg'; 



image.onload = () => {
    drawCanvas();
};

nameInput.addEventListener('input', () => {
    drawCanvas(nameInput.value.trim());
});

downloadBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (!name) {
        alert('الرجاء كتابة الاسم');
        return;
    }

    const link = document.createElement('a');
    link.download = `بطاقة - ${name}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
});


function drawCanvas(name = '') {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    if (name) {
        const fontSize = canvas.width * 0.06; 
        ctx.font = `bold ${fontSize}px "Tajawal", Arial`;
        ctx.fillStyle = '#556B2F'; 
        ctx.textAlign = 'center';

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;

        const yPosition = canvas.height * 0.56; 

        ctx.strokeText(name, canvas.width / 2, yPosition);
        ctx.fillText(name, canvas.width / 2, yPosition);
    }
}
