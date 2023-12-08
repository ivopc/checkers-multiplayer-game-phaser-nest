import { Injectable } from '@nestjs/common';
import Vector2 from '../entity/vector2.entity';
import gameConfig from '../GameConfig';
import Board from '../entity/board.entity';
import Piece from '../entity/piece.entity';
import Cell from '../entity/cell.entity';
import Move from '../entity/move.entity';
import { $Enums } from "@prisma/client";

@Injectable()
export class BoardService {

    async movePiece (move: Move, board: Board) {
        const fromCell = board.getCellFromPosition(move.from);
        const toCell = board.getCellFromPosition(move.to);
        const piece = fromCell.getPiece() as Piece;
        fromCell.removePiece();
        toCell.setPiece(piece);
        piece.position = move.to;
        /*@todo-db 
        await this.checkersPieceRepository.updatePosition({
            pieceId: piece.id,
            x: move.to.x,
            y: move.to.y
        });*/
    }

    async capturePiece (piece: Piece, board: Board) {
        board.getCellFromPosition(piece.position).removePiece();
        piece.kill();
        /*@todo-db 
        await this.checkersPieceRepository.kill({
            pieceId: piece.id
        });*/
    }

    async makeKing (piece: Piece, board: Board) {
        piece.makeKing();
        /*@todo-db 
        await this.checkersPieceRepository.updateType({
            pieceId: piece.id,
            type: $Enums.CheckersPieceType.King
        });*/
    }
}
