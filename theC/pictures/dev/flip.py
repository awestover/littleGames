from PIL import Image

import sys

if len(sys.argv) < 2:
    print("give me an arg ")
    sys.exit()

name = sys.argv[1]

img = Image.open("{}.png".format(name))
img = img.transpose(Image.FLIP_LEFT_RIGHT)

img.save("{}_flip.png".format(name))

#  import matplotlib.pyplot as plt
#  plt.imshow(img)
#  plt.show()

