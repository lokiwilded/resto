import React from 'react';

export default function Popup({ title, children, onSave, onCancel }) {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <div className="mb-4">{children}</div>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}