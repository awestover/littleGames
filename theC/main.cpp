
/*
 * AUTHOR: Alek Westover
 * PROGRAM: main.cpp
 *
 * TODO:
 * 		come up with more "plot" to the game
 * 		research about random walks??? browniand motion?? also just improve on what we have now...
 * */

#include <SFML/Graphics.hpp>
#include <SFML/Audio.hpp>

#include <iostream>
#include <fstream>
#include <time.h>

#include "Entity.hpp"
#include "Animal.hpp"
#include "User.hpp"
#include "World.hpp"
#include "Quadtree.hpp"

int main() {
	srand(time(NULL));

	// initialize window variables 
	sf::Vector2f screenDimensions(1024, 512);
	bool paused = false;
	bool showMap = true;
	sf::RenderWindow window;
	sf::RenderWindow* windowPtr;
	windowPtr = &window;
	window.create(sf::VideoMode(screenDimensions.x, screenDimensions.y), "theC");
	window.setFramerateLimit(MAX_FRAME_RATE);

	// views
	sf::View view(sf::Vector2f(0, 0), screenDimensions);
	view.setViewport(sf::FloatRect(0.0f,0.0f,1.0f,1.0f));
	sf::View minimap(sf::Vector2f(worldDimensions.x/2,worldDimensions.y/2), worldDimensions);
	minimap.setViewport(sf::FloatRect(0.875f, 0.0f, 0.125f, 0.125f));

	sf::Clock clock;
	float dt, frameCounter=0;
	sf::Vector2f cameraPos(screenDimensions.x/2, screenDimensions.y/2);

	// initialize map
	sf::Texture tileTextures;
	sf::Sprite tileSprite;
	tileTextures.loadFromFile("pictures/tiles.png");
	tileSprite.setTexture(tileTextures);

	sf::Music music;
	music.openFromFile("sound/song.ogg");
	music.play();
	music.setLoop(true);

	int mapData[mapSize][mapSize];
	int islandComponents[mapSize][mapSize];
	initMap(&mapData[0][0], mapSize);	
	setIslandIdxs(&islandComponents[0][0], &mapData[0][0], mapSize);

	sf::Font font;
	font.loadFromFile("pictures/arial.ttf");
	sf::Text text;
	text.setFont(font);
	text.setCharacterSize(tileWidth);
	text.setFillColor(sf::Color::Red);
	

	// initialize the game 
	Entity* chickenEntity;
	Entity* unicornEntity;
	Entity* dogEntity;
	chickenEntity = new Entity(10, 1, 10*baseMoveSpeed);
	unicornEntity = new Entity(10, 1, (int)(0.9f*baseMoveSpeed));
	dogEntity = new Entity(10, 1, baseMoveSpeed*2);
	chickenEntity->initImage("pictures/chicken.png", tileWidth, sf::Vector2i(2,2));
	unicornEntity->initImage("pictures/unicornSquished.png", tileWidth, sf::Vector2i(4,2));
	dogEntity->initImage("pictures/dogfull.png", 64, sf::Vector2i(4, 2));

	sf::RectangleShape blipBox(sf::Vector2f(tileWidth, tileWidth));
	blipBox.setFillColor(sf::Color(255,0,0,255));

	Animal* chicken = new Animal(chickenEntity, sf::Vector2f(screenDimensions.x/2, screenDimensions.y/2));
	Animal* unicorns[numUnicorns];
	Animal* dogs[numDogs];
	for (int i = 0; i < numUnicorns; i++) {
		// unicorns[i] = new Animal(unicornEntity, sf::Vector2f(screenDimensions.x/2, screenDimensions.y/2));
		unicorns[i] = new Animal(unicornEntity, sf::Vector2f((rand()%(int)worldDimensions.x)*1.0f, (rand()%(int)worldDimensions.y)*1.0f));
		unicorns[i]->setRandVel();
	}
	for (int i = 0; i < numDogs; i++){
		dogs[i] = new Animal(dogEntity, sf::Vector2f((rand()%(int)worldDimensions.x)*1.0f, (rand()%(int)worldDimensions.y)*1.0f));
		dogs[i]->setRandVel();
	}

	User* player = new User();
	User* computer = new User();

	Quadtree quadtree;

	while(window.isOpen()) { // game loop
		sf::Event event;
		while(window.pollEvent(event)) { // event loop
			switch (event.type) {
				case sf::Event::Closed:
					window.close();
					break;
				case sf::Event::KeyPressed:
					if(event.key.code == sf::Keyboard::Q)
						window.close();
					else if(event.key.code == sf::Keyboard::I){
						if(screenDimensions.x *2 <= worldDimensions.x){
							screenDimensions.x *= 2;
							screenDimensions.y *= 2;
							view.setSize(screenDimensions);
						}
					}
					else if(event.key.code == sf::Keyboard::O){
						if(screenDimensions.x / 2 >= tileWidth){
							screenDimensions.x /= 2;
							screenDimensions.y /= 2;
							view.setSize(screenDimensions);
						}
					} 
					break;
				case sf::Event::KeyReleased:
					if(event.key.code == sf::Keyboard::M){
						showMap = !showMap;
					}
					break;
				case sf::Event::Resized:
					screenDimensions.x = event.size.width;
					screenDimensions.y = event.size.height;
					std::cout << screenDimensions.x << std::endl;
					view.setSize(screenDimensions);
					break;
				case sf::Event::LostFocus:
					paused = true;
					std::cout << "goodbye!!!" << std::endl;
					break;
				case sf::Event::GainedFocus:
					paused = false;
					std::cout  << "welcome back!!" << std::endl;
					break;
				default:
					break;
			}			
		}

		dt = clock.restart().asSeconds();
		if (paused)
			dt = 0;

		frameCounter += frameSpeed*dt;
		if(frameCounter >= switchFrame){
			chicken->nextFrame();
			for (int i = 0; i < numUnicorns; i++) {
				unicorns[i]->nextFrame();
			}
			for (int i = 0; i < numDogs; i++) {
				dogs[i]->nextFrame();
			}
			frameCounter = 0;
		}

		chicken->vel.x = 0; chicken->vel.y = 0;
		if(sf::Keyboard::isKeyPressed(sf::Keyboard::A) ^ sf::Keyboard::isKeyPressed(sf::Keyboard::D)) {
			if(sf::Keyboard::isKeyPressed(sf::Keyboard::A))
				chicken->vel.x = -chickenEntity->speed;	
			else if(sf::Keyboard::isKeyPressed(sf::Keyboard::D))
				chicken->vel.x = chickenEntity->speed;	
		}
		if(sf::Keyboard::isKeyPressed(sf::Keyboard::W) ^ sf::Keyboard::isKeyPressed(sf::Keyboard::S)) {
			if(sf::Keyboard::isKeyPressed(sf::Keyboard::W))
				chicken->vel.y = -chickenEntity->speed;	
			else if(sf::Keyboard::isKeyPressed(sf::Keyboard::S))
				chicken->vel.y = chickenEntity->speed;	
		}
		chicken->applyVel(dt);

		for (int i = 0; i < numUnicorns; i++) {
			unicorns[i]->wanderIsland(&islandComponents[0][0], dt);
		}
		for (int i = 0; i < numDogs; i++) {
			dogs[i]->wanderIsland(&islandComponents[0][0], dt);
		}

		cameraPos.x = chicken->pos.x + tileWidth/2;
		if (cameraPos.x < screenDimensions.x/2)
			cameraPos.x = screenDimensions.x/2;
		if (cameraPos.x > worldDimensions.x -screenDimensions.x/2)
			cameraPos.x = worldDimensions.x -screenDimensions.x/2;
		cameraPos.y = chicken->pos.y + tileWidth/2;
		if (cameraPos.y < screenDimensions.y/2)
			cameraPos.y = screenDimensions.y/2;
		if (cameraPos.y > worldDimensions.y - screenDimensions.y/2)
			cameraPos.y = worldDimensions.y - screenDimensions.y/2;
		view.setCenter(cameraPos);


		// collision detection
		quadtree.loadSpecies(&unicorns[0], numUnicorns);
		quadtree.loadSpecies(&dogs[0], numDogs);
		quadtree.checkCollisions();
		quadtree.clear();
		

		// clear, draw, display (in that order!)
		window.clear(sf::Color(49, 100, 183, 200)); // lightish blue

		window.setView(view);
		for (int i = 0; i < mapSize; i++) {
			for (int j = 0; j < mapSize; j++) {
				tileSprite.setTextureRect(sf::IntRect(mapData[i][j]*tileWidth, 0, tileWidth, tileWidth));
				tileSprite.setPosition(j*tileWidth, i*tileWidth);
				window.draw(tileSprite);
			}
		}

		for(int i = 0; i < numUnicorns; i++){
			unicorns[i]->display(windowPtr);
		}
		for(int i = 0; i < numDogs; i++){
			dogs[i]->display(windowPtr);
		}
		chicken->display(windowPtr);

		// for (int i = 0; i < mapSize; i++) {
		//     for (int j = 0; j < mapSize; j++) {
		//         if(islandComponents[i][j] != -1) {
		//             text.setPosition(j*tileWidth, i*tileWidth);
		//             text.setString(std::to_string(islandComponents[i][j]));
		//             window.draw(text);
		//         }
		//     }
		// }

		if (showMap) {
			window.setView(minimap);
			for (int i = 0; i < mapSize; i++) {
				for (int j = 0; j < mapSize; j++) {
					tileSprite.setTextureRect(sf::IntRect(mapData[i][j]*tileWidth, 0, tileWidth, tileWidth));
					tileSprite.setPosition(j*tileWidth, i*tileWidth);
					window.draw(tileSprite);
				}
			}
			blipBox.setPosition(chicken->pos);
			window.draw(blipBox);
		}

		window.display();
	}
	return 0;
}

