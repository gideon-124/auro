import { Client, Account,ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const config={
    endpoint:"https://cloud.appwrite.io/v1", 
    Platform:"com.ck.aoro", 
    projectId:"67dbaf7400385ec8e1cd", 
    databaseId:"67dbb20900341df0521f", 
    usersCollectionId:"67dbb27000370d333134",  
    videoCollectionId:"67dbb2e3003852b7538a",
    storageId:"67dbb5a9002d1c9cc46a"            
}  

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.Platform) // Your application ID or bundle ID.  
; 

const account = new Account(client); 
const avatar = new Avatars(client); 
const databases= new Databases(client)
 
export const createUser=async(email,password,username)=>{
  try { 
    const newAccount= await account.create(
      ID.unique(), 
      email, 
      password,
      username
    ) 
    if(!newAccount) throw Error 
    const avatarUrl= avatar.getInitials(username) 

    await SignInApi(email,password) 

    const newUser=await databases.createDocument(
        config.databaseId, 
        config.usersCollectionId, 
        ID.unique(),
        {
            accountid:newAccount.$id,
            email,
            username, 
            avatar:avatarUrl
        }
    ) 
    return newUser
    
  } catch (error) { 
    console.log(error) 
    throw new Error(error);  
  }
}  




export async function SignInApi(email, password) { 

    try {
        // Logout existing session
        // await account.deleteSession('current'); 
        // const sessions = await account.listSessions();

        // If there is an active session, return it instead of creating a new one
        // if (sessions.sessions.length > 0) {
        //     return sessions.sessions[0]; 
        // }
        // Create a new session 
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error);
    }
    // try { 
    //     const session= await account.createEmailPasswordSession (email,password)
    // //   const session = await account.createEmailSession(email, password);
  
    //   return session;
    // } catch (error) {
    //   throw new Error(error);
    // }
  } 


  export const getCurrentuser=async()=>{
    try { 
        const currentAccount=await account.get() 

        if(!currentAccount) throw Error 

        const currentUser= await databases.listDocuments(
            config.databaseId, 
            config.usersCollectionId, 
            [Query.equal('accountid',currentAccount.$id)]
        )
        if(!currentUser) throw Error  

        return currentUser.documents[0]
    } catch (error) { 
        console.log(error)
    }
  } 

  export const getAllPosts=async()=>{
    try { 
      // console.log("Fetching data from Appwrite..."); 
      const posts= await databases.listDocuments(
        config.databaseId, 
        config.videoCollectionId
      )  
      // console.log("Fetched Posts:", posts);
      return posts.documents
      
    } catch (error) {
      throw new Error(error);
      
    }
  }  



  export const getLatestPosts=async()=>{
    try { 
      // console.log("Fetching data from Appwrite..."); 
      const posts= await databases.listDocuments(
        config.databaseId, 
        config.videoCollectionId, 
        [Query.orderDesc('$createdAt', Query.limit(7))]
      )  
      // console.log("Fetched Posts:", posts);
      return posts.documents
      
    } catch (error) {
      throw new Error(error);
      
    }
  } 
  
  

  export const searchPosts=async(query)=>{
    try {   
      const posts= await databases.listDocuments(
        config.databaseId, 
        config.videoCollectionId, 
        [Query.search('title',query)]
      )  
      
      return posts.documents
      
    } catch (error) {
      throw new Error(error);
      
    }
  }   


  

  export const getUserPosts=async(userId)=>{
  try {
    const posts = await databases.listDocuments(
      config.databaseId, 
      config.videoCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}  

  // Sign Out
  export const signOut=async()=>{
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }

