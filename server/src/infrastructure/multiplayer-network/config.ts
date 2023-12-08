import { GatewayMetadata } from "@nestjs/websockets";

export const MULTIPLAYER_WEBSOCKET_GATEWAY_CONFIG: GatewayMetadata = {
    path: "/multiplayer",
    cors: {
        origin: "*"
    }
};