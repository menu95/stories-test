import React from 'react';

const ImageControls = ({ handleImageUpload, scale, setScale, position, setPosition, hasImage }) => {
  const handleScaleChange = (e) => {
    setScale(parseFloat(e.target.value));
  };

  const handlePositionXChange = (e) => {
    setPosition({ ...position, x: parseInt(e.target.value) });
  };

  const handlePositionYChange = (e) => {
    setPosition({ ...position, y: parseInt(e.target.value) });
  };

  return React.createElement(
    'div',
    { className: 'bg-white p-4 rounded-lg shadow-md' },
    React.createElement(
      'h2',
      { className: 'text-xl font-semibold mb-3' },
      'Background Image'
    ),
    React.createElement(
      'div',
      { className: 'flex flex-col gap-3' },
      React.createElement(
        'div',
        null,
        React.createElement(
          'label',
          { 
            htmlFor: 'image-upload',
            className: 'block mb-1 text-sm font-medium text-gray-700'
          },
          'Upload image'
        ),
        React.createElement(
          'input',
          {
            type: 'file',
            id: 'image-upload',
            accept: 'image/*',
            onChange: handleImageUpload,
            className: 'block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
          }
        )
      ),
      hasImage && React.createElement(
        React.Fragment,
        null,
        React.createElement(
          'div',
          null,
          React.createElement(
            'label',
            { 
              htmlFor: 'scale-control',
              className: 'block mb-1 text-sm font-medium text-gray-700'
            },
            'Zoom: ',
            (scale * 100).toFixed(0),
            '%'
          ),
          React.createElement(
            'input',
            {
              type: 'range',
              id: 'scale-control',
              min: '0',
              max: '3',
              step: '0.1',
              value: scale,
              onChange: handleScaleChange,
              className: 'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600'
            }
          )
        ),
        React.createElement(
          'div',
          { className: 'grid grid-cols-2 gap-4' },
          React.createElement(
            'div',
            null,
            React.createElement(
              'label',
              { 
                htmlFor: 'position-x',
                className: 'block mb-1 text-sm font-medium text-gray-700'
              },
              'Position X: ',
              position.x
            ),
            React.createElement(
              'input',
              {
                type: 'range',
                id: 'position-x',
                min: -1000,
                max: 1000,
                value: position.x,
                onChange: handlePositionXChange,
                className: 'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600'
              }
            )
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'label',
              { 
                htmlFor: 'position-y',
                className: 'block mb-1 text-sm font-medium text-gray-700'
              },
              'Position Y: ',
              position.y
            ),
            React.createElement(
              'input',
              {
                type: 'range',
                id: 'position-y',
                min: -1000,
                max: 1000,
                value: position.y,
                onChange: handlePositionYChange,
                className: 'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600'
              }
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'text-xs text-gray-500 mt-2' },
          'Tip: You can also drag the image to reposition it.'
        )
      )
    )
  );
};

export default ImageControls;