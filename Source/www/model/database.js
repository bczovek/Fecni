import redis from 'redis';
import JSONCache from 'redis-json';

export default function(connectionURL) {
    function connect(){
        return new Promise((resolve, reject) => {
            const client = redis.createClient({
                url: connectionURL,
                tls: { rejectUnauthorized: false },
                maxRetriesPerRequest: 100
            });
            client.on('ready', () => {
                resolve({
                    JSONClient: new JSONCache(client, {prefix: 'list:'}),
                    client: client
                });
            }).on('error', err => {
                reject(err);
            });
        });
    };

    return {
        getLists: function(id){
            
            return new Promise((resolve, reject) => {
                connect().then(async (clients) => {
                    const lists = [];
                        clients.client.smembers(id, async function(err, res) {
                            if(err){
                                reject("Could not reach our database!");
                            }
                            for(const uid of res){
                                try{
                                    const list = await clients.JSONClient.get(uid);
                                    lists.push(list);
                                } catch(err){
                                    reject(err);
                                }
                            }
                            resolve(lists);
                        });
                }).catch((err) => {
                    reject("Could not reach our database!");
                });
            });

        },
        addList: function(id, list, uid){
            
            return new Promise((resolve, reject) => {
                connect().then(async (clients) => {
                    try {
                        await clients.client.sadd(id, uid);
                        await clients.JSONClient.set(uid, list);
                    } catch(err){
                        console.log(err);
                    }
                    resolve("Lists successfully saved!");
                }).catch((err) => {
                    reject("Could not reach our database!");
                });
            });
        },

        removeList: function(id, uid){
            return new Promise((resolve, reject) => {
                connect().then(async (clients) => {
                    try {
                        if(clients.client.sismember(id, uid)){
                            await clients.client.srem(id, uid);
                        } else {
                            reject("List does not exist");
                        }
                    } catch(err){
                        console.log(err);
                    }
                    resolve("List removed!");
                }).catch((err) => {
                    reject("Could not reach our database!");
                });
            });
        },

        addUser: function(id){
            return new Promise((resolve, reject) => {
                connect().then(async (clients) => {
                    try {
                       await clients.client.sadd("users", id);
                    } catch(err){
                        console.log(err);
                    }
                    resolve("User successfully saved!");
                }).catch((err) => {
                    reject("Could not reach our database!");
                });
            });
        },

        findUser: function(id){
            return new Promise((resolve, reject) => {
                connect().then(async (clients) => {
                    try {
                       await clients.client.sismember("users", id,async function(err, res) {
                        if(err){
                            reject("Could not reach our database!");
                        }
                        resolve(res);
                       });
                    } catch(err){
                        console.log(err);
                    }
                }).catch((err) => {
                    console.log(err);
                    reject("Could not reach our database!");
                });
            });
        },

        shareList: function(id, listToShare, shareTo, uid){
            return new Promise((resolve, reject) => {
                connect().then(async (clients) => {
                    try {
                        listToShare.owners = [id, shareTo];
                        listToShare.uid = uid;
                        await clients.client.sadd(id+"_shared", uid);
                        await clients.JSONClient.set(uid, [listToShare]);
                        await clients.client.sadd(shareTo+"_shared", uid);
                        resolve("List successfully saved!");
                    } catch(err){
                        console.log(err);
                    }
                }).catch((err) => {
                    console.log(err);
                    reject("Could not reach our database!");
                });
            });
        },

        getSharedLists: function(id){
            return new Promise((resolve, reject) => {
                connect().then((clients) => {
                    try {
                        const lists = [];
                        clients.client.smembers(id+"_shared",async function(err, res) {
                            if(err){
                                reject("Could not reach our database!");
                            }
                            for(const uid of res){
                                try{
                                    const list = await clients.JSONClient.get(uid);
                                    lists.push(...list);
                                } catch(err){
                                    reject(err);
                                }
                            }
                            resolve(lists);
                        });
                    } catch(err){
                        console.log(err);
                    }
                }).catch((err) => {
                    console.log(err);
                    reject("Could not reach our database!");
                });
            });
        },

        setSharedList: function(uid, newList){
            return new Promise((resolve, reject) => {
                connect().then(async (clients) => {
                    try {
                        await clients.JSONClient.set(uid, [newList]);
                    } catch(err){
                        console.log(err);
                    }
                    resolve("Shrared list successfully saved!");
                }).catch((err) => {
                    reject("Could not reach our database!");
                });
            });
        },
        removeSharedList: function(id, uid){
            return new Promise((resolve, reject) => {
                connect().then(async (clients) => {
                    try {
                        if(clients.client.sismember(id + "_shared", uid)){
                            const list = await clients.JSONClient.get(uid);
                            console.log(list);
                            list[0].owners.forEach(async owner => {
                                await clients.client.srem(owner + "_shared", uid);
                            });
                        } else {
                            reject("List does not exist");
                        }
                    } catch(err){
                        console.log(err);
                    }
                    resolve("Shared list removed!");
                }).catch((err) => {
                    reject("Could not reach our database!");
                });
            });
        }
    };
};