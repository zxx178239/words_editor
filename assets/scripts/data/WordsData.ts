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
            return this._totalWords[this._totalWords.length - 1];
        }else {
            return null;
        }
    }

    getAndDeleteLastWord() {
        if(this._totalWords.length > 0) {
            let lastWords = this._totalWords[this._totalWords.length - 1];
            this._totalWords.splice(this._totalWords.length - 1, 1);

            return lastWords;
        }else {
            return null;
        }
    }

    findInTotalWords(INWords) {
        for(let i = 0; i < this._totalWords.length; ++ i) {
            if(this._totalWords[i] === INWords) {
                return true;
            }
        }
        return false;
    }

    clearWords() {
        this._totalWords = [];
    }
}
