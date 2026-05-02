import React from 'react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = '' }) => {
  if (!message) return null;
  
  return (
    <div className={`p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200 ${className}`} role="alert">
      <span className="font-medium">Error:</span> {message}
    </div>
  );
};
