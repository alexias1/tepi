import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListUser() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    fetch(`https://bdexemplo.000webhostapp.com/api/user/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .then((actualData) => console.log(actualData))
      .catch((err) => {
        console.log(err.message);
      });
  }

  const deleteUser = (id) => {
    fetch(`https://bdexemplo.000webhostapp.com/api/user/${id}/delete`, {
      method: "DELETE"
    }).then(() => this.setState({ status: "Delete successo" }));
  };
  return (
    <div>
      <h1>List Users</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, key) => (
            <tr key={key}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>
                <Link
                  to={`user/${user.id}/edit`}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </Link>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
