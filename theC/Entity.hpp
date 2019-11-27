#ifndef ENTITY
#define ENTITY
class Entity {
	public:
		sf::Texture texture;
		sf::Sprite sprite;
		int maxHealth, attack, speed;
		int width; // yeah, all entities are squares. Deal with it.
		sf::Vector2i aniFrameMax;
		sf::RectangleShape boundingBox;

		Entity(int maxHealth_, int attack_, int speed_);
		void initImage(std::string imgPath, int width_, sf::Vector2i aniFrameMax_);
		void displayState();
};
#endif // ENTITY
