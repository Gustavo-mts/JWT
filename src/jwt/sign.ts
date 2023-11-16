import { createHmac } from "node:crypto";
import { generateSignature } from "./generateSignature";

interface ISignOptions {
  data: Record<string, any>;
  exp: number;
  secret: string;
}

export function sign({ data, exp, secret}: ISignOptions) {
  // Header
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  // Payload
  const payload = {
    ...data,
    iat: Date.now(),
    exp
  };

  const base64EncodedHeader = Buffer
  .from(JSON.stringify(header))
  .toString('base64url');

  const base64EncondedPayload = Buffer
    .from(JSON.stringify(payload))
    .toString('base64url');

  // Signature
  const signature = generateSignature({
    header: base64EncodedHeader,
    payload: base64EncondedPayload,
    secret
  })


  return `${base64EncodedHeader}.${base64EncondedPayload}.${signature}`;
}


