import React, { useRef, useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function Manager() {

  const notify = () => toast("Password Saved");
  const del = () => toast("Password Deleted");

  const ref1 = useRef();
  const ref2 = useRef();

  const [Form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const ShowPassword = () => {
    if (ref1.current.src.includes("https://static.thenounproject.com/png/506282-200.png")) {
      ref1.current.src = "https://static.vecteezy.com/system/resources/thumbnails/006/086/018/small_2x/preview-show-interface-icon-free-vector.jpg";
      ref2.current.type = "password";
    } else {
      ref1.current.src = "https://static.thenounproject.com/png/506282-200.png";
      ref2.current.type = "text";
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://passop-back.vercel.app/getPasswords");
        const json = await response.json();
        setPasswordArray(json);

      } catch (error) {
        console.error("Error in useEffect fetching passwords:", error);
      }
    };
    fetchData();
  }, []);



  const savePassword = async () => {
    try {
      const response = await fetch('https://passop-back.vercel.app/addPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Form),
      });
      const newData = await response.json();

      setPasswordArray([...passwordArray, newData]);
      setForm({ site: "", username: "", password: "" });
      setIsEditing(false);
      notify();
    } 
    catch (error) {
      console.error("Error saving password:", error);
    }
  };


  const updatePassword = async () => {
    try {
      const response = await fetch(`https://passop-back.vercel.app/updatePassword/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Form),
      });

      if (response.ok) {
        const updatedData = await response.json();

        setPasswordArray(passwordArray.map(password => 
          password._id === editId ? updatedData : password
        ));
        setForm({ site: "", username: "", password: "" });
        setIsEditing(false);
        setEditId(null);
        notify();
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };


  const deletePassword = async (id) => {
    try {
      await fetch(`https://passop-back.vercel.app/deletePassword/${id}`, { method: 'DELETE' });
      setPasswordArray(passwordArray.filter(password => password._id !== id));
      del();
      
    } catch (error) {
      console.error("Error deleting password:", error);
    }
  };


  const editPassword = (item) => {
    setForm({ site: item.site, username: item.username, password: item.password });
    setEditId(item._id);
    setIsEditing(true);
  };


  const handleChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };


  return (
    <div className='flex justify-center'>
      <ToastContainer />

      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>

      <div className=' mx-10 p-4 rounded-lg w-5/6'>

        <div className='font-extrabold italic text-gray-800 text-center text-2xl'>
          <span className='text-3xl text-green-600'>&lt;P@ss</span>/M@nager &gt;
        </div>

        <p className='text-center text-lg mb-4'>Make your passwords secure with us</p>

        <div className="input flex flex-col items-center">

          <input value={Form.site} name='site' type="text" onChange={handleChange} placeholder='Enter Website URL' className='pl-4 w-full m-2 p-1 px-2 rounded-full hover:border-green-600 hover:border-2 border border-green-500' />
          <div className='flex flex-col md:flex-row md:justify-between items-center gap-3 mt-2 w-4/5'>
          
            <input value={Form.username} name='username' type="text" onChange={handleChange} placeholder='Enter Username' className='pl-4 m-2 p-1 px-2 border border-green-500 rounded-full hover:border-green-600 hover:border-2 w-3/4' />
            
            <div className='relative w-44 md:w-1/2 flex justify-center'>
              <input ref={ref2} value={Form.password} name='password' type="password" onChange={handleChange} placeholder='Enter Password' className='pl-4 m-2 p-1 px-2 border border-green-500 rounded-full hover:border-green-600 hover:border-2 w-full' />
             
              <span className='absolute bottom-3 right-4'>
                <img ref={ref1} onClick={ShowPassword} className='w-6 cursor-pointer rounded-full' src="https://static.vecteezy.com/system/resources/thumbnails/006/086/018/small_2x/preview-show-interface-icon-free-vector.jpg" alt="" />
              </span>
            </div>
          </div>

          <button onClick={isEditing ? updatePassword : savePassword} className='flex justify-center items-center bg-green-400 px-2 mt-4 text-sm font-semibold hover:bg-white border-2 border-green-500 transition-all rounded-full'>
            <lord-icon src="https://cdn.lordicon.com/sbnjyzil.json" trigger="hover" stroke="bold" colors="primary:#109121,secondary:#000000" />
            {isEditing ? "Update Password" : "Add Password"}
          </button>

        </div>

        <div className="table bg-opacity-50 bg-green-300 p-2 m-auto w-full mt-5 rounded-lg">
          <p className='text-lg p-1 font-bold'>Your Passwords</p>

          {passwordArray.length === 0 && <div className='text-center'>Sorry! No passwords here</div>}

          {passwordArray.length !== 0 && (

            <div className='overflow-y-auto' style={{ maxHeight: '210px' }}>
              <table className='bg-slate-50 w-full rounded-lg'>
                
                <thead className='text-white bg-green-700'>
                  <tr>
                    <th className='p-2 text-center'>Site</th>
                    <th className='p-2 text-center'>Username</th>
                    <th className='p-2 text-center'>Password</th>
                    <th className='p-2 text-center'>Actions</th>
                  </tr>
                </thead>

                <tbody className='bg-green-100'>
                  {passwordArray.map((item) => (

                    <tr key={item._id}>
                      <td className='p-2 text-center'><a href={item.site} target='_blank' className='text-blue-600 underline'>{item.site}</a></td>
                      <td className='p-2 text-center'>{item.username}</td>
                      <td className='p-2 text-center'>{item.password}</td>
                      <td className='p-2 text-center cursor-pointer md:space-x-1'>

                        <span onClick={() => editPassword(item)}>
                          <lord-icon className="icon" src="https://cdn.lordicon.com/fikcyfpp.json" trigger="hover" stroke="bold" colors="primary:#000000,secondary:#16c72e" />
                        </span>

                        <span onClick={() => deletePassword(item._id)}>
                          <lord-icon className="icon" src="https://cdn.lordicon.com/hwjcdycb.json" trigger="hover" stroke="bold" />
                        </span>

                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>
            
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Manager;
  