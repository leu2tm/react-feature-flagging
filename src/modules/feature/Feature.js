import React from "react";
import { Col, Form, FormLabel, Row } from "react-bootstrap";
import { map } from "lodash";

export const Feature = (props) => {
  const { name, features, key, parent, opt_input, is_active, eventHandler = () => console.log("clicked") } = props;

  const renderOptInput = (input) => {
    if (!input) return;
    switch (typeof input) {
      case "object":
        return (
          <Form.Select size="sm">
            {map(input, (i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </Form.Select>
        );
      default:
      // add other types
    }
  };

  return (
    <Col md={parent ? "" : "4"} key={key ? key : name}>
      <Form.Group as={Row}>
        <Col>
          <FormLabel>{name}</FormLabel>
        </Col>
        <Col> {renderOptInput(opt_input)}</Col>
        <Col>
          <Form.Check
            onChange={() =>
              eventHandler({
                key,
                name,
                features,
                opt_input,
                is_active: !is_active,
              })
            }
            checked={is_active}
            type="switch"
            id={name}
            className="float-left"
          />
        </Col>
      </Form.Group>

      {features && is_active && (
        <fieldset>
          {map(features, (feature, i) =>
            Feature({
              ...feature,
              eventHandler,
              key: [key, "features", i].join("."),
              parent: props,
            })
          )}
        </fieldset>
      )}
    </Col>
  );
};
