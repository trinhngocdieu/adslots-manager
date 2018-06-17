import React from "react";

import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Field, SubmissionError, reduxForm } from "redux-form";
import { PageHeader, Form } from "react-bootstrap";

import FormField from "./common/FormField";
import FormSubmit from "./common/FormSubmit";

export class AdSlotEditor extends React.Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    const { dispatch, adslot } = this.props;

    return new Promise((resolve, reject) => {
      dispatch({
        type: adslot.id ? 'ADSLOT_EDIT_START' : 'ADSLOT_ADD_START',
        adslot: {
          id: adslot.id,
          name: values.name,
          url: values.url,
          type: values.type,
          format: `${values.width}x${values.height}`,
          price: values.price,
          fallback: values.fallback
        },
        callbackError: (message) => {
          reject(new SubmissionError({_error: message}));
        },
        callbackSuccess: () => {
          dispatch({
            type: 'ADSLOT_SUCCESS',
            data: adslot.id ? 'Edit adslot successfully' : 'Add adslot successfully'
          });
          dispatch(push('/'));
          resolve();
        }
      });
    });
  }

  render() {
    const { adslot, handleSubmit, error, invalid, submitting } = this.props;

    return (
      <div className="page-adslot-edit">
        <PageHeader className="page-header">{(adslot.id ? 'Edit' : 'Add new') + ' adslot'}</PageHeader>

        <Form horizontal onSubmit={handleSubmit(this.submitForm)}>
          <Field component={FormField}
            name="name"
            label="Name"
            doValidate={true}
          />

          {/* I asume that we only have 4 types */}
          <Field component={FormField}
            name="type"
            label="Type"
            componentClass="select"
            >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="3">4</option>
          </Field>

          <Field component={FormField}
            name="url"
            label="Url"
            doValidate={true}
            placeholder={'example: abc.xyz'}
          />

          <Field component={FormField}
            name="width"
            label="Width"
            doValidate={true}
            type="number"
            placeholder={'0'}
          />

          <Field component={FormField}
            name="height"
            label="Height"
            doValidate={true}
            type="number"
            placeholder={'0'}
          />

          <Field component={FormField}
            name="price"
            label="Price"
            doValidate={true}
            type="number"
          />

          <Field component={FormField}
            name="fallback"
            label="Fallback"
            componentClass="select"
            >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Field>

          <FormSubmit error={error}
            invalid={invalid}
            submitting={submitting}
            buttonSaveLoading="Saving"
            buttonSave="Save"
          />
        </Form>
      </div>
    );
  }
}

const AdSlotEditForm = reduxForm({
  form: 'adslot_edit',

  validate: function (values) {
    const errors = {};

    if (!values.name) {
      errors.name = 'Name is required';
    }
    if (!values.url) {
      errors.url = 'Url is required';
    }
    if (!values.width || Number(values.width) <= 0) {
      errors.width = 'Width must be greater than 0';
    }
    if (!values.height || Number(values.height) <= 0) {
      errors.height = 'Height must be greater than 0';
    }
    if (!values.price || Number(values.price) <= 0) {
      errors.price = 'Price must be greater than 0';
    }

    return errors;
  },
})(AdSlotEditor);

function mapStateToProps(state, own_props) {
  // another option to get adSlot's data is fetching from api adslots/id
  // in this case, we can get from state, it can solve the problem
  const adslot = state.adslots.data.find(slot => Number(slot.id) === Number(own_props.params.id)) || {};
  const adSlotData = Object.assign({}, adslot);

  if (adSlotData.format) {
      const formatParts = adSlotData.format.split('x');
      adSlotData.width = formatParts[0];
      adSlotData.height = formatParts[1];
  }

  return {
    adslot: adSlotData,
    initialValues: adSlotData,
  };
}

export default connect(mapStateToProps)(AdSlotEditForm);
