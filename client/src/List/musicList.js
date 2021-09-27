import React from 'react';

const MusicList = (props) => {
    // const [data, setData] = useState([]);

    // const getSingleFiles = async () => {
    //     const { data } = await axios.get(props.url + 'getAllSingleFiles');
    //     setData(data);
    // }
    props.getSingleFiles();

    const ended = (index) => {
        let audio = document.querySelectorAll('#audio');
        audio[index + 1].play();
    }

    const audioClick = (index) => {
        let audio = document.querySelectorAll('#audio');
        for (let i = 0; i < audio.length; i++) {
            if (i === index) {
                continue;
            }
            else {
                audio[i].pause();
            }
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 m-auto">
                    <h1 className="text-center text-danger border-bottom my-3">Music List</h1>

                </div>
            </div>
            <div className="row">
                <div className="col-md-6 m-auto">
                    {
                        props.data.map((element, index) => (
                            <div key={index}>
                                <h6>{element.fileName}</h6>
                                <audio controls id="audio" onEnded={() => ended(index)} onPlaying={() => audioClick(index)}>
                                    <source src={`http://localhost:8000/${element.filePath}`} type={element.fileType} />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MusicList;