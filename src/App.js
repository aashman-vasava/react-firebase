import logo from "./logo.svg";
import "./App.css";
import { Auth } from "./components/Auth";
import { Movie } from "./components/Movie";
import { useState, useEffect } from "react";
import {
  getDocs,
  addDoc,
  collection,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "./config/firebase";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [studentList, setStudentList] = useState([]);

  //new student states
  const [newStudentname, setNewStudent] = useState("");
  const [newStudentRoll, setNewStudentRoll] = useState(0);
  const [newStudentDepartment, setNewStudentDepartment] = useState("");

  //update name of student state
  const [updatName, setUpdateName] = useState("");

  const studentCollectionRef = collection(db, "students");
  const getStudentList = async () => {
    try {
      const data = await getDocs(studentCollectionRef);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filterData);
      setStudentList(filterData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getStudentList();
  }, []);

  const onSubmitStudent = async () => {
    try {
      await addDoc(studentCollectionRef, {
        name: newStudentname,
        rollno: newStudentRoll,
        department: newStudentDepartment,
        userId: auth?.currentUser?.uid,
      });
    } catch (err) {
      console.error(err);
    }
  };
  //delete student

  const deleteStudent = async (id) => {
    try {
      const studentDoc = doc(db, "students", id);
      await deleteDoc(studentDoc);
    } catch (err) {
      console.error(err);
    }
  };

  //update name of student
  const updateStudentName = async (id) => {
    const studentDoc = doc(db, "students", id);
    await updateDoc(studentDoc, { name: updatName });
  };

  //file upload state
  const [fileUpload, setFileUpload] = useState(null);
  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, "projectFiles/${fileUpload.name}");
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App-header">
      <p>React with firebase</p>
      <Auth />
      <div>
        <input
          placeholder="student-name"
          onChange={(e) => setNewStudent(e.target.value)}
        />
        <input
          placeholder="rollno"
          onChange={(e) => setNewStudentRoll(Number(e.target.value))}
        />
        <input
          placeholder="department"
          onChange={(e) => setNewStudentDepartment(e.target.value)}
        ></input>
        <button onClick={onSubmitStudent}>submit student info</button>
      </div>
      <div>
        {studentList.map((student) => (
          <div className="student-info">
            <h1
              style={{
                color: student.department == "computer" ? "green" : "red",
              }}
            >
              {student.name}
            </h1>
            <p>rollNo : {student.rollno}</p>
            <button onClick={() => deleteStudent(student.id)}>
              Delete student
            </button>
            <input
              placeholder="update-name"
              onChange={(e) => setUpdateName(e.target.value)}
            />
            <button
              onClick={() => {
                updateStudentName(student.id);
              }}
            >
              UpdateName
            </button>
          </div>
        ))}
      </div>
      <div>
        <input
          type="file"
          onChange={(e) => setFileUpload(e.target.files[0])}
        ></input>
        <button onClick={() => uploadFile()}>Upload File</button>
      </div>
    </div>
  );
}
export default App;
