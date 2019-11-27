#ifndef ANIMAL
#define ANIMAL
class Animal { 
	private:
		float lastWanderTh;
	public:
		Entity* entity;
		sf::Vector2i aniFrame;
		sf::Vector2f pos;
		sf::Vector2f vel;

		Animal(Entity* entity_, sf::Vector2f pos_);
		void nextFrame();
		void display(sf::RenderWindow* window);
		void wanderIsland(int* islandComponents, float dt);
		void applyVel(float dt);
		void setRandVel();
		int getIslandLocation();
		bool collidesWith(Animal* otherAnimal);
		void die();
};
#endif // ANIMAL
