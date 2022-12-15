import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import "./EmpDetails.css";



const url = "http://localhost:3000/EmpData";
const EmpDetails = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState();
  const [filterdata, setFilterdata] = useState([]);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Emailid, setEmailid] = useState("");
  const [mobileNo, setMobileNo] = useState("");

  let modeldata={
    FirstName,
    LastName,
    Emailid,
    mobileNo
  };


  //Get a Data from Json
  const getuser = async () => {
    const reqdata = await fetch(url);
    const resdata = await reqdata.json();
    setData(resdata);
    setFilterdata(resdata);

   
  };
  useEffect(() => {
    getuser();
  }, []);

  //refresh
  const onrefresh = () => {
    window.location.reload();
  };

  //Add new Empoyee

  const AddNewEmp = (e) => {
    
    fetch("http://localhost:3000/EmpData", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(modeldata),
    }).then((response) => {
      response.json().then((resp) => {
        return alert(" Employee added Successfully");
      });
      // response.json().then((resp) => {setModeldata(resp)});
    });
  };

  //update Emp Details

function selectEmp(id)
{
  let item=data[id-1];
  setFirstName(item.FirstName);
  setLastName(item.LastName);
  setEmailid(item.Emailid);
  setMobileNo(item.mobileNo);
}

const[userid,setUserId]=useState(null);

const UpdateEmpData = () => {
let item={FirstName,LastName,Emailid, mobileNo}
fetch(`http://localhost:3000/EmpData/${userid}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(item),
    }).then((response) => {
      response.json().then((resp) => {
        getuser()
        return alert(" Employee data updated Successfully");
      });
    });
 };

 

  //Search Function
  const handlesearch = (event) => {
    const getsearch = event.target.value;
    if (getsearch.length > 0) {
      const searchdata = data.filter((item) =>
        item.FirstName.toLowerCase().includes(getsearch)
      );
      setData(searchdata);
    } else {
      setData(filterdata);
    }
    setQuery(getsearch);
  };

  //delete Emp
  function deleteUser(id) {
    fetch(`http://localhost:3000/EmpData/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => alert("EmpData Deleted Sucessfully"));
      window.location.reload();
    });
  }

  return (
    <div >
      <div className="empdir">
        <h2>Employee Directory</h2>
        </div>
      <div>
        <button className="addemp">Add New User</button>
        <button onClick={() => onrefresh()}>Refresh</button>
        <input className="search" placeholder="search" value={query} onChange={(e) => handlesearch(e)}></input>
      </div>
     

    <div className="table">
        <Table className="tablebody" bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>E-mail</th>
              <th>Mobile No.</th>
              <th>Button</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, id) => {
              return (
                <tr key={id}>
                  <td>{element.FirstName}</td>
                  <td>{element.LastName}</td>
                  <td>{element.Emailid}</td>
                  <td>{element.mobileNo}</td>
                  <td>
                    <span style={{ paddingRight: "10px" }}>
                      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal"
                      onClick={() => selectEmp(element.id)}
                       >Update</button>
                    </span>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal"
                      onClick={() => deleteUser(element.id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
    </div>
          
    <div className="container">
     <div className="row"> 
      <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit a Emp data</h2>
        <form >
       
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter First Name"
              name="FirstName"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Last Name"
              name="LastName"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Email Id"
              name="Emailid"
              value={Emailid}
              onChange={(e) => setEmailid(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Mobile Number"
              name="mobileNo"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary btn-block" onClick={(e)=>AddNewEmp(e)} >Add New Employee</button>
        </form>
       </div>
      </div> 
    </div>       



    <div className="container">
     <div className="row"> 
      <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit a Emp data</h2>
        <form >
       
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter First Name"
              name="FirstName"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Last Name"
              name="LastName"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Email Id"
              name="Emailid"
              value={Emailid}
              onChange={(e) => setEmailid(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Mobile Number"
              name="mobileNo"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary btn-block" onClick={(e)=>UpdateEmpData(e)} >Update Employee</button>
        </form>
       </div>
      </div> 
    </div>

  </div>
  );
};

export default EmpDetails;
