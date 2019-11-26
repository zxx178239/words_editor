/*
 * @Author: xxZhang
 * @Date: 2019-11-26 19:30:50
 * @Description: 成语数据
 */

export class WordsData {

    private _totalWords: any               = [];


    pushWord(INWord) {
        this._totalWords.push(INWord);
    }

    popWord() {
        this._totalWords.pop();
    }

    getLastWord() {
        if(this._totalWords.length > 0) {
            this._totalWords[this._totalWords.length - 1];
        }else {
            return null;
        }
    }
}
