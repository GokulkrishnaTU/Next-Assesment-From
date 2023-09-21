"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Form({ searchParams } ) {

  const [names, setNames] = useState(searchParams.fullname);
  const [foundObject, setFoundObject] = useState(null); 


    console.log(names, "habibiiiiii");
  const [formData, setFormData] = useState({
    fullname: foundObject ? foundObject.fullname : "",
    email: foundObject ? foundObject.email : "",
    phoneNumber: foundObject ? foundObject.phoneNumber : "",
    dateOfBirth: foundObject ? foundObject.dateOfBirth : "",
  });

  const router = useRouter();

  //   const  fullname  = router.query.fullname;

// console.log(fullname,"name  ");

  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;


      setFormData({
        ...formData,
        [name]: value,
      });



          setFoundObject({
        ...foundObject,
        [name]: value,
      });

    




  };






const [Data, setData] = useState([]);
const [errorsNew, setErrorNew] = useState(null);
useEffect(() => {
  // Fetch data from the API route when the component mounts
  fetch("/api/getFormData")
    .then((response) => response.json())
    .then((data) => {

      console.log(data, "namesssss");

      if (data.msg) {
        setErrorNew(data.msg);
      } else {
        setData(data);
        const foundObject = data.find((item) => item.fullname === names);
        setFoundObject(foundObject);



      }
    })
    .catch((error) => {
      console.errorsNew("Error fetching data:", error);
      setErrorsNew(["Unable to fetch data."]);
    });
}, []);







console.log(Data,  "dataaa");




// const foundObject = Data.find((item) => item.fullname === names);




 console.log(foundObject, "sanam vannoooo");











const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Full Name: ", formData.fullname);
  console.log("Email: ", formData.email);
  console.log("Phone Number: ", formData.phoneNumber);
  console.log("Date of Birth: ", formData.dateOfBirth);

  // Check if foundObject has an _id
  if (foundObject && foundObject._id) {
    // Add the _id to the formData
    formData._id = foundObject._id;

    // Update the existing contact by _id
    const res = await fetch("api/contact", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const { msg, success } = await res.json();
    setError(msg);
    setSuccess(success);

    if (success) {
      // Clear form fields on success
      setFormData({
        fullname: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: "",
      });

      // Use router.push to navigate to the '/result' page
      router.push("/result");
    }
  } else {
    // Handle the case where foundObject doesn't have an _id
    const res = await fetch("api/contact", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const { msg, success } = await res.json();
    setError(msg);
    setSuccess(success);

    if (success) {
      // Clear form fields on success
      setFormData({
        fullname: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: "",
      });

      // Use router.push to navigate to the '/result' page
      router.push("/result");
    }  }
};
  return (
    <>
      <div className="px-60">
        <form
          onSubmit={handleSubmit}
          className="py-4 mt-4 border-t flex flex-col gap-5 "
        >
          <div>
            <label htmlFor="fullname">Full Name</label>
            <input
  onChange={handleChange} // Use handleChange function to update formData
  value={foundObject?foundObject.fullname:formData.fullname} // Use formData.fullname to bind the value
  type="text"
  id="fullname"
  name="fullname"
  placeholder="Name"
/>

          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              value={foundObject?foundObject.email:formData.email}
              type="text"
              id="email"
              name="email"
              placeholder="john@gmail.com"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              onChange={handleChange}
              value={foundObject?foundObject.phoneNumber:formData.phoneNumber}
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="123-456-7890"
            />
          </div>

          <div>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              onChange={handleChange}
              value={foundObject?foundObject.dateOfBirth:formData.dateOfBirth}
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
            />
          </div>

          <button
            className="bg-green-700 p-3 text-white font-bold"
            type="submit"
          >
              {foundObject?"update" :"submit"}
          </button>

          <Link href={{  pathname: "/"}}>
          <button
            className="bg-red-700 p-3 text-white font-bold"
            type="button"
            >

            Cancel
          </button>
            </Link>
        </form>

        <div className="bg-slate-100 flex flex-col">
          {error &&
            error.map((e, index) => (
              <div
                key={index}
                className={`${
                  success ? "text-green-800" : "text-red-600"
                } px-5 py-2`}
              >
                {e}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
