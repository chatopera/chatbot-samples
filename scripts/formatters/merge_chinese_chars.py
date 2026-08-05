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
__copyright__ = "Copyright (c) 2020 . All Rights Reserved"
__author__ = "Hai Liang Wang"
__date__ = "2022-05-07:09:23:41"

import os, sys
curdir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(curdir)

if sys.version_info[0] < 3:
    raise RuntimeError("Must be using Python 3")
else:
    unicode = str

# Get ENV
ENVIRON = os.environ.copy()

def is_zhs(str):
    '''
    Check if str contains Chinese Word
    '''
    for i in str:
        if is_zh(i):
            return True
    return False


def is_zh(ch):
    """return True if ch is Chinese character.
    full-width puncts/latins are not counted in.
    """
    x = ord(ch)
    # CJK Radicals Supplement and Kangxi radicals
    if 0x2e80 <= x <= 0x2fef:
        return True
    # CJK Unified Ideographs Extension A
    elif 0x3400 <= x <= 0x4dbf:
        return True
    # CJK Unified Ideographs
    elif 0x4e00 <= x <= 0x9fbb:
        return True
    # CJK Compatibility Ideographs
    elif 0xf900 <= x <= 0xfad9:
        return True
    # CJK Unified Ideographs Extension B
    elif 0x20000 <= x <= 0x2a6df:
        return True
    else:
        return False


def is_punct(ch):
    x = ord(ch)
    # in no-formal literals, space is used as punctuation sometimes.
    if x < 127 and ascii.ispunct(x):
        return True
    # General Punctuation
    elif 0x2000 <= x <= 0x206f:
        return True
    # CJK Symbols and Punctuation
    elif 0x3000 <= x <= 0x303f:
        return True
    # Halfwidth and Fullwidth Forms
    elif 0xff00 <= x <= 0xffef:
        return True
    # CJK Compatibility Forms
    elif 0xfe30 <= x <= 0xfe4f:
        return True
    else:
        return False

def process(file):
    output = []
    total = 0
    with open(file, "r", encoding="utf-8") as fin:
        lines = fin.readlines()
        total = len(lines)
        for line in lines:
            if is_zhs(line):
                # 处理中文
                ls = [x for x in line]
                ll = len(ls)
                lret = []
                for r in range(ll):
                    if r == 0:
                        lret.append(ls[r])
                        continue
                    if r == 1:
                        lret.append(ls[r])
                        continue
                    if ls[r] == " ": # 是空格
                        # 前一个是中文，下一个是中文
                        if (ll - 1) >= (r + 1): # 上一个及下一个存在
                            if is_zh(ls[r - 1]) and is_zh(ls[r + 1]): # 上一个和下一个是中文
                                pass # 忽略
                            else:
                                lret.append(ls[r]) # 不满足上述条件，不忽略
                        else: # 下一个不存在
                            pass # 忽略在结尾的空格
                    else: # 不是空格
                        lret.append(ls[r])
                output.append("".join(lret))
            else:
                output.append(line)

    # print("total", total)
    # print("lines", output)
    if total > 0 and total == len(output):
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


