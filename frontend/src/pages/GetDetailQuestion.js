import React, { useEffect, useState } from 'react';
import Sidebar from 'src/components/Sidebar/Sidebar';
import {
    useParams
} from "react-router-dom";
import API from 'src/api';

const GetQuestionDetail = (props) => {
    let { id } = useParams();
    const [question, setQuestion] = useState(null)
    useEffect(() => {
        (async () => {
            if(!id) return;
            const results = await API({ url: `/questions/${id}`, method: 'get' });
            setQuestion(results.data)
        })()
    }, [id]);
    return (
        <>
            <Sidebar />
            <main>
                {question ? <div class="container">
                    <h1>Detail question</h1>
                    <form id="frm-create">
                        <div class="form-group">
                            <label for="text">Text</label>
                            <input type="text" name="text" value={question.text} disabled />
                        </div>

                        <div class="form-group">
                            <label>Answers: </label>
                            {
                                question ? 
                                    question.answers.map((e, idx) => (
                                        <div class="answer">
                                            <input type="text" name="answers" value={e} disabled/>
                                            <div>
                                                <input name="correctAnswer" type="radio" disabled id="answer0" checked={idx === question.answersCorrectIndex} /> <label for="answer0">correct</label>
                                            </div>
                                        </div>
                                    ))
                                : ""
                            }
                        </div>

                    </form>
                </div> : ""}
            </main>
        </>
    )
}


export default GetQuestionDetail ;