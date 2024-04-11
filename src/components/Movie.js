import { db } from "../config/firebase";
import { useState, useEffect } from "react";
import { getDocs, collection, doc } from "firebase/firestore";

export const Movie = () => {
  const [movieList, setMovieList] = useState([]);
  const movieCollectionRef = collection(db, "movie");

  useEffect(() => {
    console.log("useEffect called");
    const getMovieList = async () => {
      //READ THE DATA
      //GET MOVIE LIST
      try {
        const data = await getDocs(movieCollectionRef);
        /* const filterData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })); */
        console.log(data);
      } catch (err) {
        console.error(err);
      }

      getMovieList(db);
    };
  }, []);

  return <div></div>;
};
