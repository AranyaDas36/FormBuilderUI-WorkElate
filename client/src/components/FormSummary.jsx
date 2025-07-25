import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL ='https://formbuilderui-workelate.onrender.com';

function FormSummary() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await axios.get(`${BACKEND_URL}/api/forms/summary`);
      setResponses(result.data.data);
    } catch (err) {
      console.error('Error fetching form responses:', err);
      setError('Failed to load form responses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const totalResponses = responses.length;
  const lastSubmittedAt = responses.length > 0 ? new Date(responses[0].submittedAt).toLocaleString() : 'N/A';

  if (loading) {
    return <div className="text-center text-gray-600">Loading summary...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Form Submission Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
          <p className="text-sm font-medium text-blue-700">Total Responses</p>
          <p className="text-3xl font-bold text-blue-900">{totalResponses}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-md border border-green-200">
          <p className="text-sm font-medium text-green-700">Last Submitted At</p>
          <p className="text-lg font-bold text-green-900">{lastSubmittedAt}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4 text-gray-800">All Submitted Responses</h3>
      {responses.length === 0 ? (
        <p className="text-gray-500 text-center">No form responses submitted yet.</p>
      ) : (
        <div className="space-y-4">
          {responses.map((response, index) => (
            <div key={response._id} className="border border-gray-200 rounded-md p-4 bg-gray-50 shadow-sm">
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Submission {totalResponses - index}</span> (ID: {response._id}) - Submitted on: {new Date(response.submittedAt).toLocaleString()}
              </p>
              <div className="bg-white p-3 rounded-md border border-gray-100">
                <h4 className="font-semibold text-gray-700 mb-2">Answers:</h4>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {Object.entries(response.answers).map(([fieldId, answer]) => {
                    // Find the corresponding field label from the 'formed' schema
                    const fieldDef = response.formed.find(f => f.id === fieldId);
                    const label = fieldDef ? fieldDef.label : fieldId;
                    return (
                      <li key={fieldId}>
                        <span className="font-medium">{label}:</span> {String(answer)}
                      </li>
                    );
                  })}
                </ul>
              </div>
              {/* Optionally display the full form schema that was used for this submission */}
              {/* <div className="mt-3 bg-white p-3 rounded-md border border-gray-100">
                <h4 className="font-semibold text-gray-700 mb-2">Form Schema:</h4>
                <pre className="text-xs bg-gray-100 p-2 rounded-md overflow-auto">{JSON.stringify(response.formed, null, 2)}</pre>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FormSummary;