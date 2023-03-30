# Header

This is a component that displays all of the navigation elements at the top of the page.
This component should be displayed first when creating any new page.
One important thing to note is that the CSS for the header and footer components rely on them being separate from the main content of a page.
In order to achieve this, when creating your new component, first return the header, then a div with the classname="content-wrap" tag, and then the footer component.
Your page's UI elements will go inside of the "content-wrap" div.
See an example below:

    import Header from "../Header"
    import Footer from "../Footer"

    function myComponent() {
        return(
            <div>
                <Header />
                <div className="content-wrap">
                    //YOUR PAGE CONTENT GOES HERE
                </div>
                <Footer />
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
