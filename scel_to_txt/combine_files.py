import os
#获取目标文件夹的路径
filedir = 'out'
#获取当前文件夹中的文件名称列表
filenames=os.listdir(filedir)
#打开当前目录下的result.json文件，如果没有则创建
f=open('words.ts','w')
wordList1 = {}
wordList2 = {}
wordList3 = {}
wordList4 = {}

index = 0


def isEnough(INStr):
    n = 0
    for c in INStr:
        if ord(c) > 255:
            n = n + 1

    if n == 4:
        return True
    else:
        return False

def is_has_value(INWordList, INWord, INIndex):
    if INWordList.get(INWord[INIndex], "None") != "None":
        INWordList[INWord[INIndex]].append(index)
    else:
        INWordList[INWord[INIndex]] = [index]

def create_invert_index(INWord):
    is_has_value(wordList1, INWord, 0)
    is_has_value(wordList2, INWord, 1)
    is_has_value(wordList3, INWord, 2)
    is_has_value(wordList4, INWord, 3)


f.writelines("export const Words = [\n")
#先遍历文件名
for filename in filenames:
    filepath = filedir+'/'+filename
    #遍历单个文件，读取行数
    for line in open(filepath):
        if isEnough(line):
            line = line.replace("\n", "")
            line = line.replace("\r", "")
            create_invert_index(line)
            line = "\"" + line + "\","
            f.writelines(line)
            index = index + 1
        # f.write('\n')
f.writelines("]")
#关闭文件
f.close()

f = open("word1.ts", "w")
f.writelines("export const Word1 = [\n")
for (k, v) in wordList1.items():
    str1 = "{ \"key\": \"" + k + "\", "
    str1 = str1 + "\"indexs\": ["
    for i in v:
        str1 = str1 + str(i) + ", "
    str1 = str1 + "] },"
    # print(str1)
    f.writelines(str1)

f.writelines("]")
f.close()

f = open("word2.ts", "w")
f.writelines("export const Word2 = [\n")
for (k, v) in wordList2.items():
    str1 = "{ \"key\": \"" + k + "\", "
    str1 = str1 + "\"indexs\": ["
    for i in v:
        str1 = str1 + str(i) + ", "
    str1 = str1 + "] },"
    # print(str1)
    f.writelines(str1)

f.writelines("]")
f.close()

f = open("word3.ts", "w")
f.writelines("export const Word3 = [\n")
for (k, v) in wordList3.items():
    str1 = "{ \"key\": \"" + k + "\", "
    str1 = str1 + "\"indexs\": ["
    for i in v:
        str1 = str1 + str(i) + ", "
    str1 = str1 + "] },"
    # print(str1)
    f.writelines(str1)

f.writelines("]")
f.close()

f = open("word4.ts", "w")
f.writelines("export const Word4 = [\n")
for (k, v) in wordList4.items():
    str1 = "{ \"key\": \"" + k + "\", "
    str1 = str1 + "\"indexs\": ["
    for i in v:
        str1 = str1 + str(i) + ", "
    str1 = str1 + "] },"
    # print(str1)
    f.writelines(str1)

f.writelines("]")
f.close()