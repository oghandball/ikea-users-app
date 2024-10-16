import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const hostUrl = import.meta.env.PROD
    ? window.localStorage.href 
    : "http://localhost:8080/";

  const fetchUsers = async () => {
    const response = await fetch(`${hostUrl}api/users`);
    const usersToJson = await response.json();
    console.log(usersToJson);
    setUsers(usersToJson);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUser = async (e) => {
    const response = await fetch(`${hostUrl}api/users/${e.target.dataset.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ isAdmin: e.target.checked }),
    });
    await response.json();
    await fetchUsers();
  };

  const deleteUser = async (e) => {
    await fetch(`${hostUrl}api/users/${e.target.dataset.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    await fetchUsers();
  }

  const createUser = async (e) => {
    e.preventDefault()
    const response = await fetch(`${hostUrl}api/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name: e.target.name.value, location: e.target.location.value, isAdmin: e.target.isAdmin.checked }),
    });
    const newUser = await response.json();

    setUsers([...users, newUser]);
  }
  

  return (
    <>
      <h1>8th Dimension Labs User Creation</h1>
      <h1>Create New User</h1>
      <form onSubmit={createUser}>
        <label htmlFor="name">Name </label>
        <input type="text" name="name" id="name" />
        <label htmlFor="location"> Location </label>
        <input type="text" name="location" id="location" />
        <label htmlFor="isAdmin"> Is Admin </label>
        <input type="checkbox" name="isAdmin"/>
        <input type="submit" />
      </form>
      <br></br>
      <h1>Existing Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Created</th>
            <th>|</th>
            <th>Updated</th>
            <th>Is Admin</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <p>{user.name}</p>
              </td>
              <td>
                <p>{user.location}</p>
              </td>
              <td>
                <p>{new Date(user.createdAt).toDateString()}</p>
              </td>
              <td>
                <p> </p>
              </td>
              <td>
                <p>{new Date(user.updatedAt).toDateString()}</p>
              </td>
              <td>
                <input
                  data-id={user.id}
                  type="checkbox"
                  checked={user.isAdmin}
                  onChange={updateUser}
                />
              </td>
              <td>
                <button data-id={user.id} onClick={deleteUser}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;


