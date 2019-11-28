/*
 * @Author: xxZhang
 * @Date: 2019-11-27 18:25:18
 * @Description: 成语操作库
 */

import {Words} from "../configs/words";
import { Word1 } from "../configs/word1";
import { Word2 } from "../configs/word2";
import { Word3 } from "../configs/word3";
import { Word4 } from "../configs/word4";

class WordsManager {
    public static readonly Instance = new WordsManager();

    private _allWordsList: any = [];

    private _wordList1: any = [];
    private _wordList2: any = [];
    private _wordList3: any = [];
    private _wordList4: any = [];

    private _curRandList: any = [];

    // fs: typeof fs;

    constructor() {
        // this.fs = require("fs");
        this._initWordsList();
    }

    private _initWordsList() {
        this._allWordsList = Words;
        this._wordList1 = this._getWordIndexs(Word1);
        this._wordList2 = this._getWordIndexs(Word2);
        this._wordList3 = this._getWordIndexs(Word3);
        this._wordList4 = this._getWordIndexs(Word4);
    }

    private _getWordIndexs(INSrc) {
        let des = [];
        for(let i in INSrc) {
            des[INSrc[i]["key"]] = INSrc[i]["indexs"];
        }
        return des;
    }

    public findOneWord(INWordsList): string {
        this._curRandList = [];

        this._curRandList = this._getRandList(INWordsList);

        return this._randomValue();
    }

    private _getRandList(INWordsList) {
        let strList = [];
        let rtn = true;
        for(let i = 0; i < INWordsList.length; ++ i) {
            let curNode = INWordsList[i];
            let labelInfo = curNode.getComponent("NodeGrid").getLabelInfo();
            if(labelInfo !== "") {
                strList.push(labelInfo);
                rtn = false;
            }else {
                strList.push("");
            }
        }

        if(rtn) {
            return this._allWordsList;
        }else {
            return this._calNewRandList(strList);
        }
    }

    private _calNewRandList(INStrList) {
        let allRandList = [];
        allRandList.push(this._wordList1[INStrList[0]]);
        allRandList.push(this._wordList2[INStrList[1]]);
        allRandList.push(this._wordList3[INStrList[2]]);
        allRandList.push(this._wordList4[INStrList[3]]);

        let i = 0;
        let newRand = [];
        for(; i < 4; ++ i) {
            if(!allRandList[i] || allRandList[i] <= 0) {
                ++ i;
            }
            newRand = allRandList[i];
            break;
        }

        for(i = i + 1; i < 4; ++ i) {
            if(i + 1 >= 4) {
                break;
            }

            newRand = this._calTwoUnion(newRand, allRandList[i + 1]);
        }

        if(!newRand) {
            return null;
        }

        let randWords = [];
        for(let i = 0; i < newRand.length; ++ i) {
            randWords.push(this._allWordsList[newRand[i]]);
        }

        return randWords;
    }

    private _calTwoUnion(INSet1, INSet2) {
        if(!INSet2) {
            return INSet1;
        }

        let newSet = [];
        for(let i = 0, j = 0; i < INSet1.length && j < INSet2.length;) {
            if(INSet1[i] < INSet2[j]) {
                ++ i;
            }else if(INSet1[i] === INSet2[j]) {
                newSet.push(i);
            }else {
                ++ j;
            }
        }
        return newSet;
    }

    private _randomValue() {
        if(!this._curRandList) {
            return null;
        }

        let randValue = Math.floor(Math.random() * this._curRandList.length);

        return this._curRandList[randValue];
    }
}

export const WordsLib = WordsManager.Instance;