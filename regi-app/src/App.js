import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [employeeposition, setEmppos] = useState("");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [editmode, setEditMode] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  const filterBySearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const updatedList = users.filter(
      (employee) =>
        employee.Id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setUsers(updatedList);
  };

  const saveChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "surname":
        setSurname(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "id":
        setId(value);
        break;
      case "phonenumber":
        setPhonenumber(value);
        break;
      case "employeeposition":
        setEmppos(value);
        break;
      default:
        break;
    }
  };

  const storeUser = (event) => {
    event.preventDefault();

    const newUser = {
      Name: name,
      Surname: surname,
      Email: email,
      Id: id,
      Employeeposition: employeeposition,
      Phonenumber: phonenumber,
      Images: images,
    };

    setUsers([...users, newUser]);

    setName("");
    setSurname("");
    setEmail("");
    setId("");
    setEmppos("");
    setPhonenumber("");
    setImages([]);
  };

  const deleteEmployee = (Id) => {
    const updatedUsers = users.filter((user) => user.Id !== Id);
    setUsers(updatedUsers);
  };

  useEffect(() => {
    if (images.length !== 0) {
      const newImageUrls = images.map((image) => URL.createObjectURL(image));
      setImageURLs(newImageUrls);
    }
  }, [images]);

  const onImageChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);
  };

  const editEmployee = (Id) => {
    const employee = users.find((user) => user.Id === Id);
    if (employee) {
    
      setEditEmployeeId(employee.Id);
      setName(employee.Name);
      setSurname(employee.Surname);
      setEmail(employee.Email);
      setId(employee.Id);
      setPhonenumber(employee.Phonenumber);
      setEmppos(employee.Employeeposition);
      setImages(employee.Images);
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const updatedData = users.map((employee) => {
      if (employee.Id === editEmployeeId) {
        return {
          ...employee,
          Name: name,
          Surname: surname,
          Email: email,
          Phonenumber: phonenumber,
          Employeeposition: employeeposition,
          Images: images,
        };
      }
      return employee;
    });

    setUsers(updatedData);
    setEditMode(false);
    setEditEmployeeId(null);

    // Reset input values
    setName("");
    setSurname("");
    setEmail("");
    setId("");
    setPhonenumber("");
    setEmppos("");
    setImages([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p> Employee registration </p>
        <form>
          <input
            value={name}
            type="text"
            name="name"
            onChange={saveChange}
            placeholder="Enter name"
          />
          <input
            value={surname}
            type="text"
            name="surname"
            onChange={saveChange}
            placeholder="Enter surname"
          />
          <input
            value={email}
            type="text"
            name="email"
            onChange={saveChange}
            placeholder="Enter Email"
          />
          <input
            value={id}
            type="text"
            name="id"
            onChange={saveChange}
            placeholder="Enter ID"
          />
          <input
            value={phonenumber}
            type="text"
            name="phonenumber"
            onChange={saveChange}
            placeholder="Enter Phone number"
          />
          <input
            value={employeeposition}
            type="text"
            name="employeeposition"
            onChange={saveChange}
            placeholder="Enter Employee position"
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={onImageChange}
          />
          <button onClick={storeUser}>add</button>
          <button onClick={handleInputChange}>Update</button>
          <input
            type="text"
            value={searchTerm}
            onChange={filterBySearch}
            placeholder="search"
          />
          <div className="par">
            <p>Press spacebar after typing to search</p>
          </div>
        </form>
        <ul>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>ID Number</th>
                <th>Phone number</th>
                <th>Employee Position</th>
                <th>Employee Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(
                ({
                  Name,
                  Surname,
                  Email,
                  Id,
                  Phonenumber,
                  Employeeposition,
                  Images,
                }) => (
                  <tr key={Id}>
                    <td>{Name}</td>
                    <td>{Surname}</td>
                    <td>{Email}</td>
                    <td>{Id}</td>
                    <td>{Phonenumber}</td>
                    <td>{Employeeposition}</td>
                    <td>
                      {Images.map((Image, index) => (
                        <img
                          key={index}
                          id="img1"
                          src={URL.createObjectURL(Image)}
                          alt={`EmpImg ${index}`}
                          height={50}
                          width={100}
                        />
                      ))}
                    </td>
                    <td>
                      <button onClick={() => deleteEmployee(Id)}>Delete</button>
                      <button onClick={() => editEmployee(Id)}>Update</button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </ul>
      </header>
    </div>
  );
}

export default App;
