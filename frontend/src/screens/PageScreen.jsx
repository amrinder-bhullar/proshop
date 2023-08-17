import { useNavigate, useParams } from "react-router-dom";
import { useGetPageByUrlQuery } from "../slices/pagesApiSlice";
import { Row } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";

const PageScreen = () => {
  const { url } = useParams();
  const { data: page, isLoading: loading, error } = useGetPageByUrlQuery(url);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Row>
            <h1>{page.title}</h1>
          </Row>
          <Row dangerouslySetInnerHTML={{ __html: page.content }}></Row>
        </>
      )}
    </>
  );
};

export default PageScreen;
