/*
 * @Author: xxZhang
 * @Date: 2019-11-26 19:25:48
 * @Description: 触摸层
 */

import {HHelpTool} from "./HHelpTool";
import { WordsLib } from "./WordsLib";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LayerTouch extends cc.Component {

    private _isPress: boolean           = false;

    private _curTouchIndexList: any     = [];               // 当前触摸的索引的列表

    private _isRightSelect: boolean     = false;            // 是否选择的正确

    start () {
        this.registetTouchListener();
    }

    onDestroy() {
        this.removeTouchListener();
    }

    registetTouchListener() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    removeTouchListener() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    onTouchStart(event) {
        this._isPress = false;
        this._isRightSelect = false;
        this._curTouchIndexList = [];
    }

    onTouchMove(event) {
        let localPos = this.node.convertToNodeSpaceAR(event.getLocation());

        let hIndex = Math.abs(Math.floor(localPos.x / 80));
        let vIndex = Math.abs(Math.floor(localPos.y / 80)) - 1;

        let oneDimension = hIndex + vIndex * 9;
        
        this.insertToList(oneDimension);
    }

    onTouchEnd(event) {
        if(this._curTouchIndexList.length < 4) {

        }else {
            this._curTouchIndexList = this._curTouchIndexList.slice(0, 4);

            let isH =  HHelpTool.isEnoughH(this._curTouchIndexList.slice(0));
            let isV = HHelpTool.isEnoughV(this._curTouchIndexList.slice(0));

            if(isH || isV) {
                // console.log("enough");
                this.showWord();
            }else {
                this.showAndHide();
            }
        }
    }

    insertToList(INValue) {
        if(this._curTouchIndexList.indexOf(INValue) === -1) {
            this._curTouchIndexList.push(INValue);
        }
    }

    showWord() {
        this.recordNodeWords();
        async.series([
            (cb) => {
                this.changeMouseSelect(cb);
            },
            (cb) => {
                this.showCurWord();
            }
        ])
    }

    showAndHide() {
        async.series([
            (cb) => {
                this.changeMouseSelect(cb);
            },
            (cb) => {
                this.scheduleOnce(() => {
                    this.changeMouseSelect(cb, false);
                }, 1);
            }
        ])
    }

    changeMouseSelect(INCallback, INFlag: boolean = true) {
        for(let i = 0; i < this._curTouchIndexList.length; ++ i) {
            let gridScript = this.node.children[this._curTouchIndexList[i]].getComponent("NodeGrid");
            gridScript.changeMouseSelect(INFlag);
        }
        INCallback && INCallback();
    }

    recordNodeWords() {
        let curAllNodes = [];
        for(let i = 0; i < this._curTouchIndexList.length; ++ i) {
            curAllNodes.push(this.node.children[this._curTouchIndexList[i]]);
        }

        app.getWordsData().pushWord(curAllNodes);
    }

    showCurWord() {
        console.log("show cur words");

        let newWords = WordsLib.findOneWord(app.getWordsData().getLastWord());

        if(!newWords) {
            let lastWordList = app.getWordsData().getAndDeleteLastWord();
            this.scheduleOnce(() => {
                this.changeMouseSelect(null, false);
            }, 1);
            return;
        }

        for(let i = 0; i < this._curTouchIndexList.length; ++ i) {
            let gridScript = this.node.children[this._curTouchIndexList[i]].getComponent("NodeGrid");
            gridScript.setLabelInfo(newWords[i]);
        }
    }
}
