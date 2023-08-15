import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, Image, Row, Col, Form } from "react-bootstrap";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { useUploadProductImageMutation } from "../../../slices/productsApiSlice";
import { toast } from "react-toastify";
import FormContainer from "../../../components/FormContainer";
import { useAddPageMutation } from "../../../slices/pagesApiSlice";
import ReactQuill from "react-quill";

const modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  },
};

const PageCreateScreen = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [display, setDisplay] = useState(true);

  const [createPage, { isLoading: loadingCreatePage }] = useAddPageMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await createPage({ title, image, content, display });
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Page Added");
      navigate("/admin/pages");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res.image);
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/pages" className="btn btn-light my-3">
        Go back
      </Link>
      <FormContainer>
        <h1>Create new Page</h1>
        {loadingCreatePage && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="text">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="upload image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.Control
              type="file"
              label="Choose file"
              onChange={uploadFileHandler}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="url">
            <Form.Label>Content</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <div style={{ height: "300px" }}>
            <ReactQuill
              style={{ height: "250px" }}
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              placeholder="Add the content here..."
            />
          </div>
          <Form.Group className="my-3" controlId="display">
            <Form.Check
              type="checkbox"
              label="Display"
              checked={display}
              onChange={(e) => setDisplay(!display)}
            ></Form.Check>
          </Form.Group>
          {loadingUpload && <Loader />}
          <Button type="submit" variant="primary" className="mt-3">
            Add Page
          </Button>
          <Row className="py-3"></Row>
        </Form>
      </FormContainer>
    </>
  );
};

export default PageCreateScreen;
