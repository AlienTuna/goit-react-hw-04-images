import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
// import Loader from "./Loader/Loader";

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
    const handleFormSubmit = query => {
      setSearchQuery(query)
  }
  return (
          <div className="container">
            <Searchbar
              onSubmit={handleFormSubmit}
            />
            <ImageGallery
              searchQuery={searchQuery}
            />
            <ToastContainer
              position="top-center"
              theme="dark"
            />
          </div>
        );
}
