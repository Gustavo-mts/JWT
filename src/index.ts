import { verify } from "./jwt/verify";
import { sign } from "./jwt/sign";

const secret = "#ludmilo123"

const token = sign({
  exp: Date.now() + (24 * 60 * 60 * 1000),
  data: {
    sub: '@gustavo-mts'
  },
  secret
});

const decoded = verify({
  token,
  secret
});

console.log(decoded);
