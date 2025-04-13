import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Artifact, CreateArtifactInput, UpdateArtifactInput } from '../../types/artifact';
import { ArtifactUpload } from './ArtifactUpload';

interface ArtifactFormProps {
  initialValues: CreateArtifactInput | UpdateArtifactInput;
  onSubmit: (values: CreateArtifactInput | UpdateArtifactInput) => void;
  isSubmitting: boolean;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  mime_type: Yup.string().required('MIME type is required'),
  description: Yup.string(),
  labels: Yup.array().of(Yup.string()),
});

export const ArtifactForm = ({ initialValues, onSubmit, isSubmitting }: ArtifactFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values }: FormikProps<CreateArtifactInput | UpdateArtifactInput>) => (
        <Form>
          {/* Rest of your form code remains the same */}
        </Form>
      )}
    </Formik>
  );
};