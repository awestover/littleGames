#ifndef WORLD
#define WORLD
#include <SFML/Graphics.hpp>
#include <map>

// game ********* constants **********
const int MAX_FRAME_RATE = 60;
const sf::Vector2f worldDimensions(4096, 4096);
const int tileWidth = 64;
const float baseMoveSpeed = 100;
const float switchFrame = 100, frameSpeed = 500;
const int numUnicorns = 400;
const int numDogs = 200;
const int MAX_ISLANDS = 1024; // this just helps me allocate an array, this is a ridiculous overestimate of the number of islands
const int mapSize = 64;
const std::map<char, int> mapCodes = {{'s', 0}, {'f', 1}, {'g', 2}, {'w', 3}};

// world functions
int setIslandIdxs(int* islandComponents, int* mapData, int mapSize);
void initMap(int* mapData, int mapSize);

#endif // WORLD
