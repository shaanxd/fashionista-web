import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Select from 'react-select';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Icomoon, Loading } from '../../components';
import { useMergedState } from '../../utils/useMergedState';
import { createTag } from '../../api/admin';
import { TAGS } from '../../constants/types';

import styles from './AddTag.module.css';

const AddTag = props => {
  const [state, setState] = useMergedState({
    file: null,
    fileError: null,
    filePreview: null,

    tagLoading: false,
    tagError: null,
    tagSuccess: false
  });

  const {
    file,
    fileError,
    filePreview,
    tagLoading,
    tagError,
    tagSuccess
  } = state;

  useEffect(
    () => () => {
      URL.revokeObjectURL(filePreview);
    },
    [filePreview]
  );

  const handleOnRemove = () => {
    setState({ file: null, filePreview: null });
  };

  const handleOnSubmit = async ({ type, ...values }) => {
    if (file) {
      try {
        const tagData = {
          ...values,
          type: type.value,
          image: file
        };
        setState({ tagLoading: true, tagError: null });
        await createTag(tagData, props.token);
        setState({ tagLoading: false, tagSuccess: true });
        setTimeout(() => {
          props.history.push('/');
        }, 2000);
      } catch (err) {
        setState({ tagLoading: false, tagError: err.message });
      }
    } else {
      setState({ fileError: 'Please pick a tag image.' });
    }
  };

  const onDrop = acceptedFiles => {
    if (acceptedFiles.length > 0) {
      setState({
        file: acceptedFiles[0],
        fileError: null,
        filePreview: URL.createObjectURL(acceptedFiles[0])
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: 'image/jpeg',
    onDrop
  });

  const renderLoading = () => {
    return <Loading text="Creating Tag" />;
  };

  const renderSuccess = () => {
    return (
      <div className={styles.success__div}>
        <Icomoon icon="checkmark" color="#50C878" size={50} />
        <span className={styles.success__msg}>
          Tag created successfully! Redirecting.
        </span>
      </div>
    );
  };

  return (
    <div className={styles.main__div}>
      <div className={styles.form__div}>
        <Formik
          initialValues={{
            name: '',
            description: '',
            type: null
          }}
          onSubmit={handleOnSubmit}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Tag name is required'),
            description: Yup.string().required('Tag description is required'),
            type: Yup.object()
              .nullable()
              .required('Please select a tag type')
          })}
        >
          {({ values, setFieldValue, setFieldTouched }) => {
            return tagLoading ? (
              renderLoading()
            ) : tagSuccess ? (
              renderSuccess()
            ) : (
              <Form className={styles.tag__form}>
                <span className={styles.form__header}>Create Tag</span>
                <Select
                  options={TAGS}
                  value={values.type}
                  onChange={option => {
                    setFieldValue('type', option);
                  }}
                  onBlur={() => {
                    setFieldTouched('type');
                  }}
                  placeholder="Select type"
                />
                <ErrorMessage name="type">
                  {message => (
                    <label className={styles.form__error}>{message}</label>
                  )}
                </ErrorMessage>
                <Field
                  name="name"
                  placeholder="Enter tag name"
                  className={styles.form__input}
                />
                <ErrorMessage name="name">
                  {message => (
                    <label className={styles.form__error}>{message}</label>
                  )}
                </ErrorMessage>
                <Field
                  name="description"
                  placeholder="Enter tag description"
                  className={styles.form__input}
                />
                <ErrorMessage name="description">
                  {message => (
                    <label className={styles.form__error}>{message}</label>
                  )}
                </ErrorMessage>
                <div {...getRootProps({ className: styles.dropzone })}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                {file && (
                  <div className={styles.file__div}>
                    <img
                      src={filePreview}
                      className={styles.image}
                      alt="Selected"
                    />
                    <button
                      type="button"
                      className={styles.remove__btn}
                      onClick={handleOnRemove}
                    >
                      <Icomoon icon="bin" color="#8D021F" size={20} />
                    </button>
                  </div>
                )}
                {fileError && (
                  <label className={styles.form__error}>{fileError}</label>
                )}
                <button className={styles.submit__btn} type="submit">
                  Create Tag
                </button>
                {tagError && (
                  <label className={styles.main__error}>{tagError}</label>
                )}
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth: { auth } }) => {
  return {
    token: auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddTag));
