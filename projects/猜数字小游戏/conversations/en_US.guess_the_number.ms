/**
 * Guess the secret number in the magician's hat. 
 * If your guess is too high or too low, you'll get a hint.
 * https://www.funbrain.com/games/guess-the-number
 */
 
+ __kickoff_guess_num
- {@__start_guess_num} ^regenSecretNumber(1,100)


+ (*)
% {@__start_guess_num} ^regenSecretNumber(1,100)
- ^verifyInputAgainstSecret(<cap1>)

+ start
- {@__kickoff_guess_num}

+ help
- A secret number is in my hat.
^ You guess what number it is. If your guess is too high or too low, 
^ I will give you a hint. See how many turns it takes you to win! send "start" to begin.


// group replies
+ __start_guess_num
- I have picked a secret number and put it in my hat. 
^ Range from 1 to 100. Guess what number it is.