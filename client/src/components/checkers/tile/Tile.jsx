import "./Tile.css"

export default function Tile(props) {
    if (props.number % 2 === 0) {
        return <div className="tile black-tile"><img src={props.piece} /></div>
    } else {
        return <div className="tile red-tile"><img src={props.piece} /></div>
    }
}