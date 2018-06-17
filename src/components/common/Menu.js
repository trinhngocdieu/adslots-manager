import React from "react";
import { Nav, NavItem, Glyphicon } from "react-bootstrap";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";

export default class Menu extends React.Component {
  render() {
    return (
      <div>
        <h2>Adslots Manager</h2>
        <Nav bsStyle="pills">
          <IndexLinkContainer to="/">
            <NavItem>
              Home
            </NavItem>
          </IndexLinkContainer>
          <LinkContainer to="/adslot-editor">
            <NavItem>
              Add adslot <Glyphicon glyph="plus-sign"/>
            </NavItem>
          </LinkContainer>
        </Nav>
      </div>
    );
  }
}
