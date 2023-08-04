import { useState } from "react";
import Registration from "./components/Registration";
import Table from "./components/Table";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.user);
  const [editUser, setEditUser] = useState({});

  const updateUser = (user) => {
    setEditUser(user);
  };

  return (
    <div>
      <Registration editUser={editUser} setEditUser={setEditUser} />

      {user.length === 0 ? (
        <div className="bg-gray-100 w-9/12 my-10 justify-center items-center flex h-40 mx-auto rounded-2xl">
          <h1 className="text-2xl text-gray-500 font-semibold my-10 text-center">
            No Users Found
          </h1>
        </div>
      ) : (
        <Table data={user} updateUser={updateUser} />
      )}
    </div>
  );
}

export default App;
