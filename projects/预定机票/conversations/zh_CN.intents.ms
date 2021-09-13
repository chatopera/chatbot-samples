/**
 * 意图识别对话
 */
 
// 预定机票 
intent book_airplane_ticket
- ^handleAirplaneTicketOrder()

    + ${0.6}{没错，出票吧｜出票}
    % ^handleAirplaneTicketOrder()
    - ^placeAirplaneTicketOrder()
    
    + ${0.6}{不预约了}
    % ^handleAirplaneTicketOrder()
    - ^cancelAirplanTicketReservation()
    
    + ${0.6}{信息有误，重新预约}
    % ^handleAirplaneTicketOrder()
    - ^rebookAirplaneTicket()

// 查询天气
intent ask_weather
- ^handleSuccAskWeather()
- {x} ^handleLoseAskWeather()
