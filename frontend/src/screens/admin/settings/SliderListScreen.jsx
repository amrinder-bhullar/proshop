import { Table, Button, Image, Row, Col, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaEdit, FaTrash, FaEye, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import {
  useDeleteSlideMutation,
  useGetSlidesQuery,
  useUpdateSlideMutation,
} from "../../../slices/settingsApiSlice";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import ToggleSwitch from "../../../components/ToggleSwitch";

const SliderListScreen = () => {
  const { data: slides, isLoading, error, refetch } = useGetSlidesQuery();

  const [deleteSlide, { isLoading: loadingDelete }] = useDeleteSlideMutation();

  const [updateSlider] = useUpdateSlideMutation();

  const handleChange = async (slide) => {
    try {
      const updated = await updateSlider({
        ...slide,
        display: !slide.display,
        slideId: slide._id,
      }).unwrap();
      toast.success(updated.message);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete the slide?")) {
      try {
        const res = await deleteSlide(id).unwrap();
        toast.success(res.message);
        refetch();
      } catch (error) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="align-text-center">
        <Col>
          <h1>Slides List</h1>
        </Col>
        <Col className="text-end">
          <Link to={"/admin/settings/slider/create"}>
            <Button className="btn-sm m-3">
              <FaEdit /> Create Slide
            </Button>
          </Link>
        </Col>
      </Row>
      {/* {loadingDelete && <Loader />} */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>SLIDE IMAGE</th>
                <th>TEXT</th>
                <th>URL</th>
                <th>DISPLAY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {slides.length !== 0 &&
                slides.map((slide) => (
                  <tr key={slide._id}>
                    <td>
                      <Image
                        src={slide.image}
                        alt={slide.text}
                        fluid
                        rounded
                        style={{ maxHeight: "50px" }}
                      />
                    </td>
                    <td>{slide.text}</td>
                    <td>{slide.url}</td>
                    <td>
                      <ToggleSwitch
                        elm={slide}
                        onChange={handleChange}
                        displayStatus={slide.display}
                      />
                    </td>
                    <td>
                      <LinkContainer to={`/admin/product/${slide._id}/edit`}>
                        <Button className="btn-sm" variant="light">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        className="btn-sm"
                        variant="danger"
                        onClick={() => deleteHandler(slide._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default SliderListScreen;
