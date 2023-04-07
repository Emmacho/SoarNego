import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import { SeePrevious } from './SeePrevious';
function BasicExample() {
  return (
    <Card>
      <SeePrevious/>
    </Card>
  );
}
export function BasicExample1() {
    return (
      <Card>
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            placeholder for version comparison
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  }

export default BasicExample;
