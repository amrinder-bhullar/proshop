import { Table, Button, Image, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Paginate from "../../components/Paginate";

const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });
  const [
    createProduct,
    { isLoading: loadingCreate, error: errorProduct, refetch },
  ] = useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete the product?")) {
      try {
        const res = await deleteProduct(id).unwrap();
        toast.success(res.message);
        refetch();
      } catch (error) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm("Are you sure?")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <>
      <Row className="align-text-center">
        <Col>
          <h1>Products List</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>PRODUCT IMAGE</th>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.length !== 0 &&
                data.products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fluid
                        rounded
                        style={{ maxHeight: "50px" }}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/product/${product._id}`}>
                        <Button className="btn-sm" variant="light">
                          <FaEye />
                        </Button>
                      </LinkContainer>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button className="btn-sm" variant="light">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        className="btn-sm"
                        variant="danger"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          {!isLoading && !error && (
            <Paginate pages={data.pages} page={data.page} isAdmin={true} />
          )}
        </>
      )}
    </>
  );
};

export default ProductListScreen;
