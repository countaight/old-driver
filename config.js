export const config = {
  port: 3000,
  host: {
    android: '127.0.0.1',
    ios: 'localhost',
  },
  pubnub: {
    authKey: 'server-auth',
    subscribeKey: 'sub-c-882031a4-2c2b-11e7-8335-02ee2ddab7fe',
    publishKey: 'pub-c-479af515-f31d-4fb5-924d-432bd3a02bf6',
    secretKey: 'sec-c-MDlmMTlkYTUtZGExMC00Y2M2LWExYWQtZWUyODcyMWMwM2Ex',
  },
  github: {
    android: {
      clientId: '22ef2f2ea7fc5cf1d125',
      clientSecret: 'c965f686a901a338a81d6a50f81aad750705a328',
    },
    ios: {
      clientId: '4591e867f77e815d446e',
      clientSecret: 'a96497bed46dd07786b9b2fff16d59e25c9758cc',
    },
  },
};