/** 
 * 现在就构建强大的智能对话机器人
 * 快速开始: https://dwz.chatopera.com/2o6idK
 * 使用指南: https://dwz.chatopera.com/S1aqzb
 * 参考手册: https://dwz.chatopera.com/1882VM
 */

+ 你好
- {@_greetings_}

+ _greetings_
- {keep} 你好！

// FAQ 热门问题展示
+ __faq_hot_list
- {keep} ^getGreetings()


/**
 * 冰箱不制冷处理
 */
+ ${0.9}{继续提交工单}
- {keep} ^askMoreBingXiangZhengtiBuZhiLeng()


+ ${0.9}{冰箱不制冷}
- {keep} ^askMoreBingXiangBuZhiLeng()

+ ${0.9}{冰箱整体不制冷}
- {keep} ^askMoreBingXiangZhengtiBuZhiLeng()

+ ${0.9}{冰箱冷藏不制冷}
- {keep} ^askMoreBingXiangLengCangBuZhiLeng()

+ ${0.9}{不带显示屏【机械式】}
% ^askMoreBingXiangLengCangBuZhiLeng()
- {keep} ^askMoreBingXiangLengCangBuZhiLengJiXieSHi()

+ ${0.9}{带显示屏【电脑式】}
% ^askMoreBingXiangLengCangBuZhiLeng()
- {keep} ^askMoreBingXiangLengCangBuZhiLengDianNaoSHi()

+ ${0.9}{无假日功能}
% ^askMoreBingXiangLengCangBuZhiLengJiXieSHi()
- {keep} {CLEAR} ^askBingXiangBuZhiLengJiXieShiWujiari()

+ ${0.9}{有假日功能}
% ^askMoreBingXiangLengCangBuZhiLengJiXieSHi()
- {keep} {CLEAR} ^askBingXiangBuZhiLengJiXieShiYoujiari()

+ ${0.9}{无假日功能}
% ^askMoreBingXiangLengCangBuZhiLengDianNaoSHi()
- {keep} {CLEAR} ^askBingXiangBuZhiLengDianNaoShiWujiari()

+ ${0.9}{有假日功能}
% ^askMoreBingXiangLengCangBuZhiLengDianNaoSHi()
- {keep} {CLEAR} ^askBingXiangBuZhiLengDianNaoShiYoujiari()




