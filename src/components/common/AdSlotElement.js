import React, { PropTypes } from "react";
import { Link } from "react-router";
import { Button, Glyphicon, Checkbox } from "react-bootstrap";

export default class AdSlotElement extends React.Component {
  render() {
    const { adslot } = this.props;

    return (
      <tr>
        <td>{adslot.id}</td>
        <td className="col-name"><strong>{adslot.name}</strong></td>
        <td>{adslot.type}</td>
        <td>{adslot.url}</td>
        <td>{adslot.format}</td>
        <td>{adslot.price}</td>
        <td><Checkbox checked={adslot.fallback} readOnly></Checkbox></td>
        <td>
          <Link to={'adslot-editor/' + adslot.id}>
            <Button bsSize="xsmall">
              Edit <Glyphicon glyph="edit"/>
            </Button>
          </Link>
        </td>
      </tr>
    );
  }
}

AdSlotElement.propTypes = {
  adslot: PropTypes.object.isRequired
}
