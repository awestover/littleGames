import cv2
import numpy as np
import pdb

cap = cv2.VideoCapture(0)

def getFingers(cap):
    # Take each frame
    _, frame = cap.read()

    # Convert BGR to HSV
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    cv2.imshow('hsv',hsv)

    lower_blue = np.array([0, 0, 0])
    upper_blue = np.array([255, 255, 70])

    # Threshold the HSV image to get only blue colors
    mask = cv2.inRange(hsv, lower_blue, upper_blue)

    mask = cv2.erode(mask, None, iterations=2)
    mask = cv2.dilate(mask, None, iterations=2)

    cnts = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL,
		cv2.CHAIN_APPROX_SIMPLE)[-2]

    cv2.imshow('mask',mask)

    center = None
    print(len(cnts))

    if len(cnts) > 0:
        maxL = 0
        idx = 0
        for i in range(0, len(cnts)):
            cL = len(cnts[i])
            if cL > maxL:
                maxL = cL
                idx = i

        curContour = cnts[idx]
        minYPos = []
        for cc in curContour:
            if len(minYPos)==0 or cc[0][1] < minYPos[1]:
                minYPos = cc[0]

        print(minYPos)
        return minYPos
        #  mask = mask*0
        #  mask[minYPos[1]][minYPos[0]]=255

    #return -1
    cv2.imshow('mask', mask)

    #  k = cv2.waitKey(5) & 0xFF
    #  if k == 27:
    #      pdb.set_trace()

#  cv2.destroyAllWindows()


while True:
    getFingers(cap)
