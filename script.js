const canvas = document.getElementById("cardCanvas");
const ctx = canvas.getContext("2d");
const nameInput = document.getElementById("nameInput");
const downloadBtn = document.getElementById("downloadBtn");

const img = new Image();
img.src = "image1.jpg";             // تأكد أن الصورة في نفس المجلد

// لون أخضر مأخوذ من التصميم (#3e783e تقريباً)
const MAIN_GREEN = "#3e783e";

img.onload = () => {
  /** 1) نضبط حجم اللوحة على حجم الصورة الأصلي */
  const dpr = window.devicePixelRatio || 1;
  canvas.width = img.naturalWidth * dpr;
  canvas.height = img.naturalHeight * dpr;

  /** 2) نُرجع الحجم المرئي بالـCSS، مع الحفاظ على دقّة عالية للتحميل */
  canvas.style.width = `${img.naturalWidth}px`;
  canvas.style.height = "auto";

  /** 3) نقوم بالتحجيم داخل سياق الرسم */
  ctx.scale(dpr, dpr);

  drawCanvas();                     // رسم أولي
};

nameInput.addEventListener("input", e => drawCanvas(e.target.value.trim()));

downloadBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (!name) return alert("الرجاء كتابة الاسم");
  const link = document.createElement("a");
  link.download = `بطاقة - ${name}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
});

function drawCanvas(name = "") {
  ctx.clearRect(0, 0, img.naturalWidth, img.naturalHeight);
  ctx.drawImage(img, 0, 0);

  if (name) {
    // حجم الخط = ‎6‎٪ من عرض البطاقة
    const fontSize = img.naturalWidth * 0.06;
    ctx.font = `bold ${fontSize}px "Tajawal", Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.lineJoin = "round";

    /** ظل بسيط أبيض خلف النص */
    ctx.lineWidth = fontSize * 0.13;
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.strokeText(name, img.naturalWidth / 2, img.naturalHeight * 0.56);

    /** نص باللون الأخضر */
    ctx.fillStyle = MAIN_GREEN;
    ctx.fillText(name, img.naturalWidth / 2, img.naturalHeight * 0.56);
  }
}
