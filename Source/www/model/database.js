import redis from 'redis';
import JSONCache from 'redis-json';

export default function(connectionURL) {
    function connect(){
        return new Promise((resolve, reject) => {
            const client = redis.createClient(connectionURL);
    
            client.on('ready', () => {
                resolve(new JSONCache(client, {prefix: 'user:'}));
            }).on('error', err => {
                reject(err);
            });
        });
    };

    return {
        getLists: function(id){
            
            return new Promise((resolve, reject) => {
                connect().then(async (client) => {
                    const lists = await client.get(id);
                    resolve(lists);
                }).catch((err) => {
                    reject("Could not reach our database!");
                });
            });

        },
        setLists: function(id, lists){
            
            return new Promise((resolve, reject) => {
                connect().then(async (client) => {
                    try {
                        console.log(id);
                        console.log(lists);
                       await client.set(id, lists);
                    } catch(err){
                        console.log(err);
                    }
                    resolve("Lists successfully saved!");
                }).catch((err) => {
                    reject("Could not reach our database!");
                })
            })
        }
    };
};