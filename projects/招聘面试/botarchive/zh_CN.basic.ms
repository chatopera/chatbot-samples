// 个人基本信息

// 开始面试，第一个话题
+ __kickoff_basic_main_1
- {@__basic_main_1} ^startBasicSection()

+ (*)
% {@__basic_main_1} ^startBasicSection()
- {@__basic_main_2} ^saveResumeInformation('__basic_main_1')

+ (*)
% {@__basic_main_2} ^saveResumeInformation('__basic_main_1')
- {@__basic_main_3} ^saveResumeInformation('__basic_main_2')

+ (*)
% {@__basic_main_3} ^saveResumeInformation('__basic_main_2')
- {@__basic_main_4} ^saveResumeInformation('__basic_main_3')

+ (*)
% {@__basic_main_4} ^saveResumeInformation('__basic_main_3')
- {@__basic_main_5} ^saveResumeInformation('__basic_main_4')

+ (*)
% {@__basic_main_5} ^saveResumeInformation('__basic_main_4')
- {@__basic_main_6} ^saveResumeInformation('__basic_main_5')

// 谈下一个话题
+ (*)
% {@__basic_main_6} ^saveResumeInformation('__basic_main_5')
- ^saveResumeInformation('__basic_main_6') ^parseNextSection()

// 固定话术
+ __basic_main_1
- 下面是【基本信息】里的几个问题。【1/6】您的中文名是什么？
- 在【基本信息】环节有下面几个问题。【1/6】请告诉我您的中文名？
- 我们开始进行【基本信息】环节。【1/6】麻烦你输入一下中文名？

+ __basic_main_2
- 【2/6】您的家乡在哪里？
- 【2/6】请告诉我您的籍贯？

+ __basic_main_3
- 【3/6】您工作几年了？
- 【3/6】您工作多少年了？

+ __basic_main_4
- 【4/6】您的最高学历是什么？
- 【4/6】请问您的最高学历呢？
- 【4/6】最高学历是什么？

+ __basic_main_5
- 【5/6】您毕业于哪所大学？

+ __basic_main_6
- 【6/6】您在学校里攻读了什么专业呢？
- 【6/6】专业呢？

