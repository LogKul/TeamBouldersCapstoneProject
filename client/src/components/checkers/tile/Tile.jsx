import "./Tile.scss"
import React from "react"
import PropTypes from "prop-types"

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
}

Tile.propTypes = {
    piece: PropTypes.string,
    number: PropTypes.number
}