import React from "react";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { CircularProgress } from "@material-ui/core";
import Axios from "./Axios";
import axios from "axios";
import { Buffer } from "buffer";

function AddData() {
  const [loading, setLoading] = useState(false);

  const [books, setBooks] = useState([]);
  const [img, setImg] = useState("");

  const sendToCloudinary = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", img);
      formData.append("upload_preset", "mern-chat");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/mern-chat/image/upload",
        formData
      );
      const { secure_url } = res.data;
      setImg(secure_url);
      setLoading(false);
      return res.data.secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBooks = async () => {
    let res = await Axios.get("/news");

    // get firebase data
    setBooks(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  const addNews = async (e) => {
    e.preventDefault();
    setLoading(true);
    let cloudData = await sendToCloudinary(e);

    if (cloudData) {
      try {
        let data = await Axios.post("/upload", {
          img: cloudData,
        });
        if (data) {
          toast.success("Added Successfully", {
            autoClose: 2000,
            position: toast.POSITION.TOP_CENTER,
          });
          setLoading(false);
          setImg(null);
          getAllBooks()
        }
      } catch (error) {
        setLoading(false);
        console.log(error.response);
      }
    }
  };
  const deleteNews = async (id) => {
    if (window.confirm("do you want to delete this news")) {
      await Axios.delete(`/${id}`);
      getAllBooks();
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Thumbnail
                      </label>
                      <input
                        // onChange={(e) => setFile(e.target.files[0])}
                        type="file"
                        onChange={(e) => setImg(e.target.files[0])}
                        autoComplete="given-name"
                        className="text-sm text-grey-500
                        file:mr-5 file:py-3 file:px-10
                        file:rounded-full file:border-0
                        file:text-md file:font-semibold  file:text-white
                        file:bg-gradient-to-r file:from-blue-600 file:to-amber-600
                        hover:file:cursor-pointer hover:file:opacity-80"
                        // className="form-control   block  w-full px-3   py-1.5   text-base  font-normal text-gray-700  bg-gray-100 bg-clip-padding  border border-solid border-gray-300   rounded  transition  ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <button
                      onClick={(e) => addNews(e)}
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Image
                      </th>

                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.length < 1 ? (
                      <CircularProgress />
                    ) : (
                      books.map((book, index) => (
                        <tr className="bg-white border-b" key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {index + 1}
                          </td>

                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <img src={book.img} alt="" className="h-20" />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => deleteNews(book._id)}
                              className="bg-red-800 text-white py-2 px-3 hover:bg-white hover:text-red-600 transition hover:border border-2"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddData;
