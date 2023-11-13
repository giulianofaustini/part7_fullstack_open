// import React from "react";
// import blogService from "../services/blogs";

// export default function RemoveBlog({ blog, setBlogs, handleRedMessage, setUser,}) {
//   const user = JSON.parse(localStorage.getItem("loggedBlogsAppUser"));
//   const handleDelete = async () => {
   
//     if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
//       try {
//         console.log("the blog title is:", blog.title);
        
//         console.log(
//           "can you give me the user from front end remove funciton:",
//           user.token
//         );

//         if (!user || !user.token) {
//           console.error("User token is missing or undefined.");
//           return;
//         }
//         console.log("the blog ID is:", blog.id);

//         await blogService.deleteBlog(blog.id);


//         setBlogs((prevBlog) => prevBlog.filter((b) => b.id !== blog.id));

//         handleRedMessage(
//           `Blog "${blog.title}" by ${blog.author} has been deleted.`
//         );
//         setUser(user);
//       } catch (error) {
//         console.log("Error deleting the blog.");
//       }
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleDelete}>delete</button>
//     </div>
//   );
// }
