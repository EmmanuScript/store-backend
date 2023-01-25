namespace NodeJS {
    interface ProcessEnv {
      TOKEN_SECRET: string;
      PORT: string;
      MONGO_URI: string;
      authorizationHeader: string;
    }

    interface JwtPayload {
      _id: integer
    }
  }
