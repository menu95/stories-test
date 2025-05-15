import React, { useState, useRef, useEffect, useCallback } from 'react';
import TextInput from './TextInput';
import ImageControls from './ImageControls';
import DownloadButton from './DownloadButton';
import useImageAdjustment from '../hooks/useImageAdjustment';
import { downloadStoryImage } from '../utils/imageUtils';

const StoryCreator = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(null);
  // Manter originalImageDimensions para dimensionamento base
  const [originalImageDimensions, setOriginalImageDimensions] = useState({ width: 0, height: 0 });
  const storyRef = useRef(null); // Referência para o contêiner da história

  const {
    scale,
    setScale,
    position,
    setPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    isDragging
  } = useImageAdjustment();

  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target.result);

        // Cria um elemento de imagem temporário para obter as dimensões intrínsecas da imagem
        const img = new Image();
        img.onload = () => {
           // Armazena as dimensões originais da imagem
           setOriginalImageDimensions({ width: img.width, height: img.height });

           // --- MODIFICAÇÃO: Define a escala inicial para 1 e reseta a posição ---
           setScale(1); // Escala inicial 1 (representa 100% das dimensões originais)
           setPosition({ x: 0, y: 0 }); // Reseta a posição para o canto superior esquerdo
           // --- FIM DA MODIFICAÇÃO ---
        };
        img.src = e.target.result; // Define o src para carregar a imagem e disparar o onload
      };
      reader.readAsDataURL(file);
    }
  }, [setScale, setPosition]); // Removido storyRef das dependências aqui

  // A função getCoverDimensions não é mais necessária para o dimensionamento da imagem no estilo neste cenário
  // Removemos ou deixamos como referência se ainda for usada em outro lugar.
  // Neste cenário, ela não é mais usada para definir o width/height da imagem.
  // const getCoverDimensions = useCallback(() => { /* ... */ }, [/* ... */]);


   // Efeito para recalcular a posição se o contêiner mudar de tamanho após a imagem ser carregada
   useEffect(() => {
       // Neste cenário, não precisamos reajustar a posição inicial aqui
       // se a intenção é que a imagem comece no canto superior esquerdo (0,0)
       // e o usuário a mova.
   }, [storyRef, backgroundImage, originalImageDimensions, setPosition, scale]);


  const handleDownload = () => {
    if (storyRef.current) {
      downloadStoryImage(storyRef.current);
    }
  };

   // Não precisamos mais de coverDimensions para o estilo direto da imagem

  return React.createElement(
    'div',
    { className: 'flex flex-col md:flex-row gap-6' },
    React.createElement(
      'div',
      { className: 'md:w-1/2 flex flex-col gap-4' },
      React.createElement(
        'div',
        { className: 'bg-white p-4 rounded-lg shadow-md' },
        React.createElement(
          'h2',
          { className: 'text-xl font-semibold mb-3' },
          'Story Content'
        ),
        React.createElement(TextInput, {
          label: 'Question',
          value: question,
          onChange: (e) => setQuestion(e.target.value),
          placeholder: 'Digite sua pergunta aqui...',
          maxLength: 100
        }),
        React.createElement(TextInput, {
          label: 'Answer',
          value: answer,
          onChange: (e) => setAnswer(e.target.value),
          placeholder: 'Digite sua resposta aqui...',
          maxLength: 500,
          isTextarea: true,
          rows: 5
        })
      ),
      React.createElement(ImageControls, {
        handleImageUpload: handleImageUpload,
        scale: scale,
        setScale: setScale,
        position: position,
        setPosition: setPosition,
        hasImage: !!backgroundImage
      }),
      React.createElement(DownloadButton, {
        onClick: handleDownload
      })
    ),
    React.createElement(
      'div',
      { className: 'md:w-1/2' },
      React.createElement(
        'div',
        { className: 'bg-white p-4 rounded-lg shadow-md' },
        React.createElement(
          'h2',
          { className: 'text-xl font-semibold mb-3' },
          'Preview'
        ),
        React.createElement(
          'div',
          {
            id: 'story-container',
            className: 'relative w-full aspect-[9/16] mx-auto overflow-hidden rounded-lg shadow-lg', // Este contêiner mantém o overflow-hidden para o formato da história
            ref: storyRef, // Referência definida aqui
            style: {
              maxWidth: '360px'
            }
          },
          backgroundImage && originalImageDimensions.width > 0 && React.createElement( // Renderiza a div e a imagem apenas se houver imagem e dimensões originais
            'div',
            {
              className: 'absolute inset-0', // Removido overflow-hidden
              onMouseDown: handleMouseDown,
              onMouseMove: handleMouseMove,
              onMouseUp: handleMouseUp,
              onMouseLeave: handleMouseUp,
              style: {
                cursor: isDragging ? 'grabbing' : 'grab',
                // --- ADIÇÃO: Define a origem da transformação para o canto superior esquerdo ---
                transformOrigin: '0 0',
                // --- FIM DA ADIÇÃO ---
                // --- MODIFICAÇÃO: Aplica a escala e a translação diretamente ---
                 transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                // --- FIM DA MODIFICAÇÃO ---
                transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                 // Define o tamanho da div pai da imagem para as dimensões originais
                 width: `${originalImageDimensions.width}px`,
                 height: `${originalImageDimensions.height}px`,
              }
            },
            React.createElement('img', {
              src: backgroundImage,
              className: 'pointer-events-none',
              alt: 'Background',
              style: {
                // --- MODIFICAÇÃO: Define a imagem para ocupar 100% da div pai (que tem as dimensões originais) ---
                width: '100%',
                height: '100%',
                // Removido objectFit: 'cover', - Já foi removido
                // Removido objectPosition: 'center', - A translação na div pai lida com o posicionamento
                // Removido a aplicação da escala aqui, pois ela será aplicada na div pai
                // Removido a translação aqui, pois ela será aplicada na div pai
              }
            })
          ),
          React.createElement(
            'div',
            {
              className: 'absolute inset-0 flex flex-col items-center justify-center p-6',
            },
            React.createElement(
              'div',
              {
                className: 'w-full bg-black text-white px-3 py-2 rounded-t-md flex items-center justify-center',
                style: {
                   maxWidth: '90%',
                   marginBottom: '-2px'
                }
              },
              React.createElement('span', { className: 'text-sm font-medium' }, 'Faça uma pergunta')
            ),
            React.createElement(
              'div',
              {
                className: 'w-full bg-white bg-opacity-85 rounded-b-xl rounded-t-none p-4 shadow-md',
                style: {
                  maxWidth: '90%'
                }
              },
              React.createElement(
                'div',
                {
                  className: 'text-center font-medium text-gray-500 mb-2',
                  style: {
                    fontSize: question && question.length > 50 ? '0.9rem' : '1rem'
                  }
                },
                question || 'Faça uma pergunta...'
              )
            ),
            answer && React.createElement(
              'div',
              {
                className: 'w-full mt-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl p-4 shadow-md overflow-auto',
                style: {
                  maxWidth: '90%',
                  maxHeight: '50%'
                }
              },
              React.createElement(
                'div',
                {
                  className: 'text-white',
                  style: {
                    fontSize: answer && answer.length > 100 ? '0.85rem' : '1rem'
                  }
                },
                answer
              )
            )
          )
        )
      )
    )
  );
};

export default StoryCreator;
