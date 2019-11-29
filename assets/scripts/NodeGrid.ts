/*
 * @Author: xxZhang
 * @Date: 2019-11-26 19:11:47
 * @Description: 格子节点
 */

import { GRID_STATUS } from "./ConstDefine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NOdeGrid extends cc.Component {

    @property(cc.Node)
    spriteMouseSelect: cc.Node          = null;

    @property(cc.Node)
    spriteDeleteSelect: cc.Node         = null;

    @property(cc.Label)
    labelWord: cc.Label                 = null;

    private _status: number             = GRID_STATUS.EMPTY;
    private _wordNums: number           = 0;

    start () {
        this._status = GRID_STATUS.EMPTY;
    }

    changeMouseSelect(INFlag) {
        if(INFlag) {
            ++ this._wordNums;
        }else {
            -- this._wordNums;
        }

        if(this._wordNums <= 0 && !INFlag) {
            this.spriteMouseSelect.active = false;
        }else {
            this.spriteMouseSelect.active = true;
        }
    }

    changeDeleteSelect(INFlag) {
        this.spriteDeleteSelect.active = INFlag;
    }

    setLabelInfo(INWord) {
        this.labelWord.string = INWord;

        if(INWord === "") {
            this._status = GRID_STATUS.EMPTY;
        }else {
            this._status = GRID_STATUS.HAS_CHAR;
        }
    }

    getLabelInfo() {
        return this.labelWord.string;
    }

    /**
     * @description: 删词功能调用
     * @param : 
     * @return : 
     */
    deleteWord() {
        -- this._wordNums;
        if(this._wordNums > 0) {
            return;
        }
        this.resetGrid();
    }

    /**
     * @description: 去字功能调用
     * @param : 
     * @return : 
     */
    removeChar() {
        this.labelWord.string = "";
        this._status = GRID_STATUS.REMOVE_CHAR;
    }

    resetGrid() {
        this.spriteMouseSelect.active = false;
        this.spriteDeleteSelect.active = false;
        this.labelWord.string = "";
        this._wordNums = 0;
    }

    getGridStatus() {
        return this._status;
    }
}
