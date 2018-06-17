import React, { PropTypes } from "react";
import { FormGroup, FormControl, HelpBlock, Row, Col } from "react-bootstrap";

export default class FormField extends React.Component {
  render() {
    const { className, doValidate, meta } = this.props;

    if (doValidate) {
      return (
        <FormGroup className={className}
          validationState={!meta.touched ? null : (meta.error ? 'error' : 'success')}>
          {this.content()}
          <FormControl.Feedback/>
          <HelpBlock>
            {meta.touched && meta.error ? meta.error : null}
          </HelpBlock>
        </FormGroup>
      );
    } else {
      return (
        <FormGroup className={className}>
          {this.content()}
        </FormGroup>
      );
    }
  }

  content() {
    const {label} = this.props;

    return (
      <Row>
        <Col sm={3}>{label}</Col>
        <Col sm={9}>{this.field()}</Col>
      </Row>
    );
  }

  field() {
    const {input, componentClass, type, placeholder, children} = this.props;

    return (
      <FormControl {...input} componentClass={componentClass} type={type} placeholder={placeholder}>
        {children}
      </FormControl>
    );
  }
}

FormField.propTypes = {
  meta: PropTypes.object,
  input: PropTypes.object,
  theme: PropTypes.string,  // 2 col (default), etc
  doValidate: PropTypes.bool, // true or false
  label: PropTypes.any,  // the field text or a react component if we have html inside (empty string by default)
  componentClass: PropTypes.string, // input (by default), textarea, select
  type: PropTypes.string,   // input type: text (by default), password
  placeholder: PropTypes.string,    // input placeholder (empty string by default)
  className: PropTypes.string,  // the class name (empty string by default)
}
