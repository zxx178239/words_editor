import { WordsData } from "./data/WordsData";

/*
 * @Author: xxZhang
 * @Date: 2019-11-26 19:29:32
 * @Description: 游戏管理者
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class AppManager extends cc.Component {

    private _wordData: WordsData = null;

    start () {

    }

    getWordsData() {
        if(!this._wordData) {
            this._wordData = new WordsData();
        }
        return this._wordData;
    }
}
