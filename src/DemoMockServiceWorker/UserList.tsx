// src/components/UserList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [users2, setUsers2] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error fetching mock data:", error));
  }, []);

  const getData = () => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error fetching mock data:", error));
  };

  const fetchData = async () => {
    const param = { id: 1, name: "test_name" };
    const response = await axios.post("/api/users", param);
    console.log(response.data);
    setUsers2([response.data]);
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <button onClick={getData}>获取数据</button>
      <hr />

      <h1>User List2</h1>
      <ul>
        {users2.map((user) => (
          <li key={user.id}>
            {user.id} + {user.name}
          </li>
        ))}
      </ul>
      <button onClick={fetchData}>获取数据</button>
    </div>
  );
};

export default UserList;
