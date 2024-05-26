import image from "../assets/img3.jpg";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";
import { PiNotepadFill } from "react-icons/pi";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { GoStarFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  createNote,
  deleteNote,
  notesAll,
  updateNote,
} from "../features/notes/notesSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localData =
    localStorage.getItem("customer") &&
    JSON.parse(localStorage.getItem("customer"));
  const initialState = {
    type: "all",
    email: localData.email,
  };
  const [data, setData] = useState(initialState);
  const [form, setForm] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [liveData, setLiveData] = useState({});
  const [content, setContent] = useState({ checked: false, content: "" });
  const [task, setTask] = useState([]);
  // const initialNote = ;
  const [noteData, setNoteData] = useState({
    name: "",
    starred: true,
    trash: false,
    isremainder: false,
    status:'pending',
    remainder: "",
    timeout: 0,
  });
  const statusData=(e)=>{
    setNoteData(prevNoteData=>({...prevNoteData, status:e}))
    console.log(noteData)
    // console.log(e)
  }
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    dispatch(notesAll(data));
  }, [data]);
  const notesState = useSelector((state) => state.notes.notes || []);

  const handleTaskChange = () => {
    const newArray = [...task, content];
    setTask(newArray);
    setNoteData({ ...noteData, task: newArray });
  };
  const handleSumbit = () => {
    update
      ? dispatch(updateNote(noteData))
      : dispatch(createNote({ ...noteData, task, email: localData.email }));
    setContent({ checked: false, content: "" });
    toast.success(`${update ? "Updated successfully" : "Crated successfully"}`);

    setTimeout(() => {
      window.location.reload();
    }, 800);
  };
  const [star, setStar] = useState(0);
  useEffect(() => {
    let c = 0;
    for (let i = 0; i < notesState.length; i++) {
      if (notesState[i].starred == true) {
        c = c + 1;
      }
      setStar(c);
    }
  }, [notesState]);
  const handleTaskData = (e) => {
    setUpdate(true);
    setLiveData(e);
    setNoteData(e);
    setForm(true);
    console.log(e);
    setTask(e.task);
  };
  const logoutFuntion = () => {
    localStorage.removeItem("customer");
    navigate("/login");
  };
  const handleDelete = (id) => {
    update
      ? dispatch(deleteNote({ _id: id }))
      : setNoteData({ ...noteData, trash: true });
    toast.success("Note deleted");
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };
  const handleTaskContentChange = (e, index) => {
    const newTask = [...task];
    console.log(newTask);
    newTask[index] = { ...newTask[index], content: e.target.value };
    console.log(e.target.value);
    setTask(newTask);
    setNoteData({ ...noteData, task: newTask });
  };
  function setDataForm(type) {
    setForm(false);
    setData({ ...data, type: type });
  }

  return (
    <div
      className="backdrop-blur-3xl bg-black min-h-80"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
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
      />
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-full transition-transhtmlForm -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto  bg-transparent backdrop-blur-3xl">
          <ul className="space-y-2 font-medium">
            <li className="m-6 divide-neutral-50">
              <button
                onClick={() => setDataForm("all")}
                className="flex text-2xl items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="mr-2 text-4xl">
                  <PiNotepadFill />
                </span>{" "}
                Notes
              </button>
            </li>

            <li>
              <button
                onClick={() => setDataForm("all")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <CgNotes />
                <span className="flex-1 ms-3 whitespace-nowrap">All Notes</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setDataForm("starred")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaRegStar />
                <span className="flex-1 ms-3 whitespace-nowrap">Starred</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {star}
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setDataForm("remainder")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdOutlineNotificationsActive />
                <span className="flex-1 ms-3 whitespace-nowrap">Remainder</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setDataForm("trashed")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <RiDeleteBin5Line />
                <span className="flex-1 ms-3 whitespace-nowrap">Trash</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => logoutFuntion()}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Log out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64 ">
        <div className="p-8 border-2  border-slate-400 border-dashed rounded-lg dark:border-gray-700 flex backdrop-blur-3xl ">
          {form ? (
            <div className="w-full h-screen">
              <div className="mb-6">
                <div className="flex justify-between">
                  <div>
                    {" "}
                    <label
                      htmlFor="default-input"
                      className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                  </div>
                  <div className="text-white text-xl flex justify-evenly w-40">
                    {noteData.starred ? <GoStarFill /> : <FaRegStar />}
                    <MdOutlineNotificationsActive />
                    <span onClick={() => handleDelete(noteData._id)}>
                      {" "}
                      <RiDeleteBin5Line />
                    </span>
                  </div>
                </div>
                <input
                  type="text"
                  id="default-input"
                  value={noteData.name}
                  onChange={(e) =>
                    setNoteData({ ...noteData, name: e.target.value })
                  }
                  className=" border-b-2 bg-transparent border-gray-500 text-white text-sm   block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="small-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Notes
                </label>
                {/* task list */}
                {task &&
                  task.map((j, index) => (
                    <div key={index}>
                      <div className="flex">
                        {" "}
                        <input type="checkbox" />
                        <input
                          type="text"
                          id="small-input"
                          value={j.content}
                          onChange={(e) => handleTaskContentChange(e, index)}
                          className="border-b-2 bg-transparent text-white text-sm   block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>
                    </div>
                  ))}
                {!update && (
                  <div className="flex">
                    {" "}
                    <input type="checkbox" />
                    <input
                      type="text"
                      id="small-input"
                      value={content.content}
                      // onChange={(e)=>({...tasks,content:e.target.value})}
                      onChange={(e) =>
                        setContent({ ...content, content: e.target.value })
                      }
                      className="border-b-2 bg-transparent text-white text-sm   block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      onClick={() => handleTaskChange()}
                      className="w-12 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      add
                    </button>
                  </div>
                )}

                <div className="flex justify-evenly mt-6">
                  <button
                    type="submit"
                    onClick={() => handleSumbit()}
                    className="w-40 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    {update ? "Update" : "Save"}
                  </button>
                  <form className="max-w-sm mx-auto">
                    <label
                      htmlFor="countries"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select an option
                    </label>
                    <select
                      id="countries"
                       onChange={(e)=>{statusData(e.target.value)}}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value='pending'>Choose a status</option>
                      {/* <option value="US">United States</option> */}
                      <option value="pending">pending</option>
                      <option value="in-progress">in-progress</option>
                      <option value="completed">completed</option>
                    </select>
                  </form>
                  {!update && (
                    <>
                      <form className="max-w-sm mx-auto">
                        <label
                          htmlFor="number-input"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Remaind after :
                        </label>
                        <input
                          type="number"
                          id="number-input"
                          aria-describedby="helper-text-explanation"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="24 hours"
                          min="0"
                          max="24"
                          onChange={(e) =>
                            setNoteData({
                              ...noteData,
                              timeout: parseInt(e.target.value),
                            })
                          }
                          defaultValue="0"
                          required
                        />
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-12 bg-scroll">
                {/* ADD new component       */}
                {/* <div className="warapper-bg min-w-full bg-white h-screen absolute"></div> */}
                <div className="addCard">
                  <div
                    onClick={() => setForm(true)}
                    className=" w-full h-fit max-w-sm p-4 bg-transparent  backdrop-blur-3xl border pb-7 border-white rounded-lg shadow sm:p-8 dark:bg-transparent dark:border-white"
                  >
                    <div className="flex-col justify-center items-center m-4">
                      <MdOutlineAddToPhotos className="text-slate-400 text-4xl flex mx-7 " />
                      <h1 className="  text-slate-400 flex-row text-3xl mx-4 mt-4">
                        Add New
                      </h1>
                    </div>
                  </div>
                </div>
                {notesState.length > 0
                  ? notesState.map((e) => (
                      <div
                        className="card"
                        key={e._id}
                        onClick={() => handleTaskData(e)}
                      >
                        <div className=" w-full h-fit max-w-sm p-4 bg-transparent  backdrop-blur-3xl border pb-7 border-white rounded-lg shadow sm:p-8 dark:bg-transparent dark:border-white">
                          <h5 className="mb-4 text-xl font-medium truncate text-white dark:text-white">
                            {e.name}
                          </h5>
                          <ul role="list" className="space-y-5 my-7 ">
                            {e.task.length > 0 ? (
                              e.task.map((i) => (
                                <li className="flex items-center" key={i.id}>
                                  <input type="checkbox" />
                                  <span className="text-base font-normal truncate leading-tight text-gray-500 dark:text-gray-400 ms-3">
                                    {i.content}
                                  </span>
                                </li>
                              ))
                            ) : (
                              <h6>there is no task</h6>
                            )}
                          </ul>
                          <select
                      id="countries"
                      value={e.status}
                       onChange={(e)=>{statusData(e.target.value)}}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value='pending'>Choose a status</option>
                      {/* <option value="US">United States</option> */}
                      <option value="pending">pending</option>
                      <option value="in-progress">in-progress</option>
                      <option value="completed">completed</option>
                    </select>
                        </div>
                      </div>
                    ))
                  : "Notes are Empty"}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
