import html2canvas from 'html2canvas';

export const downloadStoryImage = (element) => {
  if (!element) return;

  try {
    html2canvas(element, {
      useCORS: true,
      backgroundColor: '#ffffff',
      scale: 2,
      logging: false,
      allowTaint: true,
      imageTimeout: 0,
      onclone: (clonedDoc) => {
        const clonedStoryContainer = clonedDoc.querySelector('#story-container');
        if (clonedStoryContainer) {
          // Garante que as imagens estejam visíveis no clone
          const img = clonedStoryContainer.querySelector('img');
          if (img && img.style) {
            img.style.visibility = 'visible';
            img.style.opacity = '1';
          }

          // --- AJUSTES FINOS PARA O ALINHAMENTO DOS TEXTOS ---

          // Ajuste para o contêiner geral dos blocos de texto (já existente)
          const textContainer = clonedStoryContainer.querySelector('.absolute.inset-0.flex.flex-col.items-center.justify-center.p-6');
          if (textContainer) {
            // Aumentado o valor negativo para mover mais para cima
            textContainer.style.transform = 'translateY(-8px)'; // Aumentado de -6px para -8px
          }

          // Ajuste para o texto do título "Faça uma pergunta" na tarja preta
          const titleSpan = clonedStoryContainer.querySelector('.bg-black.text-white.px-3.py-2.rounded-t-md.flex.items-center.justify-center span');
          if (titleSpan) {
             // Aumentado o valor negativo para mover mais para cima
             titleSpan.style.transform = 'translateY(-6px)'; // Aumentado de -4px para -6px
          }

          // Ajuste para o texto dentro do bloco branco da pergunta
          // Este é o texto real da pergunta digitada pelo usuário
           const questionTextDiv = clonedStoryContainer.querySelector('.w-full.bg-white.bg-opacity-85.rounded-b-xl.rounded-t-none.p-4.shadow-md div');
           if (questionTextDiv) {
               // Aumentado o valor negativo para mover mais para cima
               questionTextDiv.style.transform = 'translateY(-6px)'; // Aumentado de -4px para -6px
           }


          // Ajuste para o texto dentro do bloco azul da resposta
          // Este é o texto real da resposta digitada pelo usuário
          const answerTextDiv = clonedStoryContainer.querySelector('.w-full.mt-4.bg-gradient-to-br.from-purple-500.to-blue-600.rounded-xl.p-4.shadow-md.overflow-auto div');
           if (answerTextDiv) {
               // Aumentado o valor negativo para mover mais para cima
               answerTextDiv.style.transform = 'translateY(-7px)'; // Aumentado de -5px para -7px
           }

          // --- FIM DOS AJUSTES ---
        }
      }
    }).then(canvas => {
      const dataUrl = canvas.toDataURL('image/png', 1.0);

      const link = document.createElement('a');
      link.download = 'instagram-story.png';
      link.href = dataUrl;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(dataUrl);
      }, 100);
    }).catch(error => {
      console.error('Error capturing screenshot:', error);
      alert('Failed to download image. Please try again or use a screenshot tool.');
    });
  } catch (error) {
    console.error('Error generating image:', error);
    alert('Failed to generate image. Please try again or use a screenshot tool.');
  }
};
