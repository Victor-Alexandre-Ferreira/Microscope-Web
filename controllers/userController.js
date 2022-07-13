const userDatamapper = require('../models/userDatamapper');
const gameDatamapper = require('../models/gameDatamapper');
const bcrypt = require('bcrypt');

const userController = {

    async getAll (_, response) {

        try {

            const userList = await userDatamapper.findAll();
            return response.json({ userList });

        } catch (err){
            response.json({ errorType: err.message });
        }        
    },

    async getOne (request, response) {

        try { 
            
            const user = await userDatamapper.findByPk(request.params.id);
            
            if (!user) {
                return response.json({ errorMessage: "no user found"});
            }

            // We need to query for games where the user participate
            const userGames = await userDatamapper.findByPlayerId(user.id);
            // Let's retrieve game data
            const gameList = [];

            if (userGames) {

                for (const game of userGames) {
                    const gameData = await gameDatamapper.findByPk(game.game_id);
                    gameList.push({ id: gameData.id, bigPicture: gameData.big_picture, state: gameData.state });
                }
            }
    
            return response.json({ username: user.username, email: user.email, userId: user.id, gameList });

        } catch (err) {
            response.json({ errorType: err.message });
        }        
    },

    async getOneAdmin (request, response) {

        try { 
            console.log(request.params.id);
            const user = await userDatamapper.findByPk(request.params.id);
            
            if (!user) {
                return response.json({ errorMessage: "no user found"});
            }
    
            return response.json(user);

        } catch (err) {
            response.json({ errorType: err.message });
        }        
    },

    async create (request, response) {

        try {
            // We call for the body        
            const user = await userDatamapper.isUnique(request.body);
            if (user) {

                let field;
                if (user.username === request.body.username) {
                    field = 'username';
                } else {
                    field = 'email';
                }

                return response.json({ errorMessage: `Other user already exists with this ${field}` });            
            }

            // We use bcrypt module to hash our password value
            const hashedPassword = await bcrypt.hash(request.body.password, 10);

            await userDatamapper.insert(request.body, hashedPassword);
            
            return response.json("New user created");

        } catch (err) {
            response.json({ errorType: err.message });
        }    
    },

    async delete (request, response) {
        try{

            const user = await userDatamapper.findByPk(request.params.id);

            if (!user) {
                return response.json({ errorMessage: `User not found` });
            }

            await userDatamapper.delete(request.params.id);
            return response.json({ errorMessage: `User deleted` });

        } catch (err) {
            response.json({ errorType: err.message });
        }        
    },

    async update (request, response) {

        try {

            console.log(request.body);
            const user = await userDatamapper.findByPk(request.params.id);

            if (!user) {
                return response.status(404).json();
            }

            if (request.body.username || request.body.email) {

                const existingUser = await userDatamapper.isUnique(request.body, request.params.id);

                if (existingUser) {

                    let field;
                    if (existingUser.username === request.body.username) {
                        field = 'username';
                    } else {
                        field = 'email';
                    }
                    return response.status(400).json({ errorMessage: `Other user already exists with this ${field}` });
                }
            }

            const savedUser = await userDatamapper.update(request.params.id, request.body);
            return response.json(savedUser);
            
        } catch (err) {
            response.json({ errorType: err.message });
        }        
    }
};

module.exports = userController;