document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const imageCanvas = document.getElementById('imageCanvas');
    const ctx = imageCanvas.getContext('2d');
    const feedback = document.getElementById('feedback');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const changeImageButton = document.getElementById('changeImageButton');
    const applyWatermarkButton = document.getElementById('applyWatermark');
    const saveImageButton = document.getElementById('saveImage');
    let uploadedImage = null;
    let watermarkApplied = false;

    function showFeedback(message, isError = false) {
        feedbackMessage.textContent = message;
        feedback.classList.remove('hidden', 'bg-green-100', 'border-green-400', 'text-green-700', 'bg-red-100', 'border-red-400', 'text-red-700');
        feedback.classList.add(isError ? 'bg-red-100' : 'bg-green-100', isError ? 'border-red-400' : 'border-green-400', isError ? 'text-red-700' : 'text-green-700');
        feedback.style.opacity = 1;
        setTimeout(() => {
            feedback.style.opacity = 0;
            setTimeout(() => feedback.classList.add('hidden'), 300);
        }, 1200);
    }

    function handleImage(file) {
        if (!['image/jpeg', 'image/png'].includes(file.type) || file.size > 5 * 1024 * 1024) {
            showFeedback('仅支持 JPG/PNG 格式，且大小不超过 5MB 的图片', true);
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                const scale = Math.min(800 / img.width, 800 / img.height);
                const width = img.width * scale;
                const height = img.height * scale;
                imageCanvas.width = width;
                imageCanvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                uploadedImage = img;
                watermarkApplied = false;
                document.getElementById('dropzone').classList.add('hidden');
                imageCanvas.classList.remove('hidden');
                changeImageButton.classList.remove('hidden');
                showFeedback('图片上传成功');
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }

    function drawWatermark() {
        if (!uploadedImage) {
            showFeedback('请先上传图片', true);
            return;
        }

        ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
        ctx.drawImage(uploadedImage, 0, 0, imageCanvas.width, imageCanvas.height);

        const text = document.getElementById('watermarkText').value;
        const size = document.getElementById('watermarkSize').value;
        const color = document.getElementById('watermarkColor').value;
        const opacity = document.getElementById('watermarkOpacity').value;
        const angle = document.getElementById('watermarkAngle').value;
        const style = document.querySelector('input[name="watermarkStyle"]:checked').value;
        const space = document.getElementById('watermarkSpace').value;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.font = `${size}px Arial`;
        ctx.translate(imageCanvas.width / 2, imageCanvas.height / 2);
        ctx.rotate((angle * Math.PI) / 180);

        if (style === 'STRIPED') {
            const textWidth = ctx.measureText(text).width;
            const patternWidth = textWidth + parseInt(space);
            const patternHeight = parseInt(size) + parseInt(space);

            for (let y = -imageCanvas.height / 2 - patternHeight; y < imageCanvas.height / 2 + patternHeight; y += patternHeight) {
                for (let x = -imageCanvas.width / 2 - patternWidth; x < imageCanvas.width / 2 + patternWidth; x += patternWidth) {
                    ctx.fillText(text, x, y);
                }
            }
        } else if (style === 'CENTRAL') {
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        }

        ctx.restore();
        watermarkApplied = true;
        showFeedback('水印应用成功');
    }

    imageInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleImage(e.target.files[0]);
        }
    });

    const dropzone = document.getElementById('dropzone');
    dropzone.addEventListener('click', () => imageInput.click());
   dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('border-blue-500');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('border-blue-500');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('border-blue-500');
        if (e.dataTransfer.files.length) {
            handleImage(e.dataTransfer.files[0]);
        }
    });

    changeImageButton.addEventListener('click', () => {
        imageInput.click();
    });

    applyWatermarkButton.addEventListener('click', drawWatermark);

    saveImageButton.addEventListener('click', () => {
        if (!watermarkApplied) {
            showFeedback('请先应用水印', true);
            return;
        }
        const link = document.createElement('a');
        link.download = 'watermarked-image.png';
        link.href = imageCanvas.toDataURL();
        link.click();
        showFeedback('图片已保存');
    });

    document.querySelectorAll('#watermarkText, #watermarkColor, #watermarkAngle, #watermarkOpacity, #watermarkSize, #watermarkSpace, input[name="watermarkStyle"]').forEach(element => {
        element.addEventListener('input', () => {
            if (uploadedImage) {
                drawWatermark();
            }
        });
    });

    document.getElementById('watermarkColor').addEventListener('input', (e) => {
        document.getElementById('watermarkColorText').value = e.target.value;
    });

    document.getElementById('watermarkColorText').addEventListener('input', (e) => {
        document.getElementById('watermarkColor').value = e.target.value;
    });

    document.getElementById('watermarkAngle').addEventListener('input', (e) => {
        document.getElementById('angleValue').textContent = `${e.target.value}°`;
    });

    document.getElementById('watermarkOpacity').addEventListener('input', (e) => {
        document.getElementById('opacityValue').textContent = e.target.value;
    });

    document.getElementById('watermarkSize').addEventListener('input', (e) => {
        document.getElementById('sizeValue').textContent = e.target.value;
    });

    document.getElementById('watermarkSpace').addEventListener('input', (e) => {
        document.getElementById('spaceValue').textContent = e.target.value;
    });
});