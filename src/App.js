import './App.css';
import Header from "./components/Header";
import Board from "./components/Board";
import {useEffect, useState} from "react";

function App() {

    const [board, setBoard] = useState(Array(24).fill(null).map(el =>
        ({
            id: Math.random().toString(),
            img: null,
            isOpen: false
        })))
    const [history, setHistory]=useState([])
    const [winner, setWinner]=useState(false)
    const[resultMove, setResultMove]=useState([])


    const emojy = ['🐬', '🦕', '🏄', '⛵️', '🌺', '🌴', '🎆', '⚙️', '❤️‍', '🔥', '🇦🇽', '🚞', '🐤'];
    const emojyBoard = () => {
        const newBoard = board.map(el =>
            ({...el, img:null, isOpen:false}))
for (let i = 0; i<emojy.length; i++){
    for ( let g = 1; g<=2; g++ ){
        let index;
        do { index = Math.trunc(Math.random()*24) }
        while (newBoard[index].img!==null)
        newBoard[index].img = emojy[i]
    }
}
setBoard(newBoard)
    }

useEffect(()=>{
    emojyBoard()
},[])

    const openCard = (id, img) => {
        const newBoard = board.map((el)=>
           (id===el.id)
        ? {...el, isOpen:true}
        : el)
        setBoard(newBoard)
        setHistory([...history, img])
    }
    const checkMove = () => {
        if (history.length % 2 === 0 && history[history.length - 1] !== history[history.length - 2]){
            const newBoard = board.map((el)=>
            el.img === history[history.length - 1] || el.img === history[history.length - 2] ? {...el, isOpen:false} : el)
            setBoard(newBoard)
        }
    }

    useEffect(()=>{
        setTimeout(()=>{
            checkMove()
        }, 400)
    },[history])

    const calculateWinner = () => {
        const win = board.every((el)=>
        el.isOpen)
        setWinner(win)
        if (win){
            setResultMove([...resultMove, history.length/2])
        }
    }

    useEffect(()=>{
        if(history.length % 2 === 0){
            calculateWinner()
        }
    }, [history])
    const restart = () => {
        emojyBoard();
        setWinner(false)
        setHistory([])
    }


    useEffect(()=>{
        setTimeout(()=>{restart()}, 5000)
    },[resultMove])
    

    return (
        <div className="App">
            <Header/>
            <Board
                board={board}
                setBoard={setBoard}
                openCard={openCard}/>

            {winner &&
            <h2 style={{color:'lightcoral'}}>
                Congratulation, You are winner,
                You won in {history.length/2} moves!
                {resultMove.length > 0 &&
                resultMove.map(el=>
                <li>{el}</li>)}
            </h2>}
        </div>
    );
}

export default App;
