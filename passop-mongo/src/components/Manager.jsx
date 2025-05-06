import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])

  const getPasswords = async() => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    console.log(passwords)
    setPasswordArray(passwords)
  }

  useEffect(() => {
    getPasswords()

  }, [])

  const copyText = (text) => {
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: "Bounce",
    });
    navigator.clipboard.writeText(text)
  }


  const showPassword = () => {
    passwordRef.current.type = "text"
    if (ref.current.src.includes("eyeclose.svg")) {
      ref.current.src = "eyeopen.svg"
      passwordRef.current.type = "password"
    }
    else {
      ref.current.src = "eyeclose.svg"
      passwordRef.current.type = "text"
    }
  }

  const savePassword = async () => {
    if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){

    //  if any such id exists in the db, delete it
    await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id: form.id})})
    
    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
    await fetch("http://localhost:3000/", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({...form, id: uuidv4()})})

    setform({site: "", username: "", password: ""})

    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
    // console.log(passwordArray)

    toast('Password saved successfully', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: "Bounce",
    });
  }

  else{
    toast('ERROR : Password not saved!' ,{
      autoClose: 3000,
      theme: "dark",
    });
  }

  }



  const deletePassword = async(id) => {
    console.log("deleting password with id ", id)
    let conf = confirm("Are you sure to delete this item")
    if (conf) {
      setPasswordArray(passwordArray.filter(item => item.id !== id))
      await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id})})

      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id != id)))
    

    toast('Password Deleted!!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: "Bounce",
    });
  }
  }

  const editPassword = (id) => {
    console.log("editing password with id ", id)
    setform({...passwordArray.filter(i => i.id === id)[0], id: id})
    setPasswordArray(passwordArray.filter(item => item.id !== id))


  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />

      <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]">
        </div>
      </div>
      <div className="px-2 md:px-0 md:mycontainer">
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-[#1dacd6]'>&lt;</span>

          Pass
          <span className='text-[#1dacd6]'>OP/&gt;</span>
        </h1>
        <p className='text-[#282a82] text-lg text-center'>Your own Password Manager</p>
        <div className=" flex flex-col p-4 text-black gap-8 items-center">
          <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-[#1dacd6] w-full p-4 py-1' type='text' name='site' id='site' />
          <div className='md:flex-row flex-col flex w-full justify-between gap-8'>
            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-[#1dacd6] w-full p-4 py-1' type='text' name='username' id='username' />
            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-[#1dacd6] w-full p-4 py-1' type='text' name='password' id='password' />
              <span className='absolute right-2 top-[5px] cursor-pointer' onClick={showPassword}>
                <img ref={ref} src='eyeopen.svg' />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className='flex justify-center gap-2 items-center bg-[#36c2ec] hover:bg-[#37aed2] rounded-full px-6 py-2 w-fit border border-[#37aed2] hover:scale-105 '>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon>
            Save Password</button>
        </div>

        <div className="passwords">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
            <thead className='bg-blue-800 text-white'>
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
                <th className='py-2'>Action</th>
              </tr>
            </thead>
            <tbody className='bg-[#c8f2ff]'>
              {passwordArray.map((item, index) => {
                return <tr key={index}>
                  <td className=' py-2 border border-white text-center'>
                    <div className='flex items-center justify-center'>
                      <a href={item.site} target='_blank'>{item.site}</a>
                      <div onClick={() => { copyText(item.site) }}>
                        <img className='cursor-pointer px-2' src='copy.svg'></img>
                      </div>
                    </div>
                  </td>

                  <td className='  py-2 border border-white '>
                    <div className='flex items-center justify-center'>
                      <span>{item.username}</span>
                      <div onClick={() => { copyText(item.username) }}>
                        <img className='cursor-pointer px-2' src='copy.svg'></img>
                      </div>
                    </div>
                  </td>

                  <td className=' items-center py-2 border justify-center border-white '>
                    <div className='flex items-center justify-center'>
                      <span>{"*".repeat(item.password.length)}</span>
                      <div onClick={() => { copyText(item.password) }}>
                        <img className='cursor-pointer px-2' src='copy.svg'></img>
                      </div>
                    </div>
                  </td>

                  <td className='flex items-center py-2 border justify-center border-white '>
                    <span className='cursor-pointer mx-2' onClick={() => { editPassword(item.id) }}>
                      <lord-icon
                        src="https://cdn.lordicon.com/exymduqj.json"
                        trigger="hover"
                        stroke="bold"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                    </span>
                    <span className='cursor-pointer mx-2 ' onClick={() => { deletePassword(item.id) }}>
                      <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        stroke="bold"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                    </span>
                  </td>
                </tr>
              })}
            </tbody>
          </table>}
        </div>
      </div>
    </>
  )
}

export default Manager
