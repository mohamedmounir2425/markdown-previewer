import "./App.css";
import React, { useEffect, useState } from "react";
import { marked } from "marked";
import useLocalStorage from "./useLocalStorage";

const App = () => {
  const [code, setCode] = useLocalStorage("markdown", "## Hello");
  const [compiled, setCompiled] = useState(marked.parse(code));
  const [docsData, setDocsData] = useState([]);
  const [activeTab, setActiveTab] = useState("markdown");

  const URL = "https://www.markdownguide.org/api/v1/basic-syntax.json";

  const getDocs = () => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDocsData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    getDocs();
  }, []);

  const openMD = () => {
    setActiveTab("markdown");
  };

  const openPreview = () => {
    setActiveTab("preview");
  };
  const openDocs = () => {
    setActiveTab("docs");
    getDocs();
  };

  const handleChange = (e) => {
    setCode(e.target.value);
    setCompiled(marked.parse(e.target.value));
  };

  return (
    <>
      <h1>MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button
            onClick={openMD}
            className={activeTab === "markdown" ? "active" : ""}
          >
            MarkDown
          </button>
          <button
            onClick={openPreview}
            className={activeTab === "preview" ? "active" : ""}
          >
            Preview
          </button>
          <button
            onClick={openDocs}
            className={activeTab === "docs" ? "active" : ""}
          >
            Docs
          </button>
        </div>

        {activeTab === "markdown" && (
          <div>
            <textarea onChange={handleChange} value={code} />
          </div>
        )}

        {activeTab === "preview" && (
          <div>
            <textarea value={compiled} />
          </div>
        )}

        {activeTab === "docs" && (
          <div>
            <textarea
              value={` I've been working on the project you assigned to me, and I've run
              into a CORS (Cross-Origin Resource Sharing) error when trying to
              fetch data from an external API [https://www.markdownguide.org/api/v1/basic-syntax.json]. The issue arises because of the
              browser's same-origin policy, which restricts web pages from
              making requests to different domains. `}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
