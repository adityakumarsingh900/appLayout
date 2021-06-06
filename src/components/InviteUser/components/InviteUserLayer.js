import React from 'react';
import { Box, TextInput, Button, Text, Layer } from 'grommet';
import { Close } from 'grommet-icons';
import Divider from 'granite-admin/core/components/Divider';
import FormField from 'granite-admin/core/components/FormField';
import { Formik } from 'formik';
import * as Yup from 'yup';

const InviteUserLayer = ({ setLayer, changeEmail, userInvitation, eventEmitter }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .min(2, 'Email too short')
      .max(50, 'Email too long')
      .email('Please enter valid email')
      .required('Confirm email is required'),
    name: Yup.string().required('name is required'),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    setErrors({});
    setSubmitting(true);
    try {
      await userInvitation(eventEmitter, values);
      setSubmitting(false);
      setLayer(false);
      // await changeEmail(eventEmitter, values)
    } catch (e) {
      if (e.errors) setErrors(e.errors);
      setSubmitting(false);
    }
  };
  return (
    <Layer position="center" onClickOutside={() => setLayer(false)} onEsc={() => setLayer(false)}>
      <Box background="white" gap="small" width="38rem">
        <Box
          justify="between"
          direction="row"
          pad={{
            top: 'medium',
            left: 'medium',
            right: 'medium',
            bottom: 'small',
          }}
        >
          <Text size="21px">Invite New User</Text>
          <Box onClick={() => setLayer(false)} pad={{ top: 'xsmall' }}>
            <Close size="20px" />
          </Box>
        </Box>
        <Divider color="brand" />
        <Box
          pad={{
            top: 'medium',
            left: 'large',
            right: 'large',
            bottom: 'medium',
          }}
        >
          <Formik
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            initialValues={{
              password: '',
              new_email: '',
              email: '',
              name: '',
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
              <form onSubmit={handleSubmit} autocomplete="off">
                <input autocomplete="new-password" name="hidden" type="password" style={{ display: 'none' }} />
                <Box margin={{ bottom: 'medium' }}>
                  <Text size="10px">Invite a new user to this platform.</Text>{' '}
                </Box>
                <FormField name="email" label="Email Address" error={touched.email && errors.email} width="70%">
                  <TextInput
                    name="email"
                    autocomplete="new-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </FormField>
                <FormField name="name" label="Name" error={touched.name && errors.name} width="70%">
                  <TextInput
                    name="name"
                    autocomplete="new-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                </FormField>

                <Box
                  as="footer"
                  gap="small"
                  direction="row"
                  align="center"
                  justify="end"
                  pad={{ top: 'medium', bottom: 'small' }}
                >
                  <Button
                    type="submit"
                    alignSelf="end"
                    margin={{ vertical: 'small' }}
                    label="Go On"
                    primary
                    disabled={isSubmitting}
                  />
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Layer>
  );
};

export default InviteUserLayer;
