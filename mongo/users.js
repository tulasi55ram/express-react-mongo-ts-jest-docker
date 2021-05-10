db.createUser(
    {
        user: "admin",
        pwd: "password",
        roles:[
            {
                role: "readWrite",
                db:   "defaultDB"
            }
        ]
    }
);


testDB = db.getSiblingDB('testDB');

testDB.createUser(
    {
        user: "test",
        pwd: "password",
        roles:[
            {
                role: "readWrite",
                db:   "testsDB"
            }
        ]
    }
);