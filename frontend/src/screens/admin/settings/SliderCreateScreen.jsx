import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, Image, Row, Col, Form } from "react-bootstrap";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { useUploadProductImageMutation } from "../../../slices/productsApiSlice";
import { toast } from "react-toastify";
import FormContainer from "../../../components/FormContainer";
import { useAddSlideMutation } from "../../../slices/settingsApiSlice";

const SliderCreateScreen = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [display, setDisplay] = useState(true);

  const [createSlide, { isLoading: loadingCreateSlide }] =
    useAddSlideMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await createSlide({ text, image, url, display });
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Slide Added");
      navigate("/admin/settings/slider");
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
      <Link to="/admin/settings/slider" className="btn btn-light my-3">
        Go back
      </Link>
      <FormContainer>
        <h1>Create new slide</h1>
        {loadingCreateSlide && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="text">
            <Form.Label>Heading</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={text}
              onChange={(e) => setText(e.target.value)}
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
            <Form.Label>Url</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            ></Form.Control>
          </Form.Group>
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
            Add Slide
          </Button>
          <Row className="py-3"></Row>
        </Form>
      </FormContainer>
    </>
  );
};

export default SliderCreateScreen;
