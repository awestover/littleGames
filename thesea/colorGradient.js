// this generates a color gradient from red to green
// the idea is:
// 255 0 0
// 255 x 0
// 255 2x 0
// ...
// 255 255 0
// 255-x 255 0
// ...
// 0 255 0
// you could theoretically use any color vectors as the basis vectors!!!! (instead of 0 255 0 and 255 0 0)
let colorGradient = [];
const Ncolors = 20;
const deltaColor = 255/Ncolors;
let i = 0;
while(deltaColor*i<255) {
  colorGradient.push([255, deltaColor*i, 0]);
  i++;
}
i = 0;
while(deltaColor*i<255) {
  colorGradient.push([255-deltaColor*i, 255, 0]);
  i++;
}
