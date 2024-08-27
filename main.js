document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript is loaded and running!");

    const screenElement = document.getElementById('screen');
    let currentSceneIndex = 0;
    let storyData = null;
    let playerState = {
        chapter: 1,
        choices: {}  // Track player choices
    };

    fetch('story.json')
        .then(response => response.json())
        .then(data => {
            console.log("Story data loaded:", data);
            storyData = data;
            showScreen('story');
        })
        .catch(error => {
            console.error("Error loading story data:", error);
        });

    function loadStoryScene(sceneId) {
        if (!storyData) return;
        const scene = storyData.scenes.find(s => s.id === sceneId && s.chapter === playerState.chapter);

        if (scene) {
            let optionsHTML = '';

            if (scene.options && scene.options.length > 0) {
                scene.options.forEach((option) => {
                    // Conditional logic based on previous choices
                    if (!option.condition || (option.condition && checkCondition(option.condition))) {
                        optionsHTML += `<p><button class="story-option" data-next="${option.nextScene}" data-choice="${option.choice}">${option.text}</button></p>`;
                    }
                });
            } else {
                optionsHTML = `<p><button class="story-option" data-next="next">Next</button></p>`;
            }

            screenElement.innerHTML = `
                <div id="story-image-container">
                    <img id="story-image" src="scenes/${scene.image}" alt="Scene Image">
                </div>
                <div id="story-text-container">
                    <div>
                        <p>${scene.text}</p>
                        ${optionsHTML}
                    </div>
                </div>
            `;

            document.querySelectorAll('.story-option').forEach(button => {
                button.addEventListener('click', (event) => {
                    const nextSceneId = event.target.getAttribute('data-next');
                    const playerChoice = event.target.getAttribute('data-choice');
                    if (playerChoice) {
                        playerState.choices[sceneId] = playerChoice;
                    }
                    navigateToScene(nextSceneId);
                });
            });
        } else {
            console.error('Scene not found:', sceneId);
        }
    }

    function checkCondition(condition) {
        // Example: condition = { sceneId: 1, choice: 'optionA' }
        return playerState.choices[condition.sceneId] === condition.choice;
    }

    function showScreen(screenName) {
        switch (screenName) {
            case 'story':
                screenElement.style.backgroundColor = '#222';
                loadStoryScene(storyData.scenes[currentSceneIndex].id);
                break;
            case 'map':
                screenElement.style.backgroundColor = '#008000';
                screenElement.innerHTML = '<h2>Map Screen</h2>';
                break;
            case 'combat':
                screenElement.style.backgroundColor = '#800000';
                screenElement.innerHTML = '<h2>Combat Screen</h2>';
                break;
            case 'inventory':
                screenElement.style.backgroundColor = '#000080';
                screenElement.innerHTML = '<h2>Inventory Screen</h2>';
                break;
            case 'fairy':
                screenElement.style.backgroundColor = '#800080';
                screenElement.innerHTML = '<h2>Fairy Screen</h2>';
                break;
            default:
                console.error('Unknown screen:', screenName);
        }
    }

    function navigateToScene(sceneId) {
        const nextScene = storyData.scenes.find(s => s.id == sceneId);
        if (nextScene) {
            if (nextScene.chapter !== playerState.chapter) {
                playerState.chapter = nextScene.chapter;  // Update chapter if moving to a new one
            }
            loadStoryScene(nextScene.id);
        } else {
            console.log('End of story or invalid scene');
            showScreen('map');
        }
    }

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'Enter':
                const nextButton = document.querySelector('.story-option');
                if (nextButton) nextButton.click();
                break;
            case '1':
                showScreen('map');
                break;
            case '2':
                showScreen('inventory');
                break;
            case '3':
                showScreen('fairy');
                break;
            case '4':
                showScreen('combat');
                break;
            case '0':
                showScreen('story');
                break;
            default:
                break;
        }
    });

    /*************************  TEST    ******************** */
    // Load the properties.json file
    async function loadProperties() {
        const response = await fetch('properties.json');
        return response.json();
    }

    // Define the Fairy class
    class Fairy {
        constructor(id, level, burst, ultimate) {
            this.id = id;
            this.level = level;
            this.burst = burst;
            this.ultimate = ultimate;
            this.stats = {};
        }

        // Initialize fairy properties based on properties.json
        async initialize() {
            const properties = await loadProperties();
            const fairyData = properties.fairies.find(fairy => fairy.id === this.id);
            if (fairyData) {
                this.image = fairyData.image;
                this.name = fairyData.name;
                this.basicHealth = fairyData.basic_health; //easier: this.Health = fairyData.basic_health*lvl
                this.basicAttack = fairyData.basic_attack;
                this.basicDefense = fairyData.basic_defense;
                this.special = fairyData.special;
                this.speed = fairyData.speed;
                this.manaRecovery = fairyData.mana_recovery;
                this.loyalty = fairyData.loyalty;
                this.health = this.basicHealth * this.level;
                this.attack = this.basicAttack * this.level;
                this.defense = this.basicDefense * this.level;
            } else {
                throw new Error('Fairy not found in properties');
            }
        }

        // Calculate damage
        calculateDamage(type) {
            let multiplier;
            switch (type) {
                case 'basic':
                    multiplier = 1;
                    break;
                case 'special':
                    multiplier = 1.5;
                    break;
                case 'ultimate':
                    multiplier = 4;
                    break;
                default:
                    throw new Error('Unknown attack type');
            }
            return this.level * (multiplier * (type === 'ultimate' ? this.ultimate : this.attack));
        }


        // Update health
        updateHealth(damage) {
            this.health -= damage / this.defense;
            if (this.health < 0) this.health = 0;
        }
    }

    // Define the Enemy class
    class Enemy {
        constructor(id) {
            this.id = id;
            this.image = '';
            this.name = '';
            this.basicHealth = 0;
            this.basicAttack = 0;
            this.basicDefense = 0;
            this.health = 0;
        }

        // Initialize enemy properties based on properties.json
        async initialize() {
            const properties = await loadProperties();
            const enemyData = properties.enemies.find(enemy => enemy.id === this.id);
            if (enemyData) {
                this.image = enemyData.image;
                this.name = enemyData.name;
                this.basicHealth = enemyData.basic_health;
                this.basicAttack = enemyData.basic_attack;
                this.basicDefense = enemyData.basic_defense;
                this.health = this.basicHealth;
            } else {
                throw new Error('Enemy not found in properties');
            }
        }

        // Update health
        updateHealth(damage) {
            this.health -= damage / this.basicDefense;
            if (this.health < 0) this.health = 0;
        }
    }

    // Demo fight
    async function demoFight() {
        const fairy = new Fairy(1, 5, 10, 15);
        await fairy.initialize();

        const enemy = new Enemy(1);
        await enemy.initialize();

        console.log(`Fairy: ${fairy.name}, Health: ${fairy.health}, Attack: ${fairy.attack}`);
        console.log(`Enemy: ${enemy.name}, Health: ${enemy.health}, Attack: ${enemy.basicAttack}`);

        // Fairy attacks enemy
        const attackDamage = fairy.calculateDamage('basic');
        console.log(`Fairy attacks enemy with damage: ${attackDamage}`);
        enemy.updateHealth(attackDamage);
        console.log(`Enemy health after attack: ${enemy.health}`);

        // Enemy attacks fairy
        const enemyAttackDamage = enemy.basicAttack * 2; // For simplicity, enemy attack is just doubled
        console.log(`Enemy attacks fairy with damage: ${enemyAttackDamage}`);
        fairy.updateHealth(enemyAttackDamage);
        console.log(`Fairy health after attack: ${fairy.health}`);
    }

    // Run the demo fight
    demoFight();
    /*************************  TEST    ******************** */
});
