// Node.js

+ __kickoff_nodejs_main_1
- {keep} {@__nodejs_main_1} ^getNodejsAnswerOptions(1)

+ (*)
% {@__nodejs_main_1} ^getNodejsAnswerOptions(1)
- {keep} {@__nodejs_main_2} ^getNodejsAnswerOptions(2) ^calculateNodejsScore(1)

+ (*)
% {@__nodejs_main_2} ^getNodejsAnswerOptions(2) ^calculateNodejsScore(1)
- {keep} {@__nodejs_main_3} ^getNodejsAnswerOptions(3) ^calculateNodejsScore(2)


+ (*)
% {@__nodejs_main_3} ^getNodejsAnswerOptions(3) ^calculateNodejsScore(2)
- {keep} {@__nodejs_main_4} ^getNodejsAnswerOptions(4) ^calculateNodejsScore(3)

+ (*)
% {@__nodejs_main_4} ^getNodejsAnswerOptions(4) ^calculateNodejsScore(3)
- {keep} {@__nodejs_main_5} ^getNodejsAnswerOptions(5) ^calculateNodejsScore(4)

+ (*)
% {@__nodejs_main_5} ^getNodejsAnswerOptions(5) ^calculateNodejsScore(4)
- {keep} {@__nodejs_main_6} ^getNodejsAnswerOptions(6) ^calculateNodejsScore(5)

+ (*)
% {@__nodejs_main_6} ^getNodejsAnswerOptions(6) ^calculateNodejsScore(5)
- {keep} {@__nodejs_main_7} ^getNodejsAnswerOptions(7) ^calculateNodejsScore(6)

+ (*)
% {@__nodejs_main_7} ^getNodejsAnswerOptions(7) ^calculateNodejsScore(6)
- {keep} {@__nodejs_main_8} ^getNodejsAnswerOptions(8) ^calculateNodejsScore(7)

+ (*)
% {@__nodejs_main_8} ^getNodejsAnswerOptions(8) ^calculateNodejsScore(7)
- {keep} ^calculateNodejsScore(8) ^parseNextSection()

// 固定话术
+ __nodejs_main_1
- {keep} 接下来是【技能检验】，请仔细阅读题目，凭借自己的经验回答，禁止作弊。【1/8】以下哪种不是设计模式？

+ __nodejs_main_2
- {keep} 【2/8】二叉树（一般情况）的查找时间复杂度

+ __nodejs_main_3
- {keep} 【3/8】JavaScript代码(!!undefined)的值为

+ __nodejs_main_4
- {keep} 【4/8】JavaScript代码(["1", "2", "3"].map(parseInt))的值为

+ __nodejs_main_5
- {keep} 【5/8】JavaScript代码([typeof null, null instanceof Object])的值为

+ __nodejs_main_6
- {keep} 【6/8】JavaScript代码(3..toString())的值为

+ __nodejs_main_7
- {keep} 【7/8】下面哪一项不是Node.js的HTTP服务器框架

+ __nodejs_main_8
- {keep} 【8/8】Node.js的创始人是谁