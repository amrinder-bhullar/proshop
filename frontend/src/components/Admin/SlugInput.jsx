import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const SlugInput = ({ title, setUrl, url }) => {
  const [slugEdit, setSlugEdit] = useState(false);
  useEffect(() => {
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]/g, "-")
      .replace(/^-+|-+$/g, "");
    setUrl(slug);
  }, [title]);
  return (
    <Form.Group className="my-2" controlId="slug">
      <Form.Label>
        Url: /pages/{" "}
        <span
          style={{ color: "blue", textDecoration: "underline" }}
          onClick={() => setSlugEdit(!slugEdit)}
        >
          {slugEdit ? "done" : "edit"}
        </span>
      </Form.Label>
      <Form.Control
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={!slugEdit}
      ></Form.Control>
    </Form.Group>
  );
};

export default SlugInput;
