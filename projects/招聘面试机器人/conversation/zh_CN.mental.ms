+ __kickoff_mental
- {keep} {@__mental_main_1}

// 处理选项和答案
+ (*)
% {@__mental_main_1}
- {keep} {@__mental_main_2} ^calculateMentalScore(1)

+ (*)
% {@__mental_main_2} ^calculateMentalScore(1)
- {keep} {@__mental_main_3} ^calculateMentalScore(2)

+ (*)
% {@__mental_main_3} ^calculateMentalScore(2)
- {keep} {@__mental_main_4} ^calculateMentalScore(3)

+ (*)
% {@__mental_main_4} ^calculateMentalScore(3)
- {keep} {@__mental_main_5} ^calculateMentalScore(4)

+ (*)
% {@__mental_main_5} ^calculateMentalScore(4)
- {keep} {@__mental_main_6} ^calculateMentalScore(5)

+ (*)
% {@__mental_main_6} ^calculateMentalScore(5)
- {keep} {@__mental_main_7} ^calculateMentalScore(6)

+ (*)
% {@__mental_main_7} ^calculateMentalScore(6)
- {keep} {@__mental_main_8} ^calculateMentalScore(7)

+ (*)
% {@__mental_main_8} ^calculateMentalScore(7)
- {keep} {@__mental_main_9} ^calculateMentalScore(8)

+ (*)
% {@__mental_main_9} ^calculateMentalScore(8)
- {keep} {@__mental_main_10} ^calculateMentalScore(9)

+ (*)
% {@__mental_main_10} ^calculateMentalScore(9)
- {keep} {@__mental_main_11} ^calculateMentalScore(10)

+ (*)
% {@__mental_main_11} ^calculateMentalScore(10)
- {keep} {@__mental_main_12} ^calculateMentalScore(11)

+ (*)
% {@__mental_main_12} ^calculateMentalScore(11)
- {keep} {@__mental_main_13} ^calculateMentalScore(12)

+ (*)
% {@__mental_main_13} ^calculateMentalScore(12)
- {keep} {@__mental_main_14} ^calculateMentalScore(13)

+ (*)
% {@__mental_main_14} ^calculateMentalScore(13)
- {keep} {@__mental_main_15} ^calculateMentalScore(14)

+ (*)
% {@__mental_main_15} ^calculateMentalScore(14)
- {keep} ^calculateMentalScore(15) ^parseNextSection()

// 固定话术
+ __mental_main_1
- {keep} 好的，接下来是【心理评测】，包含15个问题，请认真回复。\n【1/15】你更喜欢吃哪种水果？ ^getMentalAnswerOptions(1)

+ __mental_main_2
- {keep} 【2/15】你平时休闲经常去的地方? ^getMentalAnswerOptions(2)

+ __mental_main_3
- {keep} 【3/15】你认为容易吸引你的人是？ ^getMentalAnswerOptions(3)

+ __mental_main_4
- {keep} 【4/15】如果你可以成为一种动物，你希望自己是哪种？ ^getMentalAnswerOptions(4)

+ __mental_main_5
- {keep} 【5/15】天气很热，你更愿意选择什么方式解暑？ ^getMentalAnswerOptions(5)

+ __mental_main_6
- {keep} 【6/15】如果必须与一个你讨厌的动物或昆虫在一起生活，你能容忍哪一个？ ^getMentalAnswerOptions(6)

+ __mental_main_7
- {keep} 【7/15】你喜欢看哪类电影、电视剧？ ^getMentalAnswerOptions(7)

+ __mental_main_8
- {keep} 【8/15】以下哪个是你身边必带的物品？ ^getMentalAnswerOptions(8)

+ __mental_main_9
- {keep} 【9/15】你出行时喜欢坐什么交通工具？ ^getMentalAnswerOptions(9)

+ __mental_main_10
- {keep} 【10/15】以下颜色你更喜欢哪种？ ^getMentalAnswerOptions(10)

+ __mental_main_11
- {keep} 【11/15】下列运动中挑选一个你最喜欢的？【提示：不一定擅长】 ^getMentalAnswerOptions(11)

+ __mental_main_12
- {keep} 【12/15】如果你拥有一座别墅，你认为它应当建立在哪里？ ^getMentalAnswerOptions(12)

+ __mental_main_13
- {keep} 【13/15】你更喜欢以下哪种天气现象？ ^getMentalAnswerOptions(13)

+ __mental_main_14
- {keep} 【14/15】你希望自己的窗口在一座30层大楼的第几层？ ^getMentalAnswerOptions(14)

+ __mental_main_15
- {keep} 【15/15】你认为自己更喜欢在以下哪一个城市中生活？ ^getMentalAnswerOptions(15)