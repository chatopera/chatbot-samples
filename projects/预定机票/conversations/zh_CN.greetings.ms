/** 
 * 获得示例程序，快入开始！
 * https://github.com/chatopera/chatbot-samples
 */

+ 你好
- {@_greetings_}

+ _greetings_
- {keep} 你好！
- 欢迎惠顾！

// FAQ Hotlist
+ __faq_hot_list
- ^get_greetings()

+ [帮助|help|\\h]
- ^get_greetings()
