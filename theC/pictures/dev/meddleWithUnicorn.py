import numpy as np
from PIL import Image
import matplotlib.pyplot as plt

import sys

unicorn = Image.open("unicornSquished.png")
unicornData = np.array(unicorn)
#  plt.imshow(unicornData[0:128,0:128])
#  plt.show()

plt.imshow(unicornData)
plt.show()


imgWidth = 64 #128
low = 0 #25
high = 64 #95
i = 0
for j in range(4):
    plt.imshow(unicornData[i*imgWidth+low:i*imgWidth+high, j*imgWidth+low:j*imgWidth+high])
    plt.show()
    cImg = Image.fromarray((unicornData[i*imgWidth+low:i*imgWidth+high, j*imgWidth+low:j*imgWidth+high])) 
    cImg.save("unicorn_0_{}.png".format(j))
low = 0 #20
high = 64 #105
i = 1
for j in range(4):
    plt.imshow(unicornData[i*imgWidth+low:i*imgWidth+high, j*imgWidth+low:j*imgWidth+high])
    plt.show()
    cImg = Image.fromarray((unicornData[i*imgWidth+low:i*imgWidth+high, j*imgWidth+low:j*imgWidth+high])) 
    cImg.save("unicorn_1_{}.png".format(j))


# save that beautiful picture
#  imgs_comb = Image.fromarray( imgs_comb)
#  imgs_comb.save("{}.png".format(name))

