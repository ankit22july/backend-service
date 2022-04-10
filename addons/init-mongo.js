function seed(dbName, user, password) {
  db = db.getSiblingDB(dbName);
  db.createUser({
    user: user,
    pwd: password,
    roles: [{ role: 'readWrite', db: dbName }],
  });

  db.createCollection('api_keys');
  db.createCollection('roles');

  db.api_keys.insert({
    metadata: 'Will be used via internal services for authentication',
    key: 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
    version: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  db.roles.insertMany([
    { code: 'STUDENT', status: true, createdAt: new Date(), updatedAt: new Date() },
    { code: 'AUTHOR', status: true, createdAt: new Date(), updatedAt: new Date() },
    { code: 'MAINTAINER', status: true, createdAt: new Date(), updatedAt: new Date() },
    { code: 'ADMIN', status: true, createdAt: new Date(), updatedAt: new Date() },
  ]);
}

seed('backend-service-db', 'backend-service-db-user', 'changeit');
seed('backend-service-test-db', 'backend-service-test-db-user', 'changeit');
