const userDatamapper = require('../models/userDatamapper');
const gameDatamapper = require('../models/gameDatamapper');
const bcrypt = require('bcrypt');

const userController = {

    async getAll (_, response) {

        try {

            const userList = await userDatamapper.findAll();
            return response.status(200).json({ userList });

        } catch (err){
            response.status(502).json({ errorType: err.message, errorMessage: "Unable to access User List !" });
        }        
    },

    async getOne (request, response) {

        try { 
            
            const user = await userDatamapper.findByPk(request.params.id);
            
            if (!user) {
                return response.status(404).json({ errorMessage: "no user found"});
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
    
            return response.status(200).json({ username: user.username, email: user.email, userId: user.id, gameList });

        } catch (err) {
            response.status(502).json({ errorType: err.message, errorMessage: "Unable to access User !" });
        }        
    },

    async getOneAdmin (request, response) {

        try { 
            console.log(request.params.id);
            const user = await userDatamapper.findByPk(request.params.id);
            
            if (!user) {
                return response.status(404).json({ errorMessage: "no user found"});
            }
    
            return response.json(user);

        } catch (err) {
            response.status(502).json({ errorType: err.message, errorMessage: "Unable to access User as Admin !" });
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

                return response.status(406).json({ errorMessage: `Other user already exists with this ${field}` });            
            }

            // We use bcrypt module to hash our password value
            const hashedPassword = await bcrypt.hash(request.body.password, 10);

            await userDatamapper.insert(request.body, hashedPassword);
            
            return response.status(201).json("New user created");

        } catch (err) {
            response.status(502).json({ errorType: err.message, errorMessage: "Unable to create User !" });
        }    
    },

    async delete (request, response) {
        try{

            const user = await userDatamapper.findByPk(request.params.id);

            if (!user) {
                return response.status(404).json({ errorMessage: `User not found` });
            }

            await userDatamapper.delete(request.params.id);
            return response.status(200).json({ errorMessage: `User deleted` });

        } catch (err) {
            response.status(502).json({ errorType: err.message, errorMessage: "Unable to delete User !" });
        }        
    },

    async update (request, response) {

        try {

            console.log(request.body);
            const user = await userDatamapper.findByPk(request.params.id);

            if (!user) {
                return response.status(404).json({ errorMessage: `User not found` });
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
                    return response.status(406).json({ errorMessage: `Other user already exists with this ${field}` });
                }
            }

            const savedUser = await userDatamapper.update(request.params.id, request.body);
            return response.status(204).json(savedUser);
            
        } catch (err) {
            response.status(502).json({ errorType: err.message, errorMessage: "Unable to update User !" });
        }        
    }
};

module.exports = userController;