import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtSecretKey } from "src/utilities/constants";

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, "access") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
      secretOrKey: jwtSecretKey
    })
  }

  async validate(payload) {
    return {username: payload.username, role: payload.role}
  }
}
