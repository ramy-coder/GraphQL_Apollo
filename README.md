# GraphQL_Apollo
Setting up an Apollo Server and Client to use GraphQL

Follow the below steps to set up the project in your local machine -
1. Install nodemon
2. npm install -g nodemon
3. nodemon index (Starts the Apollo Server for Graph in the port 4000)
4. Open the URL to see the server to execute your Queries/Mutations at http://localhost:4000/ for the given schema


Learnt and developed from a course in FCC for GraphQL

Sample Mutation Queries:
1. mutation DeleteMutation($id : ID!) {
  deleteGame(id: $id){
    id,
    title,
    platform
    }
    }
  Input :
  {
  "id": "2",
   }

2. mutation addGametoDB($game : gameType! ) {
  addGame(game: $game){
    id,
    title,
    platform
    }

  }  
  Input :
  {"game" :{
  "title" : "new game",
  "platform": ["XBOX","PS2"],
  }
  }
  
3. mutation updateGametoDB($id : ID!, $game:updateGameType!) {
  updateGame(id:$id,edit:$game){
    id,
  title,
  platform
  }
  }
  Input:
  {
  "id" : "2",
  "game" :{
  "title" : "updated"
  }
 }
