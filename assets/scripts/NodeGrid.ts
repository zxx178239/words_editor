/*
 * @Author: xxZhang
 * @Date: 2019-11-26 19:11:47
 * @Description: 格子节点
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class NOdeGrid extends cc.Component {

    @property(cc.Node)
    spriteMouseSelect: cc.Node          = null;

    @property(cc.Node)
    spriteDeleteSelect: cc.Node         = null;

    @property(cc.Label)
    labelWord: cc.Label                 = null;

    private _status: number             = -1;
    private _wordNums: number           = 0;

    start () {

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
    }

    getLabelInfo() {
        return this.labelWord.string;
    }

    deleteWord() {
        -- this._wordNums;
        if(this._wordNums > 0) {
            return;
        }
        this.resetGrid();
    }

    resetGrid() {
        this.spriteMouseSelect.active = false;
        this.spriteDeleteSelect.active = false;
        this.labelWord.string = "";
        this._wordNums = 0;
    }
}
