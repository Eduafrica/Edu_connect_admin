import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const RichTextEditor = ({ handleChange, setFormData }) => {
  const editorRef = useRef(null);
  const quillInstance = useRef(null); // To store Quill instance

  useEffect(() => {
    if (!editorRef.current || quillInstance.current) return; // Prevent re-initialization

    const toolbarOptions = [
      [{ font: [] }], // Font list
      [{ size: ["10px", "12px", "14px", "16px", "18px", "20px"] }], // Text size
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // Header sizes
      ["bold", "italic", "underline"], // Bold, Italic, Underline
      [{ color: [] }, { background: [] }], // Text color and background color
      [{ script: "sub" }, { script: "super" }], // Subscript/Superscript
      [{ align: [] }], // Text alignment (left, center, right, justify)
      ["blockquote", "code-block"], // Blockquote and code block
      ["link", "image"], // Insert link and image
      ["clean"], // Clear formatting
    ];

    const quill = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: {
          container: toolbarOptions,
        },
        history: {
          delay: 1000,
          maxStack: 50,
          userOnly: true,
        },
      },
      placeholder: "Enter message...",
    });

    quillInstance.current = quill; // Store the Quill instance

    // Listen for text changes and update formData
    quill.on("text-change", () => {
      const htmlContent = quill.root.innerHTML; // Get editor content as HTML
      setFormData((prev) => ({
        ...prev,
        message: htmlContent, // Update form data with editor content
      }));
      if (handleChange) {
        handleChange(htmlContent); // Call external handleChange if provided
      }
    });

    // Add custom Undo/Redo buttons once
    const toolbar = editorRef.current.querySelector(".ql-toolbar");
    if (toolbar) {
      const customGroup = toolbar.querySelector(".ql-custom-group");
      if (!customGroup) {
        const undoButton = document.createElement("button");
        undoButton.innerHTML = "⟲ Undo";
        undoButton.classList.add("ql-undo");
        undoButton.onclick = () => quill.history.undo();

        const redoButton = document.createElement("button");
        redoButton.innerHTML = "⟳ Redo";
        redoButton.classList.add("ql-redo");
        redoButton.onclick = () => quill.history.redo();

        const customGroup = document.createElement("span");
        customGroup.classList.add("ql-formats", "ql-custom-group");

        customGroup.appendChild(undoButton);
        customGroup.appendChild(redoButton);

        toolbar.appendChild(customGroup);
      }
    }
  }, [setFormData, handleChange]);

  return <div ref={editorRef} style={{ height: "266px" }} />;
};

export default RichTextEditor;
