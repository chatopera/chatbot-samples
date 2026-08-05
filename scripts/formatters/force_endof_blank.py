#!/usr/bin/env python
# -*- coding: utf-8 -*-
#===============================================================================
#
# Copyright (c) 2020 <> All Rights Reserved
#
# 处理中文之间的空格，如果两个中文之间有空格，去掉该空格
# Author: Hai Liang Wang
# Date: 2022-05-07:09:23:41
#
#===============================================================================

"""
   
"""
__copyright__ = "Copyright (c) 2022 . All Rights Reserved"
__author__ = "Hai Liang Wang"
__date__ = "2022-05-07:09:23:41"

import os, sys
curdir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(curdir)

if sys.version_info[0] < 3:
    raise RuntimeError("Must be using Python 3")
else:
    unicode = str

def process(file):
    output = []
    total = 0
    with open(file, "r", encoding="utf-8") as fin:
        lines = fin.readlines()
        total = len(lines)

    # print("total", total)
    # print("lines", output)
    if total > 0:
        output = lines
        # force use two blank lines to render section for whatever above, if leave it with just one blank line, the caption of table would format it with no blank line.
        # two blank lines make it work in any condition.

        last = lines[total - 1].strip()
        last2 = None

        if total == 1: # 文件只有一行
            pass
        elif total > 1: # 文件大于一行
            last2 = lines[total - 2].strip()
        
        if last2: # 倒数第二行有内容，不为空
            if last: # 倒数第一行有内容，不为空
                output.append("\n\n")
            else: # 倒数第一行是空
                output.append("\n")
        else: # 倒数第二行是空，或没有这行
            if last: # 倒数第一行有内容，不为空
                output.append("\n\n")
            else:
                pass # 倒数两行是空，不用调整
        
    if len(output) > 0:
        with open(file, "w", encoding="utf-8") as fout:
            fout.writelines(output)

        
if __name__ == '__main__':
    try:
        target_file = sys.argv[1]
        if os.path.exists(target_file):
            # print("\n" + target_file)
            process(target_file)
        else:
            raise BaseException("Not exist, usage: " + sys.argv[0] + " FILE")
    except Exception as e:
        print(e)
        raise BaseException("Usage: " + sys.argv[0] + " FILE")
