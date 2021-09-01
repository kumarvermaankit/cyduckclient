import React, { useEffect,useState } from "react";
// import FAQ from './FAQ';
// import Header from './Header';
import './Faq.css';

function FAQ_APP(){


    const [faqs, setfaqs] = useState([
        {
            question: 'What topics can I ask about here?',
            answer: <p className="ans">CyDuck is for professional and enthusiast programmers, people who write code because they love it. We feel the best CyDuck questions have a bit of source code in them, but if your question generally covers… 
            <br />
            - a specific programming problem, or<br/>
            - a software algorithm, or<br/>
            - software tools commonly used by programmers; and is<br/>
            - a practical, answerable problem that is unique to software development<br/>
            …then you’re in the right place to ask your question!
            </p>,
            cansee:false
        },
        {
            question: 'How to ask a question?',
            answer: <p className="ans"> <b>Step1:</b> visit <b><a style={{color:"black"}} href="/file" >ask question</a></b>
            <br/><b>Step2:</b> Write a title as a summary of your doubt.
            <br/><b>Step3:</b> Write a description of your problem/doubt/error with code and links or you can use a screen recording option and explain your question as in your words or you can use both.
            <br/><b>Step4:</b> Add tags and keywords related to your question.
            <br/><b>Step5:</b> Post question with your price batch<b>batch tag link</b>
            </p>,
            cansee:false
        },
        {
            question: 'What type of questions should I avoid asking?',
            answer: <p className="ans">First, make sure that your question is <b>on-topic</b> for this site.<br/>
            - You should only ask practical, answerable questions based on actual problems that you face. Chatty, open-ended questions diminish the usefulness of our site and push other questions off the front page.
            <br/>
            - Your questions should be reasonably scoped. If you can imagine an entire book that answers your question, you’re asking too much.
            <br/>
            - If your motivation for asking the question is “I would like to participate in a discussion about ______”, then you should not be asking here. However, if your motivation is “I would like others to explain ______ to me”, then you are probably OK.
            </p>,
            cansee:false
        },
        {
            question: 'How do I ask a good question?',
            answer: <p className="ans"><b>Search, and research</b>...and keep track of what you find. Even if you don't find a useful answer elsewhere on the site, including links to related questions that haven't helped can help others in understanding how your question is different from the rest.
            <br/>
            - Write a title that summarizes the specific problem<br/>
            - Introduce the problem before you post any code<br/>
            - Help others reproduce the problem<br/>
            - Include all relevant tags<br/>
            - Proof-read before posting!<br/>
            - Post the question and respond to feedback
            </p>,
            cansee:false
        },
        {
            question: 'What should I do when someone answer my question',
            answer: <p className="ans">Decide if the answer is helpful, and then...
            <br/>
            Vote on it (if you have earned the appropriate voting privilege). Vote up answers that are helpful and well-researched, and vote down answers that are not. Other users will also vote on answers to your question.<br/>
             <b>Please do not add a comment on your question or on an answer to say "Thank you".</b> Comments are meant for requesting clarification, leaving constructive criticism, or adding relevant but minor additional information – not for socializing. If you want to say "thank you," like that person's answer, or simply pay it forward by providing a great answer to someone else's question.
            </p>,
            cansee:false
        },
        {
            question: 'How to answer a question?',
            answer: <p className="ans"><b>Step1:</b> visit <b>answer_question_page_link</b>
            <br/><b>Step2:</b> Click on answer on question you are about to answer
            <br/><b>Step3:</b> Write your solution with your code and links or you can use a screen recording option and explain your solution as in your words or you can use both.
            <br/><b>Step4:</b> Submit your solution.
            </p>,
            cansee:false
        },
        {
            question: 'What should I do when no one answer my question', 
            answer: <p className="ans">First, make sure you’ve <b>asked a good question.</b> To get better answers, you may need to put additional effort into your question. Edit your question to provide status and progress updates. Document your own continued efforts to answer your question. This will naturally bump your question to the homepage and get more people interested in it.
            <br/>
            If, despite your best efforts, you feel questions aren’t getting good answers, you can help by <b>offering a bounty</b> on any question more than two days old.
            </p>,
            cansee:false
        }
    ]);


    const toggleFAQ = index => {
        setfaqs(faqs.map((faq,i) => {
            if(i==index){
                faq.cansee=!faq.cansee
            } 
            return faq;
        }))
    }

    function FAQ({faq, index, toggleFAQ}){
        return(
            
            <div
                className={"faq"}
                style={{cursor: "pointer"}}
                key={index}
                onClick={()=>toggleFAQ(index)}
            >
                <div className="faq-questions">
                    {faq.question}
                </div>       
                {faq.cansee?<div className="faq-answer">
                    {faq.answer}
                </div>:null}
            </div>
        );
    }

    return(
        <div className="faq">
        <header>
            <h1> FAQ Page </h1>
        </header>
            <div className="faqs">
                {faqs.map((faq,i)=> (
                    <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ} />
                ))}
            </div>
        </div>
    );
}

export default FAQ_APP;


// functioning of faq

// import React, { useEffect,useState } from "react";



// export default FAQ

// Header.js
// import React from 'react';

// function Header() {
//     return(
//         <header>
//             <h1> FAQ Page </h1>
//         </header>
//     )
// }

// export default Header