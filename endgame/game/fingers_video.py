import cv2
import numpy as np
import pdb

cap = cv2.VideoCapture(0)

while(1):
    # Take each frame
    _, frame = cap.read()

    # Convert BGR to HSV
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    cv2.imshow('hsv',hsv)
    # rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    # cv2.imshow('rgb', rgb)
    # cv2.imshow()

    # define range of blue color in HSV
    #lower_blue = np.array([110,50,50])
    #upper_blue = np.array([130,255,255])

    lower_blue = np.array([0, 0, 0])
    upper_blue = np.array([255, 255, 40])


    # Threshold the HSV image to get only blue colors
    mask = cv2.inRange(hsv, lower_blue, upper_blue)

    mask = cv2.erode(mask, None, iterations=2)
    mask = cv2.dilate(mask, None, iterations=2)

    # with open ("dims.json") as f:
        # mask.shape()

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

        # pdb.set_trace()
        curContour = cnts[idx]
        minYPos = []
        for cc in curContour:
            # print(cc)
            if len(minYPos)==0 or cc[0][1] < minYPos[1]:
                minYPos = cc[0]

        mask = mask*0
        mask[minYPos[1]][minYPos[0]]=255


    cv2.imshow('mask', mask)

    #  cv2.imshow('res',res)
    k = cv2.waitKey(5) & 0xFF
    if k == 27:
        pdb.set_trace()

cv2.destroyAllWindows()
