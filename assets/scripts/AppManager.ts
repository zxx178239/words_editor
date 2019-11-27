/*
 * @Author: xxZhang
 * @Date: 2019-11-26 19:29:32
 * @Description: 游戏管理者
 */

import { WordsData } from "./data/WordsData";

class AppManager {
    public static readonly Instance = new AppManager();
    private _wordData: WordsData = null;


    getWordsData() {
        if(!this._wordData) {
            this._wordData = new WordsData();
        }
        return this._wordData;
    }
}

export const AppMgr = AppManager.Instance;