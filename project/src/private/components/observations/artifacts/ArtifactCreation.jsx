import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import { Add, Close } from '@mui/icons-material';
import * as Yup from 'yup';
import { graphql } from 'react-relay';
import * as R from 'ramda';
import makeStyles from '@mui/styles/makeStyles';
import MarkdownField from '../../../../components/fields/MarkdownField';
import { fieldSpacingContainerStyle } from '../../../../utils/field';
import { insertNode } from '../../../../utils/store';
import CustomFileUploader from '../../common/files/CustomFileUploader';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    minHeight: '100vh',
    width: '50%',
    position: 'fixed',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    padding: 0,
  },
  createButton: {
    position: 'fixed',
    bottom: 30,
    right: 30,
    transition: theme.transitions.create('right', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  buttons: {
    marginTop: 20,
    textAlign: 'right',
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  header: {
    backgroundColor: theme.palette.background.nav,
    padding: '20px 20px 20px 60px',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    left: 5,
    color: 'inherit',
  },
  container: {
    padding: '10px 20px 20px 20px',
  },
}));

const artifactMutation = graphql`
  mutation ArtifactCreationMutation(
    $file: Upload!
    $x_opencti_description: String
  ) {
    artifactImport(
      file: $file
      x_opencti_description: $x_opencti_description
    ) {
      ...ArtifactsLine_node
    }
  }
`;

const artifactValidation = Yup.object().shape({
  file: Yup.mixed().required('File is required'),
  x_opencti_description: Yup.string().nullable(),
});

const ArtifactCreation = ({ paginationOptions }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [commit] = useApiMutation(artifactMutation);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (values, { setSubmitting, setErrors, resetForm }) => {
    commit({
      variables: {
        file: values.file,
        x_opencti_description: values.x_opencti_description,
      },
      updater: (store) => insertNode(
        store,
        'Pagination_stixCyberObservables',
        paginationOptions,
        'artifactImport',
      ),
      onError: (error) => {
        setErrors({ file: error.message });
        setSubmitting(false);
      },
      onCompleted: () => {
        setSubmitting(false);
        resetForm();
        handleClose();
      },
    });
  };

  const onReset = () => handleClose();

  return (
    <>
      <Fab
        onClick={handleOpen}
        color="primary"
        aria-label="Add"
        className={classes.createButton}
      >
        <Add />
      </Fab>
      <Drawer
        open={open}
        anchor="right"
        sx={{ zIndex: 1202 }}
        elevation={1}
        classes={{ paper: classes.drawerPaper }}
        onClose={handleClose}
      >
        <div className={classes.header}>
          <IconButton
            aria-label="Close"
            className={classes.closeButton}
            onClick={handleClose}
            size="large"
            color="primary"
          >
            <Close fontSize="small" color="primary" />
          </IconButton>
          <Typography variant="h6">Create an artifact</Typography>
        </div>
        <div className={classes.container}>
          <Formik
            initialValues={{
              x_opencti_description: '',
              file: '',
            }}
            validationSchema={artifactValidation}
            onSubmit={onSubmit}
            onReset={onReset}
          >
            {({
              submitForm,
              handleReset,
              isSubmitting,
              setFieldValue,
              errors,
            }) => (
              <Form>
                <CustomFileUploader
                  setFieldValue={setFieldValue}
                  formikErrors={errors}
                  noMargin
                />
                <Field
                  component={MarkdownField}
                  name="x_opencti_description"
                  label="Description"
                  fullWidth={true}
                  multiline={true}
                  rows="4"
                  style={{ marginTop: 20 }}
                />
                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    onClick={handleReset}
                    disabled={isSubmitting}
                    classes={{ root: classes.button }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={submitForm}
                    disabled={isSubmitting}
                    classes={{ root: classes.button }}
                  >
                    Create
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Drawer>
    </>
  );
};

export default ArtifactCreation;