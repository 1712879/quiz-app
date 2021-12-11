import React, { useEffect, useState } from 'react';
import API from 'src/api';
import Sidebar from 'src/components/Sidebar/Sidebar';
import '../styles/style.css';
import mockData from '../mock';

const Home = (props) => {
    const [isRefresh, setIsRefresh] = useState(false)
    const [data, setData] = useState([])
    const [listQuestions, setListQuestions] = useState([]);

    useEffect(() => {
        (async () => {
            const results = await API({url: '/questions',method: 'get' });
            setListQuestions(results.data)
            setData(results.data)
        })()
    }, [isRefresh]);

    const handleSearchQuestionByKeyword = (evt) => {
        let word = evt.target.value;
        if(!word) {
            setListQuestions(data);
            return
        };
        word = word.toLowerCase().trim()
        let filterListQuestions = listQuestions.filter(e => e.text.toLowerCase().includes(word));
        setListQuestions(filterListQuestions)
    }

    const handleDeleteQuestion = async (id) => {
        let isConfirm = confirm("Do you confirm deletion of this question?");
        console.log(isConfirm)
        if (!isConfirm) return;
        const result = await API({
            url: `/questions/${id}`,
            method: 'delete'
        });
        if (result && result.status && result.status == 200) {
            alert("success");
            setIsRefresh(!isRefresh)
        } else {
            alert("failed")
        }
    }

    return (
        <>
            <Sidebar/>
            <main>
                <div class="container">
                    <h1>All questions</h1>

                    <div id="search">
                        <input type="text" placeholder="Search..." onChange={handleSearchQuestionByKeyword}/>
                    </div>

                    <table>
                        <tr>
                            <th>#</th>
                            <th>Question</th>
                            <th>Answer</th>
                            <th width="300">Actions</th>
                        </tr>
                        {
                            listQuestions.length > 0 ? 
                                listQuestions.map((e, idx) => (
                                    <tr key={e._id}>
                                        <td>{idx + 1}</td>
                                        <td>{e.text}</td>
                                        <td>{e.answers[e.answersCorrectIndex] || ''}</td>
                                        <td>
                                            <a href={`/detail-questions/${e._id}`} class="btn btn-green"><i class="fas fa-info-circle"></i> Detail</a>
                                            <a href={`/questions/${e._id}`} class="btn btn-blue"><i class="far fa-edit"></i> Edit</a>
                                            <a onClick={() => handleDeleteQuestion(e._id)} class="btn btn-orange"><i class="far fa-trash-alt"></i> Delete</a>
                                        </td>
                                    </tr>
                                ))
                            : ''
                        }

                    </table>
                </div>
            </main>
        </>
    )
}


export default Home ;