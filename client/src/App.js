import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import MusicList from './List/musicList';
import './App.css';

// const url = "https://uploadmusic12345.herokuapp.com";

function App() {
  const [singleFile, setSingleFile] = useState('');
  const [text, setText] = useState({});
  const [data, setData] = useState([]);
  const [singleProgress, setSingleProgress] = useState(0);

  // loader options
  const singleFileOptions = {  //loader
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setSingleProgress(percentage);
    }
  }

  const SingFileChange = (event) => {
    // console.log(event.target.files[0]);
    setSingleFile(event.target.files[0]);
  }

  const getSingleFiles = async () => {
    const { data } = await axios.get('http://localhost:8000/getAllSingleFiles');
    setData(data);
  }

  // ma'lumotlarni backenda yuborish
  const uploadSingleFile = async () => {
    if (singleFile) {
      if (singleFile.type === 'audio/mp4' || singleFile.type === 'audio/mpeg' || singleFile.type === 'audio/ogg' || singleFile.type === 'audio/mp3') {
        // forma yaratish va element qo'shish
        const formData = new FormData();
        formData.append('file', singleFile);

        const { data } = await axios.post('http://localhost:8000/singleFile', formData, singleFileOptions);

        setText({ color: 'green', data: data });
        setSingleFile('');
        document.querySelector('#file').value = "";
        getSingleFiles();
      }
      else {
        setText({ color: 'red', data: "You can only send music files" });
      }
    }
    else {
      setText({ color: 'red', data: "File not selected" });
    }
  }

  useEffect(() => {
    getSingleFiles();
  }, []);

  const deleteFile = async (id) => {
    await axios.delete(`http://localhost:8000/deleteSingleFile/${id}`);
    getSingleFiles();
  }


  return (
    <BrowserRouter>
      <Route path={`/dashboard6356`}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <h1 className="text-center text-danger border-bottom">Upload Music</h1>
              <div className="form-group">
                <label htmlFor="">Select Single File</label>
                <input type="file" id="file" onChange={(event) => SingFileChange(event)} className="form-control" />
                <span className="error" style={{ color: text.color }}>{text.data}</span>
              </div>
              <div className="row" style={{ display: 'flex' }}>
                <div className="col-md-10" style={{ flex: '90%' }}>
                  <button type="button" className="btn btn-danger my-2" onClick={uploadSingleFile}>Upload</button>
                </div>
                <div className="col-md-2" style={{ flex: '10%', textAlign: 'right' }}>
                  <CircularProgressbar
                    value={singleProgress}
                    text={`${singleProgress}%`}
                    styles={buildStyles({
                      rotation: 0.25,
                      strokeLinecap: 'butt',
                      textSize: '25px',
                      pathTransitionDuration: 0.5,
                      pathColor: `rbga(255, 136, 136, ${singleProgress / 100})`,
                      textColor: '#f88',
                      trailColor: '#d6d6d6',
                      backgroundColor: '#3e98c7'
                    })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-10 m-auto">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Filename</th>
                    <th>FileSize</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                {
                  data.map((file, index) => (
                    <tbody key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{file.fileName}</td>
                        <td>{file.fileSize}</td>
                        <td>{file.date}</td>
                        <td><button type="button" className="btn btn-danger border-0" onClick={() => deleteFile(file._id)}>Delete</button></td>
                      </tr>
                    </tbody>
                  ))
                }
              </table>
            </div>
          </div>
        </div>
      </Route>
      <Route path='/' exact>
        <MusicList data={data} getSingleFiles={getSingleFiles} />
      </Route>
    </BrowserRouter>
  );
}

export default App;
