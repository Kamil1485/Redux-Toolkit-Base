import React, { useState, useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUser, updateUser } from "./features/Users";
import { fetchContent, fetchData } from "./features/contentSlice";

console.log(addUser());
function App() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const users = useSelector((state) => state.users.value); //reducerın,state değerini erişim
  const dispatch = useDispatch(); //reducer a ilgili action ı iletir ,reducer action a göre statein durumunu günceller.
  const contents = useSelector((state) => state.content.contents);
  const localUsers = useSelector((state) => state.localuser.data);
  console.log(localUsers);
  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const loading = useSelector((state) => state.content.isloading);
  const error = useSelector((state) => state.content.error);
  console.log(error);

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="UserName"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button
          onClick={() =>
            dispatch(
              addUser({ id: users.length + 1, name: name, username: username })
            )
          }
        >
          Add
        </button>
      </div>

      {users.map((user) => (
        <div key={user.id}>
          <div>
            {user.name}
            <span>{user.username}</span>
            <p>
              <input
                type="text"
                placeholder={user.name}
                onChange={(e) => setNewName(e.target.value)}
              />
              <input
                type="text"
                placeholder={user.username}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </p>
            <p>
              <button
                onClick={() =>
                  dispatch(
                    updateUser({
                      id: user.id,
                      name: newName,
                      username: newUsername,
                    })
                  )
                }
              >
                Update
              </button>
              <button onClick={() => dispatch(deleteUser({ id: user.id }))}>
                Delete
              </button>
            </p>
          </div>
        </div>
      ))}

      <h2>Contents</h2>
      <div className="contents">
        {loading
          ? "Loading..."
          : contents.slice(0, 10).map((content) => (
              <div key={content.id}>
                <img src={content.url} alt="" style={{ width: "150px" }} />
                <p>{content.title}</p>
              </div>
            ))}
      </div>
      <h2>LocalUsers</h2>
      <div className="localUsers">
        {localUsers &&
          localUsers.slice(0,10).map((localUser) => (
            <div key={localUser.id}>
              <p>Name:{localUser.name}</p>
              <p>Surname:{localUser.surname}</p>
              <p>Email:{localUser.email}</p>
              <p>Gender:{localUser.gender}</p>
              <br/>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
