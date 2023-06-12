import {  useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { loadBoard, updateBoard } from "../store/actions/board.actions";

import { GroupList } from "../cmps/group/GroupList";


export function Board() {
    const boardId = 'b101'
    const board = useSelector(storeState => storeState.boardModule.board)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadBoard(boardId))
	}, [boardId])

   const onBoardUpdate = (board) => {
    dispatch(updateBoard(board))
    // dispatch(loadBoard(boardId))
   }

	if(!board) return <div>loading</div>
    return (
        <section className="board">
            <h1>{board.title}</h1>
            <GroupList onBoardUpdate={onBoardUpdate} board={board} />
        </section>
    )

}