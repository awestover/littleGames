import random
import time
import pdb

def firstNumber():
    x = random.randint(0,9)
    y = random.randint(0,9)
    z = random.randint(0,9)
    a = random.randint(0,9)

    while x == y or x == z or x == a or y == z or y == a or z == a:

        while x == y or x == z or x == a:
            x = x+1
            if x > 9:
                x = 0


        while x == y or x == z or x == a:
            x = x+1
            if x > 9:
                x = 0

 
        while x == y or x == z or x == a:
            x = x+1
            if x > 9:
                x = 0


        while x == y or x == z or x == a:
            x = x+1
            if x > 9:
                x = 0



            
    return [x, y, z, a]



def doubleX(x, y, z, a):
    while x == y or x == z or x == a:
        x = random.randint (0,9)
    return x

def doubleY(y, z, a):
    while y == z or y == a:
        y = random.randint(0,9)
    return y

def doubleZ(z, a):
    while z == a:
        z = random.randint(0,9)

    return z

def startOff():
    print ('THIS GAME IS CALLED:\n\n\n\n\n\n')
    time.sleep(1)
    print ('M A S T E R M I N D\n\n\n\n\n\n')
    time.sleep(1)
    print ('Do you need the instructions?')
    inst = input().upper().lower()
    if inst.startswith('y'):
        print ('I will think of four numbers.')
        time.sleep(1)
        print ('They will be in a specific order.')
        time.sleep(1)
        print ('You will have a certian amount of guesses')
        time.sleep(1)
        print ('This depends on how hard you want it to be')
        time.sleep (1)
        print ('You will guess the number and depending')
        print ('on your guess you will get diffrent colors.')
        print ('When your ready, push ENTER or RETURN')
        input()

        
def colorMeaning(x, y, z, a):
    print('Do you need the color meanings?')
    w = input()
    if w .startswith('y') or w .startswith('Y'):
        
        print ('The color red means that none of the numbers you guessed are in the secret number')
        time.sleep(1)
        print ('The color green means that one number is correct, right numberr and in the right spot')
        time.sleep(1)
        print ('The color blue means that one number you entered is in the Secret Number, but in the wrong place')
        time.sleep(1)
        print ('Good luck, but I\'m gonna win still. ')
        time.sleep(1)
        print ('When your ready push ENTER or RETURN')
        w = input()


    if w == ('1'):
        print (str(x)+' ' + str(y) +' '+ str(z) +' '+str(a))





def playersFirstGuess(x, y, z, a, remainingGuesses):
    if remainingGuesses == 1:
        guess = 'guess'

    else:
        guess = 'guesses'
    print ('What do you think the four numbers are?\t\t\tYou have: '+str(remainingGuesses) +' ' + guess +' left')
    print ('     _     _     _     _     ')
    time.sleep(1)
    print ('Enter your first numbers one at a time.')
    x1 = input()
    while x1 not in '1 2 3 4 5 6 7 8 9 0'.split():
        print('Please enter in your first number')
        x1 = input()
        
    y1 = input()
    while y1 not in '1 2 3 4 5 6 7 8 9 0'.split():
        print('Please enter in your second number')
        y1 = input()
        
    z1 = input()
    while z1 not in '1 2 3 4 5 6 7 8 9 0'.split():
        print('Please enter in your third number')
        z1 = input()

    a1 = input()
    while a1 not in '1 2 3 4 5 6 7 8 9 0'.split():
        print('Please enter in your last number')
        a1 = input()
        
    return [x1, y1, z1, a1]


def getPlayerGuess():
    result = ()
    while len(result) != 4:
        try:
            stuff = input("input numbers")
            result = stuff.split(" ")
            result = [int(result[i]) for i in range(0, len(result))]
        except:
            print("NO PRO")
    
    return result[0], result[1], result[2], result[3]
    
    

def example():
    x = random.randint(1,3)
    y = random.randint(4,6)
    z = random.randint(7,8)
    a = random.randint (9,10)

    print ('To start off, The player says any 4 numbers in this case its, '+str(x) +' '+str(y) +' '+ str(z) +' '+ str(a))
    print ('The computer would then say, Green, blue blue')
    print ('This means that 3 of the numbrs you guessed are in the second number.\n We know that one of them is in the right place, and the other two \n are in the wrong place. We then can guess more numbrs and have the computer tell us info.\n\n')
        
    
    

def x1WrongPLace(x1, y, z, a):
    if int(x1) == y or int(x1) == z or int(x1) == a:
        print ('BLUE')
     
def y1WrongPLace(y1, x, z, a):
    if int(y1) == x or int(y1) == z or int(y1) ==a:
        print ('BLUE')
        
def z1WrongPlace(z1, x, y, a):
    if int(z1) == x or int(z1) == y or int(z1) == a:
        print ('BLUE')
        
def a1WrongPLace(a1, x, y, z):
    if int(a1) == x or int(a1) == y or int(a1) == z:
        print ('BLUE')
        
