
#include <iostream>
#include <fstream>
#include <queue>

#include "World.hpp"

void initMap(int* mapData, int mapSize){
	std::ifstream mapFile("data/map.txt");
	for (int i = 0; i < mapSize; i++){
		for (int j = 0; j < mapSize; j++){
			char curChar;
			mapFile >> curChar;
			*(mapData+i*mapSize+j) = mapCodes.at(curChar);
			// equivalent, but probably not good because mapData is really a 2d array (just in cpp it is stored kinda like a massive 1d array)
			// mapData[i*mapSize+j] = mapCodes.at(curChar); 				
		}
	}
}

int setIslandIdxs(int* islandComponents, int* mapData, int mapSize) {
	int componentCt = 0;
	std::queue <int> unclaimedIslandParts; 
	for (int i = 0; i < mapSize; i++) {
		for (int j = 0; j < mapSize; j++) {
			*(islandComponents+i*mapSize+j) = -1;
			if (*(mapData+i+mapSize*j) != mapCodes.at('w')) {
				unclaimedIslandParts.push(i+mapSize*j);
			}
		}
	}
	while(!unclaimedIslandParts.empty()) {
		int base = unclaimedIslandParts.front();
		unclaimedIslandParts.pop();
		if (*(islandComponents+base) == -1) {
			std::queue <int> uncheckedNeighbors;
			uncheckedNeighbors.push(base);
			while(!uncheckedNeighbors.empty()){
				int cur = uncheckedNeighbors.front();
				uncheckedNeighbors.pop();
				if(*(mapData+cur)!=mapCodes.at('w') && *(islandComponents+cur)==-1){
					*(islandComponents+cur) = componentCt;
					if(cur+1 % mapSize != 0)
						uncheckedNeighbors.push(cur+1);
					if(cur-1 % mapSize != mapSize-1)
						uncheckedNeighbors.push(cur-1);
					if(cur+mapSize < mapSize*mapSize)
						uncheckedNeighbors.push(cur+mapSize);
					if(cur-mapSize >= 0)
						uncheckedNeighbors.push(cur-mapSize);
				}
			}
			componentCt++;
		}
	}
	return componentCt;
};

