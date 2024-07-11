import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { accessSecretKey } from "src/utilities/constants";

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, "access") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
      secretOrKey: accessSecretKey
    })
  }

  async validate(payload) {
    return {username: payload.username, role: payload.role}
  }
}
