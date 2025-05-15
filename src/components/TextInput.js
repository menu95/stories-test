import React from 'react';

// Adicionada a prop inputClassName com um valor padrão de string vazia
const TextInput = ({ label, value, onChange, placeholder, maxLength, isTextarea = false, rows = 3, inputClassName = '' }) => {
  const inputId = `input-${label.toLowerCase().replace(' ', '-')}`;

  // Combina as classes CSS padrão com as classes fornecidas pela prop inputClassName
  const combinedClassName = `block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${inputClassName}`;

  const inputProps = {
    id: inputId,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    maxLength: maxLength,
    // Usa a string de classes combinada para o atributo className do input/textarea
    className: combinedClassName
  };

  return React.createElement(
    'div',
    { className: 'mb-4' },
    React.createElement(
      'label',
      {
        htmlFor: inputId,
        className: 'block mb-1 text-sm font-medium text-gray-700'
      },
      // Este label ainda mostra o nome do campo e a contagem de caracteres.
      // Você pode querer ajustar ou ocultá-lo se o cabeçalho personalizado for suficiente.
      `${label} ${value.length}/${maxLength}`
    ),
    isTextarea
      ? React.createElement(
          'textarea',
          {
            ...inputProps,
            rows: rows
          }
        )
      : React.createElement(
          'input',
          {
            ...inputProps,
            type: 'text'
          }
        )
  );
};

export default TextInput;
