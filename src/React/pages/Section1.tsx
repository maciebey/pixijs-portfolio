import * as React from "react";

const bodyText = `
Hello! I'm a Full Stack Developer with a proven track record of delivering impactful solutions across various industries. With a strong foundation in TypeScript, Python, and containerization, I thrive in creating innovative micro-services that drive business growth. Let's work together to build something great!
`

export const makeLink = (text: string, url: string) => {
    return (
        <a href={url} target="_blank" rel="noreferrer">{text}</a>
    )
}

const Section1 = () => {
    return (
        <div style={{'display': 'inline-block'}}>
            <h1>Hi, I'm Macie Bey</h1>
            <p>{bodyText}</p>
            <p>This portfolio site is under {makeLink('active development', 'https://github.com/maciebey/pixijs-portfolio')}! Check back for more soon!</p>
            <p>You can contact or find me at:</p>
            <ul>
                <li>
                    <a href="https://github.com/maciebey" target="_blank" rel="noreferrer">Github</a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/maciebey/" target="_blank" rel="noreferrer">LinkedIn</a>
                </li>
                <li>
                    <a href="mailto:maciebey@gmail.com">maciebey@gmail.com</a>
                </li>
            </ul>
        </div>
    );
}



export default Section1;