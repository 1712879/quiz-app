import React, { useEffect, useState } from 'react';
import Sidebar from 'src/components/Sidebar/Sidebar';
import '../styles/style.css';
import API from 'src/api';
import {
    useHistory
} from "react-router-dom";
const CreateQuestion = (props) => {
    const history = useHistory();
    const [text, setText] = useState('');
    const [answersCorrectIndex, setAnswersCorrectIndex] = useState(-1);
    let [answers, setAnswers] = useState([]);


    const onAddAnswerChoice = () => {
        let answersNew = answers.concat(['']);
        setAnswers(answersNew)
    }

    const removeAnswerChoiceById = (idx) => {
        let answersOri = [...answers];
        let correct = answersOri[answersCorrectIndex];
        let answersNew = answersOri.splice(idx, 1);
        setAnswers(answersOri)
        let newAnswersCorrectIndex = answersOri.indexOf(correct)
        newAnswersCorrectIndex = newAnswersCorrectIndex == -1 ? -1 : newAnswersCorrectIndex
        setAnswersCorrectIndex(newAnswersCorrectIndex)
    }

    const onChangeValueAnswer = (e, idx) => {
        if (!answers[idx] && typeof (answers[idx]) !== 'string') return;
        let answersOri = answers;
        answersOri[idx] = e.target.value;
        setAnswers([...answersOri])
    }

    const onSubmit = async (evt) => {
        evt.preventDefault();
        let body = {
            text,
            answers,
            correctAnswer:answersCorrectIndex
        }
        console.log(body)
        const results = await API({
            method: 'post',
            url: `/questions`,
            data: body
        })
        if (results && results.status && results.status == 200) {
            alert("success")
            return history.push("/");
        } else {
            alert("failed")
        }
    }

    return (
        <>
            <Sidebar />
            <main>
                <div class="container">
                    <h1>Edit question</h1>
                    <form id="frm-create">
                        <div class="form-group">
                            <label for="text">Text</label>
                            <input type="text" name="text" value={text} onChange={evt => setText(evt.target.value)} />
                        </div>

                        <div class="form-group">
                            <label>Answers: </label>
                            {
                                answers ?
                                    answers.map((e, idx) => (
                                        <div key={`${idx}`} class={"answer answer" + idx} >
                                            <input type="text" name={"answer" + idx} value={e} onChange={(evvt) => onChangeValueAnswer(evvt, idx)} />
                                            <div onClick={e => setAnswersCorrectIndex(idx)}>
                                                <input name="correctAnswer" type="radio" value={idx === answersCorrectIndex ? "1" : "0"} id={"answer" + idx} checked={idx === answersCorrectIndex} /> <label for={"answer" + idx}>correct</label>
                                            </div>
                                            <button type="button" class="btn btn-orange" onClick={e => removeAnswerChoiceById(idx)}><i class="fas fa-times"></i> Remove</button>
                                        </div>
                                    ))
                                    : ""
                            }
                            <div class="text-right">
                                <button type="button" class="btn btn-blue" onClick={onAddAnswerChoice}><i class="fas fa-plus"></i> Add</button>
                            </div>
                        </div>

                        <div class="actions">
                            <button class="btn btn-blue btn-large" onClick={onSubmit}><i class="fas fa-save"></i> Save</button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}


export default CreateQuestion;