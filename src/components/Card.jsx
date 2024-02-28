import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
const Card = () => {
  return (
    <div className=" w-full h-fit max-w-sm p-4 bg-transparent  backdrop-blur-3xl border pb-7 border-white rounded-lg shadow sm:p-8 dark:bg-transparent dark:border-white">
    <h5 className="mb-4 text-xl font-medium truncate text-white dark:text-white">
      Standard plan
    </h5>
    <ul role="list" className="space-y-5 my-7 ">
      <li className="flex items-center">
       <input type="checkbox" />
        <span className="text-base font-normal truncate leading-tight text-gray-500 dark:text-gray-400 ms-3">
          2 team members
        </span>
      </li>
      <li className="flex items-center">
       <input type="checkbox" />
        <span className="text-base font-normal leading-tight truncate text-gray-500 dark:text-gray-400 ms-3">
          2 team members
        </span>
      </li>
      <li className="flex line-through decoration-gray-500">
       <input type="checkbox" checked />  
        <span className="text-base font-normal truncate leading-tight text-gray-500 ms-3">
          Sketch Files
        </span>
      </li>  <li className="flex line-through decoration-gray-500">
       <input type="checkbox" checked/>
        <span className="text-base font-normal truncate leading-tight text-gray-500 ms-3">
          Sketch Files
        </span>
      </li>
    </ul>
   <div className="logos flex justify-between">
        < MdOutlineNotificationsActive className="text-white"/>
        < FaRegStar className="text-white"/>
        <  RiDeleteBin5Line className="text-white"/>
   </div>
  </div>
  )
}

export default Card