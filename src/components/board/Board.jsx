import CARDS from "../../config"
import CARDS_COPY from '../../configCopy'
import s from './Board.module.css'
import Cards from "../cards/Cards"


const Board = ({dataArray, setData}) => {
 
    return (
        <div className={s.board}>
            {Object.values(CARDS).map(card => {
                return (
                    <div className={s.card} key={CARDS[card]}>
                        <span className={s.CardName}>{CARDS_COPY[card]}</span>
                        <Cards card={card} dataArray={dataArray} setData={setData} />
                    </div>
                )
            })}
        </div>
    )
}

export default Board