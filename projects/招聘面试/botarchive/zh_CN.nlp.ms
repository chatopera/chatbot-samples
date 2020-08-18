// 自然语言处理

+ __kickoff_nlp_main_1
- {@__nlp_main_1} ^getNlpAnswerOptions(1)

+ (*)
% {@__nlp_main_1} ^getNlpAnswerOptions(1)
- {@__nlp_main_2} ^getNlpAnswerOptions(2) ^calculateNlpScore(1)

+ (*)
% {@__nlp_main_2} ^getNlpAnswerOptions(2) ^calculateNlpScore(1)
- {@__nlp_main_3} ^getNlpAnswerOptions(3) ^calculateNlpScore(2)

+ (*)
% {@__nlp_main_3} ^getNlpAnswerOptions(3) ^calculateNlpScore(2)
- {@__nlp_main_4} ^getNlpAnswerOptions(4) ^calculateNlpScore(3)


+ (*)
% {@__nlp_main_4} ^getNlpAnswerOptions(4) ^calculateNlpScore(3)
- {@__nlp_main_5} ^getNlpAnswerOptions(5) ^calculateNlpScore(4)

+ (*)
% {@__nlp_main_5} ^getNlpAnswerOptions(5) ^calculateNlpScore(4)
- {@__nlp_main_6} ^getNlpAnswerOptions(6) ^calculateNlpScore(5)

+ (*)
% {@__nlp_main_6} ^getNlpAnswerOptions(6) ^calculateNlpScore(5)
- {@__nlp_main_7} ^getNlpAnswerOptions(7) ^calculateNlpScore(6)

+ (*)
% {@__nlp_main_7} ^getNlpAnswerOptions(7) ^calculateNlpScore(6)
- {@__nlp_main_8} ^getNlpAnswerOptions(8) ^calculateNlpScore(7)

+ (*)
% {@__nlp_main_8} ^getNlpAnswerOptions(8) ^calculateNlpScore(7)
- ^calculateNlpScore(8) ^parseNextSection()

// 固定话术
+ __nlp_main_1
- 接下来是【技能检验】，请仔细阅读题目，凭借自己的经验回答，禁止作弊。【1/8】以下哪种不是设计模式？

+ __nlp_main_2
- 【2/8】二叉树（一般情况）的查找时间复杂度

+ __nlp_main_3
- 【3/8】请经典K-Means算法的初始化参数是否包括聚簇大小？

+ __nlp_main_4
- 【4/8】隐性马尔可夫模型不能用于解决下面哪个任务？

+ __nlp_main_5
- 【5/8】中文词性标注中，以w开头的标记代表哪类词汇？

+ __nlp_main_6
- 【6/8】以下哪个分词器使用了MMSEG算法？

+ __nlp_main_7
- 【7/8】以下哪一个不是词向量训练工具？

+ __nlp_main_8
- 【8/8】以下哪个标准是语言模型最常使用的格式？