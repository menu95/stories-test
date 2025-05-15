import React from 'react';
import StoryCreator from './components/StoryCreator';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Instagram Story Creator</h1>
      <div className="w-full max-w-4xl">
        <StoryCreator />
      </div>
      <footer className="mt-8 text-center text-gray-500 text-sm">
        Create your custom Instagram question-answer stories
      </footer>
    </div>
  );
}

export default App;