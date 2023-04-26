# Header

This is a component that displays all of the navigation elements at the top of the page.
This component should be displayed first when creating any new page.
One important thing to note is that the CSS for the header and footer components rely on them being separate from the main content of a page.
In order to achieve this, when creating your new component, first add the header, then a div with the classname="content-wrap" tag, and then the footer component.
Your page's UI elements will go inside of the "content-wrap" div.
See an example below:

    import Header from "../Header"
    import Footer from "../Footer"

    function myComponent() {
        return(
            <div>
                <Header /> //ADD HEADER BEFORE CONTENT WRAP DIV
                <div className="content-wrap">
                    //YOUR PAGE CONTENT GOES HERE
                </div>
                <Footer /> //ADD FOOTER AFTER CONTENT WRAP DIV
            </div>
        )
    }

    export default myComponent

# Footer

This component functions identically to the header, except it displays content at the bottom of the page.
See the header code example for how to implement the footer on a new page.

# Modal

This is a component that acts as a pop-up.
This is useful for confirmation dialogs, success or error messages, or any scenario when a pop-up would make more sense than dynamic page content.
The modal needs a prop in state in the parent component/page that will track whether or not the prop is shown.
The modal can take in a series of UI elements as children that will be displayed on the pop-up window.
One thing that you won't need to pass to the modal is a button to close the pop-up. This is shown on the modal by default.
The modal display prop can be tied to a button press, or any piece of logic that you'd like. This means that the modal can be configured to display automatically based on any custom logic that you define, say for instance if a user fails to login or if a game of checkers ends.


    import Modal from "../Modal"

    function myPage() {

        const [modalIsOpen, setModalIsOpen] = useState(false) //TRACKS WHETHER THE MODAL IS SHOWN

        function openModal() {
            setModalIsOpen(true);
        }

        function closeModal() {
            setModalIsOpen(false);
        }

        return(
            <button onClick={openModal}>Open Pop-Up</button> //BUTTON TO SHOW THE MODAL
            <Modal isOpen={modalIsOpen} closeModal={closeModal}>
                //MODAL CHILDREN GO HERE
            </Modal>
        )
    }

    export default myPage

# Icons

We use the React Icons package in order to load a wide variety of icons on our pages.
Adding icons to your page is really simple.
First, visit this page and find the icon that you want to add: https://react-icons.github.io/react-icons/
Second, click on the icon on that page to copy the icons code.
Third, import the icon on the page that you want to add it it. The first two letters of the icon give a hint as to what package you should import from.
Fourth, add the icon as a standalone HTML element where you want.
Icons can be nested in just about any other HTML element so get creative with them!
For example, if I wanted to add a robot icon from the Font Awesome package, I would use this code:

    import Header from "../Header"
    import Footer from "../Footer"

    import { FaRobot } from "react-icons/fa"; //Import the icon.

    const Robot = () => {
        return (
            <div>
                <Header />
                <div className='content-wrap'>
                    <h1>Robot Icon</h1>
                    <FaRobot/> //The icon as an HTML element.
                </div>
                <Footer />
            </div>
        )
    }

    export default Robot

# Leaderboard Display

This is a custom UI element that you can use on a page if you just want to display the current Leaderboard without all of the other elements from the Leaderboard page.
All you need to do is to import the Leaderboard Display component and then add it to the page as its own HTML element.
An example of how to integrate the Leaderboard Display component can be found on the Landing.jsx page.

    import React from 'react'
    import Header from '../Header'
    import Footer from '../Footer'
    import '../../styles/landing.scss'
    import LeaderboardDisplay from '../LeaderboardDisplay' //IMPORT THE LEADERBOARD DISPLAY COMPONENT
    import { FaRobot } from "react-icons/fa";
    import { GiCrossedSwords, GiRank3 } from "react-icons/gi";
    import { ImStatsDots } from "react-icons/im"

    function Landing() {

        return (
            <div>
                <Header />
                <div className='content-wrap landing-page'>
                    <h1>Welcome To Checkers!</h1>
                    <p>Please sign to access all functions on the site.</p>
                    <a href="/Login"><button className='large-button'>Login</button></a>
                    <div className='flex-container'>
                        <div className='flex-child'>
                            <h4>Features:</h4>
                            <ul className='landing-page-list'>
                                <li><FaRobot/> Play Vs. AI</li>
                                <li><GiCrossedSwords/> Play online via matchmaking.</li>
                                <li><GiRank3/> Track your account stats and matchmaking rank.</li>
                                <li><ImStatsDots/> Climb the leaderboard.</li>
                            </ul>
                            <br/>
                            <img src="/assets/demo-board.png" alt="Demo Checkers Board" />
                        </div>
                        <div className='flex-child'>
                            <h4>Current Leaderboard:</h4>
                            <LeaderboardDisplay /> //ADD THE LEADERBOARD DISPLAY AS AN HTML ELEMENT.
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    export default Landing

# Sound Effects

We use the use-sound package in order to easily load and play sfx on our pages.
Learn more here: https://www.joshwcomeau.com/react/announcing-use-sound-react-hook/
In order to use sfx on pages, first import the package and your sound file.
Then define an executable variable that plays the imported sound file.
There are several options that you can define when playing the sound file.
Finally, call the variable that you defined wherever/whenever you would like the sound to play.

    import { React, useState } from 'react'
    import Header from '../Header'
    import Footer from '../Footer'
    import Checkers from "../checkers/Checkers"
    import useSound from 'use-sound' //IMPORT USE-SOUND PACKAGE
    import gameStartSFX from "../../sfx/start.mp3" // IMPORT SOUND FILE

    const Game = () => {

        const [playStartSFX] = useSound( //DEFINE PLAY SOUND VAR
            gameStartSFX,
            { volume: 0.4 } //SET SOUND OPTIONS
        )

        const [color, setColor] = useState(undefined)

        function setColorRed() {
            setColor(0)
        }

        function setColorBlack() {
            setColor(1)
        }

        if (color === undefined) {
            return (
                <div>
                    <Header />
                    <div className='content-wrap'>
                        <h1> Choose Your Color</h1>
                        <button onClick={setColorRed}>Play as Red</button>
                        <button onClick={setColorBlack}>Play as Black</button>
                    </div>
                    <Footer />
                </div>
            )
        } else {
            playStartSFX() //PLAY THE SOUND
            return (
                <div>
                    <Header />
                    <div className='content-wrap'>
                        <br/>
                        <Checkers gameMode={0} difficulty={0} gameID={'empty'} color={color} />
                    </div>
                    <Footer />
                </div>
            )
        }
    }

    export default Game
