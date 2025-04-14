import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ArtifactUpload } from './ArtifactUpload';

export const EntityForm = ({ initialValues, onSubmit, isSubmitting, fieldConfig }) => {
  // Build validation schema dynamically
  const validationSchema = Yup.object().shape(
    fieldConfig.reduce((acc, field) => {
      if (field.required) {
        acc[field.name] =
          field.type === 'multiselect'
            ? Yup.array().of(Yup.string()).required(`${field.label} is required`)
            : Yup.string().required(`${field.label} is required`);
      }
      return acc;
    }, {})
  );

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ setFieldValue, values }) => (
        <Form>
          {fieldConfig.map((field) => {
            if (field.type === 'upload') {
              return (
                <div className="form-group" key={field.name}>
                  <label>{field.label}</label>
                  <ArtifactUpload
                    onFileUpload={(file) => {
                      setFieldValue('payload_bin', file);
                      setFieldValue('url', '');
                    }}
                    onUrlChange={(url) => {
                      setFieldValue('url', url);
                      setFieldValue('payload_bin', '');
                    }}
                    currentValue={
                      values.payload_bin ? 'file' : values.url ? 'url' : ''
                    }
                  />
                </div>
              );
            }

            if (field.type === 'select') {
              return (
                <div className="form-group" key={field.name}>
                  <label htmlFor={field.name}>{field.label}</label>
                  <Field as="select" name={field.name} className="form-control">
                    <option value="">Select a type</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name={field.name} component="div" className="error-message" />
                </div>
              );
            }

            if (field.type === 'multiselect') {
              return (
                <div className="form-group" key={field.name}>
                  <label htmlFor={field.name}>{field.label}</label>
                  <Field as="select" name={field.name} multiple className="form-control">
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Field>
                </div>
              );
            }

            return (
              <div className="form-group" key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <Field
                  name={field.name}
                  as={field.type === 'textarea' ? 'textarea' : 'input'}
                  className="form-control"
                  rows={field.type === 'textarea' ? 3 : undefined}
                />
                <ErrorMessage name={field.name} component="div" className="error-message" />
              </div>
            );
          })}

          <button type="submit" disabled={isSubmitting} className="btn btn-primary">
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </Form>
      )}
    </Formik>
  );
};
