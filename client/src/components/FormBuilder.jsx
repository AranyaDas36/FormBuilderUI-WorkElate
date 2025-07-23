import React, { useState, useEffect } from 'react';
import FormField from './FormField';
import FormPreview from './FormPreview';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

function FormBuilder() {
  const [formFields, setFormFields] = useState([]);
  const [fieldLabel, setFieldLabel] = useState('');
  const [fieldType, setFieldType] = useState('text');
  const [fieldRequired, setFieldRequired] = useState(false);
  const [fieldOptions, setFieldOptions] = useState(''); // For dropdown options
  const [formAnswers, setFormAnswers] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');

  // Capability Task 1: Generate JSON Schema of Form Live
  const generateFormSchema = () => {
    return formFields.map(field => {
      const schemaField = {
        id: field.id,
        label: field.label,
        type: field.type,
        required: field.required,
      };
      if (field.type === 'dropdown' && field.options) {
        schemaField.options = field.options;
      }
      return schemaField;
    });
  };

  const addField = () => {
    if (!fieldLabel.trim()) {
      alert('Field label cannot be empty.');
      return;
    }

    const newField = {
      id: `field-${Date.now()}`,
      label: fieldLabel.trim(),
      type: fieldType,
      required: fieldRequired,
    };

    if (fieldType === 'dropdown') {
      newField.options = fieldOptions.split(',').map(opt => opt.trim()).filter(opt => opt !== '');
      if (newField.options.length === 0) {
        alert('Dropdown fields require at least one option.');
        return;
      }
    }

    setFormFields([...formFields, newField]);
    setFieldLabel('');
    setFieldType('text');
    setFieldRequired(false);
    setFieldOptions('');
  };

  const handleAnswerChange = (fieldId, value) => {
    setFormAnswers(prevAnswers => ({
      ...prevAnswers,
      [fieldId]: value,
    }));
  };

  // Task 2: Field Validation
  const validateForm = () => {
    const errors = {};
    formFields.forEach(field => {
      const value = formAnswers[field.id];
      if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
        errors[field.id] = `${field.label} is required.`;
      } else if (field.type === 'date' && value && isNaN(new Date(value))) {
        errors[field.id] = `${field.label} must be a valid date.`;
      }
      // Add more format checks here if needed (e.g., email regex)
    });
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Task 3 & 4: Save Form Response to DB & Connect Front + Back
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setSubmissionMessage('');

    const isValid = validateForm();
    if (!isValid) {
      setSubmissionMessage('Please correct the errors in the form.');
      return;
    }

    const formedSchema = generateFormSchema();
    const submissionData = {
      formed: formedSchema,
      answers: formAnswers,
    };

    try {
      const response = await axios.post(`${BACKEND_URL}/api/forms/submit`, submissionData);
      setSubmissionMessage('Form submitted successfully!');
      setFormAnswers({}); // Clear form after submission
      setValidationErrors({}); // Clear validation errors
      console.log('Submission successful:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionMessage(`Error submitting form: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form Builder Section */}
      <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Build Your Form</h2>

        <div className="mb-6 p-4 border border-blue-200 bg-blue-50 rounded-md">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">Add New Field</h3>
          <div className="mb-3">
            <label htmlFor="fieldLabel" className="block text-sm font-medium text-gray-700">Field Label</label>
            <input
              type="text"
              id="fieldLabel"
              value={fieldLabel}
              onChange={(e) => setFieldLabel(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., Your Name, Date of Birth"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fieldType" className="block text-sm font-medium text-gray-700">Field Type</label>
            <select
              id="fieldType"
              value={fieldType}
              onChange={(e) => setFieldType(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="text">Text</option>
              <option value="date">Date</option>
              <option value="dropdown">Dropdown</option>
            </select>
          </div>
          {fieldType === 'dropdown' && (
            <div className="mb-3">
              <label htmlFor="fieldOptions" className="block text-sm font-medium text-gray-700">Dropdown Options (comma-separated)</label>
              <input
                type="text"
                id="fieldOptions"
                value={fieldOptions}
                onChange={(e) => setFieldOptions(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., Option 1, Option 2, Option 3"
              />
            </div>
          )}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="fieldRequired"
              checked={fieldRequired}
              onChange={(e) => setFieldRequired(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="fieldRequired" className="ml-2 block text-sm text-gray-900">Required Field</label>
          </div>
          <button
            onClick={addField}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Field
          </button>
        </div>

        {/* Live Form Preview */}
        <FormPreview formFields={formFields} />
      </div>

      {/* Rendered Form for Submission */}
      <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Fill Out Your Form</h2>
        {formFields.length === 0 ? (
          <p className="text-gray-500 text-center">Start by adding fields to the form builder on the left.</p>
        ) : (
          <form onSubmit={handleSubmitForm} className="space-y-4">
            {formFields.map((field) => (
              <FormField
                key={field.id}
                field={field}
                value={formAnswers[field.id]}
                onChange={handleAnswerChange}
                validationErrors={validationErrors}
              />
            ))}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Submit Form
            </button>
            {submissionMessage && (
              <p className={`mt-4 text-center font-medium ${submissionMessage.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                {submissionMessage}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default FormBuilder;