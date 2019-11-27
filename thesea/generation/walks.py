import numpy as np
import matplotlib.pyplot as plt

pos = np.array([0,0])
vel = np.array([1,0])
vels = [np.array([1,0]),np.array([0,1]),np.array([0,-1]),np.array([-1,0])]

prevPoses = []

momentumPr = 0.99
ITTS = 10000
for i in range(ITTS):
    pos += vel
    if np.random.random() > momentumPr:
        vel = vels[np.random.randint(0,4)]
    prevPoses.append(pos.copy())

plt.plot([prevPosI[0] for prevPosI in prevPoses],[prevPosI[1] for prevPosI in prevPoses])
plt.show()
