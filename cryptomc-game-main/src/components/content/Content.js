import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

class Content extends React.Component {
  render() {
    return (
      <>
      <Container
        fluid
        className={classNames("content", { "is-open": this.props.isOpen })}
      >
      <div className="outlet">
      <Outlet/>
      </div>
      </Container>
      </>
    );
  }
}

export default Content;
