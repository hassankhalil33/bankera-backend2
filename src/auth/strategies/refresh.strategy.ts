import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-jwt";
import { refreshSecretKey } from "src/utilities/constants";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, "refresh") {
  constructor() {
    super({
      jwtFromRequest: RefreshStrategy.getRefreshToken,
      secretOrKey: refreshSecretKey
    })
  }

  async validate(payload) {
    return {uuid: payload.uuid, username: payload.username, role: payload.role}
  }

  private static getRefreshToken(req: Request) {
    const token = req.cookies["refresh-token"];
    if (token) return token
    return null
  }
}
