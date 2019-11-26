/*
 * @Author: xxZhang
 * @Date: 2019-11-26 19:18:43
 * @Description: 
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class LayoutGrids extends cc.Component {

    @property(cc.Prefab)
    prefabGrid: cc.Prefab           = null;

    start () {
        this.initUI();
    }

    initUI() {
        for(let i = 0; i < 81; ++ i) {
            let newNode = cc.instantiate(this.prefabGrid);
            newNode.parent = this.node;
        }
    }
}
