import "./Tile.css"

export default function Tile(props) {
    let piece = props.piece
    if (props.number % 2 === 0) {
        return (
            <div className="tile black-tile">
                {props.piece && <div style={{backgroundImage: 'url('+piece+')'}} className="checkers-piece" ></div>}
            </div>
        )
    } else {
        return (
            <div className="tile red-tile">
                {props.piece && <div style={{backgroundImage: 'url('+piece+')'}} className="checkers-piece" ></div>}
            </div>
        )
    }
<<<<<<< HEAD
=======
}

Tile.propTypes = {
    piece: PropTypes.string,
    number: PropTypes.number
>>>>>>> 77edc9824c8146e8d6f12eb0617a13278f0e8786
}