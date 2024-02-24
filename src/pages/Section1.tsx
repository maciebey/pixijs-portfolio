import * as React from "react";

const bodyText = `
Welcome! I'm a passionate Full Stack Developer with a knack for crafting seamless,
user-centric solutions. With a robust blend of front-end and back-end expertise,
I bring ideas to life, transforming complex problems into intuitive, accessible,
and innovative experiences. My toolbox includes Typescript, React, Node.js, and
more, enabling me to build applications from the ground up. Whether it's a
responsive web design or a scalable API, I'm committed to delivering high-quality,
maintainable code that powers digital experiences. Let's collaborate and create
something extraordinary together!
`

const Section1 = () => {
    return (
        <div>
            <h1>Hi, I'm Macie Bey</h1>
            <p>{bodyText}</p>
            <p>This portfolio site is under active development. Check back for more soon!</p>
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