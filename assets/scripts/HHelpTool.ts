/*
 * @Author: xxZhang
 * @Date: 2019-11-26 19:52:16
 * @Description: 工具类
 */
export class HHelpTool {

    /**
     * @description: 是否满足行，默认连续
     * @param : 
     * @return : 
     */
    public static isEnoughH(INLengthList) {
        for(let i = 0; i < INLengthList.length; ++ i) {
            INLengthList[i] = Math.floor(INLengthList[i] / 9);
        }
        return this.isAllEqual(INLengthList);
    }

    /**
     * @description: 是否满足列，默认连续
     * @param : 
     * @return : 
     */
    public static isEnoughV(INLengthList) {
        for(let i = 0; i < INLengthList.length; ++ i) {
            INLengthList[i] = Math.floor(INLengthList[i] % 9);
        }
        return this.isAllEqual(INLengthList);
    }

    /**
     * @description: 判断是否存在不同的值
     * @param : 
     * @return : 
     */
    public static isAllEqual(INLengthList) {
        let minValue = 100;
        let maxValue = -1;
        for(let i = 0; i < INLengthList.length; ++ i) {
            if(INLengthList[i] < minValue) {
                minValue = INLengthList[i];
            }

            if(INLengthList[i] > maxValue) {
                maxValue = INLengthList[i];
            }
        }

        return minValue === maxValue;
    }
}