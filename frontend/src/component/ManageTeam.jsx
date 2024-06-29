import React, { useState } from 'react'

const ManageTeam = () => {
    const  [form, setform] = useState(0)
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [role,setRole]=useState("")
    const [password,setPassword]=useState("")
    const members=[
        {
            username:"Abhishek naula",
            email:"abhisheknaulae@gmail.com",
            role:"videoEditor",
            createdAt:"34rrer"
        },
        {
            username:" Mukul",
            email:"mukulnaulae@gmail.com",
            role:"videoEditor",
            createdAt:"34rrer"
        },
    ]
    const formHandler=()=>{
        console.log("clicked")
        setform(!form)
    }
    const submitForm=()=>{
        console.log(name,email,password,role)
    }
  return (
    <div className='text-customGray-light' >
          {form && <div className='absolute top-[30%] right-[40%]  border-2 border-customPurple bg-customPurple-darker rounded-md'>
            <div className=' p-2'>
                <button onClick={()=>formHandler()} className="absolute top-2 right-2"  >X</button>
            <h1>Add team Member</h1>
            <h2>UseName</h2>
            <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
            <h2>Email</h2>
            <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <h2>Password</h2>
            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <h2>Role</h2>
            <input type="text" value={role} onChange={(e)=>{setRole(e.target.value)}}/>
            <button className='border border-customPurple p-2 hover:bg-customPurple rounded-md block m-2' onClick={()=>{submitForm()}}>Add Member</button>
            </div>
            </div>}
           <button className='border border-customPurple p-2 hover:bg-customPurple rounded-md ' onClick={()=>formHandler()}>+ add team member</button>
           <div>
            <h1>Team members</h1>
            <div className='border-2 rounded-md border-customPurple'> 

            {
               members?.map(member=>(
                    <div className="flex flex-row justify-evenly ">
                        <p>{member.username}</p>
                        <p className=' text-center'>{member.email}</p>
                        <p className=' text-center'>{member.role}</p>
                        <p className=' text-center'>{member.createdAt}</p>
                    </div>
               ))
            }
            </div>
           </div>
             </div>
  )
}

export default ManageTeam