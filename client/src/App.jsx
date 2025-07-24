import React, { useState } from 'react';
import FormBuilder from './components/FormBuilder';
import FormSummary from './components/FormSummary';

function App() {
  const [view, setView] = useState('builder'); // 'builder' or 'summary'

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-200 p-4">
      <nav className="mb-8 flex justify-center space-x-28 border-gray-300">
        <span
          onClick={() => setView('builder')}
          className={`pb-2 cursor-pointer text-lg font-semibold relative
            ${view === 'builder' ? 'text-blue-600 after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-blue-600' : 'text-gray-600'}
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:bg-blue-600 ${view === 'builder' ? '' : 'after:w-0'}`}
        >
          Form Builder
        </span>
        <span
          onClick={() => setView('summary')}
          className={`pb-2 cursor-pointer text-lg font-semibold relative
            ${view === 'summary' ? 'text-blue-600 after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-blue-500' : 'text-gray-600'}
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:bg-blue-600 ${view === 'summary' ? '' : 'after:w-0'}`}
        >
          Form Summary
        </span>
      </nav>


            
      <main className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        {view === 'builder' ? <FormBuilder /> : <FormSummary />}
      </main>
    </div>
  );
}

export default App;