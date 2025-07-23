import React from 'react';

function FormPreview({ formFields }) {
  if (formFields.length === 0) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-center">
        No fields added yet. Add fields to see a preview.
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Form Preview</h3>
      <div className="space-y-3">
        {formFields.map((field) => (
          <div key={field.id} className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-md shadow-sm">
            <span className="text-gray-700 font-medium">{field.label}</span>
            <span className="text-gray-500 text-sm">({field.type}{field.required ? ', Required' : ''})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormPreview;