import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";

const UserListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        toast.success("User Deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <>
      <h1>Users</h1>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>REGISTERED ON</th>
              <th>IS ADMIN</th>
              {/* <th>DELIVERED</th> */}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.length !== 0 &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>{user.createdAt.substring(0, 10)}</td>
                  <td>{user.isAdmin ? <FaCheck /> : <FaTimes />} </td>
                  {/* <td>
                    {user.isDelivered ? (
                      user.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes />
                    )}
                  </td> */}
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button className="btn-sm" variant="light">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      className="btn-sm"
                      variant="danger"
                      onClick={() => deleteHandler(user._id)}
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

export default UserListScreen;
