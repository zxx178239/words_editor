import os
#获取目标文件夹的路径
filedir = 'out'
#获取当前文件夹中的文件名称列表
filenames=os.listdir(filedir)
#打开当前目录下的result.json文件，如果没有则创建
f=open('words.txt','w')

def isEnough(INStr):
    n = 0
    for c in INStr:
        if ord(c) > 255:
            n = n + 1

    if n == 4:
        return True
    else:
        return False


#先遍历文件名
for filename in filenames:
    filepath = filedir+'/'+filename
    #遍历单个文件，读取行数
    for line in open(filepath):
        if isEnough(line):
            f.writelines(line)
        # f.write('\n')
#关闭文件
f.close()