import { ApolloServer,gql } from "apollo-server";
import fetch from "node-fetch";

let tweets=[
    {
        id:"1",
        text:"heelo1",
        userId:"1"
    },
    {
        id:"2",
        text:"heelo2",
        userId:"2"
    },
    {
        id:"3",
        text:"heelo3",
        userId:"1"
    },
    {
        id:"4",
        text:"heelo4",
        userId:"3"
    },
]

let users=[
    {
        id:"1",
        firstName:"AA",
        lastName:"BB",
        
    },
    {
        id:"2",
        firstName:"AA2",
        lastName:"BB2"
    },
    {
        id:"3",
        firstName:"AA3",
        lastName:"BB3"
    },
]


const typeDefs=gql`
    type User{
        id:ID!
        firstName:String!
        lastName:String!
        fullName:String!
    }
    type Tweet{
        id:ID!
        text:String!
        author:User

    }

    type Mutation{
        postTweet(text:String!,userId:ID!):Tweet!
        deleteTweet(id:ID!):Boolean
    }

    type Movie {
        id: Int!
        url: String!
        imdb_code: String!
        title: String!
        title_english: String!
        title_long: String!
        slug: String!
        year: Int!
        rating: Float!
        runtime: Float!
        genres: [String]!
        summary: String
        description_full: String!
        synopsis: String
        yt_trailer_code: String!
        language: String!
        background_image: String!
        background_image_original: String!
        small_cover_image: String!
        medium_cover_image: String!
        large_cover_image: String!
      }

    type Query {
        allMovies: [Movie!]!
        allUsers:[User!]!
        allTweets:[Tweet!]!
        tweet(id:ID!):Tweet
        movie(id: String!): Movie
    }
` 

const resolvers={
    Query:{
        allTweets(){
            console.log('heelo')
            return tweets
        },
        tweet(_,{id}){
            return tweets.find(tweet=>tweet.id===id)
        },
        allUsers(){
            return users
        },
        async allMovies() {
            const r = await fetch("https://yts.mx/api/v2/list_movies.json");
            const json = await r.json();
            return json.data.movies;
          },
          async movie(_, { id }) {
            const r = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
              const json = await r.json();
              return json.data.movie;
          },
    },
    Mutation:{
        postTweet(_,{text,userId}){
            const newTweet={
                id:tweets.length+1,
                text,

            }
            tweets.push(newTweet)
            return newTweet
        },
        deleteTweet(_,{id}){
            const tweet=tweets.find((x)=>x.id===id)
            if(!tweet) return false
            tweets=tweets.filter(tweet=>tweet.id!==id)
            return true
        }
    },
    User:{
        fullName({firstName,lastName}){
            return  `${firstName} ${lastName}`
        }
    },
    Tweet:{
        author({userId}){
            return users.find(x=>x.id===userId)
        }
    }
}

const server=new ApolloServer({typeDefs,resolvers})

server.listen().then(({url})=>{
    console.log('runnion'+url)
})
