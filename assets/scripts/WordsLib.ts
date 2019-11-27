/*
 * @Author: xxZhang
 * @Date: 2019-11-27 18:25:18
 * @Description: 成语操作库
 */

/// <reference path="../typings/index.d.ts" />

import {Words} from "../configs/words";

class WordsManager {
    public static readonly Instance = new WordsManager();

    private _allWordsList: any = [];
    // fs: typeof fs;

    constructor() {
        // this.fs = require("fs");
        this._initWordsList();
    }

    private _initWordsList() {
        this._allWordsList = Words;
        // fs.readFile("../configs/word.txt", (err, data) => {
        //     console.log("data: ", data);
        // });
    }

    public findOneWord(INWordsList?): string {
        return "哀而不伤";
        let newWord: string = "";

        return newWord;
    }
}

export const WordsLib = WordsManager.Instance;