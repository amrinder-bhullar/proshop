import { useState } from "react";
import { Form } from "react-bootstrap";
const ToggleSwitch = ({ displayStatus, onChange, elm }) => {
  const [status, setStatus] = useState(displayStatus);

  const handleSwitch = () => {
    onChange(elm);
    setStatus(!status);
  };
  return (
    <Form>
      <Form.Switch checked={status} onChange={handleSwitch} />
    </Form>
  );
};

export default ToggleSwitch;
