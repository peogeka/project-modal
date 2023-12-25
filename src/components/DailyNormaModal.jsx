import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ModalOverlay, ModalContent, CloseButton, CalculateButton } from './Modal.styled';

const DailyNormaModal = ({ isOpen, onClose }) => {
  const [consumedWater, setConsumedWater] = useState('');

  const initialValues = {
    gender: 'woman',
    weight: '',
    activityTime: '',
    consumedWaterInput: '',
  };

  const validationSchema = Yup.object().shape({
    weight: Yup.number().required('Weight is required').positive('Weight must be a positive number'),
    activityTime: Yup.number()
      .required('Activity time is required')
      .min(0, 'Activity time must be a positive number or zero'),
  });

  const calculateWaterNorm = (values) => {
    const { gender, weight, activityTime } = values;

    const weightValue = parseFloat(weight);
    const activityTimeValue = parseFloat(activityTime);

    if (!isNaN(weightValue) && !isNaN(activityTimeValue)) {
      return calculateNormByGender(gender, weightValue, activityTimeValue);
    }

    return '';
  };

  const calculateNormByGender = (gender, weight, activityTime) => {
    const coefficient = gender === 'woman' ? { weight: 0.03, activity: 0.4 } : { weight: 0.04, activity: 0.6 };
    const norm = weight * coefficient.weight + activityTime * coefficient.activity;
    setConsumedWater(norm.toFixed(2));
    return norm.toFixed(2);
  };

  const handleSubmit = (values, { setFieldValue, resetForm }) => {
    const waterNorm = calculateWaterNorm(values);
    setFieldValue('consumedWater', waterNorm);
    setFieldValue('consumedWaterInput', '');
    resetForm();

    onClose();
  };

  const handleClose = (event) => {
    if (event.key === 'Escape' || event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleClose}>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>My daily norma</h2>
        <p>Formula for calculation:</p>
        <p>For girl: V = (M * 0.03) + (T * 0.4)</p>
        <p>For man: V = (M * 0.04) + (T * 0.6)</p>
        <p>* V is the volume of the water norm in liters per day, M is your body weight, T is the time of active sports, or another type of activity commensurate in terms of loads (in the absence of these, you must set 0)</p>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <h3>Calculate your rate</h3>
            <label>
              <Field type="radio" name="gender" value="female" />
              For girl
            </label>
            <label>
              <Field type="radio" name="gender" value="male" />
              For man
            </label>

            <label>
              Your weight in kilograms:{' '}
              <Field type="text" name="weight" />
              <ErrorMessage name="weight" component="div" />
            </label>

            <label>
              The time of active participation in sports or other activities with a high physical. load:{' '}
              <Field type="text" name="activityTime" />
              <ErrorMessage name="activityTime" component="div" />
            </label>

            <label>
              Required amount of water in liters per day:{' '}
              <Field type="text" name="consumedWater" disabled value={consumedWater} />
            </label>

            <label>
              Write down how much water you will drink:{' '}
              <Field type="text" name="consumedWaterInput" />
            </label>

            <CalculateButton type="submit">Save</CalculateButton>
          </Form>
        </Formik>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DailyNormaModal;