def x1RightPlace(x1, x):
    if int(x1) == x:
        print ("GREEN")
        
def y1RightPlace(y1, y):
    if int(y1) == y:
        print ("GREEN")
        
def z1RightPlace(z1, z):
    if int(z1) == z:
        print ("GREEN")
    
def a1RightPlace(a1, a):
    if int(a1) == a:
        print ("GREEN")

def allRight(x1, x, y1, y, z1, z, a1, a, usedGuesses, gamesWon, hard, remainingGuesses ):
    if int(x1) == x and int(y1) == y and int(z1) == z and int(a1) == a:
        gamesWon = gamesWon + 1
        
        if usedGuesses == 1:
            print ('AMAZING JOB YOU GOT IT IN 1 GUESS. YOUR GREAT AT THIS GAME!!')
            
        else:
            print("GREAT JOB YOU COMPLETED IT IN " + str(usedGuesses) + ' GUESSES. Great work')

        if hard == 20:
            hard = 'baby'

        if hard == 10:
            hard = 'easy'

        if hard == 8:
            hard = 'medium'

        if hard == 7:
            hard = 'hard'

        if hard == 5:
            hard = 'pro'

        if hard == 2:
            hard = 'impossible'
            


        print ('You completed it on, '+ str(hard) + ' difficulty')
        b = 1
        remainingGuesses = 10

    else:
        b = 2
        remainingGuesses = remainingGuesses

    return (b, gamesWon, remainingGuesses)


def allWrong(x, x1, y, y1, z, z1, a, a1):
    c = 0
    while c == 0:
        if x == int(x1):
            c = c+1

        if y == int(y1):
            c = c+1

        if z == int(z1):
            c = c+1

        if a == int(a1):
            c = c+1

        if int(x1) == y or int(x1) == z or int(x1) == a:
            c = c+1

        if int(y1) == x or int(y1) == z or int(y1) ==a:
            c = c+1

        if int(z1) == x or int(z1) == y or int(z1) == a:
            c = c +1

        if int(a1) == x or int(a1) == y or int(a1) == z:
            c = c+1

        if c > 0:
            break

        else:
            print ('RED')
            break
        

    

def playAgain():
    print ('Would you care to play again my friend? (yes or no)')
    playAgain = input().lower()

    if playAgain == 'yes' or playagain.startswith('y'):
        playAgain = 1

    if playAgain == 'no' or playAgain.startswith('n'):
        playAgain = 2

    return playAgain
    

def diff():
    print ('How hard would you like it to be? (baby, easy, medium, hard, pro, impossible?')
    hard = input().lower()
    while hard not in 'baby easy medium hard pro impossible '.split():
        print('How hard would you like it to be? (baby, easy, medium, hard, pro, impossible?')
        hard = input().lower()

    if hard == 'baby':
        hard = 15

    if hard == 'easy':
        hard = 10

    if hard =='medium':
        hard = 8

    if hard == 'hard':
        hard = 7

    if hard == 'pro':
        hard = 5

    if hard == 'impossible':
        hard = 2

    return hard

def permute(a_list, codeLength):
    if codeLength == 1:
        return [[el] for el in a_list]
    else:
        out = []
        for i in range(0, len(a_list)):
            cOut = permute(a_list, codeLength - 1)
            for el in cOut:
                out.append([a_list[i]] + el)
        return out


def eliminate_possibles(possibles, guesses, answers):
    for i in range(len(possibles) - 1, -1, -1):
        if possibles[i] == guesses[-1]:  # if we have already guessed it and we did not win, then don't guess it again
            possibles.pop(i)

    for i in range(0, len(answers)):
        if "".join(answers[i]).lower() == "rrrr":
            for k in range(len(possibles) - 1, -1, -1):
                for c in possibles[k]:
                    if c in guesses[i]:
                        possibles.pop(k)
                        break
    print(len(possibles))
    return possibles


def educated_guess(possibles, guesses, answers):
    guess = random.choice(possibles)
    lit = False
    while not lit:
        lit = True
        for g in range(0, len(guesses)):
            tentaiveAnswers = "".join(gradeGuess(guesses[g], guess)).lower()        
            if tentaiveAnswers != "".join( answers[g]).lower():
                lit = False
                guess = random.choice(possibles)
                possibles.pop(possibles.index(guess))
                break
    return guess, possibles

# sketchy if repeats are allowed
def gradeGuess(guess, answerKey):
    res = []
    for g in range(0, len(guess)):
        if answerKey[g] == guess[g]:
            res.append('g')
        elif guess[g] in answerKey:
            res.append('b')
        else:
            res.append('r')
    return res




#Put it all together
playAgain = 1
startOff()
print('Do you need an example?')
qwq = input().lower()
if qwq.startswith('y'):
    example()



    
gamesPlayed = 0
gamesWon = 0

