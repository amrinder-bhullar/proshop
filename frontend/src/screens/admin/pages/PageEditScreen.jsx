import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Table, Button, Image, Row, Col, Form } from "react-bootstrap";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { useUploadProductImageMutation } from "../../../slices/productsApiSlice";
import { toast } from "react-toastify";
import FormContainer from "../../../components/FormContainer";
import {
  useGetPageByIdQuery,
  useUpdatePageMutation,
} from "../../../slices/pagesApiSlice";
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

const PageEditScreen = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [display, setDisplay] = useState(true);

  const { data: page, isLoading: loadingPage, error } = useGetPageByIdQuery(id);
  const [updatePage, { isLoading: updateLoading, error: updateError }] =
    useUpdatePageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await updatePage({ _id: page._id, title, content, display });
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Page updated");
      navigate("/admin/pages");
    }
  };

  useEffect(() => {
    if (page) {
      setTitle(page.title);
      setContent(page.content);
      setDisplay(page.display);
    }
  }, [page]);

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
      {loadingPage ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Link to="/admin/pages" className="btn btn-light my-3">
            Go back
          </Link>
          <FormContainer>
            <h1>Edit Page</h1>
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
              <Form.Group
                className="my-2"
                controlId="url"
                style={{ height: "300px" }}
              >
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as={"textarea"}
                  placeholder="enter content"
                  value={content}
                  rows="10"
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
              <Button type="submit" variant="primary" className="mt-3">
                Update Page
              </Button>
              <Row className="py-3"></Row>
            </Form>
          </FormContainer>
        </>
      )}
    </>
  );
};

export default PageEditScreen;
