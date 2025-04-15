// src/components/common/EntityForm/EntityForm.tsx

import React from 'react';
import { Formik, Form, Field } from 'formik';

interface EntityFormProps {
  entityType?: string; // Add optional entityType prop
  initialValues: any;
  onSubmit: (values: any) => void;
  isSubmitting: boolean;
  fieldConfig: any;
}

export const EntityForm: React.FC<EntityFormProps> = ({
  entityType,
  initialValues,
  onSubmit,
  isSubmitting,
  fieldConfig,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          {fieldConfig.map((field: any) => (
            <div key={field.name} className="form-group">
              <label htmlFor={field.name}>{field.label}</label>
              <Field
                id={field.name}
                name={field.name}
                type={field.type || 'text'}
                className="form-control"
              />
            </div>
          ))}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : `Submit ${entityType || ''}`}
          </button>
        </Form>
      )}
    </Formik>
  );
};