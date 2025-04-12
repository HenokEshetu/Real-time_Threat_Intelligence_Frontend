import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Artifact, CreateArtifactInput, UpdateArtifactInput } from '../../../types/artifact';
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
      {({ setFieldValue, values }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Field name="name" className="form-control" />
            <ErrorMessage name="name" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="mime_type">MIME Type</label>
            <Field as="select" name="mime_type" className="form-control">
              <option value="">Select a type</option>
              <option value="text/plain">Text</option>
              <option value="application/json">JSON</option>
              <option value="application/xml">XML</option>
              <option value="application/octet-stream">Binary</option>
            </Field>
            <ErrorMessage name="mime_type" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label>File Content</label>
            <ArtifactUpload 
              onFileUpload={(file) => {
                setFieldValue('payload_bin', file);
                setFieldValue('url', '');
              }}
              onUrlChange={(url) => {
                setFieldValue('url', url);
                setFieldValue('payload_bin', '');
              }}
              currentValue={values.payload_bin ? 'file' : values.url ? 'url' : ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <Field as="textarea" name="description" className="form-control" rows={3} />
          </div>

          <div className="form-group">
            <label htmlFor="labels">Labels</label>
            <Field
              name="labels"
              component="select"
              multiple
              className="form-control"
            >
              <option value="malicious">Malicious</option>
              <option value="benign">Benign</option>
              <option value="suspicious">Suspicious</option>
            </Field>
          </div>

          <button type="submit" disabled={isSubmitting} className="btn btn-primary">
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </Form>
      )}
    </Formik>
  );
};