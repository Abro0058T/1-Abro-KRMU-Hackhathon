import React from 'react'

function Video() {
  return (
    <div className='mt-5 ml-6 w-10/12 rounded-lg '>
        <h1 className='text-600 text-xl text-white p-2'>Videos</h1>
        <div>
            <div className='w-14/15 flex justify-evenly text-center'>
                <div className="p-2 bg-purple-800 w-40 h-20 border-none rounded-lg"><h3>Total Video</h3><h1 className='text-green-500 text-xl font-bold  '>100</h1></div>
                <div className="p-2 bg-purple-800 w-40 h-20 border-none rounded-lg"><h3>Pending Videos</h3><h1>23</h1></div>
                <div className="p-2 bg-purple-800 w-40 h-20 border-none rounded-lg"><h3>Watched Videos</h3><h1>77</h1></div>
            </div>
            <div>
            <div className="overflow-y-scroll h-80 bg-purple-800 rounded-md mt-10">
  <table className="table ">
    {/* head */}
    <thead>
      <tr>
        <th>Video</th>
        <th>Name</th>
        <th>Duration</th>
        <th>Data</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody className="">
      {/* row 1 */}
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
      {/* row 2 */}
      <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
      {/* row 3 */}
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr>
       {/* row 1 */}
       <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
      {/* row 2 */}
      <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
      {/* row 3 */}
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr>
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
      {/* row 2 */}
      <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
      {/* row 3 */}
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr>
       {/* row 1 */}
       <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
      {/* row 2 */}
      <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
      {/* row 3 */}
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr>
    </tbody>
  </table>
</div>
                 </div>
        </div>
    </div>
  )
}

export default Video