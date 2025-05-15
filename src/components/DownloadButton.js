import React from 'react';

const DownloadButton = ({ onClick }) => {
  return React.createElement(
    'button',
    {
      onClick: onClick,
      className: 'w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all'
    },
    React.createElement(
      'div',
      { className: 'flex items-center justify-center' },
      React.createElement(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          className: 'h-5 w-5 mr-2',
          viewBox: '0 0 20 20',
          fill: 'currentColor'
        },
        React.createElement(
          'path',
          {
            fillRule: 'evenodd',
            d: 'M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z',
            clipRule: 'evenodd'
          }
        )
      ),
      'Download Story'
    )
  );
};

export default DownloadButton;