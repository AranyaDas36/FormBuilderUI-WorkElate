import React, { useState } from 'react';
import FormBuilder from './components/FormBuilder';
import FormSummary from './components/FormSummary';

function App() {
  const [view, setView] = useState('builder'); // 'builder' or 'summary'

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="mb-8 flex justify-center space-x-4">
        <button
          onClick={() => setView('builder')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
            view === 'builder' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-200'
          }`}
        >
          Form Builder
        </button>
        <button
          onClick={() => setView('summary')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
            view === 'summary' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-200'
          }`}
        >
          Form Summary
        </button>
      </nav>

      <main className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {view === 'builder' ? <FormBuilder /> : <FormSummary />}
      </main>
    </div>
  );
}

export default App;