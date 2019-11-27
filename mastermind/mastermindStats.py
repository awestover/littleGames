import random
import matplotlib.pyplot as plt


# calculates every permutation of a list recursively, and of a specified length
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


# finds out whether or not two reponses are equal (in combination, permutation is not relevant)
def match(response1, response2):
    for el in response1:
        if response1.count(el) != response2.count(el):
            return False
    return True


# random guess
def a_guess(possibles):
    return random.choice(possibles)


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


# makes sure none of the possibilities contradict our information basis
def eliminate_possibles_pro(possibles, guesses, answers):
    for guess in range(len(possibles)-1, -1, -1):
        for g in range(0, len(guesses)):
            tentativeAnswers = "".join(gradeGuess(guesses[g], possibles[guess])).lower()
            realCAnswers = "".join(answers[g]).lower()
            if not match(tentativeAnswers, realCAnswers):
                possibles.pop(guess)
                break
    return possibles



def a_game(answerKey, possibles, codeLength):
    done = "not yet"

    # both of these lists are in order of occurence do not mess up the order
    guesses = []
    answers = []

    # number of possibilities, recorded before every guess
    pVals = []

    while done == "not yet":
        pVals.append(len(possibles))
        cur_guess = a_guess(possibles)

        feedback = gradeGuess(cur_guess, answerKey)
        guesses.append(cur_guess)
        answers.append(feedback)
        if feedback == ["g" for i in range(0, codeLength)]:
            done = "computer won"
        else:
            # all the brains
            possibles = eliminate_possibles_pro(possibles, guesses, answers)


    return pVals




# the simulation

numTrials = 10**5

nums = 10
codeLength = 4

alphabet = list(range(0, nums))
possibles = permute(alphabet, codeLength)

# remove codes with more than 1 of a number
for i in range(len(possibles) - 1, -1, -1):
    for c in possibles[i]:
        if possibles[i].count(c) > 1:
            possibles.pop(i)
            break


# interesting data
moveValues = []
pSequences = []

# repeatedly play it
for i in range(0, numTrials):
    if i % 100 == 0:
        print(i)
    code = random.choice(possibles)
    result = a_game(code, possibles[:], codeLength)
    moveValues.append(len(result))
    pSequences.append(result)


fig = plt.figure()
ax = fig.add_subplot(111)
ax.plot(range(0, numTrials), moveValues)
ax.set_title("Moves untill win")
ax.set_xlabel("Trial number")
ax.set_ylabel("Moves required")

avg = sum(moveValues)/len(moveValues)
print("average moves untill win was {}".format(avg))
fig.text(.3, .03, "Average = {}".format(avg), ha='center')

plt.savefig("moves.png")

fig2 = plt.figure()
ax2 = fig2.add_subplot(111)
realPs = []
pWeights = []
for pS in pSequences:
    while len(pS) > len(realPs):
        realPs.append(0)
        pWeights.append(0)
    for p in range(0, len(pS)):
        pWeights[p] += 1
        realPs[p] = (pWeights[p]*realPs[p] + pS[p]) / (pWeights[p] + 1)

ax2.plot(range(0, len(realPs)), realPs)
ax2.set_title("Possibilities versus round")
ax2.set_ylabel("Possibilities")
ax2.set_xlabel("Round")
plt.savefig("possibles.png")


plt.show()
