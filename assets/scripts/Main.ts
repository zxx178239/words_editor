
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
}
