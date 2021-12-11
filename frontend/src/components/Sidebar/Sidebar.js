import React, { useEffect, useState } from 'react';
import '../../styles/style.css';
const Sidebar = (props) => {
    return (
        <>
            <aside>
                <h3>WPR</h3>
                <header>
                    <h2>HTML Quiz</h2>
                </header>

                <ul>
                    <li><a href="/"><i class="far fa-question-circle"></i> All questions</a></li>
                    <li><a href="/create/question"><i class="far fa-plus"></i> New question</a></li>
                </ul>
            </aside>
        </>
    )
}


export default Sidebar ;