while playAgain == 1:
    comp = 'q'
    while comp.startswith('q'):
        print ('Would you like to guess the computers number?')
        comp = input().lower()
        if comp.startswith('y'):
        
            break
        if comp.startswith('n'):
            break
        else:
            comp = 'q'

    if comp.startswith('y'):
        x, y, z, a = firstNumber()
        colorMeaning(x, y, z, a)
        hard = diff()
        x = doubleX (x, y, z, a)
        y = doubleY (y, z, a)
        z = doubleZ (z, a)
    
    
        remainingGuesses = int(hard)
        usedGuesses = 1
    
        while remainingGuesses > 0:
            x1, y1, z1, a1 = playersFirstGuess(x, y, z, a, remainingGuesses)          
            
            x1WrongPLace(x1, y, z, a)
            y1WrongPLace(y1, x, z, a)
            z1WrongPlace(z1, x, y, a)
            a1WrongPLace(a1, x, y, z)

            x1RightPlace(x1, x)
            y1RightPlace(y1, y)
            z1RightPlace(z1, z)
            a1RightPlace(a1, a)

            b, gamesWon, remainingGuesses = allRight(x1, x, y1, y, z1, z, a1, a, usedGuesses, gamesWon, hard, remainingGuesses)
            allWrong(x, x1, y, y1, z, z1, a, a1)
        
            remainingGuesses = remainingGuesses - 1
            usedGuesses = usedGuesses + 1

        

            if b == 1:
               break

        if remainingGuesses == 0:
            print('You used up all the guesses!')
            print('The numbers that I had were: ')
            print (x)
            print (y)
            print (z)
            print (a)

    #_____________________________________________________________________________
    else:
    
        nums = 10
        codeLength = 4
        done = "not yet"

        print("OK, lets go I am going to play mastermind you are going to lose")
        print("If you do not know the rules Google them or leave now")
        codeLength = int(4)
        time.sleep(1)
        try:
            nums = int(10)
        except:
           print("Set to default value of " + str(nums))


        print("think of a " + str(codeLength) + " length number with numbers from 0 to " + str(nums - 1) + " inclusive")
        time.sleep(1)

        alphabet = list(range(0, nums))
        possibles = permute(alphabet, codeLength)

        # remove codes with more than 1 of a number
        for i in range(len(possibles) - 1, -1, -1):
            for c in possibles[i]:
                if possibles[i].count(c) > 1:
                   possibles.pop(i)
                break


        guesses = []
        answers = []  # both of these lists are in order of occurenc do not mess up the order

        print('There are '+str(len(possibles)) + ' possibilities.')
        C_guesses_left = 8
        if nums == 1:
            print("im going to go out on a limb here and say " + "1 " * codeLength + "is your code")
        else:
            print("I will guess and you will give me feedback")
            while done == "not yet" or C_guesses_left > 1:
                C_guesses_left = int(C_guesses_left) - 1
                if len(possibles) == 0:
                    print("I am relatively sure that you have given me incorrect information...")
                    print("You have told me the following")
                    qas = [str(guesses[i]) + "->" + str(answers[i]) for i in range(0, len(answers))]
                    print("Q and A's\n" + "\n".join(qas))
                    done = "user cheated"
                else:
                    cur_guess, possibles = educated_guess(possibles, guesses, answers)
                    print("My guess is " + str(cur_guess))
                    print("How correct was I (1 R per number not in the code, 1B per correct number in incorrect place, and 1G per correct number in correct place)")
                    feedback = []
                    while len(feedback) != codeLength:
                        feedback = input("Answer(space seperated):\t").lower().split(" ")
                    guesses.append(cur_guess)
                    answers.append(feedback)
                    if feedback == ["g" for i in range(0, codeLength)]:
                        done = "computer won"

                    else:
                        possibles = eliminate_possibles(possibles, guesses, answers)
    
        if done == "computer won":
            print("good game")
            time.sleep(1)
        elif done == "user cheated":
            print("cheaters never win")
    
    gamesPlayed = gamesPlayed + 1
    
    print ('Would you care to play again my friend? (yes or no)')
    playAgain = input().lower()
    while playAgain not in 'no yes'.split():
        print ('Would you care to play again my friend? (yes or no)')
        playAgain = input().lower()

    if playAgain == 'yes':
        playAgain = 1

    if playAgain == 'no':
        playAgain = 2
#_________________________________________________________________________________________            
if gamesPlayed == 1:
    x = 'game'
if gamesPlayed > 1:
    x = 'games'

if gamesWon == 1:
    y = 'game'

if gamesWon > 1:
    y = 'games'

if gamesWon == 0:
    y = 'games'

gamesLost = gamesPlayed - gamesWon
#_________________________________________________________________________________________   
print ('Thank you for playing today.')
print ('You played ' + str(gamesPlayed) +' ' +str(x))
print ('You won ' + str(gamesWon) + ' ' + str(y)+', and lost '+ str(gamesLost))
print ('The computer won ' +C_games_won_games)
print ('The computer lost '+C_games_lost)
print ('Please come back soon')