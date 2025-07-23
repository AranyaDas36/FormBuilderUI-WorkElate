import React from 'react';

function FormPreview({ formFields }) {
  if (formFields.length === 0) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-center">
        Add fields to see a preview.
      </div>
    );
  }

  // Convert formFields to JSON schema
  const jsonSchema = formFields.reduce((acc, field) => {
    acc[field.label] = {
      type: field.type,
      required: field.required || false,
      ...(field.options ? { options: field.options } : {})
    };
    return acc;
  }, {});

  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Form Preview</h3>
      <div className="space-y-3 mb-4">
        {formFields.map((field) => (
          <div
            key={field.id}
            className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-md shadow-sm"
          >
            <span className="text-gray-700 font-medium">{field.label}</span>
            <span className="text-gray-500 text-sm">
              ({field.type}{field.required ? ', Required' : ''})
            </span>
          </div>
        ))}
      </div>

      <h4 className="text-md font-semibold text-gray-700 mb-2">Live JSON Schema</h4>
      <pre className="bg-white border border-gray-200 rounded-md p-3 text-sm overflow-auto">
        {JSON.stringify(jsonSchema, null, 2)}
      </pre>
    </div>
  );
}

export default FormPreview;
