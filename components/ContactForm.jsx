// Form.js


"use client"
import { useState } from "react";
import Link from "next/link";

export default function Form() {
  const [formData, setFormData] = useState({
    fullname: "",
  });


  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const res = await fetch("/api/name", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // });

    // const { msg, success } = await res.json();
    // setError(msg);
    // setSuccess(success);

    // if (success) {
      formData.fullname = String(formData.fullname);

// Push the route.
 setFormData({
        fullname: "",
      });
    };
  

  return (
    <>
      <div className="px-60">
        <form onSubmit={handleSubmit} className="py-4 mt-4 border-t flex flex-col gap-5">
          <div>
            <label htmlFor="fullname">Full Name</label>
            <input
              onChange={handleChange}
              value={formData.fullname}
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Name"
            />
          </div>
<Link href={{  pathname: "/form",
  query: { fullname: formData.fullname },}}>
          <button className="bg-green-700 p-3 text-white font-bold" type="submit">
            Submit
          </button>
</Link>

      
        </form>


      </div>
    </>
  );
}
