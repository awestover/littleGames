
#include <iostream>

void printArr(int** arr, int m, int n){
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < m; j++) {
			std::cout<<arr[i][j]<<std::endl;
		}
	}
}

int main() {
	const int mapSize = 4;
	int** mapData;
	mapData = (int**)malloc(sizeof(int*)*mapSize);

	for (int i = 0; i < mapSize; i++) {
		mapData[i] = (int*)malloc(mapSize*sizeof(int));
		for (int j = 0; j < mapSize; j++) {
			mapData[i][j] = i*mapSize+j;
		}
	}
	
	printArr(mapData, mapSize, mapSize);

	return 0;
}

