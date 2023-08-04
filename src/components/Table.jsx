import React from "react";
import { deleteUser } from "../redux/actions/action";
import { useDispatch } from "react-redux";

const Table = ({ data, updateUser }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-9/12 overflow-x-auto mx-auto my-10">
      <h1 className="text-2xl font-semibold mb-4 text-center">Users Data</h1>

      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Date of Birth</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2 text-center">{item.name}</td>
              <td className="border px-4 py-2 text-center">{item.age}</td>
              <td className="border px-4 py-2 text-center">{item.dob}</td>
              <td className="border px-4 py-2 text-center">
                {item.phoneNumber}
              </td>
              <td className="border px-4 py-2 text-center">{item.address}</td>
              <td className="border px-4 py-2 flex gap-x-4 justify-center">
                <button
                  onClick={() => updateUser(item)}
                  className="bg-sky-500 hover:bg-sky-600 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => dispatch(deleteUser(item.id))}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
