import { useGetPagesQuery } from "../../../slices/pagesApiSlice";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { Button, Col, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import ToggleSwitch from "../../../components/ToggleSwitch";
import { Link } from "react-router-dom";

const PageListScreen = () => {
  const { data: pages, isLoading, error, refetch } = useGetPagesQuery();
  const deleteHandler = async (id) => {
    console.log(id);
  };
  const handleChange = async (page) => {
    try {
      console.log(page);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Row className="d-flex">
        <Col>
          <h1>Pages</h1>
        </Col>
        <Col className="text-end">
          <Link to={"/admin/pages/create"}>
            <Button className="btn-sm m-3">
              <FaEdit /> Create Page
            </Button>
          </Link>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>TITLE</th>
              <th>CREATED AT</th>
              <th>DISPLAYED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pages.length !== 0 &&
              pages.map((page) => (
                <tr key={page._id}>
                  <td>{page.title}</td>
                  <td>{page.createdAt.substring(0, 10)}</td>
                  <td>
                    <ToggleSwitch
                      elm={page}
                      onChange={handleChange}
                      displayStatus={page.display}
                    />
                  </td>
                  <td>
                    <LinkContainer to={`/pages/${page._id}`}>
                      <Button className="btn-sm" variant="light">
                        <FaEye />
                      </Button>
                    </LinkContainer>
                    <LinkContainer to={`/admin/page/${page._id}/edit`}>
                      <Button className="btn-sm" variant="light">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      className="btn-sm"
                      variant="danger"
                      onClick={() => deleteHandler(page._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default PageListScreen;
