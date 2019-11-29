import { GRID_STATUS } from "./ConstDefine";

/*
 * @Author: xxZhang
 * @Date: 2019-11-27 19:03:47
 * @Description: 主场景脚本
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    @property(cc.Node)
    nodeLayoutGrids: cc.Node            = null;

    start () {

    }

    onPressClear() {
        this.nodeLayoutGrids.getComponent("LayoutGrids").clearAllGrids();

        app.getWordsData().clearWords();
    }

    /**
     * @description: 删除最后一个词
     * @param : 
     * @return : 
     */
    onPressDeleteWord() {
        this.nodeLayoutGrids.getComponent("LayoutGrids").deleteLastWord();
    }

    /**
     * @description: 去字
     * @param : 
     * @return : 
     */
    onPressRemoveChar() {
        let totalWords = app.getWordsData().getAllWords();

        for(let i = 0; i < totalWords.length; ++ i) {
            let curWord = totalWords[i];

            this._removeChars(curWord);
        }
    }

    private _removeChars(INWord) {
        let emptyNums = 0;
        // 1. 确定当前空的数量
        for(let i = 0; i < INWord.length; ++ i) {
            let nodeGrid = INWord[i];

            if(nodeGrid.getComponent("NodeGrid").getGridStatus() === GRID_STATUS.REMOVE_CHAR) {
                emptyNums ++;
            }
        }
        
        let randNums = 2 - emptyNums;

        while(randNums > 0) {
            let randValue = Math.floor(Math.random() * 4);
            if(INWord[randValue].getComponent("NodeGrid").getGridStatus() !== GRID_STATUS.REMOVE_CHAR) {
                INWord[randValue].getComponent("NodeGrid").removeChar();
                randNums --;
            }
        }
    }
}
